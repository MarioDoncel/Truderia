const Cart = {
    init(oldCart) {
        if(oldCart){
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                totalPrice: 0,
            }
        }

        return this
    },
    addOne(product){
        
        let cartHasProduct = this.findItem(product)

        if (!cartHasProduct) {
            cartHasProduct = {
                product : {...product},
                quantity: 0,
                totalPrice: 0
            },
            this.items.push(cartHasProduct)
        }
        
        let additionalsPrice = 0
        if(cartHasProduct.product.additional) cartHasProduct.product.additional.forEach(additional => {
            additionalsPrice += additional.price * additional.quantity
        }) 

        const totalProductPrice = cartHasProduct.product.price + additionalsPrice
        cartHasProduct.quantity++
        cartHasProduct.totalPrice = cartHasProduct.quantity * totalProductPrice
        
        this.total.quantity++
        this.total.totalPrice += totalProductPrice

        return this
    },
    removeOne(product){
        const item = this.findItem(product)

        item.quantity--
        item.totalPrice -= product.price

        this.total.quantity--
        this.total.totalPrice -= product.price

        if(item.quantity == 0) this.deleteProduct(product)

        return this
    },
    deleteItem(product){
        const item = this.findItem(product)
        
        this.total.quantity -= item.quantity
        this.total.totalPrice -= item.totalPrice

        this.items = this.items.filter(item => product.flavour != item.product.flavour || product.category != item.product.category || item.product.additional != product.additional )
    
        return this
    },
    findItem(product){
        return  this.items.find(item => item.product.flavour == product.flavour && product.category == item.product.category && JSON.stringify(item.product.additional) == JSON.stringify(product.additional))
        
    }

}

// Views

function openView(content, contentClass) {
    const view = document.querySelector('#view')
    const menu = document.querySelector('#menu')
    menu.classList.add('hideMenu')
    view.classList.add('active')
    view.classList.add(contentClass)
    view.innerHTML = content
    if(contentClass == "showCart") {
        localStorage.removeItem('paymentMethod')
        localStorage.removeItem('changeNeeded')
        localStorage.removeItem('receiveMethod')
        localStorage.removeItem('deliveryTax')
        getTotal()
    }
    hideFixedCart()
}
function closeView() {
    const view = document.querySelector('#view')
    const menu = document.querySelector('#menu')
    view.classList.remove('active')
    view.removeAttribute("class")
    view.innerHTML = ''
    menu.classList.remove('hideMenu')
    loadFixedCart()
}

// Select Item

function selectItemHtml(itemChosed,categoryChosed) {
    const isTrudel = categoryChosed.category == 'trudel' || categoryChosed.category == 'miniTrudel'
    const isMini = categoryChosed.category == 'miniTrudel'? true: false
    const isDrinks = categoryChosed.category == 'drinks'? true: false
    const additionalData = menu.find(category=>category.category == 'additional')
    const miniadditionalData = menu.find(category=>category.category == 'miniAdditional')
    const drinksData = menu.find(category=>category.category == 'drinks')
    const icecreamData = menu.find(category=>category.category == 'icecream')

    function fillOptionals(data) {
        data.items.forEach(additional => {
            html +=`
                <div class="input">
                    
                    <div class="quantity">
                        <i class="fas fa-minus" onclick="minusOneAdd(this)"></i>
                        <span>0</span> 
                        <i class="fas fa-plus" onclick="plusOneAdd(this)"></i>
                    </div>

                    <div class="image">
                        <img src="${additional.image}" alt="">
                    </div>

                    <div class="flavour">
                        <p>${additional.flavour}</p>
                    </div>
                    <div class="price">
                        <p>+${additional.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>                          
                </div><!--input-->
            `
        })
    }

    let html = `
        <div class="image">
            <img src="${itemChosed.image}" alt="">
        </div><!--image-->

        <div class="description container">
            <h1>${categoryChosed.name.slice(0, -1)} ${itemChosed.flavour}</h1>
            <p>${itemChosed.description}</p>
        </div><!--description-->   
    `

    if(isTrudel && itemChosed.flavour != 'KIT MINI TRUDEL'){
        html += `
            <div class="addToOrder">
        `
        if (isMini){
            html += `
                <div class="title">${miniadditionalData.name}</div>
                <div class="options">
            `   
            fillOptionals(miniadditionalData)
            
        } else {
            html += `
                <div class="title">${additionalData.name}</div>
                <div class="options">
            `   
            fillOptionals(additionalData)
            
        }

        html += `
                </div><!--options-->
            </div><!--addToOrder-->

            <div class="addToOrder">
                <div class="title">${icecreamData.name}</div>
                <div class="options">
        `
        fillOptionals(icecreamData)

        html += `
            </div><!--options-->
        </div><!--addToOrder-->
        `
    }       
    if(!isDrinks){
        html += `
            <div class="addToOrder">
        `
        html += `
                <div class="title">${drinksData.name}</div>
                <div class="options">
            `   
            fillOptionals(drinksData)

            html += `
            </div><!--options-->
        </div><!--addToOrder-->
        `
    }

    html +=`
    <div class="addToOrder">
    <div class="title">OBSERVAÇÕES</div>
    <textarea></textarea>
    </div><!--addToOrder-->
    `

    html += ` 
        <div class="total">
            <div class="quantity">
                <div style="font-weight: bold">Qntde. </div>
                <div class="plusMinus">
                    <i class="fas fa-minus" onclick="minusOneProduct()"></i>
                    <span>1</span> 
                    <i class="fas fa-plus" onclick="plusOneProduct()"></i>
                </div>
            </div>
            <div class="value" onclick="addToCart()">
                <span>Adicionar ao carrinho</span>
                <span>${itemChosed.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
        </div>
        <div class="closeView">
                <span onclick="closeView()">Cancelar</span>
        </div>
        
    `
    return html
}

