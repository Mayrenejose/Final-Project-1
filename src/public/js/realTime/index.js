const socket = io()
const listProducts = document.querySelector('#boxProducts')

function createProductElement(product) {
    const productoDiv = document.createElement('div')
    productoDiv.className = 'boxProduct'
    const image = document.createElement('img')
    image.className = 'image'
    image.src = product.thumbnails
    const infoDiv = document.createElement('div')
    infoDiv.className = 'boxInfo'
    const h2 = document.createElement('h2')
    h2.textContent = product.title
    const firstParagraph = document.createElement('p')
    firstParagraph.textContent = product.description;
    const secondParagraph = document.createElement('p')
    secondParagraph.textContent = `Precio: ${product.price}`

    infoDiv.appendChild(h2)
    infoDiv.appendChild(firstParagraph)
    infoDiv.appendChild(secondParagraph)
    productoDiv.appendChild(image)
    productoDiv.appendChild(infoDiv)

    return productoDiv
}

socket.on('view_products', (allDataProducts) => {
    listProducts.innerHTML = ''
    
    allDataProducts.forEach( product => {
        const containerProducts = createProductElement(product)
        listProducts.appendChild(containerProducts)
    }) 

})

socket.on('delete_product', (deleteProduct) => {
    listProducts.innerHTML = ''
    
    deleteProduct.forEach( product => {
        const productElement = createProductElement(product)
        listProducts.appendChild(productElement)
    })
})