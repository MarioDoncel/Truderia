menu.push(entregas)
const promotion = {
    name: "COMBINACAO",
    category:"promotion",
    items: [
        {   
            value: 'COMBINACAO',
            flavour:'KITKAT + SONHO DE VALSA + CREME',
            price: 16
        },
        
    ]
}
menu.push(promotion)

const payments = ['DINHEIRO', 'DÉBITO', 'CRÉDITO', 'PIX']

function calculateTotal() {
    let hiddenTotal = document.querySelector('#totalValue strong')
    let visibleTotal = document.querySelector('.orderTotal p')
    let total = 0
    let values = document.querySelectorAll('tr .value')
    for (const price of values) {
        total += Number(price.innerHTML)
    }
    hiddenTotal.innerHTML = `R$ ${total.toFixed(2)}`
    visibleTotal.innerHTML = `R$ ${total.toFixed(2)}`
}
calculateTotal()

function openOptions(category) {
    let html = `<input type='hidden' value='${category.id}'>`
    let chosed = menu.filter(menuCategory => menuCategory.category == category.id)
    
    chosed[0].items.forEach(element => {
        html += ` 
        <button class onclick="addItem(this)">${element.flavour || element.value}</button>
        `
    });

    document.querySelector('.choices').innerHTML = html
}

function addItem(item) {
    let tbody = document.querySelector('tbody')
    let category = document.querySelector('.choices input').value
    let categoryChosed = menu.filter(menuCategory => menuCategory.category == category)[0]
    let itemChosed = categoryChosed.items.filter(product => item.innerHTML == product.flavour || item.innerHTML == product.value)[0]
    tbody.innerHTML += `
    <tr ${categoryChosed.name == 'TRUDEL' ? 'style="height:30px;vertical-align: bottom;"': ''}>
        <td class="quantity" style="text-align:center;">1</td>
        <td colspan="1" style="padding: 0 6px;">${categoryChosed.name}</td>
        <td colspan="3" ${itemChosed.flavour? 'style="font-weight:bold;"' : ''}>${itemChosed.flavour || itemChosed.item}</td>
        <td class="value" style="text-align:center;">${itemChosed.price.toFixed(2)}</td>
        <td onclick="removeItem(this)" class="delete"><div>X</div></td>
    </tr>
    `
    calculateTotal()
}

function removeItem(item) {
    item.parentNode.remove()
    calculateTotal()
}

function paymentOptions() {
    let html = ``
    payments.forEach(element => {
        html += `
            <button class onclick="addPayment(this)">${element}</button>
        `
    })
    document.querySelector('.choices').innerHTML = html
}

function addPayment(choice) {
    let html = ``
    let paymentChosed = document.querySelector('#paymentChosed')
    html += `
        <p>Forma de pagamento: <span>${choice.innerHTML}</span></p>
    `
    if (choice.innerHTML == "DINHEIRO") {
        html += `
        <small>Troco para </small><input id="change" type="text">
        `
    }
    paymentChosed.innerHTML = html
}

function endOrder() {
    addDeliveryTax()   
    calculateTotal()
    let fieldsFilled = checkFields()
    if (!fieldsFilled) return
    sendToWhatsApp()
}

function sendToWhatsApp() {
    let name = document.querySelector('#name input')
    let phone = document.querySelector('#phone input')
    let address = document.querySelector('#address input')
    let note = document.querySelector('#note textarea')
    let order = document.querySelector('#orderTable')
    let orderItens = document.querySelectorAll('tbody tr')
    let payment = document.querySelector('#paymentChosed span')
    let change = document.querySelector('#change')

    if (!document.querySelector('#paymentChosed')) {
        console.log('sem pagamento')
        return
    }

    let texto = `
    PEDIDO:
    *Nome:* ${name.value} 
    *Telefone:* ${phone.value} 
    *Endereço:* ${address.value} 
    *Obs.::* ${note.value} 
    `
    for (const item of orderItens) {
        texto += `
            ${item.children[0].innerHTML} - *${item.children[1].innerHTML.replace('IS', 'L').replace('SORVETES', 'SORVETE').replace('ENTREGAS', 'ENTREGA')}* de ${item.children[2].innerHTML}
        `
    }

    texto += `
    *Forma de Pagamento:* ${payment.innerHTML}
    `
    if (change) {
        console.log(change.value)
        texto += `*Troco para:* R$${Number(change.value).toFixed(2)}`
    }

    texto = window.encodeURIComponent(texto);
    
  
    window.open("https://api.whatsapp.com/send?phone=5519996129909&text=" + texto, "_blank");
}

function removeAcento (text)
{                                                               
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}

function searchDistricts() {
    let filteredDistricts = []
    let select = document.querySelector('input#selectDistrict')
    let options = document.querySelector('#district ul')

    if (select.value) {
        filteredDistricts = districts.filter(district => removeAcento(district.name.toUpperCase()).includes(removeAcento(select.value.toUpperCase())));
        let list =''
        for (const district of filteredDistricts) {
            list += `
            <li onclick="selectDistrict(this)">${district.name}</li>
            `
        }
        options.innerHTML = list
    } else {
        closeOptions()
    }
   
    
}

function selectDistrict(selected) {
    let select = document.querySelector('input#selectDistrict')
    select.value = selected.innerHTML
    addDeliveryTax()
    closeOptions()
}
function closeOptions() {
    let options = document.querySelector('#district ul')
    options.innerHTML = ''
}

async function addDeliveryTax() {
    let tbody = document.querySelector('tbody')
    let district = document.querySelector('input#selectDistrict').value
    let orderItens = document.querySelectorAll('tbody tr')
    for (const item of orderItens) {
        if (item.children[1].innerHTML == 'ENTREGAS') {
            item.remove()
    }}

    district = districts.find(districtData => districtData.name == district)
    tbody.innerHTML += `
        <tr>
            <td class="quantity" style="text-align:center;">1</td>
            <td colspan="1" style="padding: 0 6px;">ENTREGAS</td>
            <td colspan="3">TAXA DE ENTREGA</td>
            <td class="value" style="text-align:center;">${district.price.toFixed(2)}</td>
            <td onclick="removeItem(this)" class="delete"><div>X</div></td>
        </tr>
        `
    
    
    calculateTotal()
}

function checkFields() {
    let name = document.querySelector('#name input')
    let phone = document.querySelector('#phone input')
    let address = document.querySelector('#address input')
    let orderItens = document.querySelectorAll('tbody tr')
    let payment = document.querySelector('#paymentChosed span')
    let change = document.querySelector('#change')
    let taxExists = false
    for (const item of orderItens) {
        if (item.children[1].innerHTML == 'ENTREGAS') {
            taxExists = true
    }}
    


    if(!name.value)  return fillField('Preencha seu nome por favor.')
    if(!phone.value) return fillField('Preencha seu telefone por favor.')
    if(!address.value) return fillField('Preencha seu endereço por favor.')
    if(!taxExists) return fillField('Selecione um bairro por favor.')
    if(!payment) return fillField('Selecione uma forma de pagamento por favor')
    if(change && !change.value) return fillField('Preencha o valor para troco')
    

    return true
    
}

function fillField(text) {
    alert(text)
    
}