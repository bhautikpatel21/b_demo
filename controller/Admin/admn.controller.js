const UserServices = require('../../services/user.service');
const userServices = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req,res) => {
    try {
        let admin = await userServices.getUser({email : req.body.email,isDelete : false});
        console.log(admin);

        if(admin) {
           return res.status(400).json({message : `Email already registered........`});
        }

        let hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);

        admin = await userServices.addNewUser({...req.body, password: hashPassword, isAdmin : true});

        res.status(201).json({message : `Admin register successfully............`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.loginUser = async(req,res) => {
    try {
        let admin = await userServices.getUser({email : req.body.email,isDelete : false});

        if(!admin) {
           return res.status(404).json({message : `Email does not found................`});
        }

        let checkPassword = await bcrypt.compare(req.body.password, admin.password);

        if(!checkPassword) {
            return res.status(401).json({message : `Password does not match........`});
        }

        let token = await jwt.sign({adminId: admin._id}, `Admin`);
        console.log(token);

        res.status(200).json({token, message : `Admin login successfully............`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.getUser = async(req,res) => {
    try {
        let admin = await userServices.getUserById(req.query.adminId);
        console.log(admin);

        if(!admin) {
            res.status(404).json({message : `User does not found.......`});
        }

        res.status(200).json(admin);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error.......${console.error()}`});
    }
};

exports.getAllUser = async(req,res) => {
    try {
        let admin = await userServices.getAllUser({isDelete : false})

        if(!admin) {
            res.status(404).json({message : `User not found.........`});
        }

        res.status(200).json(admin);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error.........${console.error()}`});
    }
};

exports.updateUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.adminId);

        if(!user) {
            res.status(404).json({message : `User not found.........`});
        }

        user = await userServices.updateUser(admin._id,{...req.body});

        res.status(201).json({user, message : `User update successfully.....`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.deleteUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.body.adminId);

        if(!user){
            res.status(404).json({message : `User not found......`});
        }

        user = await userServices.updateUser(admin._id,{isDelete: true});

        res.status(200).json({user, message : `Users delete successfully.............`});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error........${console.error()}`});
    }
}