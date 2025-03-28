# import os

# class config:
#     SECRET_KEY = os.getenv('SECRET_KEY', 'ABDI2156')
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'  # SQLite database for simplicity
#     SQLALCHEMY_TRACK_MODIFICATIONS = False


# config.py

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'ABDI215634')
    # SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:abdi2156@online-store.c9gomek04ine.us-east-1.rds.amazonaws.com/onlinestore')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:123456@localhost/onlinestore')
    SQLALCHEMY_TRACK_MODIFICATIONS = False