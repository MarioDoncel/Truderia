import {menu} from './data'

window.selectItemHtml = (itemChosed, categoryChosed) => {
    const isTrudel = categoryChosed.category == 'trudel' || categoryChosed.category == 'miniTrudel'
    const isSavoryTrudel = categoryChosed.category == 'savoryTrudel' 
    const isMini = categoryChosed.category == 'miniTrudel' 
    const isMiniTrudelttone = categoryChosed.category == 'miniChristmasTrudel'
    const isDrinks = categoryChosed.category == 'drinks' 
    const isRings = categoryChosed.category == 'rings' 
    const isTrudelttone = categoryChosed.category == 'christmasTrudel' || categoryChosed.category == 'miniChristmasTrudel'
    const additionalData = menu.find(category => category.category == 'additional')
    const savoryAdditionalData = menu.find(category => category.category == 'savoryAdditional')
    const miniadditionalData = menu.find(category => category.category == 'miniAdditional')
    const drinksData = menu.find(category => category.category == 'drinks')
    const icecreamData = menu.find(category => category.category == 'icecream')
    const stuffingPotsData = menu.find(category => category.category == 'stuffingPots')

    function fillOptionals({ name, items }) {
        html += `
        <div class="addToOrder">
        `
        html += `
            <div class="title"><p>${name}</p>${name == 'POTES DE RECHEIO' ? '<small>&nbsp; (50g)</small>' : ''}</div>
            <div class="options">
        `

        items.forEach(({ image, flavour, price }) => {
            html += `
                <div class="input">
                    
                    <div class="quantity">
                        <i class="fas fa-minus" onclick="minusOneAdd(this)"></i>
                        <span>0</span> 
                        <i class="fas fa-plus" onclick="plusOneAdd(this)"></i>
                    </div>

                    <div class="image">
                        <img src="${image}" alt="">
                    </div>

                    <div class="flavour">
                        <p>${flavour}</p>
                    </div>
                    <div class="price">
                        <p>+${transformToRealBRL(price)}</p>
                    </div>                          
                </div><!--input-->
            `
        })

        html += `
            </div><!--options-->
            </div><!--addToOrder-->
        `
    }

    let html = `
        <div class="image">
            <img src="${itemChosed.image}" alt="">
        </div><!--image-->

        <div class="description container">
            <h1>${categoryChosed.name.replace(/[sS]$/, "")} ${itemChosed.flavour}</h1>
            <p>${itemChosed.description}</p>
        </div><!--description-->   
    `
    if (isRings) {
        fillOptionals(stuffingPotsData)
        fillOptionals(icecreamData)
    }

    if ((isTrudel && itemChosed.flavour != 'KIT MINI TRUDEL') || isTrudelttone) {
        if (itemChosed.flavour != 'TRADICIONAL') {
            if (isMini || isMiniTrudelttone) {
                fillOptionals(miniadditionalData)
            } else {
                fillOptionals(additionalData)
            }
        }
        fillOptionals(icecreamData)
    }
    if(isSavoryTrudel && itemChosed.flavour != 'TRADICIONAL') fillOptionals(savoryAdditionalData)

    if (!isDrinks) {
        fillOptionals(drinksData)
    }

    html += `
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
                <span>${transformToRealBRL(itemChosed.price)}</span>
            </div>
        </div>
        <div class="closeView">
                <span onclick="closeView()">Cancelar</span>
        </div>
        
    `
    return html
}

