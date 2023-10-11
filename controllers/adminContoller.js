async function getAdmins(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const admins = await db
      .collection("schooladmins").find({})
      .toArray();

    const response = {
      statusCode: 200,
      count: admins.length,
      body: admins,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Admins" }),
    };
  }
}

module.exports = {
  getAdmins,
};
