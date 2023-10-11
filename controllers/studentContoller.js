async function getStudents(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;

    const students = await db
      .collection("students").find({})
      .toArray();

    const response = {
      statusCode: 200,
      count: students.length,
      body: students,
    };
    res.send(response);
    return response;
  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error :Getting Students" }),
    };
  }
}

module.exports = {
  getStudents,
};
