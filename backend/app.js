require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const miniUrl = require('./Routes/miniUrl');
const Analytics = require('./Routes/analytics');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: "https://miniurl-frontend1.onrender.com",
        credentials: true
    })
);
app.set('trust proxy', true);


app.use('/api', miniUrl);
app.use('/api/analytics', Analytics);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
