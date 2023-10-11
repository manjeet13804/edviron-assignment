async function getInvoices(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const invoice = await db
      .collection("invoices").find({})
      .toArray();

    const response = {
      statusCode: 200,
      count: invoice.length,
      body: invoice,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Invoice" }),
    };
  }
}


async function getTotalFine(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const invoices = await db
      .collection("invoices").find({})
      .toArray();
      var totalFineAmount = 0;

      for (const invoice of invoices) {
        if (invoice.status === "paid" && invoice.fine_amount) {
          totalFineAmount += invoice.fine_amount;
          console.log(invoice)
        }
      }

    const response = {
      statusCode: 200,
      total: totalFineAmount,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Invoice" }),
    };
  }
}
async function getTotalFine(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const invoices = await db
      .collection("invoices").find({})
      .toArray();
      var totalFeeAmount = 0;

      for (const invoice of invoices) {
        if (invoice.status === "paid" && invoice.fine_amount) {
          totalFeeAmount += invoice.fine_amount;
          console.log(invoice)
        }
      }

    const response = {
      statusCode: 200,
      total: totalFeeAmount,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Invoice" }),
    };
  }
}

module.exports = {
  getInvoices,
  getTotalFine
};