function choose(item) {
    // Extract selected category value from HTML
    let category = item.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.categoryName h3').innerHTML
    // Get category on data info
    category = menu.find(menuCategory => menuCategory.name == category)
    localStorage.setItem('categoryChosed', JSON.stringify(category))
    //Get item from data.js
    let itemChosed = category.items.find(product => item.parentNode.parentNode.parentNode.parentNode.querySelector('.itemName p').innerText == product.flavour)
    itemChosed = {
        ...itemChosed,
        category: category.category,
        additional:[],
    }

    localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

    const itemHasMini = itemChosed.miniPrice? true : false

    if (itemHasMini ){
        let modalHtml = `
            <h3>Qual tamanho você deseja?</h3>
            <div class="buttons">
                <button onclick="selectSize(this.innerText)">Normal</button>
                <button onclick="selectSize(this.innerText)">Mini</button>
            </div>
        `
        hideFixedCart()
        modalOpen(modalHtml, 'normalOrMini')

    } else {
        const itemHtml = selectItemHtml(itemChosed, category)

        openView(itemHtml, 'selectItem')
        window.scrollTo(0, 0)
    }
}



function selectSize(size){
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    let categoryChosed = JSON.parse(localStorage.getItem('categoryChosed'))

    let itemHtml = selectItemHtml(itemChosed, categoryChosed)

    if(size.toLowerCase() == 'mini') {
        categoryChosed = `mini${categoryChosed.category}`
        let category = menu.find(menuCategory => menuCategory.category.toLowerCase() == categoryChosed)
        localStorage.setItem('categoryChosed', JSON.stringify(category))
        itemChosed.category = category.category
        itemChosed.price = category.items.find(flavour => itemChosed.flavour == flavour.flavour).price
        localStorage.setItem('itemChosed', JSON.stringify(itemChosed))
        
        itemHtml = selectItemHtml(itemChosed, category)
    } 
    modalClose()
    openView(itemHtml, 'selectItem')
    window.scrollTo(0, 0)
}

// Product complements

