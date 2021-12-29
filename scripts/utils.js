window.transformToRealBRL = (value) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

window.Mask = {
    apply(input, func) { //aplicador com setTimeout .... input neste caso é definido no HTML com o THIS  .. func a mask que deseja aplicar
        setTimeout(function () {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")  // Substituir todos os caracteres que não sejam numeros

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100) // Formatando para reais
    },
    zipCodeBRL(value) {
        const formattedValue = value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})/, "$1-$2");

        return formattedValue;
    },
    telephoneBRL(value) {
        const formattedValue = value.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");

        return formattedValue;
    },
}

export function removeAcento(text) {
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛÜ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const alerts = {
    wrongCep: `CEP inválido.`,
    cepNotFound: `CEP não encontrado para calcular a taxa de entrega. \nSem problemas!\nPode seguir com o pedido e resolveremos essa questão através do Whatsapp. =)`,
    blankFields: `Favor preencher todos os campos obrigatórios, são aqueles que contém  <span style="color:red; font-weight:bold">*</span> .`,
    addresBlank: `Favor preencher todos os campos obrigatórios de endereço marcados com <span style="color:red; font-weight:bold">*</span> para opção de entrega.`,
    noReceiveMethod: `Favor escolher uma forma de recebimento do pedido.`,
    noPaymentMethod: `Favor escolher uma forma de pagamento.`,
    deliveryTaxNotFound: `Não encontramos a taxa de entrega para este bairro. \n Sem problemas !! Pode seguir com o pedido e resolveremos essa questão através do Whatsapp. =)`,
}