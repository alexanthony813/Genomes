from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey
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
    location = Column(String(255), nullable=True)
    profile_id = Column(String(255), unique=True)
    picture_url_small = Column(String(255), nullable=True)
    picture_url_medium = Column(String(255), nullable=True)
    picture_url_large = Column(String(255), nullable=True)

    def __init__(self, email, first_name, last_name, location, profile_id, picture_url_small, picture_url_medium, picture_url_large):
        print 'user created', email
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        self.profile_id = profile_id
        self.picture_url_small = picture_url_small
        self.picture_url_medium = picture_url_medium
        self.picture_url_large = picture_url_large

    def create_new_user(email, first_name, last_name, location, profile_id, picture_url_small, picture_url_medium, picture_url_large):
        # refactor this later to use kwargs
        new_user = User(email, first_name, last_name, location, profile_id, picture_url_small, picture_url_medium, picture_url_large)


class Snp(Base):
    __tablename__ = 'snps'
    id = Column(Integer(), primary_key=True)
    rs_id = Column(String(255), unique=True)
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


    def __init__(self, email, first_name, last_name, sex, residence, similarity, maternal_side, paternal_side, picture_url):
        print 'relative created'
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.sex = sex
        self.residence = residence
        self.similarity = similarity
        self.maternal_side = maternal_side
        self.paternal_side = paternal_side
        self.picture_url = picture_url

# class User_Relatives(Base):
#     __tablename__ = 'user_relatives'
#     id = Column(Integer(), primary_key=True)
#     user_id = Column(String(255), ForeignKey("users.profile_id"))
#     relative_id = Column(Integer(), ForeignKey("relatives.id"))

#     user = relationship("Address", foreign_keys=[billing_address_id])
#     shipping_address = relationship("Address", foreign_keys=[shipping_address_id])

#     def __init__(self, user_id, relative_id):
#         print 'user_relatives created'
#         self.user_id = user_id
#         self.relative_id = relative_id

Base.metadata.create_all(engine)
