# 2019 Trulia Real Estate Dashboard

![2019 trulia real estate dashboard](https://user-images.githubusercontent.com/73489414/118370635-2cf1b480-b56e-11eb-8469-9900671bd784.png)

Group Members: Andy McRae, Anthony Njuguna, Jeannaej Yambing, Sam Ziegler

# Overview:
The 2019 Trulia Real Estate Dashboard explores the distribution of real estate sales in the United States listed on Trulia.com. 
 The data comes from the period between September 1st, 2019 and October 31st, 2019. The interactive map displays the price, square feet, and the number of beds and baths in each unit. 
 In addition, there is a bar graph that explores which unit size is the most popular,
 and a donut graph that shows the distribution of units that were built in each decade.

# How to Populate the Database:
1.	Clone the 'trulia-real-estate' repository onto your computer.
2.	Open pgAdmin and create a new database called 'real_estate_db'.
3.	Open a query tool in 'real_estate_db' and navigate to the ETL folder in the 'trulia-real-estate' repository.
4.	Select the file 'queries.sql'.
5.	Run the create table code to create the 'trulia_real_estate' table. 
6.	Run the create table code to create the 'locations' table.
7.	Run `select * from trulia_real_estate` and `select * from locations` to ensure that the tables were created.
8.	Open a Jupyter Notebook in the 'trulia-real-estate' repository. 
9.  In the ETL folder, create a text file called 'config.py'. In this file, write down your pgAdmin username, password, localhost, and port.
10.	Open ‘real_estate_etl.ipynb.' and run all cells.

# How to Set Up the Leaflet Map:
1. Navigate to the static folder and select the 'js' folder.
2. In the js folder, create a file called 'config.js'. In this file, write down your API_KEY from mapbox.com so that the leaflet map can run.

# How to Run the Flask:
1. At the base level in the 'trulia-real-estate' repository, create a config.py that contains your pgAdmin password, username, localhost, and port.
2. Open GitBash in the 'trulia-real-estate' repository.
3. In GitBash, write `source activate PythonData`.
4. Write `python app.py` to get the flask running.
5. In Google Chrome, write `http://127.0.0.1:5000/` and then you will have the Flask running. 

# Datasets: 
https://www.kaggle.com/promptcloud/real-estate-data-from-trulia 

https://developers.google.com/public-data/docs/canonical/states_csv

