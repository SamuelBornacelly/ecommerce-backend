const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);