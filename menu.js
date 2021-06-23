
// Cardapio
const trudel = [
    {
        flavour:"TRADICIONAL",
        span:"",
        description:"Deliciosa massa do leste europeu com açúcar e canela.",
        image:"./assets/Menu/TradicionalBg7.webp", 
        price: 10
    },
    {
        flavour:"BRIGADEIRO",
        span:"",
        description:"Recheado com brigadeiro de lamber os dedos!",
        image:"./assets/Menu/BrigadeiroBg5.webp", 
        price:12
    },
    {
        flavour:"DOCE DE LEITE",
        span:"",
        description:"Recheado com um doce de leite divino!",
        image:"./assets/Menu/DoceDeLeiteBg4.webp", 
        price:12
    },
    {
        flavour:"CHOCOLATE MEIO AMARGO",
        span:"",
        description:"Recheado com o melhor meio amargo!",
        image:"./assets/Menu/MeioAmargoBg4.webp", 
        price:12
    },
    {
        flavour:"CHOCOLATE BRANCO",
        span:"",
        description:"Recheado com chocolate branco de dar água na boca!",
        image:"./assets/Menu/ChocolateBrancoBg7.webp", 
        price:13
    },
    {
        flavour:"NUTELLA",
        span:"",
        description:"Recheado com o creme de avelã queridinho do Brasil.",
        image:"./assets/Menu/NutellaBg4.webp", 
        price:14
    },
    {
        flavour:"KIT KAT CREMOSO",
        span:"",
        description:"Recheado com um creme de KIT KAT que dispensa comentários.",
        image:"./assets/Menu/KitkatBg7.webp", 
        price:14
    },
    {
        flavour:"OVOMALTINE",
        span:"",
        description:"Recheado com um creme de OVOMALTINE crocante e irresistível!",
        image:"./assets/Menu/OvomaltineBg5.webp", 
        price:15
    },
    // {
    //     flavour:"PAÇOQUITA",
    //     span:"*EDIÇÃO LIMITADA JUNINA*",
    //     description:'Recheado com um creme de paçoca "pra lá de bão!"',
    //     image:"./assets/Menu/PacoquitaBg7.webp", 
    //     price:15
    // },
    {
        flavour:"KIT MINI TRUDEL",
        span:"6 mini Trudels nos sabores :",
        description:'Doce de Leite, Nutella, Brigadeiro,  Chocolate Branco,  Ovomaltine  e Kit Kat',
        image:"./assets/Menu/KitMiniTrudel1.webp", 
        price:45
    }
]

const additional = [
    {
        flavour:"MORANGO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/morango.jpg", 
        price: 4
    },  
    {
        flavour:"GRANULADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/granulado.jpg", 
        price: 1
    },  
    {
        flavour:"COCO RALADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/cocoRalado.jpg", 
        price: 2
    },  
    {
        flavour:"OVOMALTINE",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/ovomaltine.jpg", 
        price: 2
    },  
    {
        flavour:"AMENDOIM",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/amendoim.jpg", 
        price:2
    },  
    {
        flavour:"NOZES",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/nozes.jpg", 
        price: 3
    },  
    {
        flavour:"KIT KAT PICADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/kitKat2.jpg",
        price: 3
    },  
    {
        flavour:"SONHO DE VALSA PICADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/sonhoDeValsa.jpg",
        price: 3
    },  
    {
        flavour:"DOBRO DE RECHEIO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/dobroRecheio.jpg",
        price: 4
    },  

]

const iceCream = [
    {
        flavour:"CREME",
        span:"",
        description:"",
        image:"./assets/Menu/Sorvetes/Creme1Tratado.webp",
        price: 4
    },
    {
        flavour:"NINHO TRUFADO",
        span:"",
        description:"",
        image:"./assets/Menu/Sorvetes/NinhoTrufado1Tratado.webp",
        price: 4
    },
    {
        flavour:"IOGURTE COM FRUTAS VERMELHAS",
        span:"",
        description:"",
        image:"./assets/Menu/Sorvetes/IogurteFrutasVermelhas1Tratado.webp",
        price: 4
    },
    {
        flavour:"CAFÉ MOCHA",
        span:"(Café com chocolate)",
        description:"",
        image:"./assets/Menu/Sorvetes/CafeMocha1Tratado.webp",
        price: 4
    },
    {
        flavour:"BEM CASADO",
        span:"(Pão de ló com doce de leite)",
        description:"",
        image:"./assets/Menu/Sorvetes/BemCasado1Tratado.webp",
        price: 4
    },
    {
        flavour:"SENSAÇÃO ",
        span:"(Morango com pedaços de chocolate)",
        description:"",
        image:"./assets/Menu/Sorvetes/Sensacao1Tratado.webp",
        price: 4
    }
]

const menu = [
    {
        name: "TRUDEL",
        category:"trudel",
        itens: trudel
    }, 
    {
        name: "ADICIONAIS",
        category:"adittional",
        itens: additional
    }, 
    {
        name: "SORVETES",
        category:"icecream",
        itens: iceCream
    }
]
    
// Populando o cardápio 
const menuHtml = document.querySelector('#menu')
menu.forEach(category => {
    let html = ''
    html +=`
        <div class="category flex-column">
            <div class="categoryName">
                <i class="fas fa-caret-down"></i>
                <h3>${category.name}</h3>
            </div>
    `
    category.itens.forEach(item => {
            html += `
            <div class="menuItem">
            <div class="image ${category.category}">
                    <img src="${item.image}" alt="${item.flavour}" onclick="lightbox.open(event)">
                    </div>
                    <div class="item flex-column">
                        <div class="itemName">
                        ${item.span? `<p>${item.flavour}<br><span>${item.span}</span></p>` : `<p>${item.flavour} </p>`}
                        </div>
                        ${item.description? `<div class="description flex-column"><p>${item.description}</p></div>`:''}
                        
                    </div>
                    <div class="price flex-column">R$${item.price}</div>
                </div> <!-- menuItem -->
            `
    })
    html += `
        </div> <!-- category -->
    `
    menuHtml.innerHTML += html
});


// Lightbox 
const lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-close'),
    open(e){
        lightbox.target.style.opacity = 1
        lightbox.target.style.top = 0
        lightbox.closeButton.style.top = 0
        let source = e? e.target.src : './assets/Menu/Adicionais/morango.jpg'
        lightbox.image.src = source
    },
    close(){
        lightbox.target.style.opacity = 0
        lightbox.target.style.top = '-100%'
        lightbox.closeButton.style.top = '-80px'
    }
}

// Destaque de novidade com Lightbox e SetTimeout

lightbox.open(false)
setTimeout(() => {
    lightbox.close()
}, 5000);
