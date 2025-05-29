require("dotenv").config();
const { post, get } = require("axios");
const express = require("express");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 12345;

// Middleware
app.use(helmet());
app.use(express.json());

// POST route to reverse input string
app.post("/reverse", (req, res) => {
    const { input } = req.body;

    if (typeof input !== "string") {
        return res.status(400).json({ error: "Expected a 'input' string in request body" });
    }

    const reversed = input.split("").reverse().join("");
    res.json({ reversed });
});

// Fallback for other routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
