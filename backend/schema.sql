-- Users Table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    userName TEXT,
    password TEXT NOT NULL,
    email TEXT,
    PRIMARY KEY(userName, email)
);

-- Entries Table
DROP TABLE IF EXISTS entries;
CREATE TABLE entries (
    userName TEXT, 
    dateAndTime TEXT, 
    title TEXT NOT NULL, 
    content TEXT NOT NULL, 
    id TEXT NOT NULL, 
    mood TEXT NOT NULL,
    color TEXT NOT NULL,
    admiration REAL NOT NULL, 
    amusement REAL NOT NULL, 
    anger REAL NOT NULL, 
    annoyance REAL NOT NULL, 
    approval REAL NOT NULL, 
    caring REAL NOT NULL, 
    confusion REAL NOT NULL, 
    curiosity REAL NOT NULL, 
    desire REAL NOT NULL, 
    disappointment REAL NOT NULL, 
    disapproval REAL NOT NULL, 
    disgust REAL NOT NULL, 
    embarrassment REAL NOT NULL, 
    excitement REAL NOT NULL, 
    fear REAL NOT NULL, 
    gratitude REAL NOT NULL, 
    grief REAL NOT NULL, 
    joy REAL NOT NULL, 
    love REAL NOT NULL, 
    nervousness REAL NOT NULL, 
    optimism REAL NOT NULL, 
    pride REAL NOT NULL, 
    realization REAL NOT NULL, 
    relief REAL NOT NULL, 
    remorse REAL NOT NULL, 
    sadness REAL NOT NULL, 
    surprise REAL NOT NULL, 
    neutral REAL NOT NULL, 
    PRIMARY KEY (userName, dateAndTime),
    FOREIGN KEY(userName) REFERENCES users(userName)
);