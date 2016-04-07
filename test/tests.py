from flask.ext.testing import TestCase
import unittest
import json

genotype_response = [{'rs1695': 'AG', 'rs72921001': 'AC', 'rs2472297': 'CC', 'rs1800955': 'CC', 'rs806380': 'AG', 'id': '28170b36a71d740c', 'rs1815739': 'CT', 'rs1800497': 'AG', 'rs1537415': 'CG', 'rs6152': '__', 'rs8177374': 'CT', 'rs7574865': 'GG', 'rs6025': 'CC', 'rs662799': 'AA', 'rs9939609': 'AT', 'rs4988235': 'GG', 'rs1799971': 'AG', 'rs4680': 'AA', 'rs12913832': 'GG', 'rs53576': 'GG', 'rs17822931': 'CC', 'rs909525': 'TT'}]
user_response = {'id': 'd22c07d33cf86333', 'profiles': [{'genotyped': True, 'id': '28170b36a71d740c'}], 'email': 'Jzup90@gmail.com'}
name_response = {'first_name': 'Justin', 'last_name': 'Zupnick', 'id': '28170b36a71d740c'}
relatives_response = { 'count' : 3, 'relatives': [{'last_name': 'Miller', 'match_id': '69d6b534987843b6', 'similarity': 0.0373, 'predicted_relationship_code': 29, 'updated': None, 'share_status': None, 'sex': 'Male', 'shared_segments': 17, 'birthplace': None, 'range': [], 'profile_picture_urls': None, 'intro_status': None, 'birth_year': None, 'paternal_side': False, 'added': 1437017446, 'relationship': '2nd Cousin', 'maternal_haplogroup': 'N9a3', 'user_relationship_code': None, 'first_name': 'Joel', 'ancestry': None, 'paternal_haplogroup': 'J2', 'residence': None, 'notes': None, 'family_surnames': [], 'maternal_side': False, 'family_locations': []}, {'last_name': None, 'match_id': '53a9891c1926e158', 'similarity': 0.014, 'predicted_relationship_code': 29, 'updated': None, 'share_status': None, 'sex': 'Male', 'shared_segments': 12, 'birthplace': None, 'range': [], 'profile_picture_urls': None, 'intro_status': None, 'birth_year': 1952, 'paternal_side': False, 'added': 1295900703, 'relationship': '2nd Cousin', 'maternal_haplogroup': 'K1a1b1a', 'user_relationship_code': None, 'first_name': None, 'ancestry': None, 'paternal_haplogroup': 'E1a1', 'residence': None, 'notes': None, 'family_surnames': [], 'maternal_side': False, 'family_locations': ['Satmar, Rumania', 'Ukraine', 'Hungary']}, {'last_name': 'Greplin', 'match_id': 'c15265825b7b2e06', 'similarity': 0.0137, 'predicted_relationship_code': 29, 'updated': None, 'share_status': None, 'sex': 'Male', 'shared_segments': 12, 'birthplace': None, 'range': [], 'profile_picture_urls': None, 'intro_status': None, 'birth_year': None, 'paternal_side': False, 'added': 1434196871, 'relationship': '2nd Cousin', 'maternal_haplogroup': 'H3', 'user_relationship_code': None, 'first_name': None, 'ancestry': None, 'paternal_haplogroup': 'J1e', 'residence': None, 'notes': None, 'family_surnames': [], 'maternal_side': False, 'family_locations': []}]}

#CreateNewUser will be called in server.py when a user logging in has not been found in database
def createNewUser(name_response, relatives_response, genotype_response, user_response):
    #Grab the dnaPairs at relative snps
    genome_data = genotype_response.pop()
    #Define the user's basic information
    user_first_name = name_response['first_name']
    user_last_name = name_response['last_name']
    user_id = genome_data['id']
    user_email = user_response
    relative = relatives_response['relatives'].pop()
    new_user = {'relatives' : [], 'first_name' : 'Test', 'last_name' : 'Testly', 'location' : 'San Francisco'}
    new_user['relatives'].append(relative)

    # Add the user to the database and commit it
    return new_user


class MyTest(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.testUser = createNewUser(name_response, relatives_response, genotype_response, user_response)

    def test_equal_numbers(self):
        # import controller
        relative = self.testUser['relatives'][0]
        intro_status = relative['intro_status']
        maternal_haplogroup = relative['maternal_haplogroup']
        paternal_haplogroup = relative['paternal_haplogroup']
        last_name = relative['last_name']
        match_id = relative['match_id']

        self.assertEqual(intro_status, None)
        self.assertEqual(maternal_haplogroup, 'H3')
        self.assertEqual(paternal_haplogroup, 'J1e')
        self.assertEqual(last_name, 'Greplin')
        self.assertEqual(match_id, 'c15265825b7b2e06')


if __name__ == '__main__':
    unittest.main()
