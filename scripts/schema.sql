-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Tales table to store the main story information
CREATE TABLE IF NOT EXISTS tales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT, -- For future authentication integration
  status TEXT CHECK(status IN ('draft', 'published', 'archived')) DEFAULT 'draft'
);

-- Characters table to store tale characters
CREATE TABLE IF NOT EXISTS characters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tale_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('Protagonista', 'Antagonista', 'Compañero', 'Mentor', 'Secundario')) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tale_id) REFERENCES tales(id) ON DELETE CASCADE
);

-- Pages table to store individual pages of the tale
CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tale_id INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  image_prompt TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tale_id) REFERENCES tales(id) ON DELETE CASCADE,
  UNIQUE(tale_id, page_number)
);

-- Tags table for categorizing tales
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Tale tags relationship table
CREATE TABLE IF NOT EXISTS tale_tags (
  tale_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (tale_id, tag_id),
  FOREIGN KEY (tale_id) REFERENCES tales(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tales_user_id ON tales(user_id);
CREATE INDEX IF NOT EXISTS idx_characters_tale_id ON characters(tale_id);
CREATE INDEX IF NOT EXISTS idx_pages_tale_id ON pages(tale_id);
CREATE INDEX IF NOT EXISTS idx_pages_tale_number ON pages(tale_id, page_number);

-- Triggers to update timestamps
CREATE TRIGGER IF NOT EXISTS update_tales_timestamp 
AFTER UPDATE ON tales
BEGIN
  UPDATE tales SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_pages_timestamp 
AFTER UPDATE ON pages
BEGIN
  UPDATE pages SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;