// MenuView - Cardapio
const trudel = [
    {
        flavour: "TRADICIONAL",
        span: "",
        description: "Nossa deliciosa massa assada, polvilhada no açúcar e canela, receita exclusiva com origem no Leste Europeu. Um sabor único!",
        image: "./assets/Menu/Trudels/Tradicional.webp",
        price: 10,
        miniPrice: 7
    },
    {
        flavour: "BRIGADEIRO",
        span: "",
        description: "Brigadeiro de produção artesanal, feito com leite condensado Moça e Cacau 50%. Aquele sabor de infância!",
        image: "./assets/Menu/Trudels/Brigadeiro.webp",
        price: 12,
        miniPrice: 8.5
    },
    {
        flavour: "DOCE DE LEITE",
        span: "",
        description: "O verdadeiro doce de leite, puro e muito cremoso. Uma loucura para os amantes de doce!",
        image: "./assets/Menu/Trudels/DoceDeLeite.webp",
        price: 12,
        miniPrice: 8.5
    },
    {
        flavour: "CHOCOLATE MEIO AMARGO",
        span: "",
        description: "Sabor intenso do autêntico chocolate, rico em cacau. Perfeito para aqueles que preferem algo menos doce.",
        image: "./assets/Menu/Trudels/ChocolateMeioAmargo.webp",
        price: 12,
        miniPrice: 8.5
    },
    {
        flavour: "CHOCOLATE BRANCO",
        span: "",
        description: "Chocolate com sabor equilibrado, cremoso ao extremo e altamente viciante.",
        image: "./assets/Menu/Trudels/ChocolateBranco.webp",
        price: 13,
        miniPrice: 9
    },
    {
        flavour: "NUTELLA",
        span: "",
        description: "O verdadeiro creme de avelã, o mais pedido e queridinho dos nossos clientes.",
        image: "./assets/Menu/Trudels/Nutella.webp",
        price: 14,
        miniPrice: 10
    },
    {
        flavour: "KIT KAT CREMOSO",
        span: "",
        description: "Um recheio que mistura a cremosidade do chocolate e o crocante do biscoito wafer.",
        image: "./assets/Menu/Trudels/Kitkat.webp",
        price: 14,
        miniPrice: 10
    },
    {
        flavour: "OVOMALTINE",
        span: "",
        description: "Surpreendente combinação de Ovomaltine, Avelã e Cacau. Pura crocância, simplesmente irresistível!",
        image: "./assets/Menu/Trudels/Ovomaltine.webp",
        price: 15,
        miniPrice: 11
    },
    {
        flavour: "LAKAOREO",
        span: "",
        description: 'A junção do chocolate branco mais famoso do Brasil e o biscoito que toda família adora. Muita gostosura em apenas um recheio.',
        image: "./assets/Menu/Trudels/Lakaoreo.webp",
        price: 15,
        miniPrice: 11
    },
    {
        flavour: "KIT MINI TRUDEL",
        span: "",
        description: 'Ideal para dividir ou presentear, nossos deliciosos Trudels em versão mini. São 6 unidades nos sabores: Doce de Leite, Nutella, Brigadeiro com granulado, Chocolate Branco com coco, Ovomaltine e Kit Kat.',
        image: "./assets/Menu/Trudels/KitMiniTrudel.webp",
        price: 45
    }
]

const additional = [
    {
        flavour: "MORANGO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/morango.jpg",
        price: 4,
        miniPrice: 2
        
    },
    {
        flavour: "GRANULADO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/granulado2.webp",
        price: 1,
        miniPrice: 0.5
    },
    {
        flavour: "CONFETE",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/confete.jpg",
        price: 2,
        miniPrice: 1
    },
    {
        flavour: "COCO RALADO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/cocoRalado.jpg",
        price: 2,
        miniPrice: 1
    },
    {
        flavour: "OVOMALTINE CROCANTE",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/ovomaltine.jpg",
        price: 2,
        miniPrice: 1
    },
    {
        flavour: "NEGRESCO MOIDO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/Negresco.webp",
        price: 2,
        miniPrice: 1
    },
    {
        flavour: "AMENDOIM",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/amendoim.jpg",
        price: 2,
        miniPrice: 1
    },
    {
        flavour: "NOZES",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/nozes.jpg",
        price: 3,
        miniPrice: 1.5
    },
    {
        flavour: "KIT KAT PICADO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/kitKat2.jpg",
        price: 3,
        miniPrice: 1.5
    },
    {
        flavour: "SONHO DE VALSA PICADO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/sonhoDeValsa.jpg",
        price: 3
    },
    {
        flavour: "DOBRO DE RECHEIO",
        span: "",
        description: "",
        image: "./assets/Menu/Adicionais/dobroRecheio.jpg",
        price: 4,
        miniPrice: 3
    },

]

