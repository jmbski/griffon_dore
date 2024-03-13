import json, os
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from datetime import datetime


# creating the Flask application
app = Flask(__name__)
CORS(app, resources={r"/services/*": {"origins": "*"}})



@app.route("/services/test")
def test_data():
    print('test data')
    return Response('test', status=200, mimetype='application/json')
