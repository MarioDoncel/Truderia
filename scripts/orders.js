import { menu, payments } from './data'
import districts from './dataDistrict'
import {removeAcento} from './utils'

const nameInput = document.querySelector('#name')
const phoneInput = document.querySelector('#phone')
const addressInput = document.querySelector('#address')
const districtInput = document.querySelector('#selectDistrict')
const districtOptions = document.querySelector('#district ul')
const observations = document.querySelector('textarea')
const itemChoices = document.querySelector('.choices')
const orderTbody = document.querySelector('tbody')

window.openOptions = (categorySelected) => {
    let html = `<input type='hidden' category value='${categorySelected.id}'>`
    const chosed = menu.filter(({category}) => category == categorySelected.id)
   
    chosed[0].items.forEach(({flavour, value}) => {
        html += ` 
        <button class onclick="addItem(this)">${flavour || value}</button>
        `
    });

    itemChoices.innerHTML = html
}

window.addItem = ({innerHTML: itemClicked }) => {
    const category = document.querySelector('[category]').value
    const categoryChosed = menu.filter(menuCategory => menuCategory.category == category)[0]
    const itemChosed = categoryChosed.items.filter(({flavour, value}) => 
        itemClicked == flavour || itemClicked == value)[0]

    orderTbody.innerHTML += `
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

window.removeItem = (item) => {
    item.parentNode.remove()
    calculateTotal()
}

window.paymentOptions = () => {
    let html = ``
    payments.forEach(element => {
        html += `
            <button class onclick="addPayment(this)">${element}</button>
        `
    })
    itemChoices.innerHTML = html
}

window.addPayment = (choice) => {
    let html = ``
    const paymentChosed = document.querySelector('#paymentChosed')
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

window.calculateTotal = () => {
    const hiddenTotal = document.querySelector('#totalValue strong')
    const visibleTotal = document.querySelector('.orderTotal p')
    let total = 0
    const values = document.querySelectorAll('tr .value')
    for (const price of values) {
        total += Number(price.innerHTML)
    }
    hiddenTotal.innerHTML = `R$ ${total.toFixed(2)}`
    visibleTotal.innerHTML = `R$ ${total.toFixed(2)}`
}

// Actions Orders

window.printOrder= async () => {
    let payment = document.querySelector('#paymentChosed span')
    let change = document.querySelector('#change')
    
    addDeliveryTax()

    const hiddenTotal = document.querySelector('#totalValue strong').innerHTML.replace('R$',"")
    const order = document.querySelector('#orderTable')
    let html = `
        <h1 style="margin-bottom: 2px;">TRUDERIA</h1>
        <span>CNPJ: 41.925.485/0001-01</span>
        <p style="margin: 4px 0;font-size:24px"><strong>NOME:</strong> ${nameInput.value}</p>
        <p style="margin: 4px 0;line-heigth: 1rem;"><strong>TELEFONE:</strong> ${phoneInput.value}</p>
        <p style="margin: 4px 0;"><strong>ENDEREÇO:</strong> ${addressInput.value}</p>
        <p style="margin: 4px 0;"><strong>BAIRRO:</strong> ${districtInput.value}</p>
        <p style="margin: 4px 0;"><strong>OBS.:</strong> ${observations.value}</p>
        ${order.innerHTML}
    `
    

    if (payment) {
        html += `<p style="margin: 8px 0 4px 0;"><strong>Forma de pagamento:</strong> ${payment.innerHTML}</p>`
    }

    if (change) {
        html += `<p style="margin: 4px 0;"><strong>Troco para:</strong> R$ ${Number(change.value).toFixed(2)} = R$ ${(Number(change.value)-Number(hiddenTotal)).toFixed(2)} </p>`
    }

    const printWindow = window.open('about:blank');

    printWindow.document.write(html);
    printWindow.document.querySelector('.orderTotal').remove()
    const deleteButtons = printWindow.document.querySelectorAll('.delete')
    for (const btn of deleteButtons) {
        btn.remove()
    }
    printWindow.window.print();
    printWindow.window.close();

}

window.endOrder = () => {
    const inputs = document.querySelectorAll('input')
    for (const iterator of inputs) {
        iterator.value = ''
    }

    observations.value = ''
    orderTbody.innerHTML = ''
    document.querySelector('#paymentChosed').innerHTML = ''
    itemChoices.innerHTML = ''

    calculateTotal()
}

// Districts and Tax

window.searchDistricts = () => {
    const filteredDistricts = []

    if (districtInput.value) {
        filteredDistricts = districts.filter(district => removeAcento(district.name.toUpperCase()).includes(districtInput.value.toUpperCase()));
        let list =''
        for (const district of filteredDistricts) {
            list += `
            <li onclick="selectDistrict(this)">${district.name}</li>
            `
        }
        districtOptions.innerHTML = list
    } else {
        closeOptions()
    }
   
    
}

window.selectDistrict = (selected) => {
    districtInput.value = selected.innerHTML
    closeDistrictOptions()
}

window.closeDistrictOptions = () => {
    districtOptions.innerHTML = ''
}

window.addDeliveryTax = async() =>  {
    const orderItens = document.querySelectorAll('tbody tr')
    let taxExists = false
    for (const item of orderItens) {
        if (item.children[1].innerHTML == 'ENTREGAS') {
            taxExists = true
    }}

    if (!taxExists) {
        const district = districts.find(districtData => districtData.name == districtInput.value)
        orderTbody.innerHTML += `
    <tr>
        <td class="quantity" style="text-align:center;">1</td>
        <td colspan="1" style="padding: 0 6px;">ENTREGAS</td>
        <td colspan="3">TAXA DE ENTREGA</td>
        <td class="value" style="text-align:center;">${district.price.toFixed(2)}</td>
        <td onclick="removeItem(this)" class="delete"><div>X</div></td>
    </tr>
    `
    }
    
    calculateTotal()
}


calculateTotal()