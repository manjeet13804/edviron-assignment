

async function getDefaultersLast30days(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dues = await db
      .collection("dues")
      .find({ due_date: { $lte: thirtyDaysAgo } })
      .toArray();
    const payments = await db.collection("payments").find({}).toArray();

    const defaulters = dues.filter((due) => {
      const paymentExists = payments.some(
        (payment) => payment.due_date === due.due_date
      );
      return !paymentExists;
    });

    const response = {
      statusCode: 200,
      count: defaulters.length,
      body: defaulters,
    };

    res.send(response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error: Getting defaulters",
      }),
    };
  }
}


async function getDefaulters(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;
    const invoices = await db.collection("invoices").find({}).toArray();
    const dues = await db.collection("dues").find({}).toArray();
    const duesArray = [];

for (const invoice of invoices) {
  duesArray.push(...invoice.dues);
}
const filteredDues = dues.filter((due) => duesArray.includes(due._id));
console.log(duesArray);
const uniqueStudents = new Set();

const today = new Date();

for (const document of filteredDues) {
  const dueDate = new Date(document.due_date);
  if (dueDate < today) {
    uniqueStudents.add(document.student);
  }
}

const defaulterCount = uniqueStudents.size;

console.log(defaulterCount);
    const response = {
      statusCode: 200,
      duesArrayFromInvoices: duesArray.length,
      duesInDb: dues.length,
      defaultersDuesArray:filteredDues.length,
      defaulterCount,
      body: dues,
    };
    res.send(response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error:Getting deafulters",
      }),
    };
  }
}

module.exports = {
  getDefaulters,
  getDefaultersLast30days
};
