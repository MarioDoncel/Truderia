//Loading MenuView data
import {menuView} from './data'

const menuHtml = document.querySelector('#menu')



menuView.forEach(({category,  name: categoryName, items: categoryItems}) => {
    let html = ''
    html +=`
        <div class='category flex-column' >
            <div class="categoryName" onclick="show_hide_items(this.parentNode)">
                <i class="fas fa-caret-down rotate"></i>
                <h3>${categoryName}</h3>
            </div>
    `
    
    categoryItems.forEach(({image, flavour, span, miniPrice, price, description}) => {
            html += `
            <div class="menuItem hide">
                <div class="image ${category}">
                    <img src="${image}" alt="${flavour}" onclick="lightbox.open(event)">
                </div>
                <div class="item flex-column type${category} ${flavour == "KIT MINI TRUDEL" ? "kitmini" : ""}">
                    <div class="itemName">
                        ${span? `<p>${flavour}</p><span>${span}</span>` : `<p>${flavour} </p>`}
                    </div>
                        ${description? `<div class="description flex-column"><p>${description}</p></div>`:''}
                    <div class="priceAndAddCart">
                        <div class="price flex-column">
                                <p>R$ <span>${typeof(price) == 'number'? price.toFixed(2).replace('.',',') : price}</span></p>
                                ${miniPrice ? `<p class="mini"> Mini <span>${transformToRealBRL(miniPrice)}</span></p>` : ''} 
                        </div>
                        ${category != 'additional' && category != 'fingers' && category != 'savoryAdditional'? `
                        <div class="addCart">
                            <button onclick="choose(this)">Escolher</button>
                        </div>`: ''}
                        ${category == 'fingers' ? `<div class="addCart">
                        <button onclick="order(event)">Encomendar</button>
                    </div>`: ''}
                    </div>    
                </div>
                    
                </div> <!-- menuItem -->
                <hr class="hide">
            `
    })
    html += `
        </div> <!-- category -->
    `
    menuHtml.innerHTML += html
});

// ------------------------------------------------------------------------------

//Função Show Hide Category Items

window.show_hide_items = (category) => {
    const arrow = category.querySelector('i')
    const items = category.querySelectorAll('.menuItem')
    const lines = category.querySelectorAll('hr')
    
    arrow.classList.toggle('rotate')

    items.forEach(item => item.classList.toggle('hide'))
    
    lines.forEach(line => line.classList.toggle('hide'))
}

// Loading/hiding Cart
window.loadFixedCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    
    if(cart) {
        const fixedCart = document.querySelector('.fixedCart')
        fixedCart.style.opacity= '1'
        fixedCart.style.visible= 'visible'
        fixedCart.style.transform = 'scale(1)'
        fixedCart.style.transition= '1000ms'
    
        fixedCart.innerHTML = `
            <h3>
                Carrinho 
                <i class="fas fa-shopping-cart"></i>
                <span>${cart.total.quantity}</span>
            </h3>
        `
    }
}

window.hideFixedCart =() => {
    const fixedCart = document.querySelector('.fixedCart')
    fixedCart.style.opacity= '0'
    fixedCart.style.visible= 'hidden'
    fixedCart.style.transform = 'scale(0)'
    fixedCart.style.transition= '1000ms'
}




// Views SPA

window.openView = (content, contentClass) => {
    const view = document.querySelector('#view')
    const menu = document.querySelector('#menu')
    menu.classList.add('hideMenu')
    view.classList.add('active')
    view.classList.add(contentClass)
    view.innerHTML = content
    if (contentClass == "showCart") {
        localStorage.removeItem('paymentMethod')
        localStorage.removeItem('changeNeeded')
        localStorage.removeItem('receiveMethod')
        localStorage.removeItem('deliveryTax')
        getTotal()
    }
    hideFixedCart()
}
window.closeView = () => {
    const view = document.querySelector('#view')
    const menu = document.querySelector('#menu')
    view.classList.remove('active')
    view.removeAttribute("class")
    view.innerHTML = ''
    menu.classList.remove('hideMenu')
    loadFixedCart()
}

window.checkIfCartIsFromToday = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if(!cart) return
    const cartDate = new Date(cart.date)
    const today = new Date()

    if (cartDate.getDate() != today.getDate() || 
        cartDate.getMonth() != today.getMonth() || 
        cartDate.getFullYear() != today.getFullYear())
    {
            localStorage.removeItem('cart')
    }
}

window.order = (event) => {
    const item = event.target.parentNode.parentNode.parentNode.querySelector('.itemName p').innerText
    let texto = `Olá, eu gostaria de informações sobre a encomenda do item: ${item}.`
    texto = window.encodeURIComponent(texto);

    window.open("https://api.whatsapp.com/send?phone=5519996929909&text=" + texto, "_blank");
}


checkIfCartIsFromToday()
loadFixedCart()