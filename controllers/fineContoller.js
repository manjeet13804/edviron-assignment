async function getFines(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const fines = await db
      .collection("fines").find({})
      .toArray();

    const response = {
      statusCode: 200,
      count: fines.length,
      body: fines,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Fines" }),
    };
  }
}

module.exports = {
  getFines,
};
