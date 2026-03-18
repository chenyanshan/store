PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS study_profiles (
  learning_id TEXT PRIMARY KEY,
  secret_hash TEXT NOT NULL,
  current_case_id TEXT,
  current_index INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'all',
  source_filter_snapshot TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  CHECK(mode IN ('all', 'favorites'))
);

CREATE TABLE IF NOT EXISTS study_favorites (
  learning_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (learning_id, case_id),
  FOREIGN KEY (learning_id) REFERENCES study_profiles(learning_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_study_favorites_learning_id_created_at
ON study_favorites (learning_id, created_at DESC);
