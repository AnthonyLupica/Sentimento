"""
    init_db.py

    Setting up the database!
"""

import sqlite3
import spacy
from nanoid import generate

nlp = spacy.load("en_textcat_goemotions")

"""
This function colorize() serves the dubious purpose of converting the information provided by GoEmotions into a single color

GoEmotions computes a normalized distribution of scores across 28 feeling words based on 
the prominence of that feeling in the input text. 
    Each emotive word is assigned a static color
    their score is used as a weight applied to the RGB elements of the assigned color
    all the weighted colors are summed to compute a total
"""
def colorize(dict):

    total_color = [0, 0, 0]

    # admiration ( PINK [ 255, 192, 203 ] )
    total_color[0] += dict["admiration"] * 255  # R
    total_color[1] += dict["admiration"] * 192  # G
    total_color[2] += dict["admiration"] * 203  # B

    # amusement ( ORANGE SHERBERT [ 249, 203, 156 ] )
    total_color[0] += dict["amusement"] * 249  # R
    total_color[1] += dict["amusement"] * 203  # G
    total_color[2] += dict["amusement"] * 156  # B

    # anger ( RED [ 227, 71, 71 ] )
    total_color[0] += dict["anger"] * 227  # R
    total_color[1] += dict["anger"] * 71   # G
    total_color[2] += dict["anger"] * 71   # B

    # annoyance ( PANTONE 448 C [ 74, 65, 42 ] )
    total_color[0] += dict["annoyance"] * 74   # R
    total_color[1] += dict["annoyance"] * 65   # G
    total_color[2] += dict["annoyance"] * 42   # B

    # approval ( CORRECT GREEN [ 81, 216, 125 ] )
    total_color[0] += dict["approval"] * 81   # R
    total_color[1] += dict["approval"] * 216  # G
    total_color[2] += dict["approval"] * 125  # B

    # caring ( DEEP PINK [ 252, 96, 222 ] )
    total_color[0] += dict["caring"] * 252  # R
    total_color[1] += dict["caring"] * 96   # G
    total_color[2] += dict["caring"] * 222  # B

    # confusion ( BLUEISH PURPLE [ 124, 62, 184 ] )
    total_color[0] += dict["confusion"] * 124  # R
    total_color[1] += dict["confusion"] * 62   # G
    total_color[2] += dict["confusion"] * 184  # B

    # curiosity ( ORANGE BANANA [ 255, 189, 64 ] )
    total_color[0] += dict["curiosity"] * 255  # R
    total_color[1] += dict["curiosity"] * 189  # G
    total_color[2] += dict["curiosity"] * 64   # B

    # desire ( FLIRTATIOUS PINK [ 211, 53, 111 ] )
    total_color[0] += dict["desire"] * 211  # R
    total_color[1] += dict["desire"] * 53   # G
    total_color[2] += dict["desire"] * 111  # B

    # disappointment ( DEEP SLATE BLUE [ 65, 99, 129 ] )
    total_color[0] += dict["disappointment"] * 124  # R
    total_color[1] += dict["disappointment"] * 62   # G
    total_color[2] += dict["disappointment"] * 184  # B

    # disapproval ( LIGHT INDIGO [ 150, 127, 192 ] )
    total_color[0] += dict["disapproval"] * 124  # R
    total_color[1] += dict["disapproval"] * 62   # G
    total_color[2] += dict["disapproval"] * 184  # B

    # disgust ( DIARRHEA [ 137, 152, 40 ] )
    total_color[0] += dict["disgust"] * 137  # R
    total_color[1] += dict["disgust"] * 152  # G
    total_color[2] += dict["disgust"] * 40   # B


    # embarrassment ( BLUSH [ 255, 132, 132 ] )
    total_color[0] += dict["embarrassment"] * 137  # R
    total_color[1] += dict["embarrassment"] * 152  # G
    total_color[2] += dict["embarrassment"] * 40   # B

    # excitement ( ORANGE [ 247, 126, 0 ] )
    total_color[0] += dict["excitement"] * 247  # R
    total_color[1] += dict["excitement"] * 126  # G
    total_color[2] += dict["excitement"] * 0    # B

    # fear ( COLD PURPLE [ 32, 18, 77 ] )
    total_color[0] += dict["fear"] * 32   # R
    total_color[1] += dict["fear"] * 18   # G
    total_color[2] += dict["fear"] * 77   # B

    # gratitude ( GOLD [ 192, 152, 34 ] )
    total_color[0] += dict["gratitude"] * 192  # R
    total_color[1] += dict["gratitude"] * 152  # G
    total_color[2] += dict["gratitude"] * 34   # B

    # grief ( BLACK BUT BLUE [ 21, 45, 43 ] )
    total_color[0] += dict["grief"] * 21   # R
    total_color[1] += dict["grief"] * 45   # G
    total_color[2] += dict["grief"] * 43   # B

    # joy ( AMY POLLOCK YELLOW [ 255, 247, 62 ])
    total_color[0] += dict["joy"] * 255  # R
    total_color[1] += dict["joy"] * 247  # G
    total_color[2] += dict["joy"] * 62   # B

    # love ( LOVE [ 255, 131, 153 ] )
    total_color[0] += dict["love"] * 255  # R
    total_color[1] += dict["love"] * 131  # G
    total_color[2] += dict["love"] * 153  # B

    # nervousness (FLUSH BUT GRAY - [ 157, 138, 138 ] )
    total_color[0] += dict["nervousness"] * 157  # R
    total_color[1] += dict["nervousness"] * 138  # G
    total_color[2] += dict["nervousness"] * 138  # B

    # optimism ( YELLOW [ 246, 200, 59 ] )
    total_color[0] += dict["optimism"] * 246  # R
    total_color[1] += dict["optimism"] * 200  # G
    total_color[2] += dict["optimism"] * 59   # B

    # pride ( BLOND [ 198, 168, 74 ] )
    total_color[0] += dict["pride"] * 198  # R
    total_color[1] += dict["pride"] * 168  # G
    total_color[2] += dict["pride"] * 74   # B

    # realization ( LIGHTEST GREEN [ 219, 238, 225 ] )
    total_color[0] += dict["realization"] * 219  # R
    total_color[1] += dict["realization"] * 238  # G
    total_color[2] += dict["realization"] * 225  # B

    # relief ( SAGE GREEN [ 182, 215, 168 ] )
    total_color[0] += dict["relief"] * 182  # R
    total_color[1] += dict["relief"] * 215  # G
    total_color[2] += dict["relief"] * 168  # B

    # remorse ( DIETARY RESTRICTION PURPLE [ 35, 19, 92 ] )
    total_color[0] += dict["remorse"] * 35   # R
    total_color[1] += dict["remorse"] * 19   # G
    total_color[2] += dict["remorse"] * 92   # B

    # sadness ( BLUE [ 17, 122, 201 ] )
    total_color[0] += dict["sadness"] * 17   # R
    total_color[1] += dict["sadness"] * 122  # G
    total_color[2] += dict["sadness"] * 201  # B
    
    # surprise ( BANANA [ 250, 255, 144 ] )
    total_color[0] += dict["surprise"] * 250  # R
    total_color[1] += dict["surprise"] * 255  # G
    total_color[2] += dict["surprise"] * 144  # B

    # neutral ( GRAY [ 125, 125, 125 ] )
    total_color[0] += dict["neutral"] * 125  # R
    total_color[1] += dict["neutral"] * 125  # G
    total_color[2] += dict["neutral"] * 125  # B

    # Convert total_color to hex code
    total_color[0] = int(round(total_color[0]))
    total_color[1] = int(round(total_color[1]))
    total_color[2] = int(round(total_color[2]))
    hex_color = hex(total_color[0])[2:] + hex(total_color[1])[2:] + hex(total_color[2])[2:]
    return hex_color

