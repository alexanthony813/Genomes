import requests
import flask
# import process
from flask import Flask, request, render_template, jsonify, redirect
from flask.ext.sqlalchemy import SQLAlchemy
from logging import Formatter, FileHandler
# from userModel import User

app = Flask(__name__)
app.config.from_object('config')

db_conn = "postgres://localhost/genome"
app.config['SQLALCHEMY_DATABASE_URI'] = db_conn

db = SQLAlchemy(app)
db.create_all()
 

@app.route('/')
def home():
  return render_template('../client/index.html')

if __name__ == '__main__':
  print 'Server has been initialized on port 5000'
  app.run(debug=True, port=5000)
