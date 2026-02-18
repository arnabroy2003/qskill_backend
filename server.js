import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/verify/:id", async (req, res) => {
  const certId = req.params.id.trim();

  try {
    const url = `${process.env.SUPABASE_URL}/rest/v1/certificates?id=eq.${certId}`;

    const response = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
    });

    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
