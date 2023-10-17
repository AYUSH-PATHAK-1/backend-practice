// const express=require("express");
// const app=express();
// require("./db/conn");
// const cookieParser=require("cookie-parser");
// app.use(express.json());
// app.use(cookieParser());

// app.use(require('./router/auth'));

// const port=process.env.PORT || 5000;


// app.listen(port,()=>{
//     console.log(`Server is Running on the Port no ${port}`);
// })


const express=require("express");
const app=express();
require("./db/conn");
app.use(express.json());
app.use(require('./router/auth'));

const port=process.env.PORT  //||5000
app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT NUMBER ${port}`);
})