
	
const serverless = require('serverless-http');
const express = require('express');
const { connectToDatabase } = require('./config');

const app = express()

app.use(async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    req.db = db;
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const defaulterRoutes = require("./routes/defaulterRoutes")
app.use("/api/defaulters", defaulterRoutes);
 

const studentRoutes = require("./routes/studentRoutes")
app.use("/api/students", studentRoutes);
 
const sectionRoutes = require("./routes/sectionRoutes")
app.use("/api/sections", sectionRoutes);

const transactionRoutes = require("./routes/transactionRoutes")
app.use("/api/transactions", transactionRoutes);


const invoiceRoutes = require("./routes/invoiceRoutes")
app.use("/api/invoices", invoiceRoutes);


const paymentRoutes = require("./routes/paymentRoutes")
app.use("/api/payments", paymentRoutes);

const fineRoutes = require("./routes/fineRoutes")
app.use("/api/fines", fineRoutes);

const feeheadRoutes = require("./routes/feeheadRoutes")
app.use("/api/feeheads", feeheadRoutes);

const adminRoutes = require("./routes/adminRoutes")
app.use("/api/admins", adminRoutes);

const Routes = require("./routes")
app.use("/", Routes);

module.exports.handler = serverless(app);
