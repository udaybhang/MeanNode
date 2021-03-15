// import * as Jwt from 'jsonwebtoken';
import Product from '../models/Product';
import {Utils} from '../utils/Utils';
export class UserController {
    
    static async createProduct(req, res, next) {
        const name = req.body.name;
        const modal = req.body.modal;
        const price = req.body.price;
        const category = req.body.category;
        const url = req.protocol + "://" + req.get('host');
       const imgPath =  url + '/images/' + req.file.filename
        const data = {
            name: name,
            modal: modal,
            price: price,
            category: category,
            imagePath: imgPath,
            created_at: new Date(),
            updated_at: new Date()
        };
        try {
            let user = await new Product(data).save();
            res.send(user);
        } catch (e) {
            next(e);
        }
    }

    static async getProduct(req, res, next) {
        try {
            let user = await Product.find();
            res.status(200).send(user);
        } catch (e) {
            next(e);
        }
    }

static async updateProduct(req, res, next) {
    try {
       
        const url = req.protocol + "://" + req.get('host');
        req.body.imagePath =  url + '/images/' + req.file.filename;
        Product.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err, data)=>{
            if(err) {
              console.log(err);
            }
            else{
              res.status(200).json({
                message:'update success!'
              })
            }
          })
    } catch (error) {
        next(error)
    }
}

    static async getSingleProduct(req, res, next) {
        const prodId = req.params.Id;
        try {
            let P1Data = await Product.findById({_id: prodId});
            res.status(200).send(P1Data);    
        } catch (error) {
                next(error);
        }
        
        
    }

 

 
}
