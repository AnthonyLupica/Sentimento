"""
    Flask App Hello World!
"""

from flask import Flask, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment

# More API-related stuff I'm learning about
class HelloApiHandler(Resource):
  def get(self):
    my_array = [
        {
            'id': 1,
            'mood': "Fearful",
            'title': "Progress on Sentimento",
            'entry': "Progress is happening, but i'm hoping we'll have enough to get everything working in time",
            'time': "7:00pm",
            'date': "1/31/23",
            'color': "purple"
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

app = Flask(__name__, static_url_path='', static_folder='templates')
CORS(app) #comment this on deployment
api = Api(app)
api.add_resource(HelloApiHandler, '/flask/hello')

# The default page haha
@app.route('/')
def index():
    return "<h1>Hello World!</h1>"

# So this uses api stuff that I still don't understand well yet so I'm gonna test without it for now
# Doesn't work right now
"""
@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')
"""

# This route will eventually be associated with the frontend journal writing page
@app.route('/templates/<path:name>')
def journal_entry(name):
    return send_from_directory(app.static_folder, name)
