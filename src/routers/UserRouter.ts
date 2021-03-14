import {Router} from 'express';
const multer = require('multer');
const path = require('path');
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
            const storage = multer.diskStorage({
                destination: (req, file, callBack) => {
                    // console.log(path.join(__dirname, '../public/images'))
                    let dest =path.join(__dirname, '../public/images/')
                    callBack(null, dest); // images folder name
                },
                filename: (req, file, callBack) => {
                    callBack(null, `${file.originalname}`)
                }
              })
              const upload = multer({ storage: storage })
        
       this.router.put('/updateProduct', upload.single('file'), UserController.updateProduct)
    }

    getRoutes() {
        this.router.get('/getProduct',UserController.getProduct);
        this.router.get('/getSingleProduct/:Id', UserController.getSingleProduct)
    }

    postRoutes() {
        const storage = multer.diskStorage({
            destination: (req, file, callBack) => {
                // console.log(path.join(__dirname, '../public/images'))
                let dest =path.join(__dirname, '../public/images/')
                callBack(null, dest); // images folder name
            },
            filename: (req, file, callBack) => {
                callBack(null, `${file.originalname}`)
            }
          })
          const upload = multer({ storage: storage })
        this.router.post('/createProduct',  GlobalMiddleWares.checkError, upload.single('file'), UserController.createProduct);
    }

  
   
}

export default new UserRouter().router;
