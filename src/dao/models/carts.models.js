import mongoose from 'mongoose'

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    require: true,
                    min: 1
                }
            }
        ],
        default: []
    }
})

cartSchema.pre('findOne', function() { 
    this.populate('products.product')
})

const cartsModel = mongoose.model(cartsCollection, cartSchema)

export default cartsModel
