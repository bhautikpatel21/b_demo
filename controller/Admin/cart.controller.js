const CartServices = require('../../services/cart.service');
const cartServices = new CartServices();

exports.getAllCarts = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error...........${console.error()}`});
    }
}