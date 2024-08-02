import cartsMoldel from '../../models/carts.models.js'
import ProductManager from '../productManager/index.js'

class CartManager {

    static getAllCarts = async() => {
        try{
            const getCarts = await cartsMoldel.find()
            return getCarts
        } catch (error) {
            return console.log(error)
        }
    }

    static getCartById = async(cid) => {
        try{
            const cartId = await cartsMoldel.findById(cid)
            return cartId
        } catch (error) {
            return console.log(error)
        }
    }

    static addCart = async(products) => {
        try{
            const newCart = await cartsMoldel.create(products)
            return newCart

        } catch {
            console.log(error, 'cart creation failed')
            throw new Error('error')
        }
    }
    
    static addProductToCart = async(idCart, idProduct) => {
        try {
            const cart = await this.getCartById(idCart)
            const product = await ProductManager.getProductById(idProduct)
            const searchIdCart = cart._id == idCart ? true : false
            const searchIdProduct = cart.products.find(
                (item) => item.product == idProduct
            )           
            
            if ( product.length === 0 ) throw new Error('the product does not exist')
            if ( !searchIdCart ) throw new Error('the car does not exist')
                console.log(searchIdProduct);
            if ( !searchIdProduct ) {
                const newProductToCart = {
                    product: idProduct,
                    quantity: 1
                }
                cart.products.push(newProductToCart)
            } else {
                searchIdProduct.quantity++
            }

            await cart.save()
            return cart

        } catch (error) {
            console.log(error, 'The product was not added to the cart')
            throw new Error('error')
        }
    }

    static deleteAllProducts = async(idCart) => {
        try {
            const deleteCart = await cartsMoldel.findByIdAndUpdate(idCart, { products: [] }, { new: true }).lean().exec()
            return deleteCart
        } catch (error) {
            return console.log(error)
        }
    }

    static deleteProduct = async(idCart, idProduct) => {
        try {
            const cart = await this.getCartById(idCart)
            const newCart = cart.products.filter(item => item.product._id != idProduct)
            cart.products = newCart
            
            const updateCart = await cartsMoldel.updateOne({_id: idCart}, cart)
            return updateCart
        } catch (error) {
            return console.log(error)
        }
    }

    static updateProductsInCart = async(idCart, body) => {
        try {
            const cart = await this.getCartById(idCart)
            cart.products = body
            
            const updateProductsCart = await cartsMoldel.updateOne({_id: idCart}, cart)
            return updateProductsCart
        } catch (error) {
            return console.log(error)
        }
    }

    static updateQuantityInCart = async(idCart, idProduct, body) => {
        try {
            const cart = await this.getCartById(idCart)
            cart.quantity = body
            
            const updateQuantityCart = await cartsMoldel.updateOne({_id: idCart}, cart)
            return updateQuantityCart
        } catch (error) {
            return console.log(error)
        }
    }
}

export default CartManager