DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userName TEXT PRIMARY KEY,
    password TEXT NOT NULL,
);

DROP TABLE IF EXISTS colors;

CREATE TABLE colors (
    
);

-- Depends on the colors table which is not here yet

/*
DROP TABLE IF EXISTS entries;

CREATE TABLE entries (
    userName INTEGER PRIMARY KEY AUTOINCREMENT,
    created TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);
*/

