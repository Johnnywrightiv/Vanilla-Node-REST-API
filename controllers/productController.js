const Product = require('../models/productModel')

const { getPostData  } = require('../utils')

// @desc Gets All Products
// @route GET /api/products
async function getProducts(request, response) {
  try {
    const products = await Product.findAll()

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(products))
  } catch (error) {
    console.error(error)
  }
}

// @desc Gets Single Product
// @route GET /api/product/:id
async function getProduct(request, response, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      response.writeHead(404, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Product not found'}))
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(product))
    }

  } catch (error) {
    console.error(error)
  }
}

// @desc Create A Product
// @route POST /api/products
async function createProduct(request, response) {
  try {
    const body = await getPostData(request)

    const { title, description, price } = JSON.parse(body)

    const productData = {
      title,
      description,
      price
    }

    const newProduct = await Product.create(productData)

    response.writeHead(201, { 'Content-Type': 'application/json' })
    return response.end(JSON.stringify(newProduct))     

    
  } catch (error) {
    console.error(error)
  }
}

// @desc Update A Product
// @route PUT /api/products/:id
async function updateProduct(request, response, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      response.writeHead(404, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Product not found'}))
    } else {
      const body = await getPostData(request)

      const { title, description, price } = JSON.parse(body)
  
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price
      }
  
      const updateProduct = await Product.update(id, productData)
  
      response.writeHead(200, { 'Content-Type': 'application/json' })
      return response.end(JSON.stringify(updateProduct)) 
    }
    
  } catch (error) {
    console.error(error)
  }
}


// @desc Delete Product
// @route DELETE /api/product/:id
async function deleteProduct(request, response, id) {
  try {
    const product = await Product.findById(id)

    if (!product) {
      response.writeHead(404, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: 'Product not found'}))
    } else {
      await Product.remove(id)
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ message: `Product ${id} removed` }))
    }

  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}