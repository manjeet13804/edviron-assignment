async function getSections(req, res) {
    try {
      // Get an instance of our database
      const db = req.db;
  
      const sections = await db
        .collection("sections").find({})
        .toArray();
  
      const response = {
        statusCode: 200,
        count: sections.length,
        body: sections,
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
  

  async function getSectionCountsByClass(req, res) {
    const db=req.db
    const sections = await db
        .collection("sections").find({})
        .toArray();
    const sectionCounts = {};
  
    sections.forEach(item => {
        const { class: className, section } = item;
        if (!sectionCounts[className]) {
          sectionCounts[className] = 0;
        }
        sectionCounts[className]++;
      });

  const response = {
    statusCode: 200,
    count: sectionCounts.length,
    body:sectionCounts
    
  };
  res.send(response);
  return response;
  }

  module.exports = {
    getSections,
    getSectionCountsByClass
  };
  