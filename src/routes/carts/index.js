import { Router } from 'express'
import CartManager from '../../dao/managerMongoDB/cartManagerDB/index.js'

const router = Router()

router.get('/', async(req, res) => {
    try{
        const allDataCarts = await CartManager.getAllCarts()
        res.status(200).json({data: allDataCarts})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
})

router.get('/:cid', async(req, res) => {
    try{
        const { cid } = req.params
        const cartById = await CartManager.getCartById(cid)
        res.json({data: cartById})
    } catch (error) {
        res.status(400).send({message: 'error getting carts'})
    }
})

router.post('/', async(req, res) => {
    try {
        const bodyGet = req.body
        await CartManager.addCart(bodyGet)
        return res.status(200).json({ message: 'cart successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding cart'})
    }
})

router.post('/:cid/product/:pid', async(req, res) => {
    try {
        const idCart = req.params.cid
        const idProduct = req.params.pid
        await CartManager.addProductToCart(idCart, idProduct)
        
        return res.status(200).json({ message: 'product successfully added' })

    } catch(error) {
        res.status(400).send({error: 'error adding product'})
    }
})

router.delete('/:cid', async(req, res) => {
    try{
        const { cid } = req.params
        const deleteCartById = await CartManager.deleteAllProducts(cid)

        if ( !deleteCartById ) {
            res.status(400).send({message: 'error deleting carts'})
        }
        res.json({data: deleteCartById})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
})

router.delete('/:cid/product/:pid', async(req, res) => {
    try{
        const { cid } = req.params
        const { pid } = req.params
        const deleteProductById = await CartManager.deleteProduct(cid, pid)

        if ( deleteProductById.modifiedCount === 0 ) {
            res.status(400).send({message: 'error deleting product'})
        }
        
        res.json({message: 'product successfully removed'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
})

router.put('/:cid', async(req, res) => {
    try{
        const { cid } = req.params
        const cartUpdate = req.body
        const updateProducts = await CartManager.updateProductsInCart (cid, cartUpdate)
        
        if ( updateProducts.modifiedCount === 0 ) {
            res.status(400).send({message: 'error updating carts'})
        }
        res.json({message: 'cart successfully updated'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
})

router.put('/:cid/product/:pid', async(req, res) => {
    try{
        const { cid } = req.params
        const { pid } = req.params
        const quantityUpdate = req.body
        const updateQuantity = await CartManager.updateQuantityInCart(cid, pid, quantityUpdate)
        
        if ( updateQuantity.modifiedCount === 0 ) {
            res.status(400).send({message: 'error updating quantity in carts'})
        }
        res.json({message: 'quantity in cart successfully updated'})
    } catch (error) {
        res.status(500).send({message: 'error server'})
    }
})

export default router