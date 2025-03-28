from flask import Flask, request, jsonify, redirect, url_for, Blueprint
from flask_mailman import EmailMessage  # Correct email class for flask-mailman
import requests
import os
from datetime import datetime
# from flask_mail import Mail, Message
from models import History, db
from zoneinfo import ZoneInfo

payment_bp = Blueprint('payment', __name__)



# Getting access token
def get_access_token():
    # url = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"
    url = "https://pay.pesapal.com/v3/api/Auth/RequestToken"

    headers= {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

        # "consumer_key": "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
        # "consumer_secret": "osGQ364R49cXKeOYSpaOnT++rHs="



        #"consumer_key": "OYD0KTgXQJ2rhzb3V22ks6windbbRMHq",
        #"consumer_secret": "ZKAbmQXHmf7iHNplcYw0pGyPCC8="

    payload = {
        "consumer_key": "OYD0KTgXQJ2rhzb3V22ks6windbbRMHq",
        "consumer_secret": "ZKAbmQXHmf7iHNplcYw0pGyPCC8="
    }

    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()
    print("Access token", response_data)
    if "token" in response_data:
        return response_data["token"]
    else:
        return None


@payment_bp.route('/payment-process', methods=['POST'])
def process_payment():
    token = get_access_token()
    print("Token from Payment initiation", token)
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {token}"
    }


    # url = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest"
    url = "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest"


    try:
        data = request.json  # Extract data from request
        if not data:
            return jsonify({"error": "No data received"}), 400

        # print("Received Data:", data)

        payload = {
            "id": data.get("reference"),  # Fix incorrect key
            "amount": data.get("totalPrice"),  # Default to 0 if amount is missing
            "currency": "USD",
            "description": f"Payments for booking suites",
            "callback_url": f"https://www.oaksloom.com/payment-status",
            "notification_id": "aa72af3f-d294-4cb5-aca7-dc080fa82b47",
            # "callback_url": CALLBACK_URL,
            # "notification_id": "90456f7b-db1e-42b3-88aa-dc2cc47994b3",
            "billing_address": {
                "email": data.get("email"),
                # "first_name": data.get("firstname", ""),
                # "last_name": data.get("lastname", "")
            }
        }

        transaction_id = None
        new_history = History(
            user_id=data.get("id"),
            order_id=data.get("reference"),
            product_name=data.get("productName"),
            transaction_id=transaction_id,  # Set as NULL
            quantity=data.get("quantity", 1),
            price=data.get("totalPrice"),
            email=data.get("email"),
            status="pending"  # Set status as "pending"
        )


        db.session.add(new_history)
        db.session.commit()


        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()
        print("Response from intitaltion Route, __________  ", response_data)
        if response.status_code == 200:
            print("Succes from inititation payment")
            return jsonify(response_data)
        else:
            return jsonify({"error": "Payment request failed", "details": response_data}), response.status_code


    except Exception as e:
        print("Error processing request:", str(e))
        return jsonify({"error": str(e)}), 500
    


@payment_bp.route('/check-payment-status/<order_tracking_id>', methods=['GET'])
def check_payment_status(order_tracking_id):
    from app import mail
    if not order_tracking_id:
        return jsonify({"error": "Missing OrderTrackingId"}), 400

    token = get_access_token()
    print("Token from Initiate", token)
    # url = f"https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId={order_tracking_id}"
    url = f"https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId={order_tracking_id}"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(url, headers=headers)
    payment_status = response.json()

    print("Payment Status Response:", payment_status)

    # Extract relevant fields
    status = payment_status.get("payment_status_description")
    confirmation_code = payment_status.get("confirmation_code")
    merchant_reference = payment_status.get("merchant_reference")

    # Ensure all required values are present
    if status and merchant_reference:
        history_entry = History.query.filter_by(order_id=merchant_reference).first()

        if history_entry:
            history_entry.status = status  # Update status (e.g., "Completed", "Failed")
            if status == "Completed" and confirmation_code:
                history_entry.transaction_id = confirmation_code  # Store the confirmation code
            db.session.commit()
            order_details = {
                "reference": merchant_reference,
                "productName": history_entry.product_name,
                "quantity": history_entry.quantity,
                "amount": history_entry.price,
                "status": status,
                "confirmation_code": confirmation_code
            }
            # "updyphatah02@gmail.com", "abdirahmanstrow@gmail.com",
            send_payment_email("updyphatah02@gmail.com", "abdirahmanstrow@gmail.com", order_details)

            print(f"Updated history entry for order {merchant_reference} with status {status}")

    return jsonify(payment_status)


def send_payment_email(admin_2, admin_3, order_details):
    from flask_mailman import EmailMessage


    subject = f"🎉 Payment Confirmation - Order #{order_details['reference']}"

    message_body = f"""
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #ea9bdb;
                padding: 20px;
            }}
            .email-container {{
                max-width: 600px;
                background-color: #d6f5e0;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }}
            .header {{
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #0a7f52;
                padding-bottom: 10px;
                border-bottom: 2px solid #f1f1f1;
            }}
            .content {{
                margin-top: 20px;
                color: #555;
                line-height: 1.6;
            }}
            .details {{
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;
            }}
            .footer {{
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                color: #777;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                Payment Confirmation  
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for your payment! Here are your order details:</p>

                <div class="details">
                    <p><strong>Order Reference:</strong> {order_details['reference']}</p>
                    <p><strong>Total Price:</strong> ${order_details['amount']}</p>
                    <p><strong>Payment Status:</strong> {order_details['status']}</p>
                    <p><strong>Confirmation Code:</strong> {order_details.get('confirmation_code', 'N/A')}</p>
                </div>

                <p>We appreciate your business! If you have any questions, feel free to reach out.</p>
            </div>
            <div class="footer">
                Best Regards, <br>
                <strong>Tembo Suites</strong>
            </div>
        </div>
    </body>
    </html>
    """

    admin_email_msg = EmailMessage(
        subject=subject,
        body=message_body,
        from_email="Tembo Suites sociumpatners@gmail.com",
        to=[admin_2, admin_3],
    )
    admin_email_msg.content_subtype = "html"  # Ensure it's sent as an HTML email
    admin_email_msg.send()
    print("Email sent successfully ✅")
    return redirect(url_for('payment.success'))

@payment_bp.route('/success')
def success():
    return "Email sent successfully!"
