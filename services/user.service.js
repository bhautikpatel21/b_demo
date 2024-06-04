const user = require('../model/user.model');

module.exports = class userServices {

    // Add user

    async addNewUser(body) {
        try {
            return await user.create(body);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // get user 

    async getUser(body){
        try {
            return await user.findOne(body);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get user By id 

    async getUserById(id){
        try {
            return await user.findById(id);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // getAllUser 

    async getAllUser(body) {
        try {
            return await user.find(body);

        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // updateUser

    async updateUser(id,body)
    {
        try {
            return await user.findByIdAndUpdate(id,{$set :body}, {new:true});
            
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}