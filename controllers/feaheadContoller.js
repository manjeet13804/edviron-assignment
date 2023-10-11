async function getFeeheads(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const feeheads = await db
      .collection("feeheads").find({})
      .toArray();

    const response = {
      statusCode: 200,
      count: feeheads.length,
      body: feeheads,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Feeheads" }),
    };
  }
}

module.exports = {
  getFeeheads,
};
