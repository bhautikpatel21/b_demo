const UserServices = require('../../services/user.service');
const userServices = new UserServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email});

        if(user){
            res.status(400).json({message : `User already registered.........`});
        }
        
        if(req.file){
            req.body.profileImage = `${req.file.path}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);

        user = await userServices.addNewUser({...req.body, password : hashPassword, isDelete : false});

        res.status(201).json({user,message : `User register succesfully...........`})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error...........${console.error()}`});
    }
};

exports.loginUser = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email, isDelete : false});

        if(!user)
            {
                res.status(404).json({message : `Email does not found..........`});
            }

            let checkPassword = await bcrypt.compare(req.body.password, user.password);
            
            if(!checkPassword)
                {
                    res.status(401).json({message : `password is not match.......`});
                }

                let token = await jwt.sign({userId : user._id},'User');
                console.log(token);

                res.status(200).json({user,message : `User login successfully...........`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.getUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user){
            res.status(404).json({message : `User not found......`});
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.getAllUser = async(req,res) => {
    try {
        let users = await userServices.getAllUser({isDelete : false});

        if(!users){
            res.status(404).json({message : `User not found.........`});
        }

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.updateUser = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user){
            res.status(404).json({message : `User does not found...........`});
        }

        user = await userServices.updateUser(user._id,{...req.body});

        res.status(201).json({user, message : `User update successfully.......`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.deleteUser = async(req,res) => {
    try {
        let user = await userServices.updateUser(req.query.userId);

        if(!user){
            res.status(404).json({message : `user not found........`});
        }

        user = await userServices.updateUser({isDelete : false});

        res.status(200).json({message : `User delete successfully...........`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
};

exports.updatePassword = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId)

        if(!user){
            res.status(404).json({message : `user not found.........`});
        }

        let comparePassword = await bcrypt.compare(req.body.oldPassword, req.body.password);

        let oldPassword = req.body.oldPassword;

        if(!oldPassword)
            {
                return res.json({message : `oldPassword not found.........`});
            }

        if(!comparePassword) {
            return res.json({messaga : `Old password is not match`});
        }

        let newPassword = req.body.newPassword;

        if(!newPassword){
            return res.json({message : `New password not found.....`});
        }

        if(newPassword === oldPassword){
            res.json({message : `Please enter the defarant password.......`});
        }

        let confirmPassword = req.body.confirmPassword;

        if(!confirmPassword){
            res.json({message : `Confirm password not found..........`});
        }

        if(newPassword !== confirmPassword){
            res.json({message : `Enter the defarant password.......`});
        }

        let hashPassword = await bcrypt.hash(newPassword,10);

        user = await userServices.updateUser(req.user._id,{password:hashPassword});

        res.status(200).json({user, message : `Password update successfully............`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
}
