import requests
import flask
from flask import Flask, request, render_template, jsonify, redirect
from flask.ext.sqlalchemy import SQLAlchemy
from logging import Formatter, FileHandler
import models

app = Flask(__name__)
app.config.from_object('config')

# This is the format to retreive from config.py
# print app.config.get('CLIENT_ID')

@app.route('/')
def home():
  return render_template('../client/index.html')

@app.route('/receive_code/')
def receive_code():
    parameters = {
        'client_id': app.config.get('CLIENT_ID'),
        'client_secret': app.config.get('CLIENT_SECRET'),
        'grant_type': 'authorization_code',
        'code': request.args.get('code'),
        'redirect_uri': app.config.get('REDIRECT_URI'),
        'scope': DEFAULT_SCOPE
    }
    response = requests.post(
        "%s%s" % (BASE_API_URL, "token/"),
        data = parameters,
        verify=False
    )

    if response.status_code == 200:
        #print response.JSON
        access_token = response.json()['access_token']
        #print "Access token: %s\n" % (access_token)

        headers = {'Authorization': 'Bearer %s' % access_token}
        genotype_response = requests.get("%s%s" % (BASE_API_URL, "1/genotype/"),
                                         params = {'locations': ' '.join(SNPS)},
                                         headers=headers,
                                         verify=False)
        if genotype_response.status_code == 200:
            return flask.render_template('receive_code.html', response_json = genotype_response.json())
        else:
            reponse_text = genotype_response.text
            response.raise_for_status()
    else:
        response.raise_for_status()



if __name__ == '__main__':
  print 'Server has been initialized on port 5000'
  app.run(debug=True, port=5000)
