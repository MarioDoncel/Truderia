import {menu} from './data'
import districts from './dataDistrict'
import {alerts,removeAcento } from './utils'
// Show Cart
class LocalStorage {
    constructor(){
        this.cart = JSON.parse(localStorage.getItem('cart'))
        this.itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
        this.paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
        this.receiveMethod = JSON.parse(localStorage.getItem('receiveMethod'))
        this.categoryChosed = JSON.parse(localStorage.getItem('categoryChosed'))
        this.client = JSON.parse(localStorage.getItem('client'))
        this.changeNeeded = JSON.parse(localStorage.getItem('changeNeeded'))
        this.deliveryTax = JSON.parse(localStorage.getItem('deliveryTax'))
    }
    static save(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    }
    static delete(key){
        localStorage.removeItem(key)
    }
}

window.showCartHtml = (cart) => {
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
    cart.items.forEach(item => {
        html += `
            <div class="item">
                <div class="quantity">${item.quantity}x</div>
                <div class="category">${menu.find(category => item.product.category == category.category).name.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        }).replace(/[sS]$/, "").replace('Trudels','Trudel')}</div>
                <div class="flavourAndAdd">
                    <div class="flavour">${item.product.flavour.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        })}</div>`

        if (item.product.additional.length > 0) {
            item.product.additional.forEach(additional => {
                html += `
                <div class="add">+${additional.quantity}x ${additional.flavour.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
                    return a.toUpperCase();
                })}</div>
                `
            })
        }

        html += `
                </div>
                <div class="price">${item.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
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
                        value="${client ? client.data.name : ''}" 
                        placeholder="Nome completo" 
                        onblur="localStorage.setItem('client', JSON.stringify(Client.updateName(this.value)))"
                    >
                </div>
                <div class="input">
                    <div class="field">Telefone <span style="color:red; font-weight:bold"> *</span></div>
                    <input 
                        type="text" 
                        name="phone" 
                        value="${client ? client.data.telephone : ''}" 
                        placeholder="(XX)XXXXX-XXXX" 
                        onblur="localStorage.setItem('client', JSON.stringify(Client.updateTelephone(this.value)))"
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
                                value="${client ? client.data.address.zipCode : ''}" 
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
                                value="${client ? client.data.address.number : ''}" 
                                placeholder="" 
                                onchange="localStorage.setItem('client', JSON.stringify(Client.updateNumber(this.value)))"
                            >
                        </div>
                    </div>

                    <div class="input">
                        <div class="field">Rua <span style="color:red; font-weight:bold"> *</span></div>
                        <input 
                            type="text" 
                            name="street" 
                            value="${client ? client.data.address.street : ''}" 
                            placeholder="" 
                            onchange="localStorage.setItem('client', JSON.stringify(Client.updateStreet(this.value)))"
                            onfocus="initAutocomplete()"
                        >
                    </div>
                    <div class="input">
                        <div class="field">Bairro <span style="color:red; font-weight:bold"> *</span></div>
                        <input 
                            type="text" 
                            name="district" 
                            value="${client ? client.data.address.district : ''}" 
                            placeholder="" 
                            onblur="localStorage.setItem('client', JSON.stringify(Client.updateDistrict(this.value)))"
                            onchange="getDeliveryTax()"
                        >
                    </div>
                    <div class="input">
                        <div class="field">Complemento <span>(apartamento, condominio, etc...)</span></div>
                        <input 
                            type="text" 
                            name="complement" 
                            value="${client ? client.data.address.complement : ''}" 
                            placeholder="" 
                            onblur="localStorage.setItem('client', JSON.stringify(Client.updateComplement(this.value)))"
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
                        oninput="Mask.apply(this, 'formatBRL');"
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
                        <div id="subTotalValue">${transformToRealBRL(cart.total.totalPrice)}</div>
                    </div>
                    <div class="deliveryTax">
                        <div>Taxa de entrega</div>
                        <div id="deliveryTaxValue">${''}</div>
                    </div>
                </div>
                        

                <div class="item total">
                    <div>Total</div>
                    <div id="totalValue">${transformToRealBRL(cart.total.totalPrice)}</div>
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

window.deleteFromCart = (target) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    const elementToDelete = target.parentNode
    const cartItemsNodes = target.parentNode.parentNode.children
    const indexOfItem = Array.from(cartItemsNodes).indexOf(elementToDelete)
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

window.selectTakeAway = () => {
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
window.selectDelivery = () => {
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
    if (district) getDeliveryTax()
}

window.getAddress = async (zipCode) => {
    const zipCodeNumbers = zipCode.replace(/\D/g, '')
    const validacep = /^[0-9]{8}$/.test(zipCodeNumbers)
    if (!validacep) {
        alertOpen(alerts.wrongCep, 'alerts', ".deliveryMethod")
        return
    }
    const url = `https://viacep.com.br/ws/${zipCodeNumbers}/json/`
    const API = await fetch(url)
    const dados = await API.json()
    if (dados.erro) return alertOpen(alerts.cepNotFound, "alerts", ".deliveryMethod")

    document.querySelector('input[name="street"]').value = dados.logradouro
    document.querySelector('input[name="district"]').value = dados.bairro
    const client = {
        address: {
            street: dados.logradouro,
            district: dados.bairro,
            zipCode: dados.cep
        }
    }

    localStorage.setItem('client', JSON.stringify(Client.updateVIACEP(client)))
    getDeliveryTax()
}

window.getDeliveryTax = () => {
    const district = document.querySelector('.deliveryMethod input[name="district"]').value
    const deliveryTax = document.querySelector('#deliveryTaxValue')
    
    try {
        const price = districts.find(districtData => {
            return (removeAcento(districtData.name).toLowerCase() == removeAcento(district).toLowerCase())
        }).price
        deliveryTax.innerHTML = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        localStorage.setItem('deliveryTax', JSON.stringify(price))
        getTotal()
    } catch (error) {
        console.log(error)
        localStorage.removeItem('deliveryTax')
        deliveryTax.innerHTML = ""
        alertOpen(alerts.deliveryTaxNotFound, "alerts", "input[name=district]")
    }

}

window.selectPayment = (paymentMethod) => {
    const changeInput = document.querySelector('.showCart .payment .input')
    const pix = document.querySelector('.pixSelected')
    let paymentSelected = ''

    paymentMethod == 'money' ? changeInput.classList.remove('hide') : changeInput.classList.add('hide')
    paymentMethod == 'pix' ? pix.classList.remove('hide') : pix.classList.add('hide')

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
window.setChangeValue = (value) => {
    localStorage.setItem('changeNeeded', JSON.stringify(value))
    if (!value) localStorage.removeItem('changeNeeded')
}

window.getTotal = () => {
    const totalValueElement = document.querySelector('#totalValue')
    const subTotalValueElement = document.querySelector('#subTotalValue')
    const deliveryTaxValueElement = document.querySelector('#deliveryTaxValue')
    const receiveMethod = JSON.parse(localStorage.getItem('receiveMethod'))
    const cart = JSON.parse(localStorage.getItem('cart'))
    const deliveryTax = Number(JSON.parse(localStorage.getItem('deliveryTax')))

    subTotalValueElement.innerHTML = cart.total.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    // deliveryTaxValueElement.innerHTML = deliveryTax || ''

    if (deliveryTax) {
        totalValueElement.innerHTML = (cart.total.totalPrice + deliveryTax).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

        if (receiveMethod) deliveryTaxValueElement.innerHTML = deliveryTax.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    } else {
        totalValueElement.innerHTML = cart.total.totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        deliveryTaxValueElement.innerHTML = ''
    }
}

window.sendToWhatsApp = () => {
    const {
        client:{data: client},
        cart:{items:cartItems},
        cart:{total:{totalPrice:cartTotalprice}},
        receiveMethod,
        deliveryTax,
        paymentMethod,
        changeNeeded} = new LocalStorage

    if (!client.name || !client.telephone) return alertOpen(alerts.blankFields, 'alerts', ".buyerData")

    if (!receiveMethod) return alertOpen(alerts.noReceiveMethod, 'alerts', ".deliveryMethod")

    if (receiveMethod == 'delivery' && (!client.address.street || !client.address.district || !client.address.number)) {
        alertOpen(alerts.addresBlank, "alerts", ".deliveryMethod")
        return
    }

    if (!paymentMethod) return alertOpen(alerts.noPaymentMethod, 'alerts', ".payment")

    let texto = `
    *PEDIDO:*
    *Nome:* ${client.name} 
    *Telefone:* ${client.telephone}`

    if (receiveMethod == 'delivery') {
        texto += `
    *Endereço:* 
    ${client.address.street}, ${client.address.number}.
    ${client.address.district} - ${client.address.zipCode} 
    ${client.address.complement}`
    } else {
        texto += `
        
    *RETIRADA*
    `
    }


    for (const item of cartItems) {
        texto += `
        ${item.quantity}x *${menu.find(category => category.category == item.product.category).name
            .replace(/[sS]$/, "")
            .replace(/-/g, ' ')} - ${item.product.flavour}*`
        if (item.product.additional) {
            item.product.additional.forEach(additional => {
                texto += `
                +${additional.quantity}x ${additional.flavour}`
            });
        }
        if (item.product.note) texto += `
            *Observação:* ${item.product.note}`
    }

    texto += `\n
    *Subtotal:* ${transformToRealBRL(cartTotalprice)}
    *Taxa de entrega:* ${deliveryTax ? transformToRealBRL(deliveryTax)  : ''}
    *Total:* ${transformToRealBRL(deliveryTax ? (cartTotalprice + deliveryTax) : cartTotalprice ) }`


    texto += `
    *Forma de Pagamento:* ${paymentMethod}
    `
    if (paymentMethod == 'Dinheiro') {
        if (changeNeeded || document.querySelector('input[name="change"').value) {

            texto += `*Troco para:* ${changeNeeded || document.querySelector('input[name="change"').value} `
        } else {
            texto += `*Não será necessário troco.`
        }
    }

    if (paymentMethod == "PIX") texto += `*Chave PIX = 41925485000101 (CNPJ)`

    texto = window.encodeURIComponent(texto);


    window.open("https://api.whatsapp.com/send?phone=5519996129909&text=" + texto, "_blank");
}
//

