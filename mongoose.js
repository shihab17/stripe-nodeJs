const mongoose = require("mongoose");
module.exports = {
  connect: () => {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      const uri = `mongodb://localhost:27017/expressjs`
      mongoose.set("strictQuery", false);
      mongoose.connect(uri, options).catch((err) => {
        console.log("mongoose error", err);F
      });
    } catch (error) {
      console.log("mongodb error", error);
    }
  },
};