import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    thumbnails: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true
    }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productSchema)

export default productModel
