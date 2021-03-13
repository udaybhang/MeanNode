import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    modal: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    created_at: {type: Date, required: true, default: new Date()},
    updated_at: {type: Date, required: true, default: new Date()},
});

export default model('productItem', userSchema);
