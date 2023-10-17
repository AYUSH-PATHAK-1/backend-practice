// const jwt=require("jsonwebtoken");
// const express=require("express");
// const router=express.Router();
// const bcrypt=require("bcryptjs");   
// require('../db/conn');
// const User=require("../model/userSchema");
// // const authenticate=require("../../middleware/authenticate");

// router.get('/',(req,res)=>{
//     res.send('hello home');
// })

// // router.get('/register',(req,res)=>{
// //     res.send('hello home');
// // })

// router.get('/signin',(req,res)=>{   
//     res.send('hello home');
// })

// router.post('/register',async(req,res)=>{
//     const{name,email,phone,work,password,cpassword}=req.body;

//     if(!name || !email || !phone || !work || !password ||!cpassword){
//         // json is postman o/p
//         return res.status(422).json({error:"Plz Fill the field Properly"});

//     }else if(password != cpassword){
//         return res.status(400).json({Error:"Passwords are not matching"})}

//     try{
//         const userExist=await User.findOne({email:email});

        
//         // const token=await userLogin.generateAuthToken();
//         // res.cookie("jwt",token,{
//         //     httpOnly:true
//         // });
//             // console.log("the token part"+token);

//         if(userExist){
//         // json is postman o/p
//             return res.status(422).json({error:"Email is already present"});
//         }

//         const user=new User({name,email,phone,work,password,cpassword});
//         const userRegister=await user.save();
//         if(userRegister){
//         // json is postman o/p
//             res.status(201).json({message:"User Register Succsessfully"});
//         }
//     }catch(e){
//         res.status(500).send(e)
//     }
    


//     // console.log(name);
//     // console.log(email);
//     // console.log(req.body);
//     // res.json({message:req.body});
// });


// router.post('/signin',async(req,res)=>{
//     // console.log(req.body);
//     try{
//         const {email,password}=req.body;
//         if(!email || !password){
//             return res.status(400).json({Error:"Please Fill The Data"})
//         }
//         const userLogin=await User.findOne({email:email});

//         if(userLogin){
//             const isMatch=await bcrypt.compare(password,userLogin.password);

//             const token=await userLogin.generateAuthToken();
//             res.cookie("jwt",token,{
//                 expires:new Date(Date.now()+80000),
//                 httpOnly:true
//             });
//             // console.log("the token part"+token);

//         if(!isMatch){
//             res.status(400).json({Error:"Error in Login"}); 
//         }else{
//             res.status(200).json({message:"Login Successfull"});
//             console.log(userLogin);
//         }}else{
//             res.status(400).json({Error:"Error in Login"}); 
//         }
//         console.log(userLogin);       

//         // res.json(req.body);


//     }catch(e){
//         console.log(e);
//     }
// })



// router.get("/about",(req,res)=>{
//     res.send(req.rootuser);
//     // console.log("hello my about");
// });

// router.get("/getdata",(req,res)=>{
//     res.send(req.rootuser);
//     // console.log("hello my about");
// });

// router.post('/contact',async(req,res)=>{
//     // res.send(req.rootuser);
//     // console.log("hello my about");
//     try{
//         const{name,email,phone,message}=req.body;

//         if(!name || !email || !phone || !message){
//             console.log("error in contact form");
//             return res.status(400)({e:"Please Fill the Contact Form"});
            

//         }

//         const userContact=await User.findOne({email:email});
 
//         if(userContact){
//             const userMessage=await userContact.addMessage(name,email,phone,message);

//             await userContact.save();

//             res.status(201).json({message:"Message Send Successfully"});
            

//         }

//     }catch(error){
//         console.log(error);
//     }


// });


// router.get("/logout", (req, res) => {
//     // Clear the cookie first
//     res.clearCookie('jwt', { path: '/' });
//     console.log("Cookie cleared");

//     // Send the response after clearing the cookie
//     res.status(200).send('User Logout');
// });



// module.exports=router;


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send("Hello Home");
});

router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ Error: "Please fill all the data properly" });
    } else if (password !== cpassword) {
        return res.status(400).json({ Error: "Passwords do not match" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email is already present" });
        }

        const user = new User({ name, email, phone, password, cpassword });
        const userRegister = await user.save();
        if (userRegister) {
            res.status(201).json({ message: "User registered successfully" });
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ Error: "Please fill in the data" });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                return res.status(400).json({ Error: "Error in login" });
            }

            // Create a token and set it as a cookie
           
            res.status(200).json({ message: "Login successful",name: userLogin.name,
            email: userLogin.email,
            phone: userLogin.phone, });
        } else {
            res.status(400).json({ Error: "Error in login" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get("/mens",async(req,res)=>{
    try{
        const getMens=await User.find({});
        console.log(getMens);      
        //for browser view  
        res.send(getMens);       
    }catch(e){
            res.status(400).send(e); 
    }
})

router.get("/mens/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const getMen = await User.findOne({ name: name });
        
        // if (!getMen) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        
        res.status(200).json(getMen);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch("/mens/:name", async (req, res) => {
    try {
        const name = req.params.name;
        // const updates = req.body;
        const getMen = await User.findOneAndUpdate({ name: name }, req.body, {
            new: true,
        });

        // if (!getMen) {
        //     return res.status(404).json({ message: "User not found" });
        // }

        res.status(200).json(getMen);
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
