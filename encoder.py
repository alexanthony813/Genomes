import jwt

def jwt_encode(pid, name, key):
    token = jwt.encode({'user_profile_id': pid,'user_first_name': name }, key, algorithm='HS256')
    return token