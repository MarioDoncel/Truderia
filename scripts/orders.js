// Operational

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

// Actions Orders

async function printOrder() {
    let name = document.querySelector('#name input')
    let phone = document.querySelector('#phone input')
    let address = document.querySelector('#address input')
    let note = document.querySelector('#note textarea')
    let district = document.querySelector('#district input')
    let payment = document.querySelector('#paymentChosed span')
    let change = document.querySelector('#change')
    

    addDeliveryTax()
    let hiddenTotal = document.querySelector('#totalValue strong').innerHTML.replace('R$',"")

    let order = document.querySelector('#orderTable')
    let html = `
        <h1 style="margin-bottom: 2px;">TRUDERIA</h1>
        <span>CNPJ: 41.925.485/0001-01</span>
        <p style="margin: 4px 0;font-size:24px"><strong>NOME:</strong> ${name.value}</p>
        <p style="margin: 4px 0;line-heigth: 1rem;"><strong>TELEFONE:</strong> ${phone.value}</p>
        <p style="margin: 4px 0;"><strong>ENDEREÇO:</strong> ${address.value}</p>
        <p style="margin: 4px 0;"><strong>BAIRRO:</strong> ${district.value}</p>
        <p style="margin: 4px 0;"><strong>OBS.:</strong> ${note.value}</p>
        ${order.innerHTML}
    `
    

    if (payment) {
        html += `<p style="margin: 8px 0 4px 0;"><strong>Forma de pagamento:</strong> ${payment.innerHTML}</p>`
    }

    if (change) {
        html += `<p style="margin: 4px 0;"><strong>Troco para:</strong> R$ ${Number(change.value).toFixed(2)} = R$ ${(Number(change.value)-Number(hiddenTotal)).toFixed(2)} </p>`
    }

    let printWindow = window.open('about:blank');

    printWindow.document.write(html);
    let deleteButtons = printWindow.document.querySelectorAll('.delete')
    printWindow.document.querySelector('.orderTotal').remove()
    for (const del of deleteButtons) {
        del.remove()
    }
    printWindow.window.print();
    printWindow.window.close();

}

function endOrder() {
    let inputs = document.querySelectorAll('input')
    for (const iterator of inputs) {
        iterator.value = ''
    }

    document.querySelector('textarea').value = ''
    document.querySelector('tbody').innerHTML = ''
    document.querySelector('#paymentChosed').innerHTML = ''
    document.querySelector('.choices').innerHTML = ''

    calculateTotal()
}

// Districts and Tax

function searchDistricts() {
    let filteredDistricts = []
    let select = document.querySelector('input#selectDistrict')
    let options = document.querySelector('#district ul')

    if (select.value) {
        filteredDistricts = districts.filter(district => removeAcento(district.name.toUpperCase()).includes(select.value.toUpperCase()));
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
    closeDistrictOptions()
}

function closeDistrictOptions() {
    let options = document.querySelector('#district ul')
    options.innerHTML = ''
}

async function addDeliveryTax() {
    let tbody = document.querySelector('tbody')
    let district = document.querySelector('input#selectDistrict').value
    let orderItens = document.querySelectorAll('tbody tr')
    let taxExists = false
    for (const item of orderItens) {
        if (item.children[1].innerHTML == 'ENTREGAS') {
            taxExists = true
    }}

    if (!taxExists) {
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
    }
    
    calculateTotal()
}

// Utilities

function sendToWhatsApp() {
    let name = document.querySelector('#name input')
    let phone = document.querySelector('#phone input')
    let address = document.querySelector('#address input')
    let note = document.querySelector('#note textarea')
    let order = document.querySelector('#orderTable')
    let orderItens = document.querySelectorAll('tbody tr')
    let payment = document.querySelector('#paymentChosed span')
    let change = document.querySelector('#change')

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
        texto += `*Troco para:* R$${change.value.toFixed(2)}`
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

//  Run

calculateTotal()