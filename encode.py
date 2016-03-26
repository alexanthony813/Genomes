import jwt

def jwt_encode(pid, name, key):
    jwt.encode({'user_profile_id': pid,'user_first_name': name }, key, algorithm='HS256')

    


def jwt_decode():