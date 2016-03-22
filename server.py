import requests
import flask
from flask import Flask, request, render_template, jsonify, redirect, url_for, make_response
from flask.ext.sqlalchemy import SQLAlchemy
from logging import Formatter, FileHandler
import models
import controller
from os import path
import models


#Initialize Flask application
app = Flask(__name__)
PORT = 5000

#Gather data from config.py
app.config.from_object('config')

#Declaration of all necessary variables needed to perform 23AndMe API Call
# API_SERVER = "api.23andme.com"
BASE_CLIENT_URL = 'http://localhost:%s/'% PORT
DEFAULT_REDIRECT_URI = '%sreceive_code/'  % BASE_CLIENT_URL
CLIENT_ID = app.config.get('CLIENT_ID')
CLIENT_SECRET = app.config.get('CLIENT_SECRET')
REDIRECT_URI = app.config.get('REDIRECT_URI')
SNPS = ['rs12913832', 'rs1799971', 'rs1800955', 'rs806380']
DEFAULT_SCOPE = 'names basic email ancestry relatives %s' % (' '.join(SNPS))
BASE_API_URL = 'https://api.23andme.com/'


@app.route('/')
def home():
    auth_url = '%sauthorize/?response_type=code&redirect_uri=%s&client_id=%s&scope=%s' % (BASE_API_URL, REDIRECT_URI, CLIENT_ID, DEFAULT_SCOPE)
    return render_template('landing.html', auth_url=auth_url)

@app.route('/get_info/')
def getUser():
    response = make_response(render_template('index.html'))
    response.set_cookie('user_profile_id', request.cookies.get('user_profile_id'))
    return response


#Refactor this route to take a userProfileID after the trailing slash with some syntax like: '<%s UserID >''
#i.e. the equivalent of '/:userId' with node/express servers
@app.route('/api/relatives/')
#return all the relatives. Refactor to only return the relatives specific to the current User
def getRelatives():
    #filter this by userID
    user_profile_id = request.cookies.get('user_profile_id')
    user_relatives = models.db_session.query(models.user_relatives).all()
    user_relatives_ids = []

    for user_relative in user_relatives:
        user = list(user_relative)
        _id = int(y[1])
        user_relatives_ids.append(_id)

    relatives = models.db_session.query(models.Relative).all()
    finalRelatives = []

    for relative in relatives:
        if relative.serialize()['id'] in user_relatives_ids:
            finalRelatives.append(relative.serialize())

    # The return value requires dictionary rather than list format
    return jsonify({'relativeList' : finalRelatives})
    #  look into database, query for user information then return response with all of user's data


@app.route('/api/getsnps', methods=['POST', 'GET'])
def getSnps():
    snps = models.db_session.query(models.Snp).all()
    return jsonify({'snps': snps})


@app.route('/receive_code/')
def receive_code():
    print 'receive_code is being called'
    parameters = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': request.args.get('code'),
        'redirect_uri': REDIRECT_URI,
        'scope': DEFAULT_SCOPE
    }
    response = requests.post(
        "%s%s" % (BASE_API_URL, "token/"),
        data = parameters,
        verify=False
    )

    #get access token from 23andMe
    if response.status_code == 200:
        access_token = response.json()['access_token']
        headers = {'Authorization': 'Bearer %s' % access_token}

        #Begin API calls to 23andMe to get all scoped user data
        genotype_response = requests.get("%s%s" % (BASE_API_URL, "1/genotype/"),
                                         params = {'locations': ' '.join(SNPS)},
                                         headers=headers,
                                         verify=False)
        user_profile_id = genotype_response.json().pop()['id']
        user_response = requests.get("%s%s" % (BASE_API_URL, "1/user/?email=true"),
                                         headers=headers,
                                         verify=False)
        name_response = requests.get("%s%s" % (BASE_API_URL, "1/names/%s" % user_profile_id),
                                         headers=headers,
                                         verify=False)
        
        #if both API calls are successful, process user data
        if user_response.status_code == 200 and genotype_response.status_code == 200:
            user_first_name = name_response.json()['first_name']
            #if user already exists in database, render the html and do not re-add user to database
            if len(models.db_session.query(models.User).filter_by(profile_id=user_profile_id).all()) != 0:
                # return flask.render_template('main.html', response_json = genotype_response.json())
                resp = make_response(redirect(url_for('getUser')))
                resp.set_cookie('user_profile_id', user_profile_id)
                resp.set_cookie('user_first_name', user_first_name)
                return resp
            # otherwise, add new user to database if they have never logged in before
            else:
                #Begin API calls to 23andMe to get additional user data
                relatives_response = requests.get("%s%s" % (BASE_API_URL, "1/relatives/%s" % user_profile_id),
                                                   params = {'limit': 20, 'offset': 1},
                                                   headers=headers,
                                                   verify=False)
                #call createNewUser from controller to add User and User relatives to the database
                controller.createNewUser(name_response, relatives_response, genotype_response, user_response)
                #create snps table
                controller.createSnpsTable()
                # EDIT HEADERS/COOKIES ON THE 302???
                resp = make_response(redirect(url_for('getUser')))
                resp.set_cookie('user_profile_id', user_profile_id)
                resp.set_cookie('user_first_name', user_first_name)
                return resp
        #error handling if api calls for additional user data to 23andMe fail
        else:
            reponse_text = genotype_response.text
            response.raise_for_status()
    #error handling if initial api calls to 23andMe fail
    else:
        response.raise_for_status()


#Initialize python server on port
if __name__ == '__main__':
  print 'Server has been initialized'
  app.run(debug=True, port=PORT)
