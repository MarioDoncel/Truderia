const path = require('path');


module.exports = {
    entry: {
        index: path.resolve(__dirname, './scripts/index'),
        orders: path.resolve(__dirname, './scripts/orders'),
        menu: path.resolve(__dirname, './scripts/menu'),
        selectItem: path.resolve(__dirname, './scripts/selectItem'),
        modal: path.resolve(__dirname, './scripts/modal'),
        lightbox: path.resolve(__dirname, './scripts/lightbox'),
        cart: path.resolve(__dirname, './scripts/cart'),
        utils: path.resolve(__dirname, './scripts/utils'),
        Models: path.resolve(__dirname, './scripts/Models'),
        googleAPI: path.resolve(__dirname, './scripts/googleAPI'),

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map'
    },
   
    devtool: 'source-map'
}