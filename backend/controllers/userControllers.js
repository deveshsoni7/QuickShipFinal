import userModal from "../models/UserModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req,res)=>{

    const {email,password} = req.body;
    try {
        const user = await userModal.findOne({email});

        if(!user){
           return res.json({success:false,message:"User DoesNot Exit"});
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Incorrect PassWord"});
        }

        const token = createToken(user._id);
        // let a = localStorage.setItem("userId", user.data.user._id);
        // console.log(a);
        console.log(user._id);
        res.json({success:true,token,user});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in login"});
    }

}



//register user

const registerUser = async(req,res)=>{
    const {email,password,phone} = req.body;

    try {
        const exists = await userModal.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Enter Strong Password"})
        }
        if (!req.body.phone) {
            return res.status(400).json({ error: 'Phone number is required' });
          }

        // hasing user password 
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModal({
            
            email:email,
            password:hashedPassword,
            phone: phone
        })

        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedUser = await userModal.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update user" });
    }
  };

export { loginUser, registerUser, updateUser };