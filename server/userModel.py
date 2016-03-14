from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean
# from server import db


engine = create_engine('postgres://localhost/genome', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

print 'User model initializing...'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer(), primary_key=True)
    email = Column(String(255), unique=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    location = Column(String(255))
    profile_id = Column(Integer(), unique=True)
    picture_url_small = Column(String(255))
    picture_url_medium = Column(String(255))
    picture_url_large = Column(String(255))

    def __init__(self, email, first_name, last_name, location, profile_id, picture_url_small, picture_url_medium, picture_url_large):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.profile_id = profile_id
        self.picture_url_small = picture_url_small
        self.picture_url_medium = picture_url_medium
        self.picture_url_large = picture_url_large

Base.metadata.create_all(engine)
