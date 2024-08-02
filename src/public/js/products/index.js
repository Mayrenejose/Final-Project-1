const goToCarts = document.getElementById('goCarts')
const urlCarts = 'http://localhost:8080/view/carts'
const select = document.querySelector('#priceOrder')
const selectCategory = document.querySelector('#categorySearch')
const btnViewProduct = document.querySelectorAll('#plusBtn')
console.log(btnViewProduct);
let query = ''

btnViewProduct.forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id')
        window.location.href = `http://localhost:8080/view/product/${productId}`
    })
})

const getLimitValue = () => document.querySelector('#limit').value
const inStock = document.getElementById("checkboxDisp")

const redirectToURL = (limit = 10, page = 1, sort='', category='') => {
    const url = `/view/products?limit=${limit}&page=${page}&query=${query}&sort=${sort}&category=${category}`
    document.location.href = url
}

const handleLimitButtonClick = () => {
    const limitValue = getLimitValue()
    redirectToURL(limitValue, 1)
}

const handlePrevButtonClick = () => {
    const prevPage = document.querySelector('#prevPage').value
    redirectToURL(getLimitValue(), prevPage)
}

const handleNextButtonClick = () => {
    const nextPage = document.querySelector('#nextPage').value
    redirectToURL(getLimitValue(), nextPage)
}

const handleSearchQueryButtonClick = () => {
    query = document.querySelector('#searchQuery').value
    redirectToURL(getLimitValue(), 1)
}

const handleClearLimitButtonClick = () => {
    redirectToURL(10, 1)
};

const handleClearQueryButtonClick = () => {
    document.querySelector('#searchQuery').value = ''
    redirectToURL(10, 1)
}

document.querySelector('#btnLimit').onclick = handleLimitButtonClick
document.querySelector('#btnPrev').onclick = handlePrevButtonClick
document.querySelector('#btnNext').onclick = handleNextButtonClick
document.querySelector('#btnSearchQuery').onclick = handleSearchQueryButtonClick
document.querySelector('#clearLimit').onclick = handleClearLimitButtonClick
document.querySelector('#clearQuery').onclick = handleClearQueryButtonClick

select.addEventListener('change',
    function(){
    const selectedOption = this.options[select.selectedIndex]
    const valueOption = selectedOption.value 
    redirectToURL(10, 1, valueOption)
})

selectCategory.addEventListener('change',
    function(){
    const selectedOption = this.options[selectCategory.selectedIndex]
    const optionCategory = selectedOption.value 
    redirectToURL(10, 1, '', optionCategory)
})

goToCarts.addEventListener('click', () => {
    window.location.href = urlCarts
})