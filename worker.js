const LEARNING_ID_REGEX = /^[a-z0-9_-]{8,64}$/;
const SECRET_REGEX = /^\d{4}$/;

class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/study/")) {
      return handleStudyApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleStudyApi(request, env, url) {
  try {
    ensureDb(env);

    const { pathname } = url;
    if (pathname === "/api/study/open" && request.method === "POST") {
      return jsonResponse({
        ok: true,
        data: await handleOpen(request, env)
      });
    }

    if (pathname === "/api/study/state" && request.method === "GET") {
      return jsonResponse({
        ok: true,
        data: await handleState(request, env, url)
      });
    }

    if (pathname === "/api/study/progress" && request.method === "POST") {
      return jsonResponse({
        ok: true,
        data: await handleProgress(request, env)
      });
    }

    if (pathname === "/api/study/favorites/toggle" && request.method === "POST") {
      return jsonResponse({
        ok: true,
        data: await handleFavoriteToggle(request, env)
      });
    }

    if (pathname === "/api/study/logout" && request.method === "POST") {
      return jsonResponse({
        ok: true,
        data: { logged_out: true }
      });
    }

    throw new ApiError(404, "not_found", "接口不存在");
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse(
        {
          ok: false,
          error: {
            code: error.code,
            message: error.message
          }
        },
        error.status
      );
    }

    return jsonResponse(
      {
        ok: false,
        error: {
          code: "internal_error",
          message: "服务异常，请稍后重试"
        }
      },
      500
    );
  }
}

function ensureDb(env) {
  if (!getDb(env)) {
    throw new ApiError(500, "db_not_configured", "未配置 D1 数据库绑定 `DB`");
  }
}

function getDb(env) {
  return env.DB || env.retail_case_database || null;
}

async function handleOpen(request, env) {
  const db = getDb(env);
  const body = await readJsonBody(request);
  const learningId = normalizeLearningId(body.learning_id);
  const secret = normalizeSecret(body.secret);
  const secretHash = await sha256Hex(secret);
  const now = isoNow();

  const profile = await getProfile(env, learningId);
  if (!profile) {
    await db.prepare(
      `
      INSERT INTO study_profiles (
        learning_id, secret_hash, current_case_id, current_index, mode,
        source_filter_snapshot, created_at, updated_at, last_seen_at
      )
      VALUES (?, ?, NULL, 0, 'all', NULL, ?, ?, ?)
      `
    )
      .bind(learningId, secretHash, now, now, now)
      .run();
  } else {
    ensureSecretMatched(profile.secret_hash, secretHash);

    await db.prepare(
      `
      UPDATE study_profiles
      SET last_seen_at = ?, updated_at = ?
      WHERE learning_id = ?
      `
    )
      .bind(now, now, learningId)
      .run();
  }

  return getStudyState(env, learningId);
}

async function handleState(request, env, url) {
  const db = getDb(env);
  const learningId = normalizeLearningId(
    request.headers.get("x-learning-id") || url.searchParams.get("learning_id")
  );
  const secret = normalizeSecret(
    request.headers.get("x-learning-secret") || url.searchParams.get("secret")
  );
  const secretHash = await sha256Hex(secret);
  const profile = await mustGetProfile(env, learningId);
  ensureSecretMatched(profile.secret_hash, secretHash);

  const now = isoNow();
  await db.prepare(
    `
    UPDATE study_profiles
    SET last_seen_at = ?
    WHERE learning_id = ?
    `
  )
    .bind(now, learningId)
    .run();

  return getStudyState(env, learningId);
}

async function handleProgress(request, env) {
  const db = getDb(env);
  const body = await readJsonBody(request);
  const learningId = normalizeLearningId(body.learning_id);
  const secret = normalizeSecret(body.secret);
  const secretHash = await sha256Hex(secret);
  const profile = await mustGetProfile(env, learningId);
  ensureSecretMatched(profile.secret_hash, secretHash);

  const currentCaseId = normalizeCaseId(body.current_case_id);
  const currentIndex = normalizeCurrentIndex(body.current_index);
  const mode = normalizeMode(body.mode);
  const sourceFilterSnapshot = normalizeFilterSnapshot(body.source_filter_snapshot);
  const now = isoNow();

  await db.prepare(
    `
    UPDATE study_profiles
    SET current_case_id = ?, current_index = ?, mode = ?, source_filter_snapshot = ?,
        updated_at = ?, last_seen_at = ?
    WHERE learning_id = ?
    `
  )
    .bind(currentCaseId, currentIndex, mode, sourceFilterSnapshot, now, now, learningId)
    .run();

  return {
    learning_id: learningId,
    current_case_id: currentCaseId,
    current_index: currentIndex,
    mode,
    updated_at: now
  };
}

