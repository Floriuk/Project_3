from sqlalchemy import create_engine
import pandas as pd
import datetime as dt
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import inspect
from flask import Flask, jsonify, render_template
from sqlalchemy import func
import psycopg2
import json


##########################################################################


conn_string = "host='localhost' dbname='sales_1' user='postgres' password='1234'"
conn = psycopg2.connect(conn_string)
engine = create_engine('postgresql+psycopg2://postgres:1234@localhost/sales_1')
Base = automap_base()
Base.prepare(autoload_with=engine)
Base.prepare(engine, reflect=True)

# View all of the classes that automap found
print(Base.classes.keys())

# Save references to each table
Product_ = Base.classes.Product
Crop_ = Base.classes.Crop
Client_ = Base.classes.Client
Sales_ = Base.classes.Sales

# Create our session (link) from Python to the DB
session = Session(engine)

# Flask Setup
#################################################

app = Flask(__name__)

@app.route('/')
def home():
    # """Homepage"""
    # return (
    # f"Welcome to the Homepage<br/><br/>"
    # f"Available Routes:<br/>"
    # f"/api/v1.0/sales<br/>"
    # f"/api/v1.0/product<br/>"
    # f"/api/v1.0/crop<br/>"
    # f"/api/v1.0/client<br/>"
    # )
    return render_template("index.html")

##########################################################################

@app.route("/api/v1.0/sales")
def sales_db():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Sales json"""
 # Query
    query_result = session.query(
        Sales_.sales_id, Sales_.client_id, Sales_.product_id, Sales_.crop_id,
        Sales_.month, Sales_.profit, Sales_.cost, Sales_.sales, Sales_.volume,
        Sales_.source, Sales_.presentation, Sales_.year
    ).all()
    
    # Convert query result to a list of dictionaries
    result = [
        {
            "sales_id": row.sales_id,
            "client_id": row.client_id,
            "product_id": row.product_id,
            "crop_id": row.crop_id,
            "month": row.month,
            "profit": row.profit,
            "cost": row.cost,
            "sales": row.sales,
            "volume": row.volume,
            "source": row.source,
            "presentation": row.presentation,
            "year": row.year
        }
        for row in query_result
    ]
    
    session.close()
    return jsonify(result)


##########################################################################
@app.route("/api/v1.0/product")
def product_db():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """product json"""
 # Query
    query_result_product = session.query(
    Product_.product_id, Product_.product, Product_.product_, Product_.formula,
    Product_.product_category, Product_.product_type
    ).all()

    # Convert query result to a list of dictionaries
    result_product = [
        {
            "product_id": row.product_id,
            "product": row.product,
            "product_": row.product_,
            "formula": row.formula,
            "product_category": row.product_category,
            "product_type": row.product_type
        }
        for row in query_result_product
    ]
    
    session.close()
    return jsonify(result_product)


##########################################################################
@app.route("/api/v1.0/crop")
def crop_db():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Sales json"""
 # Query
    query_result_crop = session.query(
    Crop_.crop_id, Crop_.crop, Crop_.crop_, Crop_.crop_category
    ).all()

    # Convert query result to a list of dictionaries
    result_crop = [
        {
            "crop_id": row.crop_id,
            "crop": row.crop,
            "crop_": row.crop_,
            "crop_category": row.crop_category
        }
        for row in query_result_crop
    ]

    session.close()
    return jsonify(result_crop)
##########################################################################
@app.route("/api/v1.0/client")
def client_db():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    """Sales json"""
 # Query

    query_result_client = session.query(
        Client_.client_id, Client_.client, Client_.client_, Client_.region, Client_.enterprise
    ).all()
    
    # Convert query result to a list of dictionaries
    result_client = [
        {
            "client_id": row.client_id,
            "client": row.client,
            "client_": row.client_,
            "region": row.region,
            "enterprise": row.enterprise
        }
        for row in query_result_client
    ]
    
    session.close()
    return jsonify(result_client)
   

##########################################################################
if __name__ == '__main__':
    app.run(debug=True, port=5000)

