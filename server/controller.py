import models

def createNewUser(name_response, relatives_response, genotype_response, user_response):
    #To Do: Grab the dnaPair for each SNP out of the user_data param and insert it into approproate column in user model
    user_data = genotype_response.json().pop()
    user_first_name = name_response.json()['first_name']
    user_last_name = name_response.json()['last_name']
    user_profile_id = user_data['id']
    user_email = user_response.json()
    new_user = models.User(user_profile_id, user_email['email'], user_first_name, user_last_name, None, None, None, None, None)
    #iterate through list of relatives
    for relative in relatives_response.json()['relatives']:
        new_relative = models.Relative(None, relative['first_name'], relative['last_name'], relative['sex'], relative['residence'], relative['similarity'], relative['maternal_side'], relative['paternal_side'], None)

        # Appending each relative to the user's relative property
        new_user.relatives.append(new_relative)
        models.db_session.add(new_relative)

    # Add the user to the database and commit it
    models.db_session.add(new_user)
    models.db_session.commit()
