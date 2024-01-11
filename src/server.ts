import 'dotenv/config';
import express from "express";
import cors from 'cors';
import http from 'http';
import https from 'https';
import sitesRoutes from './routes/site';
import { requestIntercepter } from './utils/requestIntercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestIntercepter);

//app.use('/admin', adminRoutes);
app.use('/', sitesRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(`--> Running at port ${port}`);
    });
}

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    // TODO: Configurar SSL
    // TODO: Rodar server na 80 e na 443
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}