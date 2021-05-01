# Import the functions
from flask import Flask
from flask import render_template 
from flask import jsonify

# Import the functions from sqlalchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

username = 'postgres'
password = 'postgresqladmin'
database_name = 'real_estate_db'
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Our table
table = 'trulia_real_estate'



app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 


















if __name__ == '__main__':
    app.run(debug=True)
