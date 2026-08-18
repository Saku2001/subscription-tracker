import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const app = express();

app.use(cors());

app.get("/api/companies", async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim().length < 2) {
    return res.json([]);
  }

  try {
    const response = await fetch(
      `https://api.logo.dev/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LOGO_DEV_SECRET_KEY}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Logo.dev error:", errorText);

      return res.status(response.status).json({
        error: "Logo.dev search failed",
      });
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});