require("dotenv").config();
const { post, get } = require("axios");
const express = require("express");
const helmet = require("helmet");
const expressip = require("express-ip");

const app = express();
const PORT = process.env.PORT || 12345; // Render uses dynamic ports

// Middleware
app.use(helmet());
app.use(express.json());
app.use(expressip().getIpInfoMiddleware());

// Route
app.post("/reverse", (req, res) => {
    const { input } = req.body;

    if (typeof input !== "string") {
        return res.status(400).json({ error: "Expected a 'input' string in request body" });
    }

    const reversed = input.split("").reverse().join("");
    res.json({ reversed });
});

// Catch-all
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
