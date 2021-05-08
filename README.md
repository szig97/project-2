# Trulia Real Estate Data
Group Members: Andy McRae, Anthony Njuguna, Jeannaej Yambing, Sam Ziegler

(Date range: 9/1/2019-10/31/2019)

# Overview:
ETL (Sam)
Jupyter Notebook
SQL
Flask 
HTML (Jeannaej, Sam)

# How to populate the database:
1.	Clone the 'trulia-real-estate' repository onto your computer.
2.	Open pgAdmin and create a new database called 'real_estate_db.'
3.	Open a query tool in 'real_estate_db' and navigate to the root directory of the 'etl-challenge' repository.
4.	Select the file 'queries.sql.'
5.	Run the create table code to create the 'trulia_real_estate' table. 
6.	Run the create table code to create the 'locations' table.
7.	Run `select * from trulia_real_estate` and `select * from locations` to ensure that the tables were created.
8.	Open a Jupyter Notebook in the 'trulia-real-estate' repository. Create a text file called 'config.py.' In this file, save your pgAdmin password as 'password'.
9.	Open ‘real_estate_etl.ipynb.' and run all cells. 



# 1. What does the distribution of Price/SQft/Bed/Bath look like in the country/state? (Andy)
Leaflet Map 
Zooms in on State that is selected
Layers of Markers
Price
SQ ft
Bed
Bath
Tooltips?

# 2. What effect does square feet have on house price? (Anthony)
Plotly 
Line graph of Price v Sq. Ft

# 3. What is the distribution of years that houses on sale were built in a given state? (Jeannaej)
Chart.js 
Donut Graph of Year Built 

# Datasets: 
https://www.kaggle.com/promptcloud/real-estate-data-from-trulia 

https://developers.google.com/public-data/docs/canonical/states_csv

