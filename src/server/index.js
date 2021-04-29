const express = require("express");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const { originalname } = file;

    const lastDot = originalname.lastIndexOf(".");
    const name = originalname.substring(0, lastDot);
    const extension = originalname.substring(lastDot);

    cb(null, name + "_" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage }).array("userfile[]");

const app = express();

app.get("/api/info", function(req, res) {
  res.json({ msg: "Welcome" });
});

app.post("/api/create-file", function(req, res) {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(`Multer error: ${err}`);
      res.json({
        msg: "Error while uploading file.",
      });
    } else if (err) {
      console.log(`Unknown error: ${err}`);
      res.json({
        msg: "Error while uploading file.",
      });
    }
  });

  res.json({
    msg: "Upload success",
  });
});

app.get("/api/file-list", function(req, res) {
  fs.readdir("./uploads", (err, files) => {
    if (err) {
      res.json({
        msg: "Error while reading file list.",
      });
    }

    const listObj = files.map((item) => {
      return {
        name: item,
      };
    });

    res.json({
      fileList: listObj,
    });
  });
});

const port = 8070;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