function minusOneAdd(target) {
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const categoryName = target.parentNode.parentNode.parentNode.parentNode.querySelector('.title').innerText
    const addCategory = menu.find(category=> category.name == categoryName)
    const addTarget = addCategory.items.find(item=>item.flavour == target.parentNode.parentNode.querySelector('.flavour p').innerText)
    const totalPrice = () => {
        let total = itemChosed.price 
        if(itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity  
        return total     
    }
    

    if (target.parentNode.querySelector('span').innerHTML > 0) {
        target.parentNode.querySelector('span').innerHTML-- 

        itemChosed.additional.find(add => add.flavour == addTarget.flavour).quantity--

        if(itemChosed.additional.find(add => add.flavour == addTarget.flavour).quantity == 0) {
            const index = itemChosed.additional.indexOf(itemChosed.additional.find(add => add.flavour == addTarget.flavour))
            itemChosed.additional.splice(index, 1)
        }

        localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

        document.querySelector('.total .value span:nth-child(2)').innerHTML = totalPrice().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        
    }
}

function plusOneAdd(target) {
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const categoryName = target.parentNode.parentNode.parentNode.parentNode.querySelector('.title').innerText
    const addCategory = menu.find(category=> category.name == categoryName)
    let addTarget = addCategory.items.find(item=>item.flavour == target.parentNode.parentNode.querySelector('.flavour p').innerText)
    const totalPrice = () => {
        let total = itemChosed.price 
        if(itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity  
        return total     
    }
    
    target.parentNode.querySelector('span').innerHTML++ 

    if (!itemChosed.additional.find(add => add.flavour == addTarget.flavour)) {
        addTarget = {
            ...addTarget,
            quantity: 1,
            category: addCategory.name
        }
        itemChosed.additional.push(addTarget)
    } else {
        itemChosed.additional.find(add => add.flavour == addTarget.flavour).quantity++
    }

    
    localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

    document.querySelector('.total .value span:nth-child(2)').innerHTML = totalPrice().toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    
    
}

function minusOneProduct(){
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalPrice = (totalQuantity) => {
        let total = itemChosed.price 
        if(itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity  
        return total     
    }

    if(document.querySelector('.total .quantity span').innerHTML > 0) {
        document.querySelector('.total .quantity span').innerHTML--
        const totalQuantity = document.querySelector('.total .quantity span').innerHTML
        document.querySelector('.total .value span:nth-child(2)').innerHTML = totalPrice(totalQuantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }
}

function plusOneProduct(){
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalPrice = (totalQuantity) => {
        let total = itemChosed.price 
        if(itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity  
        return total     
    }

    document.querySelector('.total .quantity span').innerHTML++
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    document.querySelector('.total .value span:nth-child(2)').innerHTML = totalPrice(totalQuantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

function addToCart() {
    const itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    const cart = JSON.parse(localStorage.getItem('cart'))
    const note = document.querySelector('.addToOrder textarea').value
    if(note) itemChosed.note = note

    for (let i = 0; i < totalQuantity; i++) {
        localStorage.setItem('cart', JSON.stringify(Cart.init(cart).addOne(itemChosed))) 

   }

   closeView()

   const cartHml = showCartHtml(JSON.parse(localStorage.getItem('cart')))

   openView(cartHml, 'showCart')
   window.scrollTo(0, 0)
   
}

// Show Cart

function showCartHtml(cart){
    const client = JSON.parse(localStorage.getItem('client'))
    
    
    
    let html = `
    <div class="cartResume">
        <h2>Resumo do Pedido</h2>
    </div>

    <div class="container cartSections">
        <div class="section">
            <h3>Itens no carrinho</h3>
        </div>
        
        <div class="cartItems">
    `
    cart.items.forEach(item=> {
        html += `
            <div class="item">
                <div class="quantity">${item.quantity}x</div>
                <div class="category">${menu.find(category => item.product.category == category.category).name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                    return a.toUpperCase();
                  }).slice(0, -1)}</div>
                <div class="flavourAndAdd">
                    <div class="flavour">${item.product.flavour.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                        return a.toUpperCase();
                      })}</div>`

        if(item.product.additional.length > 0){
            item.product.additional.forEach(additional => {
                html += `
                <div class="add">+${additional.quantity}x ${additional.flavour.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                    return a.toUpperCase();
                  })}</div>
                `
            })
        }

        html +=`
                </div>
                <div class="price">${item.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <i class="far fa-trash-alt" onclick="deleteFromCart(this)"></i>
            </div><!--ITEM-->
        `
    })

    html += `
        </div> <!--CART ITEMS-->

        <div class="buyMore" onclick="closeView()"> Adicionar mais itens...</div>

    </div> <!--CART SECTION-->
    `

    html += `
    <div class="container cartSections">
            <div class="section">
                <h3>Dados</h3>
            </div>
            <div class="buyerData">
                <div class="input">
                    <div class="field">Nome<span style="color:red; font-weight:bold"> *</span></div>
                    <input 
                        type="text" 
                        name="name" 
                        value="${client? client.data.name : ''}" 
                        placeholder="Nome completo" 
                        onblur="localStorage.setItem('client', JSON.stringify(Client.init().updateName(this.value)))"
                    >
                </div>
                <div class="input">
                    <div class="field">Telefone <span style="color:red; font-weight:bold"> *</span></div>
                    <input 
                        type="text" 
                        name="phone" 
                        value="${client? client.data.telephone : ''}" 
                        placeholder="(XX)XXXXX-XXXX" 
                        onblur="localStorage.setItem('client', JSON.stringify(Client.init().updateTelephone(this.value)))"
                        oninput="Mask.apply(this, 'telephoneBRL')"
                    >
                </div>
                
            </div>
        </div>
    `

    html += `
    <div class="container cartSections">

            <div class="section">
                <h3>Forma de recebimento</h3>
            </div>

            <div class="deliveryMethod">
                <div class="deliveryOptions">
                    <div class="takeAway" onclick="selectTakeAway()">
                        <p>Retirada</p>
                        <div class="image" >
                            <img src="./assets/Menu/Delivery/food-withdraw.png" alt="">
                        </div>
                    </div>
                    <div class="delivery" onclick="selectDelivery()">
                        <p>Entrega</p>
                        <div class="image" >
                            <img src="./assets/Menu/Delivery/food-delivery.png" alt="">
                        </div>
                    </div>
                </div>

                <div class="takeAwaySelected hide ">
                    <h4>Retirar em </h4>
                    <p>Rua Cândida Lacerda, 470, Centro - Araras/SP</p>
                    <span>Próximo a escadaria da rodoviaria e a Av. do Café</span>
                </div>

                <div class="deliverySelected hide ">
                    <h4>Endereço para entrega</h4>
                    <div class="grid2">
                        <div class="input">
                            <div class="field">CEP </div>
                            <input 
                                type="text" 
                                name="cep" 
                                value="${client? client.data.address.zipCode : ''}" 
                                placeholder="XXXXX-XXX" 
                                onblur="getAddress(this.value)"
                                oninput="Mask.apply(this, 'zipCodeBRL')"
                            >
                        </div>
                        <div class="input">
                            <div class="field">Numero <span style="color:red; font-weight:bold"> *</span></div>
                            <input 
                                type="text" 
                                name="houseNumber" 
                                value="${client? client.data.address.number : ''}" 
                                placeholder="" 
                                onchange="localStorage.setItem('client', JSON.stringify(Client.init().updateNumber(this.value)))"
                            >
                        </div>
                    </div>

                    <div class="input">
                        <div class="field">Rua <span style="color:red; font-weight:bold"> *</span></div>
                        <input 
                            type="text" 
                            name="street" 
                            value="${client? client.data.address.street : ''}" 
                            placeholder="" 
                            onchange="localStorage.setItem('client', JSON.stringify(Client.init().updateStreet(this.value)))"
                            onfocus="initAutocomplete()"
                        >
                    </div>
                    <div class="input">
                        <div class="field">Bairro <span style="color:red; font-weight:bold"> *</span></div>
                        <input 
                            type="text" 
                            name="district" 
                            value="${client? client.data.address.district : ''}" 
                            placeholder="" 
                            onblur="localStorage.setItem('client', JSON.stringify(Client.init().updateDistrict(this.value)))"
                            onchange="getDeliveryTax()"
                        >
                    </div>
                    <div class="input">
                        <div class="field">Complemento <span>(apartamento, condominio, etc...)</span></div>
                        <input 
                            type="text" 
                            name="complement" 
                            value="${client? client.data.address.complement : ''}" 
                            placeholder="" 
                            onblur="localStorage.setItem('client', JSON.stringify(Client.init().updateComplement(this.value)))"
                        >
                    </div>  

                </div>

            </div>
        </div>
    `

    html += `
    <div class="container cartSections">
            <div class="section">
                <h3>Pagamento</h3>
            </div>
            <div class="payment">
                <div class="select">
                    <div class="field">Meio de Pagamento <span style="color:red; font-weight:bold"> *</span></div>
                    <select name="select" onchange="selectPayment(this.value)">
                        <option value="default" selected disabled>-- Escolha -- </option>
                        <option value="money">Dinheiro</option>
                        <option value="pix">Pix</option>
                        <option value="creditCard">Cartão de crédito</option>
                        <option value="debitCard">Cartão de débito</option>
                    </select>
                </div>
                <div class="input hide">
                    <div class="field">Troco para </div>
                    <input 
                        type="text" 
                        name="change" 
                        value="" 
                        placeholder="R$" 
                        onchange="setChangeValue(this.value)"
                        oninput="Mask.apply(this, 'formatBRL')"
                    >
                </div>
                <div class="pixSelected hide">
                    <h4>Chave PIX</h4>
                    <p>41925485000101</p>
                    <span>CNPJ 41.925.485/0001-01 - Mariana Fanaro\n</span>
                    <br>
                    <span style="font-weight:bold">Após realizar o pedido lembre-se de enviar o comprovante da transação em nosso Whatsapp.</span>
                </div>
            </div>
        </div>
    `
    html += `
    <div class="container cartSections">
            <div class="section">
                <h3>Total</h3>
            </div>
            
            <div class="totalItems">
                <div class="item">
                    <div class="subValue">
                        <div>Subtotal</div>
                        <div id="subTotalValue">${cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                    </div>
                    <div class="deliveryTax">
                        <div>Taxa de entrega</div>
                        <div id="deliveryTaxValue">${ ''}</div>
                    </div>
                </div>
                        

                <div class="item total">
                    <div>Total</div>
                    <div id="totalValue">${cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                </div><!--total-->

            </div> <!--TOTAL ITEMS-->

        </div>
    `

    html += `
        <div id="cartSendWhats" onclick="sendToWhatsApp()">
                <h2>Enviar pedido para Whatsapp</h2>
            </div>

            <div class="closeView">
                <span onclick="closeView()">Voltar</span>
            </div>
        </div>`


return html
}

function deleteFromCart(target){
    let cart = JSON.parse(localStorage.getItem('cart'))
    const elementToDelete = target.parentNode
    const cartItemsNodes = target.parentNode.parentNode.children
    const indexOfItem = Array.from(cartItemsNodes)
                        .map((element, index) => ({element, index}))
                        .find(({element}) => element == elementToDelete).index
    const productToDelete = cart.items[indexOfItem]

    cart = Cart.init(cart).deleteItem(productToDelete.product)
    localStorage.setItem('cart', JSON.stringify(cart))
    elementToDelete.remove()
    getTotal()
    if (cart.total.quantity < 1) {
        localStorage.removeItem('cart')
        closeView()
    }
}

function selectTakeAway() {
    const takeAwayCard = document.querySelector('.takeAway')
    const deliveryCard = document.querySelector('.delivery')
    const takeAwayElement = document.querySelector('.takeAwaySelected')
    const deliveryElement = document.querySelector('.deliverySelected')
 
    takeAwayElement.classList.remove('hide')
    deliveryElement.classList.add('hide')
    takeAwayCard.classList.add('box-shadow-none')
    deliveryCard.classList.remove('box-shadow-none')
    localStorage.setItem('receiveMethod', JSON.stringify('takeAway'))
    localStorage.removeItem('deliveryTax')
    getTotal()
}
function selectDelivery() {
    const takeAwayCard = document.querySelector('.takeAway')
    const deliveryCard = document.querySelector('.delivery')
    const takeAwayElement = document.querySelector('.takeAwaySelected')
    const deliveryElement = document.querySelector('.deliverySelected')
    const deliveryTax = Number(JSON.parse(localStorage.getItem('deliveryTax')))
    const district = document.querySelector('.deliveryMethod input[name="district"]').value
    takeAwayElement.classList.add('hide')
    deliveryElement.classList.remove('hide')
    takeAwayCard.classList.remove('box-shadow-none')
    deliveryCard.classList.add('box-shadow-none')
    localStorage.setItem('receiveMethod', JSON.stringify('delivery'))
    if(district)getDeliveryTax()
}

const Client = {
    init() {
        const oldClient = JSON.parse(localStorage.getItem('client'))
        if(oldClient){
            this.data = oldClient.data 
        } else {
            this.data = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
            }
        }
        return this
    },
    updateVIACEP(newData){
        let clientExists = JSON.parse(localStorage.getItem('client'))
        // if(clientExists) this.data = this.data.data

        if (!clientExists) {
            clientExists =  {
                data:{
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                }
            },
            
            this.data = clientExists.data
        }
        this.data.address.street = newData.address.street
        this.data.address.district = newData.address.district
        this.data.address.zipCode = newData.address.zipCode


        return this
    },
    updateName(name){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.name = name

        
        return this
    },
    updateTelephone(telephone){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.telephone = telephone
        return this
    },
    updateZipCode(zipCode){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.address.zipCode = zipCode
        return this
    },
    updateStreet(street){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.address.street = street
        return this
    },
    updateDistrict(district){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.address.district = district
        return this
    },
    updateNumber(number){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.address.number = number
        return this
    },
    updateComplement(complement){
        let clientExists = JSON.parse(localStorage.getItem('client'))

        if (!clientExists) {
            clientExists = {
                    name: '',
                    telephone: '',
                    address: {
                        zipCode: '',
                        street: '',
                        district: '',
                        number: '',
                        complement: ''
                    }
                
            },
            this.data = clientExists
        }
        this.data.address.complement = complement
        return this
    },
}

const Mask ={
    apply(input, func) { //aplicador com setTimeout .... input neste caso é definido no HTML com o THIS  .. func a mask que deseja aplicar
        setTimeout(function () {
            input.value = Mask[func](input.value)
        },1)
    },
    formatBRL(value) {
    value = value.replace(/\D/g, "")  // Substituir todos os caracteres que não sejam numeros

    return new Intl.NumberFormat('pt-BR', {
        style:'currency',
        currency:'BRL'
    }).format(value/100) // Formatando para reais
    },
    zipCodeBRL(value) {
        const formattedValue = value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})/, "$1-$2");
        
        return formattedValue;
    },
    telephoneBRL(value) {
        const formattedValue = value.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
        
        return formattedValue;
    },
}

const alerts = {
    wrongCep: `CEP inválido.`,
    cepNotFound: `CEP não encontrado para calcular a taxa de entrega. \nSem problemas!\nPode seguir com o pedido e resolveremos essa questão através do Whatsapp. =)`,
    blankFields:`Favor preencher todos os campos obrigatórios, são aqueles que contém  <span style="color:red; font-weight:bold">*</span> .`,
    addresBlank:`Favor preencher todos os campos obrigatórios de endereço marcados com <span style="color:red; font-weight:bold">*</span> para opção de entrega.`,
    noReceiveMethod:`Favor escolher uma forma de recebimento do pedido.`,
    noPaymentMethod:`Favor escolher uma forma de pagamento.`,
    deliveryTaxNotFound:`Não encontramos a taxa de entrega para este bairro. \n Sem problemas !! Pode seguir com o pedido e resolveremos essa questão através do Whatsapp. =)`,
}

const getAddress = async(zipCode) => {
    const zipCodeNumbers = zipCode.replace(/\D/g, '')
    const validacep = /^[0-9]{8}$/.test(zipCodeNumbers)
    if(!validacep) {
        alertOpen(alerts.wrongCep, 'alerts', ".deliveryMethod")
        return
    }
    const url = `https://viacep.com.br/ws/${zipCodeNumbers}/json/`
    const API = await fetch(url)
    const dados = await API.json()
    if(dados.erro) return alertOpen(alerts.cepNotFound, "alerts", ".deliveryMethod")

    document.querySelector('input[name="street"]').value = dados.logradouro
    document.querySelector('input[name="district"]').value = dados.bairro
    const client = {
        address: {
            street: dados.logradouro,
            district: dados.bairro,
            zipCode: dados.cep
        }
    }

    localStorage.setItem('client', JSON.stringify(Client.init().updateVIACEP(client)))
    getDeliveryTax()
}

function getDeliveryTax() {
    const district = document.querySelector('.deliveryMethod input[name="district"]').value
    function removeAcento (text){                                                               
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛÜ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
    }
    try {
        const price = districts.find(districtData => {
            return (removeAcento(districtData.name).toLowerCase()  == removeAcento(district).toLowerCase())
        }).price
        document.querySelector('#deliveryTaxValue').innerHTML = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        localStorage.setItem('deliveryTax', JSON.stringify(price))
        getTotal()
    } catch (error) {
        console.log(error)
        localStorage.removeItem('deliveryTax')
        alertOpen(alerts.deliveryTaxNotFound, "alerts","input[name=district]" )
    }
    
}
    
function selectPayment(paymentMethod) {
    const changeInput = document.querySelector('.showCart .payment .input')
    const pix = document.querySelector('.pixSelected')
    let paymentSelected = ''

    paymentMethod == 'money'? changeInput.classList.remove('hide') : changeInput.classList.add('hide')
    paymentMethod == 'pix'? pix.classList.remove('hide') : pix.classList.add('hide')

    switch (paymentMethod) {
        case 'money':
            paymentSelected = 'Dinheiro'
            break;
        case 'pix':
            paymentSelected = 'PIX'
            break;
        case 'creditCard':
            paymentSelected = 'Cartão de crédito'
            break;
        case 'debitCard':
            paymentSelected = 'Cartão de débito'
            break;
    
        default:
            break;
    }

    localStorage.setItem('paymentMethod', JSON.stringify(paymentSelected))
}
function setChangeValue(value){
    localStorage.setItem('changeNeeded', JSON.stringify(value))
    if(!value) localStorage.removeItem('changeNeeded', JSON.stringify(value))
}

function getTotal() {
    const totalValueElement = document.querySelector('#totalValue')
    const subTotalValueElement = document.querySelector('#subTotalValue')
    const deliveryTaxValueElement = document.querySelector('#deliveryTaxValue')
    const receiveMethod = JSON.parse(localStorage.getItem('receiveMethod'))
    const cart = JSON.parse(localStorage.getItem('cart')) 
    const deliveryTax = Number(JSON.parse(localStorage.getItem('deliveryTax')))

    subTotalValueElement.innerHTML = cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    // deliveryTaxValueElement.innerHTML = deliveryTax || ''

    if(deliveryTax) {
        totalValueElement.innerHTML = (cart.total.totalPrice + deliveryTax).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        
        if (receiveMethod) deliveryTaxValueElement.innerHTML = deliveryTax.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    } else {
        totalValueElement.innerHTML = cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        deliveryTaxValueElement.innerHTML = ''
    }
}

function sendToWhatsApp() {
    const client = JSON.parse(localStorage.getItem('client'))
    const cart = JSON.parse(localStorage.getItem('cart'))
    const receiveMethod = JSON.parse(localStorage.getItem('receiveMethod'))
    const deliveryTax = JSON.parse(localStorage.getItem('deliveryTax'))
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
    const changeNeeded = JSON.parse(localStorage.getItem('changeNeeded'))
    let note = document.querySelector('#note textarea')


    if (!client.data.name || !client.data.telephone ) return alertOpen(alerts.blankFields, 'alerts', ".buyerData") 

    if(!receiveMethod) return alertOpen(alerts.noReceiveMethod, 'alerts', ".deliveryMethod")

    if(receiveMethod == 'delivery' && (!client.data.address.street || !client.data.address.district || !client.data.address.number)) {
        alertOpen(alerts.addresBlank, "alerts", ".deliveryMethod")
        return
    }

    if(!paymentMethod) return alertOpen(alerts.noPaymentMethod, 'alerts',".payment") 

    let texto = `
    *PEDIDO:*
    *Nome:* ${client.data.name} 
    *Telefone:* ${client.data.telephone}`
    if(receiveMethod == 'delivery') {
        texto += `
    *Endereço:* 
    ${client.data.address.street}, ${client.data.address.number}.
    ${client.data.address.district} - ${client.data.address.zipCode} 
    ${client.data.address.complement}`
    } else {
        texto += `
        
    *RETIRADA*
    `
    }
    
    
    for (const item of cart.items) {
        texto += `
        ${item.quantity}x *${menu.find(category=> category.category == item.product.category).name.slice(0, -1).replace(/-/g,' ')} - ${item.product.flavour}*`
        if(item.product.additional){
            item.product.additional.forEach(additional => {
                texto += `
                +${additional.quantity}x ${additional.flavour}`
            });
        }
        if(item.product.note)texto +=`
            *Observação:* ${item.product.note}`
        
    }
    texto += `\n
    *Subtotal:* ${cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
    *Taxa de entrega:* ${deliveryTax? deliveryTax.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}
    *Total:* ${deliveryTax? (cart.total.totalPrice+deliveryTax).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : cart.total.totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`


    texto += `
    *Forma de Pagamento:* ${paymentMethod}
    `
    if (paymentMethod == 'money' && changeNeeded) {
        texto += `*Troco para:* ${changeNeeded} `
    }

    texto = window.encodeURIComponent(texto);
    
  
    window.open("https://api.whatsapp.com/send?phone=5519996129909&text=" + texto, "_blank");
}


loadFixedCart()

