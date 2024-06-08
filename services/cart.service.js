const cart = require('../model/cart.model');

module.exports = class cartservices {
    
    // Add to cart 

    async addToCart(body) {
        try {
            return await cart.create(body);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // get Spacific cart item 

    async getCart(body) {
        try {
            return await            
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}