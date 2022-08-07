const Sequelize = require("sequelize");
const db = require('./../db');

const Product = db.define("product", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})

module.exports = Product;