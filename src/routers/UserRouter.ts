import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import { GlobalMiddleWares } from '../middlewares/global-middleware';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.putRoute();
        this.postRoutes();
    }
    putRoute() {
       this.router.put('/updateProduct', UserController.updateProduct)
    }

    getRoutes() {
        this.router.get('/getProduct',UserController.getProduct);
        this.router.get('/getSingleProduct/:Id', UserController.getSingleProduct)
        this.router.get('/send/verification/email',  UserController.resendVerificationEmail);
    }

    postRoutes() {
        this.router.post('/createProduct',  GlobalMiddleWares.checkError, UserController.createProduct);
    }

  
   
}

export default new UserRouter().router;
