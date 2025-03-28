# app.py
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from models import db, User, History
from config import Config
import os
import random
import requests
from flask import Flask
from flask_mailman import Mail

from werkzeug.security import generate_password_hash, check_password_hash



# Routes
from payment_routes import payment_bp
# Register blue prints

application = Flask(__name__)
CORS(application) 
application.config.from_object(Config)

application.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Your mail server
application.config['MAIL_PORT'] = 587
application.config['MAIL_USERNAME'] = "sociumpatners@gmail.com"  # Environment variable
application.config['MAIL_PASSWORD'] = "bvwu mwvy dsty tqeh"
application.config['MAIL_USE_TLS'] = True
application.config['MAIL_USE_SSL'] = False

mail = Mail(app=application)


application.register_blueprint(payment_bp, url_prefix='/api')

# Initialize extensions
db.init_app(application)
jwt = JWTManager(application)

# Create the database tables
with application.app_context():
    db.create_all()


# Route for user registration
@application.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    firstname = data.get('firstname')
    lastname = data.get("lastname")
    email = data.get('email')
    password = data.get('password')


    if not firstname or not lastname or not email or not password:
        return jsonify({'message': 'Missing required fields', "status": 400}), 400

    # Check if the user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered', "status": 409}), 409
    
    hashed_password = generate_password_hash(password=password, salt_length=16)

    # Create a new user
    new_user = User(firstname=firstname, lastname=lastname, email=email, password=hashed_password)  # Note: Password should be hashed in production
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'status': 201}), 201

# Route for user login
@application.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):  # Note: Use password hashing in production
        print("Invalid Email")
        return jsonify({'message': 'Invalid credentials'}), 401

    # Generate an access token
    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token, 'firstname': user.firstname, 'lastname': user.lastname, 'id': user.id, 'email':user.email}), 200



# Protected route (requires authentication)

# List of products# In-memory product list (instead of using a database)
products = [
    {
        "id": 2,
        "name": "Retro Leather Couch",
        "description": "A 2-seater orange leather sofa for modern or vintage aesthetics.",
        "price": 25.00,
        "stock": 8,
        "image_url": "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
        "category_name": "Furniture",
        "category_description": "Luxury and comfortable sofas for every home."
    },
    {
        "id": 3,
        "name": "Handwoven Storage Basket",
        "description": "A stylish wicker basket for storage or decoration.",
        "price": 50.99,
        "stock": 20,
        "image_url": "https://images.pexels.com/photos/8581040/pexels-photo-8581040.jpeg",
        "category_name": "Home Decor",
        "category_description": "Decorative and functional home accessories."
    },
    {
        "id": 4,
        "name": "Executive Office Desk Set",
        "description": "A modern office furniture set featuring ergonomic design.",
        "price": 100.00,
        "stock": 5,
        "image_url": "https://images.pexels.com/photos/7534232/pexels-photo-7534232.jpeg",
        "category_name": "Furniture",
        "category_description": "High-end office furniture for productivity."
    },
    {
        "id": 5,
        "name": "Scandinavian Dining Table",
        "description": "A clean white table with matching chairs for minimalist interiors.",
        "price": 1029,
        "stock": 12,
        "image_url": "https://images.pexels.com/photos/8453800/pexels-photo-8453800.jpeg",
        "category_name": "Furniture",
        "category_description": "Elegant dining furniture for modern homes."
    },
    {
        "id": 6,
        "name": "Glass Pendant Light",
        "description": "A modern glass pendant lamp for warm and cozy lighting.",
        "price": 790.99,
        "stock": 15,
        "image_url": "https://images.pexels.com/photos/3393435/pexels-photo-3393435.jpeg",
        "category_name": "Lighting",
        "category_description": "Beautiful lighting solutions for every room."
    },
    {
        "id": 7,
        "name": "Classic Brass Chandelier",
        "description": "A white and brass chandelier for luxury interior aesthetics.",
        "price": 1090.99,
        "stock": 6,
        "image_url": "https://images.pexels.com/photos/1901200/pexels-photo-1901200.jpeg",
        "category_name": "Lighting",
        "category_description": "Classic chandeliers for a touch of elegance."
    },
    {
        "id": 8,
        "name": "Vintage Crystal Chandelier",
        "description": "A grayscale-style crystal chandelier, perfect for classical decor.",
        "price": 1190.99,
        "stock": 4,
        "image_url": "https://images.pexels.com/photos/412389/pexels-photo-412389.jpeg",
        "category_name": "Lighting",
        "category_description": "Vintage-style chandeliers for timeless elegance."
    },
    {
        "id": 9,
        "name": "Home Decor Sofas",
        "description": "A complete home setup package featuring sofas, tables, and lighting.",
        "price": 1099.99,
        "stock": 2,
        "image_url": "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg",
        "category_name": "Bundle",
        "category_description": "Curated home decor sets for a stylish interior."
    },
    {
        "id": 10,
        "name": "Wooden Bar Counter Table",
        "description": "A sleek black wooden bar counter, perfect for modern bar settings.",
        "price": 1099.99,
        "stock": 5,
        "image_url": "https://tse2.mm.bing.net/th?id=OIP.kJfPWzP0dBajarkGZiJUSAHaJ4&pid=Api",
        "category_name": "Furniture",
        "category_description": "Stylish and modern furniture for bar and restaurant settings."
    },
    {
        "id": 11,
        "name": "Leather Bar Stools",
        "description": "Stylish black leather bar stools, offering comfort and elegance for any bar or kitchen counter.",
        "price": 1139.99,
        "stock": 10,
        "image_url": "https://tse3.mm.bing.net/th?id=OIP.wEfq1HO6z0daZpvBw5_g9AHaHa&pid=Api",
        "category_name": "Furniture",
        "category_description": "Comfortable and chic stools for modern interior designs."
    },
    {
        "id": 12,
        "name": "Fast Food Restaurant Interior Tables - Softs",
        "description": "An elegant and modern interior design concept for fast food restaurants, combining style with functionality.",
        "price": 1299.99,
        "stock": 3,
        "image_url": "https://tse2.mm.bing.net/th?id=OIP.4QNKQa16J1WzvTyEe9fmSwHaFH&pid=Api",
        "category_name": "Interior Design",
        "category_description": "Creating the perfect ambiance for fast food dining with modern design elements."
    },
    {
        "id": 13,
        "name": "Coffee Shop Bar Counter & Stools",
        "description": "A cozy coffee shop setup with a stylish bar counter and stools, designed for casual dining and socializing.",
        "price": 1299,
        "stock": 7,
        "image_url": "https://tse2.mm.bing.net/th?id=OIP.n9QftxChHe6P7eVpzzSCNAHaHa&pid=Api",
        "category_name": "Furniture",
        "category_description": "Perfect for cafes and casual spaces where comfort and style meet."
    }
]


