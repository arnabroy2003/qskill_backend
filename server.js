import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/verify/:id", (req, res) => {
  const certId = req.params.id.trim();

  let found = false;

  fs.createReadStream("cer.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.id === certId) {
        found = true;
        res.json(row);
      }
    })
    .on("end", () => {
      if (!found) {
        res.status(404).json({ error: "Certificate not found" });
      }
    });
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
