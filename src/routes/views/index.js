import { Router } from 'express'
import ProductManager from '../../dao/managerMongoDB/productManager/index.js'
import CartManager from '../../dao/managerMongoDB/cartManagerDB/index.js'

const router = Router()

router.get('/products', async(req, res) => {
    try {
        const limit = parseInt(req.query?.limit ?? 10)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const sort = req.query?.sort
        const category = req.query.category ?? ''
        const previousPage = req.get('Referer')
        const currentUrl = `${req.protocol}://${req.get('host')}`

        const dataProducts = await ProductManager.getAllProducts(
            limit, 
            page,
            query,
            previousPage,
            currentUrl,
            sort,
            category
        )

        res.render('products', {
            dataProducts,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/product/:_id', async(req, res) => {
    try {   
        const idProduct = req.params?._id
        const infoProduct = await ProductManager.getProductById(idProduct)
        const titleProduct = infoProduct.title
        const image = infoProduct.thumbnails
        const description = infoProduct.description
        const priceProduct = infoProduct.price
        const categoryProduct = infoProduct.category
        const stockProduct = infoProduct.stock
        
        res.render('product', {
            titleProduct,
            image,
            description,
            priceProduct,
            categoryProduct,
            stockProduct,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/carts', async(req, res) => {
    try {  
       const dataCarts = await CartManager.getAllCarts()

        res.render('carts', {
            dataCarts,
            style: 'index.css',
            title: 'Carrito de Compras'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/cart/:_id', async(req, res) => {
    try {   
        const idCart = req.params?._id
        const cartId = await getCartById(idCart)
        
        res.render('cart', {
            style: 'index.css',
            title: 'Carrito de Compras'
        })

    } catch (error) {
        res.status(500).send({status:'error'})
    }
})

router.get('/:site', async(req, res) => {
    try {
        const params = req.params?.site
        const limit = parseInt(req.query?.limit ?? 2)
        const page = parseInt(req.query?.page ?? 1)
        const query = req.query?.query ?? ''
        const renderParameter = params === 'home' ? 'home' : 'realTimeProducts'
        const dataProducts = await ProductManager.getAllProducts(
            limit, 
            page,
            query,
        )
        
        res.render(renderParameter, {
            dataProducts,
            style: 'index.css',
            title: 'All products'
        })

    } catch (error) {
        res.status(500).send({error :'error getting products'})
    }
})

export default router