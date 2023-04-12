"""
    Flask App Hello World!
"""

from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS # Adding this back in for now for development
import os

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
    data = request.get_json()
    data.update({'mood': 'Excited'})
    data.update({'color': 'red'})
    return data

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
