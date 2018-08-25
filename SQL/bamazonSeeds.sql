CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int auto_increment NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price integer(100) NOT NULL,
  stock_quantity integer(100) NOT NULL,
  PRIMARY KEY (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Ceres", "SpaceX Mining", 324561, 1123125);

insert into products(product_name, department_name, price, stock_quantity)
values ("Juno", "SpaceX Mining", 123473, 1545345);

insert into products(product_name, department_name, price, stock_quantity)
values ("Vesta", "SpaceX Mining", 982344, 1786865);

insert into products(product_name, department_name, price, stock_quantity)
values ("Eros", "SpaceX Mining", 773561, 18975);

insert into products(product_name, department_name, price, stock_quantity)
values ("Pallas", "SpaceX Mining", 236761, 1678675);

insert into products(product_name, department_name, price, stock_quantity)
values ("Mathilde", "SpaceX Mining", 234561, 165785);

insert into products(product_name, department_name, price, stock_quantity)
values ("Aten", "SpaceX Mining", 623462, 123425);

insert into products(product_name, department_name, price, stock_quantity)
values ("Ida", "SpaceX Mining", 923453, 151233);

insert into products(product_name, department_name, price, stock_quantity)
values ("Thisbe", "SpaceX Mining", 762344, 154567);

insert into products(product_name, department_name, price, stock_quantity)
values ("Luteia", "SpaceX Mining", 234442, 152344);