window.choose = (item) => {
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
        additional: [],
    }

    localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

    const itemHasMini = itemChosed.miniPrice ? true : false

    if (itemHasMini) {
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

window.selectSize = (size) => {
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    let categoryChosed = JSON.parse(localStorage.getItem('categoryChosed'))

    let itemHtml = selectItemHtml(itemChosed, categoryChosed)

    if (size.toLowerCase() == 'mini') {
        categoryChosed = `mini${categoryChosed.category}`
        let category = menu.find(({category}) => category.toLowerCase() == categoryChosed.toLowerCase())
        localStorage.setItem('categoryChosed', JSON.stringify(category))
        itemChosed.category = category.category
        itemChosed.price = category.items.find(flavour => itemChosed.flavour == flavour.flavour).price
        itemChosed.image = category.items.find(flavour => itemChosed.flavour == flavour.flavour).image
        localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

        itemHtml = selectItemHtml(itemChosed, category)
    }
    modalClose()
    openView(itemHtml, 'selectItem')
    window.scrollTo(0, 0)
}

// Product complements

window.minusOneAdd = (target) => {
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const categoryName = target.parentNode.parentNode.parentNode.parentNode.querySelector('.title p').innerText
    const addCategory = menu.find(category => category.name.trim() == categoryName.trim())
    const addTarget = addCategory.items.find(item => item.flavour == target.parentNode.parentNode.querySelector('.flavour p').innerText)
    const totalPrice = () => {
        let total = itemChosed.price
        if (itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity
        return total
    }


    if (target.parentNode.querySelector('span').innerHTML > 0) {
        target.parentNode.querySelector('span').innerHTML--

        itemChosed.additional.find(add => add.flavour == addTarget.flavour).quantity--

        if (itemChosed.additional.find(add => add.flavour == addTarget.flavour).quantity == 0) {
            const index = itemChosed.additional.indexOf(itemChosed.additional.find(add => add.flavour == addTarget.flavour))
            itemChosed.additional.splice(index, 1)
        }

        localStorage.setItem('itemChosed', JSON.stringify(itemChosed))

        document.querySelector('.total .value span:nth-child(2)').innerHTML = transformToRealBRL(totalPrice())

    }
}

window.plusOneAdd = (target) => {
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const categoryName = target.parentNode.parentNode.parentNode.parentNode.querySelector('.title p').innerText
    const addCategory = menu.find(category => category.name.trim() == categoryName.trim());
    let addTarget = addCategory.items.find(item => item.flavour == target.parentNode.parentNode.querySelector('.flavour p').innerText)
    const totalPrice = () => {
        let total = itemChosed.price
        if (itemChosed.additional) itemChosed.additional.forEach(additional => {
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

    document.querySelector('.total .value span:nth-child(2)').innerHTML = transformToRealBRL(totalPrice())


}

window.minusOneProduct = () => {
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalPrice = (totalQuantity) => {
        let total = itemChosed.price
        if (itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity
        return total
    }

    if (document.querySelector('.total .quantity span').innerHTML > 0) {
        document.querySelector('.total .quantity span').innerHTML--
        const totalQuantity = document.querySelector('.total .quantity span').innerHTML
        document.querySelector('.total .value span:nth-child(2)').innerHTML = transformToRealBRL(totalPrice(totalQuantity))
    }
}

window.plusOneProduct = () => {
    let itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalPrice = (totalQuantity) => {
        let total = itemChosed.price
        if (itemChosed.additional) itemChosed.additional.forEach(additional => {
            total += additional.price * additional.quantity
        })
        total *= totalQuantity
        return total
    }

    document.querySelector('.total .quantity span').innerHTML++
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    document.querySelector('.total .value span:nth-child(2)').innerHTML = transformToRealBRL(totalPrice(totalQuantity))
}

window.addToCart = () => {
    const itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
    const totalQuantity = document.querySelector('.total .quantity span').innerHTML
    const cart = JSON.parse(localStorage.getItem('cart'))
    const note = document.querySelector('.addToOrder textarea').value
    if (note) itemChosed.note = note

    for (let i = 0; i < totalQuantity; i++) {
        localStorage.setItem('cart', JSON.stringify(Cart.init(cart).addOne(itemChosed)))

    }

    closeView()

    const cartHml = showCartHtml(JSON.parse(localStorage.getItem('cart')))

    openView(cartHml, 'showCart')
    window.scrollTo(0, 0)
}