const iceCream = [
    {
        flavour: "CREME",
        span: "",
        description: "O clássico sorvete de creme que combina com tudo.",
        image: "./assets/Menu/Sorvetes/Creme.webp",
        price: 4
    },
    {
        flavour: "NINHO TRUFADO",
        span: "",
        description: "O nosso sabor mais pedido, a dupla perfeita, leite Ninho e chocolate.",
        image: "./assets/Menu/Sorvetes/NinhoTrufado.webp",
        price: 4
    },
    {
        flavour: "IOGURTE COM FRUTAS VERMELHAS",
        span: "",
        description: "A leveza do iogurte com um mix das frutas amora, framboesa, cereja e morango.",
        image: "./assets/Menu/Sorvetes/IogurteFrutasVermelhas.webp",
        price: 4
    },
    {
        flavour: "CAFÉ MOCHA",
        span: "",
        description: "O sorvete ideal para quem adora café com um toque especial de chocolate.",
        image: "./assets/Menu/Sorvetes/CafeMocha.webp",
        price: 4
    },
    {
        flavour: "BEM CASADO",
        span: "",
        description: "A união que deu certo, sorvete com pedaços de biscoito e doce de leite.",
        image: "./assets/Menu/Sorvetes/BemCasado.webp",
        price: 4
    },
    {
        flavour: "SENSAÇÃO",
        span: "",
        description: "A deliciosa combinação do sorvete de morango com pedaços de chocolate.",
        image: "./assets/Menu/Sorvetes/Sensacao.webp",
        price: 4
    }
]

const drinks = [
    {
        flavour: "ÁGUA",
        span: "500ml",
        description: "Água natural.",
        image: "./assets/Menu/Bebidas/Agua.jpg",
        price: 2
    },
    {
        flavour: "ÁGUA COM GÁS",
        span: "510ml",
        description: "Água gaseificada",
        image: "./assets/Menu/Bebidas/AguaComGas.jpg",
        price: 3
    },
    {
        flavour: "SODA ITALIANA CRANBERRY",
        span: "500ml",
        description: "Frescor e um toque doce suave definem essa bebida! Feita com água com gás e xarope de frutas importado e gelo.",
        image: "./assets/Menu/Bebidas/Cranberry.webp",
        price: 12
    },
    {
        flavour: "SODA ITALIANA MAÇÃ VERDE",
        span: "500ml",
        description: "Sabor excepcional, o preferido daqueles que tem o paladar mais doce.  Feita com água com gás e xarope de frutas importado e gelo.",
        image: "./assets/Menu/Bebidas/MacaVerde.webp",
        price: 12
    },
    {
        flavour: "SODA ITALIANA LIMÃO SICILIANO",
        span: "500ml",
        description: "Refrescante e cítrico, uma verdadeira limonada premium. Feita com água com gás e xarope de frutas importado e gelo.",
        image: "./assets/Menu/Bebidas/LimaoSiciliano.webp",
        price: 12
    },
    
]

const menuView = [
    {
        name: "TRUDELS",
        category: "trudel",
        items: trudel
    },
    {
        name: "SORVETES",
        category: "icecream",
        items: iceCream
    },
    {
        name: "ADICIONAIS",
        category: "additional",
        items: additional
    },
    {
        name: "BEBIDAS",
        category: "drinks",
        items: drinks
    }
]

// Full-Menu data 

const miniTrudel = 
    {
        name: "MINI-TRUDELS",
        category: "miniTrudel",
        items:trudel.filter(item =>item.miniPrice).map(filtered=> {
            return {
                flavour:filtered.flavour,
                price:filtered.miniPrice,
                description:filtered.description,
                image:filtered.image
            }
        })
    }

const miniAdd = 
    {
        name: "MINI-ADICIONAL",
        category: "miniAdditional",
        items:additional.filter(item => item.miniPrice).map(filtered=> {
            return {
                flavour:filtered.flavour,
                price:filtered.miniPrice,
                description:filtered.description,
                image:filtered.image
            }
        })
    }

const promotion = {
    name: "COMBINAÇÃO DA QUINTA",
    category:"promotion",
    items: [
            {
                value:"COMBINAÇÃO DA QUINTA",
                flavour: "NUTELLA + AMENDOIM + MORANGO",
                description: "COLOCAR DESCRIÇÃO",
                image: "./assets/Menu/Promotion/thursdayCombination.webp",
                price: 16,
            },
            {
                value:"MINI-COMBINAÇÃO DA QUINTA",
                flavour: "MINI-NUTELLA + MINI-AMENDOIM + MINI-MORANGO",
                description: "COLOCAR DESCRIÇÃO",
                image: "./assets/Menu/Promotion/thursdayCombination.webp",
                price: 11.5,
            },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "TRADICIONAL",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "BRIGADEIRO",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "DOCE DE LEITE",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "CHOCOLATE MEIO AMARGO",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "CHOCOLATE BRANCO",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "NUTELLA",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "KIT KAT CREMOSO",
        //     price: 0,
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "OVOMALTINE",
        //     price: 0
        // },
        // {
        //     value:"MINI PROMOCAO",
        //     flavour: "LAKAOREO",
        //     price: 0,
        // },
        
    ]
}

// menuView.unshift(promotion)

const entregas = {
    name: "ENTREGAS",
    category:"delivery",
    items: [
        {   
            value: '4 REAIS',
            item:'TAXA DE ENTREGA',
            price: 4
        },
        {
            value: '5 REAIS',
            item:'TAXA DE ENTREGA',
            price: 5
        },
        {
            value: '6 REAIS',
            item:'TAXA DE ENTREGA',
            price: 6
        },
        {
            value: '7 REAIS',
            item:'TAXA DE ENTREGA',
            price: 7
        },
        {
            value: '8 REAIS',
            item:'TAXA DE ENTREGA',
            price: 8
        },
        {
            value: 'GRÁTIS',
            item:'CORTESIA',
            price: 0
        }
]
}

const menu = [
    ...menuView, 
    miniTrudel,
    miniAdd,
    promotion,
    entregas
]

const payments = ['DINHEIRO', 'DÉBITO', 'CRÉDITO', 'PIX']

 