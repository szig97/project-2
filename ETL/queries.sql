-- Create Tables
create table trulia_real_estate (
State int primary key,
Uniq id text,
Price text,
Longitude text,
Latitude text, 
Lot Size text,
Beds text,
Bath text,
Year Built text,
Price Sqr Ft text,
Address text,
City text,
Zipcode text
);

create table locations (
state int primary key,
latitude text,
longitude text, 
name text
);

select * from trulia_real_estate;
select * from locations;