//Loading MenuView data

const menuHtml = document.querySelector('#menu')
menuView.forEach(category => {
    let html = ''
    html +=`
        <div class='category flex-column' >
            <div class="categoryName" onclick="show_hide(this)">
                <i class="fas fa-caret-down rotate"></i>
                <h3>${category.name}</h3>
            </div>
    `
    
    category.items.forEach(item => {
            html += `
            <div class="menuItem hide">
                <div class="image ${category.category}">
                    <img src="${item.image}" alt="${item.flavour}" onclick="lightbox.open(event)">
                </div>
                <div class="item flex-column type${category.category} ${item.flavour == "KIT MINI TRUDEL" ? "kitmini" : ""}">
                    <div class="itemName">
                        ${item.span? `<p>${item.flavour}</p><span>${item.span}</span>` : `<p>${item.flavour} </p>`}
                    </div>
                        ${item.description? `<div class="description flex-column"><p>${item.description}</p></div>`:''}
                    <div class="priceAndAddCart">
                        <div class="price flex-column">
                                <p>R$ <span>${item.price.toFixed(2).replace('.',',')}</span></p>
                                ${item.miniPrice ? `<p class="mini"> Mini <span>${item.miniPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>` : ''} 
                        </div>
                        ${category.category != 'additional'? `
                        <div class="addCart">
                            <button onclick="choose(this)">Escolher</button>
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


// Loading Cart
function loadFixedCart() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    
    if(cart) {
        document.querySelector('.fixedCart').style.opacity= '1'
        document.querySelector('.fixedCart').style.visible= 'visible'
        document.querySelector('.fixedCart').style.transform = 'scale(1)'
        document.querySelector('.fixedCart').style.transition= '1000ms'
    
        document.querySelector('.fixedCart').innerHTML = `
            <h3>
                Carrinho 
                <i class="fas fa-shopping-cart"></i>
                <span>${cart.total.quantity}</span>
            </h3>
        `
    }
}

function hideFixedCart(){
    
    document.querySelector('.fixedCart').style.opacity= '0'
    document.querySelector('.fixedCart').style.visible= 'hidden'
    document.querySelector('.fixedCart').style.transform = 'scale(0)'
    document.querySelector('.fixedCart').style.transition= '1000ms'
}

// Lightbox 

const lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-close'),
    open(e){
        lightbox.target.style.opacity = 1
        lightbox.target.style.top = 0
        lightbox.closeButton.style.top = 0
        let source = e? e.target.src : './assets/Menu/mini2.jpg'
        lightbox.image.src = source
    },
    close(){
        lightbox.target.style.opacity = 0
        lightbox.target.style.top = '-100%'
        lightbox.closeButton.style.top = '-80px'
    }
}

// Destaque de novidade/combinação com Lightbox e SetTimeout

// lightbox.open(false)
// setTimeout(lightbox.close, 5000);

//Função Show Hide Category

function show_hide(categoryChild) {
    let category = categoryChild.parentNode
    const arrow = category.querySelector('i')
    arrow.classList.toggle('rotate')
    const lines = category.querySelectorAll('hr')
    const items = category.querySelectorAll('.menuItem')

    items.forEach(item => {
        item.classList.toggle('hide')
    })
    
    lines.forEach(line => {
        line.classList.toggle('hide')
    })
}