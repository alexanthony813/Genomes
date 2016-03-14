import requests
import flask
from flask import Flask, request, render_template, jsonify, redirect
from flask.ext.sqlalchemy import SQLAlchemy
from logging import Formatter, FileHandler
import userModel

app = Flask(__name__)
app.config.from_object('config')

@app.route('/')
def home():
  return render_template('../client/index.html')

if __name__ == '__main__':
  print 'Server has been initialized on port 5000'
  app.run(debug=True, port=5000)
