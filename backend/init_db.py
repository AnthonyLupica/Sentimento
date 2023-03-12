"""
    init_db.py

    Setting up the database!
"""

import csv
import sqlite3

connection = sqlite3.connect('database.db')
cur = connection.cursor()

# Users Table
cur.execute("DROP TABLE IF EXISTS users")
cur.execute("CREATE TABLE users (userName TEXT PRIMARY KEY, password TEXT NOT NULL)")

# Entries Table
cur.execute('DROP TABLE IF EXISTS entries;')
cur.execute('CREATE TABLE entries (userName TEXT PRIMARY KEY, created TEXT PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, id INTEGER AUTOINCREMENT, mood TEXT NOT NULL, admiration REAL NOT NULL, amusement REAL NOT NULL, anger REAL NOT NULL, annoyance REAL NOT NULL, approval REAL NOT NULL, caring REAL NOT NULL, confusion REAL NOT NULL, curiosity REAL NOT NULL, desire REAL NOT NULL, disappointment REAL NOT NULL, disapproval REAL NOT NULL, disgust REAL NOT NULL, embarrassment REAL NOT NULL, excitement REAL NOT NULL, fear REAL NOT NULL, gratitude REAL NOT NULL, grief REAL NOT NULL, joy REAL NOT NULL, love REAL NOT NULL, nervousness REAL NOT NULL, optimism REAL NOT NULL, pride REAL NOT NULL, realization REAL NOT NULL, relief REAL NOT NULL, remorse REAL NOT NULL, sadness REAL NOT NULL, surprise REAL NOT NULL, neutral REAL NOT NULL, FOREIGN KEY(userName) REFERENCES users(userName))')

# Test Data
cur.execute("INSERT INTO users(userName, password) VALUES (adi19, 123)")
cur.execute("INSERT INTO users(userName, password) VALUES (arl127, 123)")
cur.execute("INSERT INTO entries(userName, created, title, content, mood, admiration, amusement, anger, annoyance, approval, caring, confusion, curiosity, desire, disappointment, disapproval, disgust, embarrassement, excitement, fear, gratitude, grief, joy, love, nervousness, optimism, pride, realization, relief, remorse, sadness, surprise, neutral) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", ('test', 'test', 'test', 'test', 'test', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1))



