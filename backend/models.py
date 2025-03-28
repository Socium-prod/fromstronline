# models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), unique=True, nullable=False)
    lastname = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'


class History(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # References User table
    order_id = db.Column(db.String, primary_key=True)  # Merchant reference
    product_name = db.Column(db.String(100), nullable=False)
    transaction_id = db.Column(db.String(100), nullable=True)  # Initially NULL
    quantity = db.Column(db.Integer, default=1, nullable=False)  # Default quantity = 1
    price = db.Column(db.Float, nullable=False)  
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default="PENDING")  # New status column
    email = db.Column(db.String(255), nullable=False)  # ✅ ADD EMAIL FIELD

    user = db.relationship('User', backref=db.backref('histories', lazy=True))
