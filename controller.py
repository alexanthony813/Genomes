import models

#create a demo user in the db for users without a 23andMe account
def create_demo_user():
    print 'create_demo_user'
#CreateNewUser will be called in server.py when a user logging in has not been found in database
def createNewUser(name_response, relatives_response, genotype_response, user_response):
    #Grab the dnaPairs at relative snps
    genome_data = genotype_response.json().pop()
    #Define the user's basic information
    user_first_name = name_response.json()['first_name']
    user_last_name = name_response.json()['last_name']
    user_profile_id = genome_data['id']
    user_email = user_response.json()
    #Create a new user following the Users Model
    new_user = models.User(user_profile_id, user_email['email'], user_first_name, user_last_name, None, None, None, None, genome_data)
    #iterate through list of relatives
    for relative in relatives_response.json()['relatives']:
        #Create a new relative with the information being passed from relatives_response
        new_relative = models.Relative(None, relative['first_name'], relative['last_name'], relative['sex'], relative['residence'], relative['similarity'], relative['maternal_side'], relative['paternal_side'], None)

        # Appending each relative to the user's relative property
        new_user.relatives.append(new_relative)
        models.db_session.add(new_relative)

    # Add the user to the database and commit it
    models.db_session.add(new_user)
    models.db_session.commit()


sample_snps = [
    {'rs_id':'rs12913832', 'dnaPair':'GG', 'outcome':'Makes your eyes blue'},
    {'rs_id':'rs12913832', 'dnaPair':'AA', 'outcome':'Makes your eyes brown, or less likely blue'},
    {'rs_id':'rs12913832', 'dnaPair':'AG', 'outcome':'Makes your eyes brown'},
    {'rs_id':'rs18050070', 'dnaPair':'CC', 'outcome':'Makes your hair read'},
    {'rs_id':'rs18050070', 'dnaPair':'CT', 'outcome':'Makes your hair read and increases response to anesthetics'},
    {'rs_id':'rs18050070', 'dnaPair':'TT', 'outcome':'Makes your hair read and increases response to anesthetics'},
    {'rs_id':'rs1799971', 'dnaPair':'AA', 'outcome':'Could make your children like alcohol'},
    {'rs_id':'rs1799971', 'dnaPair':'AG', 'outcome':'Responsible for your affinity for alcohol'},
    {'rs_id':'rs1799971', 'dnaPair':'GG', 'outcome':'Responsible for your affinity for alcohol'},
    {'rs_id':'rs806380', 'dnaPair':'AA', 'outcome':'Responsible for your strong predisposition for marijuana'},
    {'rs_id':'rs806380', 'dnaPair':'AG', 'outcome':'Responsible for your predisposition towards marijuana'},
    {'rs_id':'rs806380', 'dnaPair':'GG', 'outcome':'Responsible for your predisposition towards marijuana'},
    {'rs_id':'rs1800955', 'dnaPair':'CC', 'outcome':'Responsible for your tendency to novelty seek'},
    {'rs_id':'rs1800955', 'dnaPair':'CT', 'outcome':'Responsible for your tendency to novelty seek'},
    {'rs_id':'rs1800955', 'dnaPair':'TT', 'outcome':'Responsible for your tendency to novelty seek'},
    {'rs_id':'rs121908908', 'dnaPair':'CC', 'outcome':'Responsible for your low tolerance to pain'},
    {'rs_id':'rs121908908', 'dnaPair':'CG', 'outcome':'Responsible for your high tolerance to pain'},
    {'rs_id':'rs121908908', 'dnaPair':'GG', 'outcome':'Responsible for your high tolerance to pain'}
]

def createSnpsTable():
    for snp in sample_snps:
        new_snp = models.Snp(snp['rs_id'], snp['dnaPair'], snp['outcome'])
        models.db_session.add(new_snp)
        models.db_session.commit()
