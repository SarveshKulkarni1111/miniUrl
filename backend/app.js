require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const miniUrl = require('./Routes/miniUrl');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.set('trust proxy', true);


app.use('/api', miniUrl);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
