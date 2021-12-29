(()=>{"use strict";const e=[{flavour:"TRADICIONAL",span:"",description:"Nossa deliciosa massa assada, polvilhada no açúcar e canela, receita exclusiva com origem no Leste Europeu. Um sabor único!",image:"./assets/Menu/Trudels/Tradicional.webp",price:10,miniPrice:7},{flavour:"BRIGADEIRO",span:"",description:"Brigadeiro de produção artesanal, feito com leite condensado Moça e Cacau 50%. Aquele sabor de infância!",image:"./assets/Menu/Trudels/Brigadeiro.webp",price:12,miniPrice:8.5},{flavour:"DOCE DE LEITE",span:"",description:"O verdadeiro doce de leite, puro e muito cremoso. Uma loucura para os amantes de doce!",image:"./assets/Menu/Trudels/DoceDeLeite.webp",price:12,miniPrice:8.5},{flavour:"CHOCOLATE MEIO AMARGO",span:"",description:"Sabor intenso do autêntico chocolate, rico em cacau. Perfeito para aqueles que preferem algo menos doce.",image:"./assets/Menu/Trudels/ChocolateMeioAmargo.webp",price:12,miniPrice:8.5},{flavour:"CHOCOLATE BRANCO",span:"",description:"Chocolate com sabor equilibrado, cremoso ao extremo e altamente viciante.",image:"./assets/Menu/Trudels/ChocolateBranco.webp",price:13,miniPrice:9},{flavour:"NUTELLA",span:"",description:"O verdadeiro creme de avelã, o mais pedido e queridinho dos nossos clientes.",image:"./assets/Menu/Trudels/Nutella.webp",price:14,miniPrice:10},{flavour:"KIT KAT CREMOSO",span:"",description:"Um recheio que mistura a cremosidade do chocolate e o crocante do biscoito wafer.",image:"./assets/Menu/Trudels/Kitkat.webp",price:14,miniPrice:10},{flavour:"OVOMALTINE",span:"",description:"Surpreendente combinação de Ovomaltine, Avelã e Cacau. Pura crocância, simplesmente irresistível!",image:"./assets/Menu/Trudels/Ovomaltine.webp",price:15,miniPrice:11},{flavour:"LAKAOREO",span:"",description:"A junção do chocolate branco mais famoso do Brasil e o biscoito que toda família adora. Muita gostosura em apenas um recheio.",image:"./assets/Menu/Trudels/Lakaoreo.webp",price:15,miniPrice:11},{flavour:"KIT MINI TRUDEL",span:"",description:"Ideal para dividir ou presentear, nossos deliciosos Trudels em versão mini. São 6 unidades nos sabores: Doce de Leite, Nutella, Brigadeiro com granulado, Chocolate Branco com coco, Ovomaltine e Kit Kat.",image:"./assets/Menu/Trudels/KitMiniTrudel.webp",price:45}],a=[{flavour:"MORANGO",span:"",description:"",image:"./assets/Menu/Adicionais/morango.jpg",price:4,miniPrice:2},{flavour:"GRANULADO",span:"",description:"",image:"./assets/Menu/Adicionais/granulado2.webp",price:1,miniPrice:.5},{flavour:"CONFETE",span:"",description:"",image:"./assets/Menu/Adicionais/confete.jpg",price:2,miniPrice:1},{flavour:"COCO RALADO",span:"",description:"",image:"./assets/Menu/Adicionais/cocoRalado.jpg",price:2,miniPrice:1},{flavour:"OVOMALTINE CROCANTE",span:"",description:"",image:"./assets/Menu/Adicionais/ovomaltine.jpg",price:2,miniPrice:1},{flavour:"NEGRESCO MOIDO",span:"",description:"",image:"./assets/Menu/Adicionais/Negresco.webp",price:2,miniPrice:1},{flavour:"AMENDOIM",span:"",description:"",image:"./assets/Menu/Adicionais/amendoim.jpg",price:2,miniPrice:1},{flavour:"NOZES",span:"",description:"",image:"./assets/Menu/Adicionais/nozes.jpg",price:3,miniPrice:1.5},{flavour:"KIT KAT PICADO",span:"",description:"",image:"./assets/Menu/Adicionais/kitKat2.jpg",price:3,miniPrice:1.5},{flavour:"SONHO DE VALSA PICADO",span:"",description:"",image:"./assets/Menu/Adicionais/sonhoDeValsa.jpg",price:3},{flavour:"DOBRO DE RECHEIO",span:"",description:"",image:"./assets/Menu/Adicionais/dobroRecheio.jpg",price:4,miniPrice:3}],i=(e.filter((e=>e.miniPrice)).map((e=>({flavour:e.flavour,price:e.miniPrice,description:e.description,image:e.image.replace("Trudels","MiniTrudels")}))),a.filter((e=>e.miniPrice)).map((e=>({flavour:e.flavour,price:e.miniPrice,description:e.description,image:e.image}))),{name:"ESPECIAL DE NATAL",category:"christmasTrudel",items:[{flavour:"TRUDELTTONE",description:"Nossa deliciosa e exclusiva massa romena, com um recheio muito especial de Natal: brigadeiro branco sabor panetone e frutas cristalizadas!",image:"./assets/Menu/Christmas/Trudeltone.webp",price:16,miniPrice:12},{flavour:"TRUDELTTONE GOTAS",description:"Nosso recheio especial de Natal na versão com chocolate: brigadeiro branco sabor chocotone com gotas de chocolate!",image:"./assets/Menu/Christmas/TrudeltoneGotas.webp",price:16,miniPrice:12}]}),o=(i.items.filter((e=>e.miniPrice)).map((e=>({flavour:e.flavour,price:e.miniPrice,description:e.description,image:e.image}))),[i,{name:"TRUDELS",category:"trudel",items:e},{name:"TRUDELS SALGADOS",category:"savoryTrudel",items:[{flavour:"TRADICIONAL",span:"",description:"Nossa deliciosa massa romena assada, na versão salgada, com uma casca crocante de queijo parmesão e um mix de ervas. Uma experiência única de sabor!",image:"./assets/Menu/Savory/Tradicional.webp",price:9},{flavour:"FRANGO",span:"",description:"Frango desfiado com especiarias. Recheio cremoso, simplesmente delicioso!",image:"./assets/Menu/Savory/Frango.webp",price:13},{flavour:"FRANGO COM CATUPIRY",span:"",description:"Nosso delicioso recheio de frango com Catupiry original. Combinação mais que perfeita!",image:"./assets/Menu/Savory/FrangoCatupiry.webp",price:14},{flavour:"FRANGO COM CHEDDAR",span:"",description:"Nosso delicioso recheio de frango com Cheddar cremoso. Essa combinação é sucesso garantido!",image:"./assets/Menu/Savory/FrangoCheddar.webp",price:14},{flavour:"ALHO PORÓ",span:"",description:"Recheio de requeijão cremoso sabor Alho Poró. Suave, sofisticado e surpreendente.",image:"./assets/Menu/Savory/AlhoPoro.webp",price:15},{flavour:"4 QUEIJOS",span:"",description:"Recheio de requeijão cremoso sabor 4 Queijos. A junção do sabor do Catupiry, parmesão, gorgonzola e provolone. Perfeito para aqueles que adoram queijos!",image:"./assets/Menu/Savory/QuatroQueijos.webp",price:15}]},{name:"TRUDEL RINGS",category:"rings",items:[{flavour:"RINGS FIVE",span:"(5 unidades)",description:"Nossa deliciosa massa romena em formato de anéis, perfeitos para compartilhar e para aquele lanchinho rápido! <br><br>\n        *Acrescente seu recheio preferido para acompanhar seus rings.",image:"./assets/Menu/Rings/Rings5.webp",price:7},{flavour:"RINGS TEN",span:"(10 unidades)",description:"Nossa deliciosa massa romena em formato de anéis, perfeitos para compartilhar e para aquele lanchinho rápido! <br><br>\n        *Acrescente seu recheio preferido para acompanhar seus rings.",image:"./assets/Menu/Rings/Rings10.webp",price:10}]},{name:"SORVETES",category:"icecream",items:[{flavour:"CREME",span:"",description:"O clássico sorvete de creme que combina com tudo.",image:"./assets/Menu/Sorvetes/Creme.webp",price:4},{flavour:"NINHO TRUFADO",span:"",description:"O nosso sabor mais pedido, a dupla perfeita, leite Ninho e chocolate.",image:"./assets/Menu/Sorvetes/NinhoTrufado.webp",price:4},{flavour:"IOGURTE COM FRUTAS VERMELHAS",span:"",description:"A leveza do iogurte com um mix das frutas amora, framboesa, cereja e morango.",image:"./assets/Menu/Sorvetes/IogurteFrutasVermelhas.webp",price:4},{flavour:"CAFÉ MOCHA",span:"",description:"O sorvete ideal para quem adora café com um toque especial de chocolate.",image:"./assets/Menu/Sorvetes/CafeMocha.webp",price:4},{flavour:"BEM CASADO",span:"",description:"A união que deu certo, sorvete com pedaços de biscoito e doce de leite.",image:"./assets/Menu/Sorvetes/BemCasado.webp",price:4},{flavour:"SENSAÇÃO",span:"",description:"A deliciosa combinação do sorvete de morango com pedaços de chocolate.",image:"./assets/Menu/Sorvetes/Sensacao.webp",price:4}]},{name:"ADICIONAIS",category:"additional",items:a},{name:"ADICIONAIS SALGADOS",category:"savoryAdditional",items:[{flavour:"ALHO FRITO",span:"",description:"",image:"./assets/Menu/AdicionaisSalgados/AlhoFrito.webp",price:1},{flavour:"MILHO",span:"",description:"",image:"./assets/Menu/AdicionaisSalgados/Milho.webp",price:1},{flavour:"BATATA PALHA",span:"",description:"",image:"./assets/Menu/AdicionaisSalgados/BatataPalha.webp",price:1.5},{flavour:"PARMESÃO RALADO",span:"",description:"",image:"./assets/Menu/AdicionaisSalgados/ParmesaoRalado.webp",price:2}]},{name:"BEBIDAS",category:"drinks",items:[{flavour:"ÁGUA",span:"500ml",description:"Água natural.",image:"./assets/Menu/Bebidas/Agua.jpg",price:2},{flavour:"ÁGUA COM GÁS",span:"510ml",description:"Água gaseificada",image:"./assets/Menu/Bebidas/AguaComGas.jpg",price:3},{flavour:"SODA ITALIANA CRANBERRY",span:"500ml",description:"Frescor e um toque doce suave definem essa bebida! Feita com água com gás e xarope de frutas importado e gelo.",image:"./assets/Menu/Bebidas/Cranberry.webp",price:12},{flavour:"SODA ITALIANA MAÇÃ VERDE",span:"500ml",description:"Sabor excepcional, o preferido daqueles que tem o paladar mais doce.  Feita com água com gás e xarope de frutas importado e gelo.",image:"./assets/Menu/Bebidas/MacaVerde.webp",price:12},{flavour:"SODA ITALIANA LIMÃO SICILIANO",span:"500ml",description:"Refrescante e cítrico, uma verdadeira limonada premium. Feita com água com gás e xarope de frutas importado e gelo.",image:"./assets/Menu/Bebidas/LimaoSiciliano.webp",price:12}]},{name:"TRUDEL FINGERS <br> <small>(EVENTOS/FESTAS/PRESENTE)</small>",category:"fingers",items:[{flavour:"TRUDEL BOX",span:"",description:"Linda caixa de presente com 9 unidades dos nossos deliciosos Trudel Fingers. Personalize como desejar, escolha os sabores e adicionais.<br><br> <small>* Apenas encomendas.<br>(2 dias de antecedência)</small>",image:"./assets/Menu/Fingers/trudelBox.webp",price:50},{flavour:"EVENTOS / FESTAS",span:"",description:"Nossos irresistíveis trudels, no tamanho ideal (35 gramas) para surpreender seus convidados e deixar sua mesa de doces simplesmente maravilhosa em seu evento.<br><br> <small>* Apenas encomendas.<br>(1 semana de antecedência)</small>",image:"./assets/Menu/Fingers/fingers.webp",price:"**Sob Consulta"}]}]),s=document.querySelector("#menu");o.forEach((({category:e,name:a,items:i})=>{let o="";o+=`\n        <div class='category flex-column' >\n            <div class="categoryName" onclick="show_hide_items(this.parentNode)">\n                <i class="fas fa-caret-down rotate"></i>\n                <h3>${a}</h3>\n            </div>\n    `,i.forEach((({image:a,flavour:i,span:s,miniPrice:r,price:n,description:c})=>{o+=`\n            <div class="menuItem hide">\n                <div class="image ${e}">\n                    <img src="${a}" alt="${i}" onclick="lightbox.open(event)">\n                </div>\n                <div class="item flex-column type${e} ${"KIT MINI TRUDEL"==i?"kitmini":""}">\n                    <div class="itemName">\n                        ${s?`<p>${i}</p><span>${s}</span>`:`<p>${i} </p>`}\n                    </div>\n                        ${c?`<div class="description flex-column"><p>${c}</p></div>`:""}\n                    <div class="priceAndAddCart">\n                        <div class="price flex-column">\n                                <p>R$ <span>${"number"==typeof n?n.toFixed(2).replace(".",","):n}</span></p>\n                                ${r?`<p class="mini"> Mini <span>${transformToRealBRL(r)}</span></p>`:""} \n                        </div>\n                        ${"additional"!=e&&"fingers"!=e&&"savoryAdditional"!=e?'\n                        <div class="addCart">\n                            <button onclick="choose(this)">Escolher</button>\n                        </div>':""}\n                        ${"fingers"==e?'<div class="addCart">\n                        <button onclick="order(event)">Encomendar</button>\n                    </div>':""}\n                    </div>    \n                </div>\n                    \n                </div> \x3c!-- menuItem --\x3e\n                <hr class="hide">\n            `})),o+="\n        </div> \x3c!-- category --\x3e\n    ",s.innerHTML+=o})),window.show_hide_items=e=>{const a=e.querySelector("i"),i=e.querySelectorAll(".menuItem"),o=e.querySelectorAll("hr");a.classList.toggle("rotate"),i.forEach((e=>e.classList.toggle("hide"))),o.forEach((e=>e.classList.toggle("hide")))},window.loadFixedCart=()=>{const e=JSON.parse(localStorage.getItem("cart"));if(e){const a=document.querySelector(".fixedCart");a.style.opacity="1",a.style.visible="visible",a.style.transform="scale(1)",a.style.transition="1000ms",a.innerHTML=`\n            <h3>\n                Carrinho \n                <i class="fas fa-shopping-cart"></i>\n                <span>${e.total.quantity}</span>\n            </h3>\n        `}},window.hideFixedCart=()=>{const e=document.querySelector(".fixedCart");e.style.opacity="0",e.style.visible="hidden",e.style.transform="scale(0)",e.style.transition="1000ms"},window.openView=(e,a)=>{const i=document.querySelector("#view");document.querySelector("#menu").classList.add("hideMenu"),i.classList.add("active"),i.classList.add(a),i.innerHTML=e,"showCart"==a&&(localStorage.removeItem("paymentMethod"),localStorage.removeItem("changeNeeded"),localStorage.removeItem("receiveMethod"),localStorage.removeItem("deliveryTax"),getTotal()),hideFixedCart()},window.closeView=()=>{const e=document.querySelector("#view"),a=document.querySelector("#menu");e.classList.remove("active"),e.removeAttribute("class"),e.innerHTML="",a.classList.remove("hideMenu"),loadFixedCart()},window.checkIfCartIsFromToday=()=>{const e=JSON.parse(localStorage.getItem("cart"));if(!e)return;const a=new Date(e.date),i=new Date;a.getDate()==i.getDate()&&a.getMonth()==i.getMonth()&&a.getFullYear()==i.getFullYear()||localStorage.removeItem("cart")},window.order=e=>{let a=`Olá, eu gostaria de informações sobre a encomenda do item: ${e.target.parentNode.parentNode.parentNode.querySelector(".itemName p").innerText}.`;a=window.encodeURIComponent(a),window.open("https://api.whatsapp.com/send?phone=5519996929909&text="+a,"_blank")},checkIfCartIsFromToday(),loadFixedCart()})();
//# sourceMappingURL=menu.bundle.js.map