@application.route('/products')
def get_products():
    return jsonify(products)


@application.route('/products/<int:id>', methods=['GET'])  # Correct syntax for dynamic URL parameters
def get_product_with_id(id):
    print(id)
    product = next((item for item in products if item['id'] == id), None) # Safely retrieve the product by ID
    if product:
        return jsonify(product), 200  # Return the product as JSON
    else:
        return jsonify({"message": "Product not found"}), 404  # Return a 404 error if the product doesn't exist





# Replace with your Pesapal Sandbox credentials
PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
PESAPAL_API_BASE = "https://cybqa.pesapal.com/pesapalv3/"


def get_access_token():
    url = f"{PESAPAL_API_BASE}api/Auth/RequestToken"
    headers = {"Content-Type": "application/json"}
    payload = {
        "consumer_key": PESAPAL_CONSUMER_KEY,
        "consumer_secret": PESAPAL_CONSUMER_SECRET
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()

    if "token" in response_data:
        return response_data["token"]
    else:
        raise Exception("Failed to get Pesapal access token")



@application.route('/api/orders', methods=['GET'])
def get_orders():
    orders = History.query.all()
    orders_data = [
        {
            'order_id': order.order_id,
            'product_name': order.product_name,
            'transaction_id': order.transaction_id,
            'price': order.price,
            'quantity': order.quantity,
            'purchase_date': order.purchase_date
        }
        for order in orders
    ]
    return jsonify(orders_data)


@application.route('/api/customers', methods=['GET'])
def get_customers():
    customers = User.query.all()
    customers_data = [
        {'id': customer.id, 'firstname': customer.firstname, 'lastname': customer.lastname, 'email': customer.email}
        for customer in customers
    ]
    return jsonify(customers_data)


@application.route('/history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    print(user_id)
    # Fetch user by user_id
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Fetch all purchase histories related to the user
    histories = History.query.filter_by(user_id=user_id).all()

    # Prepare the history data to return in JSON format
    history_list = [
        {
            "id": history.order_id,
            "product_name": history.product_name,
            "transaction_id": history.transaction_id,
            "price": history.price,
            "quantity": history.quantity,
            "purchase_date": history.purchase_date.strftime('%Y-%m-%d %H')
        }
        for history in histories
    ]
    
    # Return the purchase history list as JSON
    print(history_list)
    return jsonify(history_list), 200





if __name__ == "__main__":
    application.run(debug=True)