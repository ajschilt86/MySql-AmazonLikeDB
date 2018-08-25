const mysql = require("mysql");
const inquirer = require("inquirer");

require("dotenv").config();

//conencction credentials
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon'
});

connection.connect((err) => {
    if (err) throw err;
});

function manager() {
    inquirer.prompt([
        {
            type: "list",
            name: "managerMenu",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answers) {
        if (answers.managerMenu === "View Products for Sale") {
            connection.query("SELECT * FROM products", function (err, results) {
                for (var i in results) {
                    console.log("\n=====================================================");
                    console.log("Product ID: " + results[i].item_id);
                    console.log("Product Name: " + results[i].product_name);
                    console.log("Department: " + results[i].department_name);
                    console.log("Price: $" + results[i].price);
                    console.log("Amount in Stock: " + results[i].stock_quantity);
                    console.log("=====================================================");
                }
                manager();
            })
        }
        if (answers.managerMenu === "View Low Inventory") {
            connection.query("SELECT * FROM products", function (err, results) {
                for (var i in results) {
                    if (results[i].stock_quantity < 50000) {
                        console.log("\n=====================================================");
                        console.log("Product ID: " + results[i].item_id);
                        console.log("Product Name: " + results[i].product_name);
                        console.log("Department: " + results[i].department_name);
                        console.log("Price: $" + results[i].price);
                        console.log("Amount in Stock: " + results[i].stock_quantity);
                        console.log("=====================================================");
                    }
                    else {
                        console.log(results[i].item_id + " is low on inventory");
                    }
                }
                manager();
            })
        }
        if (answers.managerMenu === "Add to Inventory") {
            inquirer.prompt([
                {
                    name: "chooseToAdd",
                    message: "Enter the ID you would like to add inventory to!"
                },
                {
                    name: "chooseAmount",
                    message: "How much would you like to add?"
                }
            ]).then(function (addInventory) {
                connection.query("SELECT * FROM products WHERE item_id =" + "'" + addInventory.chooseToAdd + "'", function (err, results) {
                    var addToQuantity = parseInt(results[0].stock_quantity) + parseInt(addInventory.chooseAmount);
                    connection.query("UPDATE products SET stock_quantity = " + addToQuantity + " WHERE item_id = " + addInventory.chooseToAdd + ";", function (err, stockRes) {
                        // console.log("You added new inventory, See below");
                        // console.log("\n=====================================================");
                        // console.log("Product ID: " + results[0].item_id);
                        // console.log("Product Name: " + results[0].product_name);
                        // console.log("Department: " + results[0].department_name);
                        // console.log("Price: $" + results[0].price);
                        // console.log("Amount in Stock: " + results[0].stock_quantity);
                        // console.log("=====================================================");
                        manager();
                    })
                })
            })
        }
        if (answers.managerMenu === "Add New Product") {
            console.log("Add a product!")
            inquirer.prompt([
                {
                    name: "addName",
                    message: "Enter a name for the product!"
                },
                {
                    name: "addDepartment",
                    message: "Enter a department for the product!"
                },
                {
                    name: "addPrice",
                    message: "Enter a price for the product!"
                },
                {
                    name: "addAmount",
                    message: "Enter a quantity for the product!"
                }
            ]).then(function (addProduct) {
                connection.query("insert into products(product_name, department_name, price, stock_quantity) values ('" + addProduct.addName + "' , '" + addProduct.addDepartment + "'," + addProduct.addPrice + "," + addProduct.addAmount + ")", function (err, results) {
                    console.log("You aded a new product!");
                    manager();
                })
            })
        }
    })
}

manager();