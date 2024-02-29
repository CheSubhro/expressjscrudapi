import User from "../model/userModel.js";
import upload from '../multerConfig.js'
import multer from 'multer';
import path from 'path';

export const create = async(req,res) =>{
    console.log(req.body); 

    try {
        // Create a new User instance with text fields
        const userData = new User({
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            dob: req.body.dob,
            language: req.body.language,
            status: req.body.status,
        });
    
        // Check if there is a file in the request
        if (req.file) {
          // Assign the file path or URL to the 'img' field
          userData.img = path.basename(req.file.path); // Adjust this based on your server configuration
        }
    
        // Save the user data
        const saveData = await userData.save();
        
        res.status(200).json(saveData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAll = async(req,res) =>{
    try {

        const userData = await User.find();

        if(!userData){
            return res.status(404).json({msg:"User Data Not Found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {

        res.status(500).json({error:error});
    }
}

export const getOne = async(req,res) =>{
    try {
        
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"User Not Found"})
        }
        res.status(200).json(userExist);

    } catch (error) {

        res.status(500).json({error:error});
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        // Create a new User instance with updated fields
        const updatedUserData = {
            username: req.body.username || userExist.username,
            email: req.body.email || userExist.email,
            address: req.body.address || userExist.address,
            gender: req.body.gender || userExist.gender,
            dob: req.body.dob || userExist.dob,
            language: req.body.language || userExist.language,
            status: req.body.status || userExist.status,
        };

        // Check if there is a file in the request
        if (req.file) {
            // Assign the file path or URL to the 'img' field
            updatedUserData.img = req.file.path; // Adjust this based on your server configuration
        }

        // Update the user data
        const updatedData = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteUser = async(req,res)=>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({msg:"User Not Found"});
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({msg:"User Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:error}); 
    }
}