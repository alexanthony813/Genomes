from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey, Table
from flask_sqlalchemy import SQLAlchemy
# from server import db

engine = create_engine('postgres://localhost/genome', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

print 'User model initializing...'


user_relatives = Table('user_relatives',
    Base.metadata,
    Column('user_profile_id', String(255), ForeignKey('users.profile_id')),
    Column('relative_id', Integer, ForeignKey('relatives.id'))
    )


# Relatives.user = relationship('User', secondary=user_relatives, backref=backref('dogs', lazy='dynamic'))
class Relatives(Base):
    __tablename__ = 'relatives'
    id = Column(Integer(), primary_key=True)
    email = Column(String(255), unique=True, nullable=True)
    first_name = Column(String(255), default='Anonymous')
    last_name = Column(String(255), default='')
    sex = Column(String(255))
    residence = Column(String(255), nullable=True)
    similarity = Column(Float())
    maternal_side = Column(Boolean())
    paternal_side = Column(Boolean())
    picture_url = Column(String(255), nullable=True)
    # user_id = Column(String(255), ForeignKey("users.profile_id"))
    # user_relative = relationship('User', foreign_keys='[user_id]')

    # add userId to init
    def __init__(self, email, first_name, last_name, sex, residence, similarity, maternal_side, paternal_side, picture_url):
        print 'relative created'
        # self.user_id = user_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.sex = sex
        self.residence = residence
        self.similarity = similarity
        self.maternal_side = maternal_side
        self.paternal_side = paternal_side
        self.picture_url = picture_url

class User(Base):
    __tablename__ = 'users'
    profile_id = Column(String(255), primary_key=True, unique=True)
    # id = Column(Integer(), primary_key=True)
    email = Column(String(255), unique=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    location = Column(String(255), nullable=True)
    picture_url_small = Column(String(255), nullable=True)
    picture_url_medium = Column(String(255), nullable=True)
    picture_url_large = Column(String(255), nullable=True)
    # Setting up the relationship to the relatives table and user_relatives join table
    relatives = relationship('Relatives', secondary=user_relatives, backref=backref('users', lazy='dynamic'))
    

    # reorganize the order so that profile_id is first 
    def __init__(self, profile_id, email, first_name, last_name, location, picture_url_small, picture_url_medium, picture_url_large):
        self.profile_id = profile_id
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.picture_url_small = picture_url_small
        self.picture_url_medium = picture_url_medium
        self.picture_url_large = picture_url_large
        # Will add relatives after the relative api call, should not be included in init
        # relatives = db_session.relationship('Relatives')

    def create_new_user(profile_id, email,  first_name, last_name, location, picture_url_small, picture_url_medium, picture_url_large):
        # Refactor this later to use kwargs
        # Refactor to get or create user
        new_user = User(profile_id, email, first_name, last_name, location, picture_url_small, picture_url_medium, picture_url_large)


class Snp(Base):
    __tablename__ = 'snps'
    # id = Column(Integer(), )
    rs_id = Column(String(255), primary_key=True, unique=True)
    pair_one = Column(String(255))
    pair_two = Column(String(255))
    pair_three = Column(String(255))
    pair_four = Column(String(255))
    result_one = Column(String(255))
    result_two = Column(String(255))
    result_three = Column(String(255))
    result_four = Column(String(255))

    def __init__(self, rs_id, pair_one, pair_two, pair_three, pair_four, result_one, result_two, result_three, result_four):
        self.rs_id = rs_id
        self.pair_one = pair_one
        self.pair_two = pair_two
        self.pair_three = pair_three
        self.pair_four = pair_four
        self.result_one = result_one
        self.result_two = result_two
        self.result_three = result_three
        self.result_four = result_four

Base.metadata.create_all(engine)
