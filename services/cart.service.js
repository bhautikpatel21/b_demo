const cart = require('../model/cart.model');

module.exports = class cartServices {

    // Add To Cart

    async addToCart(body) {
        try {
            return await cart.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Cart 

    async getCart(body) {
        try {
            return await cart.findOne(body).populate('cartItem');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Cart By Id 

    async getCartById(id) {
        try {
            return await cart.findById(id).populate('cartItem');
        } catch (error) {
            conosle.log(error);
            return error.message;
        }
    };

    // Get All Cart

    async getAllCart(query) {
        try {
            let find = [
                {$match : {isDelete : false}}
            ];

            let result = await cart.aggregare(find);
            return result;

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get All Carts 

    async getAllCarts(body) {
        try {
            return await cart.find(body).populate('cartItem');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Update Cart 

    async updateCart(id,body) {
        try {
            return await cart.findByIdAndUpdate(id, {$set : body}, {new : true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // update Many 

    async updateMany(body) {
        try {
            return await cart.updateMany(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
}