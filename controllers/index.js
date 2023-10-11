

async function getDocumentStructure(req, res) {
  try {
    // Get an instance of our database
    const db = req.db;
    const dues = await db.collection("dues").find({}).limit(1).toArray();
    const payments = await db.collection("payments").find({}).limit(1).toArray();
    // const feeheads = await db.collection("feeheads").find({}).limit(1).toArray();
    const school = await db.collection("schools").find({}).limit(1).toArray();
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    const documents = {};
    for (const collectionName of collectionNames) {
      const collection = db.collection(collectionName);
      const document = await collection.findOne({});
      console.log(document);
      documents[collectionName] = document;
    }
    // console.log(dues,"due");
    // console.log(payments,"payment");
    // console.log(feeheads,"feehead");
    console.log('invoices',school);
    const defaulters = dues.filter((due) => {
      const paymentExists = payments.some(
        (payment) => payment.due_date === due.due_date
      );
      return !paymentExists;
    });
    const response = {
      statusCode: 200,
      count: defaulters.length,
      body: documents,
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
  getDocumentStructure
};
