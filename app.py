# Import the functions
from flask import Flask
from flask import render_template
from flask import jsonify
from config import password, username, localhost, port

# Import the functions from sqlalchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# username = 'postgres'
database_name = 'real_estate_db'
connection_string = f'postgresql://{username}:{password}@{localhost}:{port}/{database_name}'

print(connection_string)
# Connect to database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Our tables
table1 = base.classes.trulia_real_estate
table2 = base.classes.locations

# Instantiate the Flask application.
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # disables page caching

# Application routes

# load index.html

@app.route("/")
def IndexRoute():

    webpage = render_template("index.html")
    return webpage


# database queries

@app.route("/graphsdata")
def realestateRoute():
    # Queries database and returns results as a json

    # Open session, run query, and close session
    session = Session(engine)
    results = session.query(table1.id, table1.price, table1.sqr_ft, table1.longitude, table1.latitude, table1.beds,
                            table1.bath, table1.year_built, table1.address, table1.city, table1.state, table1.zipcode).all()
    session.close()
    # print(results)

    # Create a list of dictionaries, with each dictionary containing one row from the query.
    graphsandmap = []
    for id, price, sqrft, longitude, latitude, beds, bath, yearbuilt, address, city, state, zipcode in results:
        dict = {}
        dict["id"] = id
        dict["price"] = price
        dict["sqrft"] = sqrft
        dict["longitude"] = longitude
        dict["latitude"] = latitude
        dict["beds"] = beds
        dict["bath"] = bath
        dict["yearbuilt"] = yearbuilt
        dict["address"] = address
        dict["city"] = city
        dict["state"] = state
        dict["zipcode"] = zipcode
        graphsandmap.append(dict)

    # Return the jsonified result.
    return jsonify(graphsandmap)


@app.route("/statesdata")
def statedataRoute():
    # Queries database and returns results as a json

    # Open session, run query, and close session
    session = Session(engine)
    results = session.query(table2.state, table2.latitude, table2.longitude,
                            table2.name).all()
    session.close()

    # Create a list of dictionaries, with each dictionary containing one row from the query.
    leafletmap = []
    for state, latitude, longitude, name in results:
        dict = {}
        dict["state"] = state
        dict["latitude"] = latitude
        dict["longitude"] = longitude
        dict["name"] = name
        leafletmap.append(dict)

    # Return the jsonified result.
    return jsonify(leafletmap)


# test route to check whether flask is working

@app.route("/test")
def testroute():
   
    return "This is the test route!"


if __name__ == '__main__':
    app.run(debug=True)
