import 'module-alias/register';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import app from '@/app';

// Load environment vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// load port for app
const port = process.env.PORT || 4000;
// load db url
const dbUrl = process.env.DB_URL || '';

// connect to database
mongoose
    .connect(dbUrl)
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');

        // init server
        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });