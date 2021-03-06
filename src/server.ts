import * as express from 'express';
import * as mongoose from 'mongoose';
const path = require('path');
import UserRouter from './routers/UserRouter';
import bodyParser = require('body-parser');

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.configureBodyParser();
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
        var cors = require('cors');
        // this.app.use(cors({origin: '*','exposedHeaders' : ['X-Total-Count','Content-Type']}));
        this.app.use(function(req, res, next) {
            //set headers to allow cross origin request.
                res.header("Access-Control-Allow-Origin", "*");
                res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
    }

    connectMongoDb() {
        mongoose.connect("mongodb://localhost:27017/product", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log('connected to database');
        });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    setRoutes() {
        this.app.use('/api/product', UserRouter);
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        })
    }

    handleErrors() {
        // this handle run time error
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            })
        })
    }
}
