from server import db


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    profile_id = db.Column(db.Integer(), unique=True)
    picture_url_small = db.Column(db.String(255))
    picture_url_medium = db.Column(db.String(255))
    picture_url_large = db.Column(db.String(255))

    def __init__(self, email, first_name, last_name, location, profile_id, picture_url_small, picture_url_medium, picture_url_large):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.profile_id = profile_id
        self.picture_url_small = picture_url_small
        self.picture_url_medium = picture_url_medium
        self.picture_url_large = picture_url_large

db.create_all()