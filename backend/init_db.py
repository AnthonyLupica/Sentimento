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
cur.execute("CREATE TABLE users (userName TEXT PRIMARY KEY,password TEXT NOT NULL)")

# Entries Table
cur.execute('DROP TABLE IF EXISTS entries;')
cur.execute('CREATE TABLE entries (userName INTEGER PRIMARY KEY,created TEXT PRIMARY KEY,title TEXT NOT NULL,content TEXT NOT NULL);')