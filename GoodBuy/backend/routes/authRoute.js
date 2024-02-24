import express from 'express';
import { isLogin, isAdmin } from '../middlewares/authMiddleware.js';
import {
    getAllOrdersController,
    getAllUsersController,
    getOrdersController,
    loginController,
    orderStatusController,
    registerController,
    updateProfileController
} from '../controllers/authController.js';

const router = express.Router();



// REGISTER
router.post('/register', registerController);



// LOGIN
router.post('/login', loginController);



//PROTECED ROUTE
router.get('/user-auth', isLogin, function (req, res) {
    res.status(200).send('ok')
})



//ADMIN ROUTE
router.get('/admin-auth', isLogin, isAdmin, function (req, res) {
    res.status(200).send('ok')
})




// UPDATE PROFILE
router.put("/update-profile/:uid", isLogin, updateProfileController);



// GET ALL USERS
router.get('/get-users', getAllUsersController);



//ORDERS
router.get("/orders", isLogin, getOrdersController);



// GET ALL ORDERS
router.get("/all-orders", isLogin, isAdmin, getAllOrdersController);




// UPDATE ORDER STATUS
router.put("/order-status/:orderId", isLogin, isAdmin, orderStatusController);



export default router;