-- ===========================================
-- Written by Sam Ziegler
-- ===========================================
-- Create Tables
create table trulia_real_estate (
id text primary key,
price text,
sqr_ft text,
longitude text,
latitude text,
beds text,
bath text,
year_built text,
address text,
city text,
state text,
zipcode text
);

create table locations (
state text primary key,
latitude text,
longitude text, 
name text
);

select * from trulia_real_estate;
select * from locations;