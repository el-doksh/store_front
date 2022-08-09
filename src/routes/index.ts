import express from 'express';
import students from './api/students';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello dokshoty');
});

routes.get('/students', students);

export default routes;