"""
    startup.py

    This short script will check if the database needs initialized and initialize it if needed
    it will also start the flask app.
"""

import subprocess
import sys

print(sys.argv[1])

if sys.argv[1] == "True":
    print("Resetting the database...")
    subprocess.run(["python", "init_db.py"])
else:
    print("Using the old data...")
subprocess.run(["python", "app.py"])