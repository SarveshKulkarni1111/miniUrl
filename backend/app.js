require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const miniUrl = require('./Routes/miniUrl');
const Analytics = require('./Routes/Analytics');
const AuthRoutes = require('./Routes/Auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: ["https://miniurl-frontend1.onrender.com", "http://localhost:5173"],
        credentials: true
    })
);
app.set('trust proxy', true);


app.use('/api/auth', AuthRoutes);
app.use('/api', miniUrl);
app.use('/analytics', Analytics);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
