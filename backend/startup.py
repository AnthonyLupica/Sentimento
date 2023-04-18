"""
    startup.py

    This short script will check if the database needs initialized and initialize it if needed
    it will also start the flask app.
"""

import subprocess
import sys


if sys.argv[1] == "True":
    print("Using Sample Data...", flush=True)
    subprocess.run(["python", "init_db.py"])
else:
    print("Using Existing Data...", flush=True)
subprocess.run(["python", "app.py"])
