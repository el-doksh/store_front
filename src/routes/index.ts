import express from 'express';
import UserController from '../handler/UserController';
import createUserValidator from '../middlewares/users/createUserValidator';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello dokshoty');
});

const userRoutes = express.Router();
const sUserController = new UserController();
userRoutes.get('/users', sUserController.index)
userRoutes.get('/users/:id', sUserController.show)
userRoutes.post('/users', createUserValidator ,sUserController.create);
userRoutes.delete('/users', sUserController.destroy)

export default userRoutes;



// const router = express.Router();

// router.get('/users', index)
// router.get('/users/:id', show)
// router.post('/users', create)
// router.delete('/users', destroy)


// routes.get('/students', students);

// export default routes;