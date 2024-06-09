const cart= require('../model/cart.model');

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

    // Get All Carts

    async getAllCarts(query) {
        try {
            let find = [
                {$match : {isDelete : false}}
            ];

            let result = await cart.aggregate(find);
            return result;

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
            return await cart.findbyId(id).populate('cartItem');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // update Cart

    async updateCart(id,body) {
        try {
            return await cart.findByIdAndUpdate(id,{$set : body}, {new :true});
            
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}