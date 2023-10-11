async function getPayment(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const payment = await db.collection("payments").find({}).toArray();

    const response = {
      statusCode: 200,
      count: payment.length,
      body: payment,
    };
    res.send(response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error :Getting Payment",
      }),
    };
  }
}
async function getPaymentById(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const paymentId = req.params.id; // Assuming the payment ID is passed as a route parameter
    console.log(paymentId);
    const payment = await db
      .collection("payments")
      .findOne({ "_id": paymentId});

    const response = {
      statusCode: 200,
      body: payment,
    };
    res.send(response);
    return response;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error: Getting Payment",
      }),
    };
  }
}

module.exports = {
  getPayment,
  getPaymentById,
};
