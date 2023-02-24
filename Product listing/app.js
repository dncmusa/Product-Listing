document.addEventListener("DOMContentLoaded", getContainer)

const logoList = document.querySelector('.brands')
const imageList = document.querySelector('.brand-image')
const brandNameList = document.querySelector('.topbar')
const productList = document.querySelector('.product-boxes')


function getContainer() {
    fetch('tech.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        
        // Default Brand Img
        const img = document.createElement('img')
        img.src = data[0].brandImage
        img.loading = 'lazy'
        imageList.appendChild(img)

            data.forEach(function(element) {
                // Product Brands
                const productBrand = document.createElement('div')
                productBrand.className = 'brand ' + element.brandName
                productBrand.addEventListener('mouseover', getProductArea)

                // Desktop View - Logos
                const brandLogo = document.createElement('img')
                brandLogo.src = element.brandLogo
                productBrand.appendChild(brandLogo)
                logoList.appendChild(productBrand)

                // Mobile View - Brand Names
                const brandName = document.createElement('div')
                brandName.innerText = element.brandName
                brandName.addEventListener('mouseover', getProductArea)
                brandNameList.appendChild(brandName)


                // Default Product Area
                if (element.brandName == 'APPLE') {
                    getProductArea('APPLE')
                }

                // Everything of Products
                function getProductArea() {
                    // Brand Image
                    if (element != null) {
                        if (productBrand.className.split(" ")[1] == element.brandName) {
                            const img = document.createElement('img')
                            img.src = element.brandImage
                            img.style.display = 'grid'
                            img.style.position = 'absolute'
                            img.loading = 'lazy'
                            imageList.appendChild(img)
                        }
                    } else {
                        imageList.innerText = "item could not be loaded"
                        imageList.style.marginTop = "200px"
                    }

                    if (document.querySelectorAll('.product-box').length > 0) {
                        const collection = document.querySelectorAll('.product-box')

                        for (const elem of collection) {
                            elem.remove()
                        }
                    }


                    element.products.forEach(function(product) {
                        const item = document.createElement('div')
                        if (product != null) {
                            item.className = 'product-box'
                            // Product Image
                            const image = document.createElement('img')
                            image.src = product.image
                            image.loading = 'lazy'

                            const productContent = document.createElement('div')
                            productContent.className = 'productContent'
                            
                            // Product Explanation
                            const productName = document.createElement('p')
                            const name = document.createTextNode(product.name)
                            name.className = 'productName'
                            productName.appendChild(name)
                            productContent.appendChild(productName)

                            const priceDiv = document.createElement('div')
                            // Product Price
                            const priceElement = document.createTextNode(product.price + "TL")
                            const price = document.createElement('div')
                            price.className = 'productPrice'
                            price.appendChild(priceElement)
                            priceDiv.appendChild(price)
                            productContent.appendChild(priceDiv)

                            // Product OldPrice
                            if (product.oldPrice != null) {
                                const oldPrice = document.createElement('div')
                                const oldPriceElement = document.createTextNode(product.oldPrice + "TL")
                                oldPrice.className = 'productOldPrice'
                                oldPrice.appendChild(oldPriceElement)
                                priceDiv.appendChild(oldPrice)
                                productContent.appendChild(priceDiv)
                                price.style.color = "red";
                            }

                            // Buy Button
                            const basketContainer = document.createElement('div')
                            basketContainer.className = 'basketContainer'
                            const buy = document.createElement('button')
                            buy.className = 'button'
                            buy.innerHTML = 'Sepete Ekle'
                            buy.addEventListener('click', popup)
                            basketContainer.appendChild(buy)
                            productContent.appendChild(basketContainer)

                            

                            item.appendChild(image)
                            item.appendChild(productContent)
                            productList.appendChild(item)
                        }
                        
                        

                    })
                    
                }
                // Button Function and Popup
                var closeBtn = document.querySelector('#btn');;
                closeBtn.addEventListener("click", closePopup);

                function popup() {
                    document.getElementById('popupContainer').style.display = "flex";
                }
                
                setTimeout(function () {
                    document.getElementById('popupContainer').style.display = "none" 
                }, 4000);

                function closePopup() {
                    document.getElementById('popupContainer').style.display = "none";
                }
            })

    })
}