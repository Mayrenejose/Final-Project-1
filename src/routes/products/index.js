import { Router } from 'express'
import ProductManager from '../../dao/managerMongoDB/productManager/index.js'
import { io } from '../../app.js' 

const router = Router()

router.get('/', async(req, res) => {
    try{
        const page = parseInt(req.query?.page ?? 1)
        const limit = parseInt(req.query?.limit ?? 10)
        const sort = req.query?.sort ?? 'asc'
        const allDataProducts = await ProductManager.getAllProducts( limit, page, sort )
        const queryLimit = req.query?.limit
        if ( !queryLimit ) return res.json({data: allDataProducts})

        if( isNaN(queryLimit) || queryLimit > allDataProducts.length ) {
            return res.status(400).json({error: 'error in requested limit'})
        } else {
            const dataSlice = allDataProducts.slice(0, queryLimit)
            return res.json({data: dataSlice})
        }

    } catch (error) {
        res.status(500).send('error getting products')
    }
})

router.get('/:pid', async(req, res) => {
    try{
        const { pid } = req.params
        const dataById = await ProductManager.getProductById(pid)
        res.json({data: dataById})
    } catch (error) {
        res.status(500).send('error getting product')
    }
})

router.post('/', async(req, res) => {
    try {
        const bodyGet = req.body
        const addNewProduct = await ProductManager.addProduct(bodyGet)
        
        if ( addNewProduct === undefined ) {

            return res.status(400).json({error: 'non added product'})
            
        } else {
            io.emit('view_products' , addNewProduct)

            return res.status(200).json({ message: 'product successfully added' })
        }
    } catch(error) {
        res.status(500).send({error: 'error adding product'})
    }
})

router.put('/:pid', async(req, res) => {
    try{
        const { pid } = req.params
        const bodyUpdate = req.body
        const updateProduct = await ProductManager.updateProduct(pid, bodyUpdate)

        if ( updateProduct.modifiedCount === 0 ) {
            res.status(400).json({error: 'product not updated'})
        } else {
            res.status(200).json({ message: 'successfully updated product'})
        }

    } catch (error) {
        res.status(500).json({error: 'server error'})
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const deleteProduct = await ProductManager.deleteProduct(pid)
        
        if ( deleteProduct === 0 ) {
            res.status(400).json({ error: 'Product not deleted' })
        } else {
            io.emit('delete_product', deleteProduct)
            res.status(200).json({ message: 'Product successfully deleted' })
        }

    } catch (error) {
        res.status(500).json({ error: 'server error' })
    }
})

export default router