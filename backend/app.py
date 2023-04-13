"""
    Sentimento Flask App Backend
"""

from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS # Adding this back in for now for development
import os
import sqlite3
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
    total_color[0] += dict["disappointment"] * 65   # R
    total_color[1] += dict["disappointment"] * 99   # G
    total_color[2] += dict["disappointment"] * 129  # B

    # disapproval ( LIGHT INDIGO [ 150, 127, 192 ] )
    total_color[0] += dict["disapproval"] * 150  # R
    total_color[1] += dict["disapproval"] * 127  # G
    total_color[2] += dict["disapproval"] * 192  # B

    # disgust ( DIARRHEA [ 137, 152, 40 ] )
    total_color[0] += dict["disgust"] * 137  # R
    total_color[1] += dict["disgust"] * 152  # G
    total_color[2] += dict["disgust"] * 40   # B

    # embarrassment ( BLUSH [ 255, 132, 132 ] )
    total_color[0] += dict["embarrassment"] * 255  # R
    total_color[1] += dict["embarrassment"] * 132  # G
    total_color[2] += dict["embarrassment"] * 132  # B

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

    # joy ( AMY POLLOCK YELLOW [ 255, 247, 62 ] )
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

class HelloApiHandler(Resource):
  def get(self):
    my_array = [
        {
            'id': 1,
            'title': "Progress on Sentimento",
            'mood': "Fearful",
            'text': "Progress is happening, but i'm hoping we'll have enough to get everything working in time",
            'dateAndTime': "1/31/23 | 7:00PM",
            'color': "salmon"
        },
        {
            'id': 2,
            'title': "Success",
            'mood': "Joyous",
            'text': "I cannot believe this came from the backend! We are so excited",
            'dateAndTime': "1/31/23 | 7:00PM",
            'color': "gold"
        }
    ]
    return jsonify(my_array)

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_type = args['type']
    request_json = args['message']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret

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
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

app = Flask(__name__)
CORS(app)
api = Api(app)
api.add_resource(HelloApiHandler, '/flask/hello')

# The default page haha
@app.route('/')
def index():
    return "<h1>Hello World!</h1>"

# Simple post request
@app.route('/test', methods=['POST'])
def post():
    # Connect to db
    connection = sqlite3.connect('database.db')
    cur = connection.cursor()

    # Process request
    data = request.get_json()
    nlp = spacy.load("en_textcat_goemotions")
    doc = nlp(data["text"])
    journalStats = normalize(doc.cats)
    record = ["adi19", data["dateAndTime"], data["title"], data["text"], data["id"], str(max_mood(journalStats)), colorize(journalStats)]
    for x in journalStats:
        data.update({x: journalStats[x]})
        record.append(journalStats[x])
    data.update({'color': colorize(journalStats)})
    data.update({'mood': max_mood(journalStats)})

    # db-ing
    # cur.execute(insertQuery, record)
    connection.commit()
    connection.close()

    return data

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
