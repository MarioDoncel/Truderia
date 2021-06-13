
// Cardapio
const trudel = [
    {
        flavour:"Tradicional",
        span:"",
        description:"Deliciosa massa do leste europeu com açúcar e canela.",
        image:"./assets/Menu/TradicionalBg7.webp", 
        price: 8
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
        price:10
    },
    {
        flavour:"CHOCOLATE MEIO AMARGO",
        span:"",
        description:"Recheado com o melhor meio amargo!",
        image:"./assets/Menu/MeioAmargoBg4.webp", 
        price:11
    },
    {
        flavour:"CHOCOLATE BRANCO",
        span:"",
        description:"Recheado com chocolate branco de dar agua na boca!",
        image:"./assets/Menu/ChocolateBrancoBg7.webp", 
        price:12
    },
    {
        flavour:"NUTELLA",
        span:"",
        description:"Recheado com o creme de avelã queridinho do Brasil.",
        image:"./assets/Menu/NutellaBg4.webp", 
        price:12
    },
    {
        flavour:"KIT KAT CREMOSO",
        span:"",
        description:"Recheado com um creme de KIT KAT que dispensa comentários.",
        image:"./assets/Menu/KitkatBg7.webp", 
        price:12
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
        price: 2
    },  
    {
        flavour:"COCO RALADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/cocoRalado.jpg", 
        price: 1
    },  
    {
        flavour:"KIT KAT PICADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/kitKat2.jpg",
        price: 2
    },  
    {
        flavour:"SONHO DE VALSA PICADO",
        span:"",
        description:"",
        image:"./assets/Menu/Adicionais/sonhoDeValsa.jpg",
        price: 2
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
        image:"./assets/Menu/ChocolateECoco.jpg",
        price: 4
    },
    {
        flavour:"NINHO TRUFADO",
        span:"",
        description:"",
        image:"./assets/Menu/ChocolateECoco.jpg",
        price: 4
    },
    {
        flavour:"IOGURTE COM FRUTAS VERMELHAS",
        span:"",
        description:"",
        image:"./assets/Menu/ChocolateECoco.jpg",
        price: 4
    },
    {
        flavour:"CAFÉ",
        span:"(Café com chocolate)",
        description:"",
        image:"./assets/Menu/ChocolateECoco.jpg",
        price: 4
    },
    {
        flavour:"BEM CASADO",
        span:"(Pão de ló com doce de leite)",
        description:"",
        image:"./assets/Menu/ChocolateECoco.jpg",
        price: 4
    },
    {
        flavour:"SENSAÇÃO ",
        span:"(Morango com pedaços de chocolate)",
        description:"",
        image:"./assets/Menu/ChocolateECoco.jpg",
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
                    <img src="${item.image}" alt="${item.flavour}"></div>
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

