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

app.use(express.json());

app.post("/apply", async (req, res) => {
  try {
    const {
      fullName,
      collegeName,
      email,
      whatsappNo,
      gender,
      domain,
    } = req.body;

    const response = await fetch(
      `${process.env.SUPABASE_URL_2}/rest/v1/internship_applications`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_KEY_2,
          Authorization: `Bearer ${process.env.SUPABASE_KEY_2}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify([
          {
            full_name: fullName,
            college_name: collegeName,
            email,
            whatsapp_no: whatsappNo,
            gender,
            domain
          }
        ])
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.log(error);

      return res.status(400).json({
        success: false,
        message: "Failed to save application"
      });
    }

    res.json({
      success: true,
      message: "Application submitted successfully"
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
