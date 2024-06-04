const product = require('../model/product.model');

module.exports = class productServices {

    // Add product 

    async addNewProduct(body) {
        try {
            return await product.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Product 

    async getProduct(body) {
        try {
            return await product.findOne(body);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get product By Id 

    async getProductById(id) {
        try {
            return await product.findById(id);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get All Product 

    async getAllProduct(query) {
        try {
            let categoryWise = query.category && query.category !== "" ?[
                {$match : { category : query.category}}
            ] : [];

            let find = [
                { $match : {isDelete : false}},
                ...categoryWise
            ];

            let result = product.aggregate(find);
            return result;

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // update Product 

    async updateProduct(id,body) {
        try {
            return await product.findByIdAndUpdate(id,{$set : body}, {new : true}); 

        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
   
}