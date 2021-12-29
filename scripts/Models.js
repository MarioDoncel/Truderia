
window.Cart = {
    init(oldCart) {
        if (oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
            this.date = oldCart.date
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                totalPrice: 0,
            }
            this.date = new Date()
        }

        return this
    },
    addOne(product) {

        let cartHasProduct = this.findItem(product)

        if (!cartHasProduct) {
            cartHasProduct = {
                product: { ...product },
                quantity: 0,
                totalPrice: 0
            },
                this.items.push(cartHasProduct)
        }

        let additionalsPrice = 0
        if (cartHasProduct.product.additional) cartHasProduct.product.additional.forEach(additional => {
            additionalsPrice += additional.price * additional.quantity
        })

        const totalProductPrice = cartHasProduct.product.price + additionalsPrice
        cartHasProduct.quantity++
        cartHasProduct.totalPrice = cartHasProduct.quantity * totalProductPrice

        this.total.quantity++
        this.total.totalPrice += totalProductPrice

        return this
    },
    removeOne(product) {
        const item = this.findItem(product)

        item.quantity--
        item.totalPrice -= product.price

        this.total.quantity--
        this.total.totalPrice -= product.price

        if (item.quantity == 0) this.deleteProduct(product)

        return this
    },
    deleteItem(product) {
        const item = this.findItem(product)

        this.total.quantity -= item.quantity
        this.total.totalPrice -= item.totalPrice

        this.items = this.items.filter(item => product.flavour != item.product.flavour || product.category != item.product.category || item.product.additional != product.additional)

        return this
    },
    findItem(product) {
        return this.items.find(item => item.product.flavour == product.flavour && product.category == item.product.category && JSON.stringify(item.product.additional) == JSON.stringify(product.additional))

    }

}

class ClientClass {
    constructor(){
        this.data = {
            name: '',
            telephone: '',
            address: {
                zipCode: '',
                street: '',
                district: '',
                number: '',
                complement: ''
            }
        }
    }

    checkClientExists(){
        let clientExists = JSON.parse(localStorage.getItem('client'))
        if (!clientExists) clientExists = new ClientClass
        return clientExists
    }

    init() {
        return this.checkClientExists()
    }

    updateName(name) {
        this.data = this.checkClientExists().data
        this.data.name = name
        return this
    }

    updateTelephone(telephone) {
        this.data = this.checkClientExists().data
        this.data.telephone = telephone
        return this
    }
    updateZipCode(zipCode) {
        this.data = this.checkClientExists().data
        this.data.address.zipCode = zipCode
        return this
    }

    updateVIACEP(newData) {
        this.data = this.checkClientExists().data
        this.data.address.street = newData.address.street
        this.data.address.district = newData.address.district
        this.data.address.zipCode = newData.address.zipCode
        return this
    }

    updateStreet(street) {
        this.data = this.checkClientExists().data
        this.data.address.street = street
        return this
    }
    updateDistrict(district) {
        this.data = this.checkClientExists().data
        this.data.address.district = district
        return this
    }
    updateNumber(number) {
        this.data = this.checkClientExists().data
        this.data.address.number = number
        return this
    }
    updateComplement(complement) {
        this.data = this.checkClientExists().data
        this.data.address.complement = complement
        return this
    }
}

window.Client = new ClientClass

// class LocalStorage {
//     constructor(){
//         this.cart = JSON.parse(localStorage.getItem('cart'))
//         this.itemChosed = JSON.parse(localStorage.getItem('itemChosed'))
//         this.paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
//         this.receiveMethod = JSON.parse(localStorage.getItem('receiveMethod'))
//         this.categoryChosed = JSON.parse(localStorage.getItem('categoryChosed'))
//         this.client = JSON.parse(localStorage.getItem('client'))
//         this.changeNeeded = JSON.parse(localStorage.getItem('changeNeeded'))
//         this.deliveryTax = JSON.parse(localStorage.getItem('deliveryTax'))
//     }
//     static save(key, value){
//         localStorage.setItem(key, JSON.stringify(value))
//     }
//     static delete(key){
//         localStorage.removeItem(key)
//     }
// }





// const Client = {
//     init() {
//         const oldClient = JSON.parse(localStorage.getItem('client'))
//         if (oldClient) {
//             this.data = oldClient.data
//         } else {
//             this.data = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }
//             }
//         }
//         return this
//     },
//     updateVIACEP(newData) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))
//         // if(clientExists) this.data = this.data.data

//         if (!clientExists) {
//             clientExists = {
//                 data: {
//                     name: '',
//                     telephone: '',
//                     address: {
//                         zipCode: '',
//                         street: '',
//                         district: '',
//                         number: '',
//                         complement: ''
//                     }
//                 }
//             },

//                 this.data = clientExists.data
//         }
//         this.data.address.street = newData.address.street
//         this.data.address.district = newData.address.district
//         this.data.address.zipCode = newData.address.zipCode


//         return this
//     },
//     updateName(name) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.name = name


//         return this
//     },
//     updateTelephone(telephone) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.telephone = telephone
//         return this
//     },
//     updateZipCode(zipCode) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.address.zipCode = zipCode
//         return this
//     },
//     updateStreet(street) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.address.street = street
//         return this
//     },
//     updateDistrict(district) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.address.district = district
//         return this
//     },
//     updateNumber(number) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.address.number = number
//         return this
//     },
//     updateComplement(complement) {
//         let clientExists = JSON.parse(localStorage.getItem('client'))

//         if (!clientExists) {
//             clientExists = {
//                 name: '',
//                 telephone: '',
//                 address: {
//                     zipCode: '',
//                     street: '',
//                     district: '',
//                     number: '',
//                     complement: ''
//                 }

//             },
//                 this.data = clientExists
//         }
//         this.data.address.complement = complement
//         return this
//     },
// }