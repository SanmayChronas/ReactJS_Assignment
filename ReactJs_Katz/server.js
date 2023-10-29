// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    if (req.headers['x-amz-sns-message-type']) {
        req.headers['content-type'] = 'application/json;charset=UTF-8';
    }
    next();
});
const API_URL = 'https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/1';

app.get('/', async (req, res) => {
    const { page } = req.params;
    console.log("qwertyu");
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
