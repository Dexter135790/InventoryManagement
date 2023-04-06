create database DBMS_Project;

create table user_information(
    Company_name varchar(255),
    Userid integer PRIMARY key,
    Email varchar(255),
    Password_ varchar(255),
    Phone_number varchar(255),
    city varchar(255),
    state varchar(255),
    country varchar(255),
    created_at DATE
);

select * from user_information;

create table Product_details(
   product_id integer primary key,
   product_name varchar(255),
   description varchar(255),
   category_id integer,
   supplier_id integer ,
   cost integer,
   selling_price integer,
   image_url varchar(500),
   foreign key(supplier_id) references suppliers(Supplier_ID),
   Foreign key(category_id) references category_of_products(category_id)
);

select * from product_details;

create table category_of_products(
    category_id integer primary key,
    category_name varchar(255),
    description varchar(255)
);

select * from category_of_products;

create table orders(
   order_id integer primary key,
   Customer_ID integer,
   Order_date date,  
   Total_cost integer,
   Payment_Method varchar(255),
   Payment_Date date,
   Shipping_Address varchar(255),
   Shipping_Method varchar(255),
   Status varchar(255),
   foreign key(Customer_ID) references customer(Customer_ID)
);

select * from orders;

create table customer(
    Customer_ID integer primary key,
    name varchar(255),
    Email varchar(255),
    Phone_Number varchar(255),
    City varchar(255),
    State varchar(255),
    Country varchar(255)
);

select * from customer;

create table suppliers(
   Supplier_ID integer primary key,
   Supplier_Name varchar(255),
   Email varchar(255),
   Phone varchar(255)
);

select * from suppliers;

create table warehouse(
   Warehouse_ID integer primary key,
   Warehouse_name varchar(255),
   Address varchar(255)
);

select * from warehouse;

create table stock(
   Warehouse_ID integer,
   Product_ID integer,
   Units integer,
   foreign key(Warehouse_ID) references warehouse(Warehouse_ID )
);

select * from stock;

create table warehouse_transactions(
   Transaction_ID integer primary key,
   Warehouse_ID integer,
   Product_ID integer,
   Transaction_date date,
   Quantity integer,
   Reference_ID integer,
   foreign key(Product_ID) references Product_details(product_id),
   foreign key(Warehouse_ID) references warehouse(Warehouse_ID )
);

select * from warehouse_transactions;

create table customer_bought(
    Customer_ID integer,
    Product_ID integer,
    Order_ID integer,
    foreign key(Customer_ID) references customer(Customer_ID),
    foreign key(product_id) references Product_details(product_id)
);

select * from customer_bought;