def max_mood(dict):
    max_value = max(dict.values())  # maximum value
    max_keys = [k for k, v in dict.items() if v == max_value] 
    return max_keys

def normalize(dict):
    total = 0
    for x in dict:
        total += dict[x]
    for x in dict:
        dict[x] = dict[x] / total
    return dict

insertQuery = '''INSERT INTO entries(
    userName,
    created,
    title,
    content, 
    id,
    mood, 
    color,
    admiration, 
    amusement, 
    anger, 
    annoyance, 
    approval, 
    caring, 
    confusion, 
    curiosity, 
    desire, 
    disappointment, 
    disapproval, 
    disgust, 
    embarrassment, 
    excitement, 
    fear, 
    gratitude,
    grief, 
    joy, 
    love, 
    nervousness, 
    optimism, 
    pride, 
    realization, 
    relief, 
    remorse, 
    sadness, 
    surprise,
    neutral) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

def addTestData():
    print("Processing Sample journals and adding them to the database...")
    files = ['journals/Band Practice.txt', 'journals/Graduating.txt', 'journals/Leaving Home.txt', 'journals/Mad At My Boss.txt', 'journals/Studying.txt']
    for x in files:
        f = open(x, 'r')
        journal = f.read()
        f.close()

        doc = nlp(journal)
        journalStats = normalize(doc.cats)
        record = ['adi19', '11/16/2001', x[:-4], journal, generate(), str(max_mood(doc.cats)), colorize(doc.cats)]
        for x in journalStats:
            record.append(journalStats[x])
        cur.execute(insertQuery, record)
        print ("    Added {x[:-4]}")
    print("All done!")

connection = sqlite3.connect('database.db')
cur = connection.cursor()

# Users Table
cur.execute('DROP TABLE IF EXISTS users')

cur.execute('''CREATE TABLE users (
    userName TEXT PRIMARY KEY,
    password TEXT NOT NULL
)''')

# Entries Table
cur.execute('DROP TABLE IF EXISTS entries;')

cur.execute('''CREATE TABLE entries (
    userName TEXT, 
    created TEXT, 
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
    PRIMARY KEY (userName, created),
    FOREIGN KEY(userName) REFERENCES users(userName)
)''')


# Test Data
cur.execute('''INSERT INTO users (userName, password)
            VALUES ('adi19', '123');
        ''')
cur.execute('''INSERT INTO users (userName, password)
            VALUES ('arl127', '123');
        ''')
cur.execute("SELECT * FROM users")

# entry test data
# record = ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]

addTestData()

connection.commit()
connection.close()
