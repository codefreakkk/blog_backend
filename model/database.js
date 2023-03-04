const mongoose = require("mongoose");

const url = `mongodb+srv://harsh:${"harsh"}@cluster0.dbvws9v.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => console.log("db not connected"));
