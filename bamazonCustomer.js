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

//Display all products
function displayAll() {
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
        searchItem();
    })
}

//Display product by ID
// function productId(query) {
//     console.log("Showing product by id ");
//     connection.query("SELECT * FROM products WHERE item_id =" + "'" + query + "'", function (err, results) {
//         console.log("=====================================================");
//         console.log("Product ID: " + results[0].item_id);
//         console.log("Product Name: " + results[0].product_name);
//         console.log("Department: " + results[0].department_name);
//         console.log("Price: $" + results[0].price);
//         console.log("Amount in Stock: " + results[0].stock_quantity);
//         console.log("=====================================================");
//     })
// }

displayAll();

function searchItem() {
    inquirer.prompt([
        {
            name: "choices",
            message: "Choose a product by ID"
        }
    ]).then(function (answers) {
        inquirer.prompt([
            {
                name: "howMany",
                message: "How many do you want to buy?"
            }
        ]).then(function (howManyAnswer) {
            connection.query("SELECT * FROM products WHERE item_id =" + "'" + answers.choices + "'", function (err, results) {
                if (howManyAnswer.howMany <= results[0].stock_quantity) {
                    var remainingQuantity = results[0].stock_quantity - howManyAnswer.howMany;
                    var saleTotal = howManyAnswer.howMany * results[0].price;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "canYouPay",
                            message: "Your total is " + saleTotal + ", is this correct?",
                            choices: ["Yes", "No"]
                        }
                    ]).then(function (checkOut) {
                        if (checkOut.canYouPay === "Yes") {
                            console.log("thank you for your purchase of " + results[0].product_name);
                            connection.query("UPDATE products SET stock_quantity = " + remainingQuantity + " WHERE item_id = " + answers.choices + ";", function (err, stockRes) { })
                            displayAll();
                            searchItem();
                        }
                        if (checkOut.canYouPay === "No") {
                            console.log("Thanks for looking at our goods!");
                            displayAll();
                            searchItem();
                        }
                    })
                } else {
                    console.log("we do not have that many in stock, sorry!");
                    searchItem();
                }
            })
        })
    })
}


