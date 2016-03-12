import requests
import flask
# import process
from flask import Flask, request, render_template
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config')

print app.config.get('CLIENT_ID')


@app.route('/')
def home():
  return render_template('../client/index.html')


# @app.route('/api/users/find/<id>')
# def









if __name__ == '__main__':
  print 'Server has been initialized on port 5000'
  app.run(debug=True, port=5000)
