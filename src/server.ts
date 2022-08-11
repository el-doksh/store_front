import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/index';

const app = express();
const port : number = 3000;

app.listen(port, () : void => {
    console.log(`server is running at http://localhost:${port}`);
});

const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) : void => {
    res.send('Server is running');
});

app.use(userRoutes);

export default app;