require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Transaction = require('./models/Transaction');

let dbConnectionError = null;

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_URI,
    {}).then(() => {
        console.log('Connected to MongoDB');
        dbConnectionError = null;
    }).catch(err => {
        console.error('Failed to connect to MongoDB', err);
        dbConnectionError = err;
    });

app.get('/db-status', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    res.json({
        success: dbStatus === 1,
        status: dbStatus,
        error: dbConnectionError
    });
});


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.post('/subscribe', async (req, res) => {
    const email = req.body.email;

    // Construct the path to the image
    const imagePath = path.join(__dirname, 'header_email.png');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Subscribing',
        text: 'Thank you for subscribing to our newsletter!',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Subscription Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #dddddd;
                    }
                    .email-header h1 {
                        margin: 0;
                        color: #333333;
                    }
                    .email-body {
                        padding: 20px 0;
                        text-align: left;
                    }
                    .email-body p {
                        margin: 0;
                        font-size: 16px;
                        color: #555555;
                    }
                    .email-footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #dddddd;
                    }
                    .email-footer p {
                        margin: 0;
                        font-size: 14px;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <img src="cid:unique@headerimage.cid" alt="Header Image" style="width:100%;max-width:600px;">
                    <div class="email-header">
                        <h1>Subscription Confirmation</h1>
                    </div>
                    <div class="email-body">
                        <h3><b>Thank you for subscribing to our newsletter! &#x1F604;</b></h3>
                        <br>
                        <p>You’ll now receive the latest updates, exclusive offers, and insightful content directly to your inbox. We appreciate your interest and look forward to keeping you informed about our exciting news and events.</p>
                        <br>
                        <p>If you have any questions or feedback, please don’t hesitate to reach out.</p>
                        <br>
                        <p><i>Welcome aboard, and thank you once again for subscribing!</i></p>
                    </div>
                    <div class="email-footer">
                        <p>&copy; 2024 Wene Website. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        attachments: [{
            filename: 'header_email.png',
            path: imagePath,
            cid: 'unique@headerimage.cid' // same cid value as in the html img src
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send email', error });
        }
        res.json({ success: true, message: 'Subscription confirmation email sent' });
    });
});

app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email })

    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, token })
});

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET);
            res.json({ success: true, token, userId: user.id, email: user.email })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
});

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
});

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "wig" });
    let popular_in_women = products.slice(0, 4);
    res.send(popular_in_women);
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "please authenticate using a valid token" })
        }
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
    const itemId = Number(req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Item added to cart" });
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    const itemId = Number(req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[itemId] > 0) {
        userData.cartData[itemId] -= 1;
    }
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Item removed successfully" });
});

app.post('/clearcart', fetchUser, async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData = {};
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Cart cleared");
    } catch (error) {
        res.status(500).send("An error occurred while clearing the cart");
    }
});

app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
});

app.get('/alladdress', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/addaddress', async (req, res) => {
    const { userId, address_details, address_note, city, postal_code, phone_number } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newAddress = {
        address_details,
        address_note,
        city,
        postal_code,
        phone_number
    };

    user.addresses.push(newAddress);
    await user.save();

    res.json({ success: true, user });
});

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const port = process.env.PORT || 4000;
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server Running on Port ${port}`);
    } else {
        console.log("Error: " + error);
    }
});

// Route to create a new transaction
app.post('/createtransaction', fetchUser, async (req, res) => {
    console.log("ceatetransaction")
    const { items } = req.body; // Destructure items array from the request body
    console.log (req.body);
    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'No items provided for transaction' });
    }

    try {
        const transactions = [];

        for (let item of items) {
            const { productId, quantity, totalPrice } = item;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${productId} not found` });
            }
            console.log('Product ID received:', productId);
            console.log('Product found:', product);            
            const transaction = new Transaction({
                userId: req.user.id,
                productId: product._id, // Use product._id instead of productId
                quantity: quantity,
                totalPrice: totalPrice,
                date: new Date().toISOString() // Optional: set date here, or leave it to default in schema
            });

            await transaction.save();
            transactions.push(transaction);
        }
            console.log("Route /createtransaction hit");
            res.send("Route is working");        
        res.json({ success: true, message: 'Transactions created successfully', transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



// Route to get all transactions (for admin)
app.get('/alltransactions', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('userId', 'name email').populate('productId', 'name');
        res.json({ success: true, transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route to get total sales for each product (for admin)
app.get('/totalsales', async (req, res) => {
    try {
        const sales = await Transaction.aggregate([
            {
                $group: {
                    _id: "$productId",
                    totalQuantity: { $sum: "$quantity" },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $project: {
                    productId: "$_id",
                    productName: "$productDetails.name",
                    totalQuantity: 1,
                    totalRevenue: 1
                }
            }
        ]);

        res.json({ success: true, sales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/test', (req, res) => {
    res.json({ success: true, message: 'Test endpoint hit', data: req.body });
});


app.use(cors)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
