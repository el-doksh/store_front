import express from 'express';
import bodyParser from 'body-parser';
import database from './database';

const app = express();
const port : number = 3000;

app.listen(port, () : void=> {
    console.log(`server is running at http://localhost:${port}`);
});

app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) : void => {
    res.send('Server is running');
});


export default app;