"""
    Sentimento Flask App Backend

    NOTE: flask_restful can be removed from the pipfile, but I dont wanna do it yet because it takes forever
"""

from flask import Flask, jsonify, request, session, redirect, g
from flask_cors import CORS # Adding this back in for now for development
import os
import psycopg2
import spacy

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
    hex_color = "#" + hex(total_color[0])[2:] + hex(total_color[1])[2:] + hex(total_color[2])[2:]
    return hex_color

def max_mood(dict):
    max_value = max(dict.values())  # maximum value
    max_keys = [k for k, v in dict.items() if v == max_value] 
    return max_keys[0]

def normalize(dict):
    total = 0
    for x in dict:
        total += dict[x]
    for x in dict:
        dict[x] = dict[x] / total
    return dict

insertQuery = '''INSERT INTO entries(
userName,
dateAndTime,
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
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

uri = os.environ.get("URI")
app = Flask(__name__)
app.secret_key = 'secret-key'
CORS(app)

def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(uri)
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def get_nlp():
    if 'nlp' not in g:
        g.nlp = spacy.load("en_textcat_goemotions")
    return g.nlp

# This ensures that a request is made when the app launches so that all the setup stuff runs immediately
def setup():
    # Connect to db
    db = get_db()

    # Check if db needs initialized
        #initialize
    
    # Setup pipeline
    get_nlp()
# Accept an incoming journal and perform nlp emotion detection on it.
@app.route('/process', methods=['POST'])
def post():

    # Process request
    data = request.get_json()
    nlp = get_nlp()
    doc = nlp(data["text"])
    journalStats = normalize(doc.cats)
    record = ["adi19", data["dateAndTime"], data["title"], data["text"], data["id"], str(max_mood(journalStats)), colorize(journalStats)]
    for x in journalStats:
        data.update({x: journalStats[x]})
        record.append(journalStats[x])
    data.update({'color': colorize(journalStats)})
    data.update({'mood': max_mood(journalStats)})

    # Connect to db
    connection = get_db()
    cur = connection.cursor()
    cur.execute(insertQuery, record)
    connection.commit()
    connection.close()

    return data

# Select all journal entries from the table
@app.route('/myNotes')
def selAll():
    # Connect to db
    connection = get_db()
    cur = connection.cursor()

    # @TODO: Just realize the count of entries is static here. It'll need changed later
    res = [{}, {}, {}, {}, {}]
    count = 0
    cur.execute("SELECT * FROM entries")
    for row in cur.fetchall():
        res[count].update({"userName": row[0]})
        res[count].update({"dateAndTime": row[1]})
        res[count].update({"title": row[2]})
        res[count].update({"content": row[3]})
        res[count].update({"id": row[4]})
        res[count].update({"mood" : row[5]})
        res[count].update({"color": row[6]})
        res[count].update({"admiration" : row[7]})
        res[count].update({"amusement": row[8]})
        res[count].update({"anger": row[9]})
        res[count].update({"annoyance": row[10]})
        res[count].update({"approval": row[11]})
        res[count].update({"caring": row[12]})
        res[count].update({"confusion": row[13]})
        res[count].update({"curiosity": row[14]})
        res[count].update({"desire": row[15]})
        res[count].update({"disappointment": row[16]})
        res[count].update({"disapproval": row[17]})
        res[count].update({"disgust": row[18]})
        res[count].update({"embarrassment": row[19]})
        res[count].update({"excitement": row[20]})
        res[count].update({"fear": row[21]})
        res[count].update({"gratitude": row[22]})
        res[count].update({"grief": row[23]})
        res[count].update({"joy": row[24]})
        res[count].update({"love": row[25]})
        res[count].update({"nervousness": row[26]})
        res[count].update({"optimism": row[27]})
        res[count].update({"pride": row[28]})
        res[count].update({"realization": row[29]})
        res[count].update({"relief": row[30]})
        res[count].update({"remorse": row[31]})
        res[count].update({"sadness": row[32]})
        res[count].update({"surprise": row[33]})
        res[count].update({"neutral": row[34]})
        count += 1
    return res

# Count how many journals are in the entries table
@app.route('/count')
def countEm():
    # Connect to db
    connection = get_db()
    cur = connection.cursor()

    cur.execute("SELECT COUNT(*) FROM entries")
    numEntries = cur.fetchone()[0]

    return str(numEntries)

@app.route('/login', methods=['POST'])
def login():
    # Get the user's email and password from the login form
    email = request.form['email']
    password = request.form['password']

    # Connect to db
    connection = get_db()
    cur = connection.cursor()

    # Query the database for a user with the provided email
    cur.execute('SELECT userName, email, password FROM users WHERE email=?', (email,))
    user = cur.fetchone()

    if user is not None:
        # Verify the user's password
        if password == user[2]:
            # Set the session ID for the user
            session['user_id'] = user[0]

            # Redirect the user to their account page
            return redirect('/account')
        else:
            # Handle incorrect password
            error = 'Incorrect password'
    else:
        # Handle unknown email address
        error = 'Email address not found'

    # Close the database connection
    conn.close()

    # Return an error message to the user
    return error

@app.route('/create_account', methods=['POST'])
def create_account():
    # Get the user's email and password from the registration form
    email = request.form['email']
    password = request.form['password']
    userid = request.form['userName']

    # Connect to db
    connection = get_db()
    cur = connection.cursor()

    # Check if the user already exists in the database
    c.execute('SELECT id FROM users WHERE email=?', (email,))
    user = c.fetchone()

    if user is not None:
        # Handle user already exists error
        error = 'A user with that email already exists'
    else:
        # Insert the new user into the database
        c.execute('INSERT INTO users (email, password, id) VALUES (?, ?)', (email, password, userid))
        conn.commit()

        # Set the session ID for the new user
        c.execute('SELECT id FROM users WHERE email=?', (email,))
        user_id = c.fetchone()[0]
        session['user_id'] = user_id

        # Redirect the user to their account page
        return redirect('/account')

    # Close the database connection
    conn.close()

    # Return an error message to the user
    return error

with app.app_context():
    setup()

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)

