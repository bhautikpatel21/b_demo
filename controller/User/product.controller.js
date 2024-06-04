const ProductServices = require('../../services/product.service');
const productServices = new ProductServices;

exports.addNewProduct = async(req,res) => {
    try {
        let product = await productServices.getProduct({title : req.body.title, isDelete : false});

        if(product) {
            return res.status(400).json({product,message : `Product is already found.......`});
        }

        product = await productServices.addNewProduct({...req.body});

        res.status(201).json({product, message : `Product added succesfully..........`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
};

exports.getProduct = async(req,res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);

        if(!product){
            return res.status(404).json({message : `Product is not found.........`});
        }

        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
};

exports.getAllProduct = async(req,res) => {
    try {
        let products = await productServices.getAllProduct({isDelete : false});

        if(!products) {
            return res.status(404).json({message : `Product is not found........`});
        }

        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
};

exports.updateProduct = async(req,res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);

        if(!product) {
            return res.status(404).json({message : `Product is not found...........`});
        }

        product = await productServices.updateProduct(product._id,{...req.body});

        res.status(202).json({product, message : `Product update successfully............`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
};

exports.deleteProduct = async(req,res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);

        if(!product) {
            res.status(404).json({message : `Product already not found.......`});
        }

        product = await productServices.updateProduct(product._id, ({isDelete : true}));

        res.status(202).json({message : `Product delete successfully.........`});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
}