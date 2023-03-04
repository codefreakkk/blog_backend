const express = require("express");
const app = express();
const cors = require("cors");
require("./model/database");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

const blogRoute = require("./routes/blogRoute");

app.use(
  fileUpload({
    useTempFiles: true,
  })
);


app.use("/api/v1", blogRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started at ${PORT}`));