async function handleFavoriteToggle(request, env) {
  const db = getDb(env);
  const body = await readJsonBody(request);
  const learningId = normalizeLearningId(body.learning_id);
  const secret = normalizeSecret(body.secret);
  const caseId = normalizeRequiredCaseId(body.case_id);
  const secretHash = await sha256Hex(secret);
  const profile = await mustGetProfile(env, learningId);
  ensureSecretMatched(profile.secret_hash, secretHash);

  const exists = await db.prepare(
    `
    SELECT 1 AS matched
    FROM study_favorites
    WHERE learning_id = ? AND case_id = ?
    LIMIT 1
    `
  )
    .bind(learningId, caseId)
    .first();

  let favorited = false;
  const now = isoNow();

  if (exists) {
    await db.prepare(
      `
      DELETE FROM study_favorites
      WHERE learning_id = ? AND case_id = ?
      `
    )
      .bind(learningId, caseId)
      .run();
  } else {
    favorited = true;
    await db.prepare(
      `
      INSERT INTO study_favorites (learning_id, case_id, created_at)
      VALUES (?, ?, ?)
      `
    )
      .bind(learningId, caseId, now)
      .run();
  }

  await db.prepare(
    `
    UPDATE study_profiles
    SET updated_at = ?, last_seen_at = ?
    WHERE learning_id = ?
    `
  )
    .bind(now, now, learningId)
    .run();

  const countRow = await db.prepare(
    `
    SELECT COUNT(*) AS count
    FROM study_favorites
    WHERE learning_id = ?
    `
  )
    .bind(learningId)
    .first();

  return {
    learning_id: learningId,
    case_id: caseId,
    favorited,
    favorites_count: Number(countRow?.count ?? 0)
  };
}

async function getStudyState(env, learningId) {
  const db = getDb(env);
  const profile = await mustGetProfile(env, learningId);
  const favoritesResult = await db.prepare(
    `
    SELECT case_id
    FROM study_favorites
    WHERE learning_id = ?
    ORDER BY created_at DESC
    `
  )
    .bind(learningId)
    .all();

  let sourceFilterSnapshot = null;
  if (profile.source_filter_snapshot) {
    try {
      sourceFilterSnapshot = JSON.parse(profile.source_filter_snapshot);
    } catch {
      sourceFilterSnapshot = null;
    }
  }

  return {
    learning_id: profile.learning_id,
    current_case_id: profile.current_case_id || null,
    current_index: Number(profile.current_index ?? 0),
    mode: profile.mode || "all",
    source_filter_snapshot: sourceFilterSnapshot,
    favorites: Array.isArray(favoritesResult.results)
      ? favoritesResult.results.map((item) => String(item.case_id))
      : [],
    created_at: profile.created_at,
    updated_at: profile.updated_at,
    last_seen_at: profile.last_seen_at
  };
}

async function getProfile(env, learningId) {
  const db = getDb(env);
  return db.prepare(
    `
    SELECT learning_id, secret_hash, current_case_id, current_index, mode,
           source_filter_snapshot, created_at, updated_at, last_seen_at
    FROM study_profiles
    WHERE learning_id = ?
    LIMIT 1
    `
  )
    .bind(learningId)
    .first();
}

async function mustGetProfile(env, learningId) {
  const profile = await getProfile(env, learningId);
  if (!profile) {
    throw new ApiError(404, "study_not_found", "学习档案不存在，请先创建");
  }
  return profile;
}

function ensureSecretMatched(savedHash, incomingHash) {
  if (savedHash !== incomingHash) {
    throw new ApiError(401, "invalid_secret", "恢复码不正确");
  }
}

async function readJsonBody(request) {
  let body = null;
  try {
    body = await request.json();
  } catch {
    throw new ApiError(400, "invalid_json", "请求体不是合法 JSON");
  }

  if (!body || typeof body !== "object") {
    throw new ApiError(400, "invalid_body", "请求体不能为空");
  }

  return body;
}

function normalizeLearningId(value) {
  const learningId = String(value ?? "")
    .trim()
    .toLowerCase();

  if (!LEARNING_ID_REGEX.test(learningId)) {
    throw new ApiError(
      400,
      "invalid_learning_id",
      "学习 ID 需为 8-64 位，仅允许字母、数字、下划线、短横线"
    );
  }

  return learningId;
}

function normalizeSecret(value) {
  const secret = String(value ?? "").trim();

  if (!SECRET_REGEX.test(secret)) {
    throw new ApiError(
      400,
      "invalid_secret",
      "恢复码必须是 4 位数字"
    );
  }

  return secret;
}

function normalizeCaseId(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return null;
  }
  return String(value).trim();
}

function normalizeRequiredCaseId(value) {
  const caseId = normalizeCaseId(value);
  if (!caseId) {
    throw new ApiError(400, "invalid_case_id", "case_id 不能为空");
  }
  return caseId;
}

function normalizeCurrentIndex(value) {
  const index = Number(value);
  if (!Number.isInteger(index) || index < 0) {
    throw new ApiError(400, "invalid_current_index", "current_index 必须是大于等于 0 的整数");
  }
  return index;
}

function normalizeMode(value) {
  const mode = String(value ?? "all").trim();
  if (mode !== "all" && mode !== "favorites") {
    throw new ApiError(400, "invalid_mode", "mode 仅支持 all 或 favorites");
  }
  return mode;
}

function normalizeFilterSnapshot(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value !== "object") {
    throw new ApiError(400, "invalid_filter_snapshot", "source_filter_snapshot 必须是对象");
  }

  return JSON.stringify(value);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function isoNow() {
  return new Date().toISOString();
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((valueByte) => valueByte.toString(16).padStart(2, "0")).join("");
}
