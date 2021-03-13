// import * as Jwt from 'jsonwebtoken';
import Product from '../models/Product';
import {Utils} from '../utils/Utils';
import * as Bcrypt from 'bcrypt';
export class UserController {
    
    static async createProduct(req, res, next) {
        const name = req.body.name;
        const modal = req.body.modal;
        const price = req.body.price;
        const category = req.body.category;
        const data = {
            name: name,
            modal: modal,
            price: price,
            category: category,
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
        console.log('req.body._id===', req.body._id);
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
        console.log(prodId)
        try {
            let P1Data = await Product.findById({_id: prodId});
            res.status(200).send(P1Data);    
        } catch (error) {
                next(error);
        }
        
        
    }
//  static async login(req, res, next) {
//     const password = req.query.password;
//     const user = req.user;
//     console.log(user)
//      try { 
//          await Utils.comparePassword({
//         plainPassword: password,
//         encryptedPassword: user.password
//     });
//     const token = Jwt.sign({email: user.email, _id: user._id},
//         'secret', {expiresIn: '120d'});
//     const data = {token: token, user: user};
//     res.json(data);
// } catch (e) {
//          next(e);
//      }
//  }

 static async resendVerificationEmail(req, res, next) {
    const email = req.user.email;
    try {
        const user: any = await Product.findOneAndUpdate({email: email}, {
        });
        if (user) {
            res.send(user);
         } else {
            throw new Error('User Does Not Exist');
        }
    } catch (e) {
        next(e);
    }
}

//  static async updateProfilePic(req, res, next) {
//     const userId = req.user.user_id;
//     const fileUrl = 'http://localhost:5000/' + req.file.path;
//     try {
//         const user = await User.findOneAndUpdate({_id: userId}, {
//             updated_at: new Date(),
//             profile_pic_url: fileUrl
//         }, {new: true});
//         console.log(user)
//         res.send(user);
//     } catch (e) {
//         next(e);
//     }
// }
 
}
