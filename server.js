import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import dbConfig from './config/database.config.js';
import noteRoutes from './app/routes/note.routes.js';
import cors from 'cors'; // CORS paketini import edin

// Create express app
const app = express();

// CORS'u etkinleştirin ve belirli bir kökene izin verin
const corsOptions = {
    origin: 'http://localhost:3001', // React uygulamanızın çalıştığı köken
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// body parser ile gelen verileri okuyabilmek icin
app.use(bodyParser.urlencoded({ extended: true }));

// body parser ile gelen verileri json formatinda okuyabilmek icin
app.use(bodyParser.json());


// mongoose ile mongodb baglantisi
mongoose.Promise = global.Promise;

// mongodb baglantisi
mongoose.connect(dbConfig.url).then(() => {
    console.log("başarılı bir şekilde mongodb ye bağlandı....");
}).catch(err => {
    console.log('bir sıkıntı var kanka....', err);
    process.exit();
});


// genel bir get istegi icin bir response donduren bir fonksiyon
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our application!' });
});

noteRoutes(app);

// 3000 portunu isteklerini dinlemek icin
app.listen(3000, () => {
    console.log("server is listening on port 3000...")
});