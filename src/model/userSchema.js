// require('dotenv').config();
// const mongoose=require("mongoose");
// const bcrypt=require("bcryptjs"); 
// // const jwt=require("jsonwebtoken");

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     work:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     cpassword:{
//         type:String,
//         required:true
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     },
//     messages:[
//         {
//             name:{
//                 type:String,
//                 required:true
//             },
//             email:{
//                 type:String,
//                 required:true
//             },
//             phone:{
//                 type:Number,
//                 required:true
//             },
//             message:{
//                 type:String,
//                 required:true
//             }
//         }],   
// })




// userSchema.methods.generateAuthToken=async function(next){
//     try{
//         const token=jwt.sign({_id:this._id.toString()},process.env.SECREAT_KEY);
//         this.tokens=this.tokens.concat({token:token})
//         await this.save();
//         console.log(token);
//         return token;
//     }catch(e){
//         console.log(e);
//     }
// }

// userSchema.pre("save",async function(next){
//     if(this.isModified('password')){
//         this.password=await bcrypt.hash(this.password,12);
//         this.cpassword=await bcrypt.hash(this.cpassword,12); 
//     }
//     next();
// });



// userSchema.methods.addMessage=async function(name, email, phone, message){
//     try{
//        this.messages=this.messages.concat({name, email, phone, message});
//        await this.save();
//        return this.messages;
//     }catch(Error){
//         console.log(Error);
//     }
// }


// const User = mongoose.model('user',userSchema);

// module.exports=User;


const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
        this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
    next();
});


const Registeruser=mongoose.model('Registeruser',userSchema);

module.exports=Registeruser;