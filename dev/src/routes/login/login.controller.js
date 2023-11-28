const {loginMiddleware} = require("../../middlewares/login.middleware");
const login = async (req,res)=>{
    try {
       await loginMiddleware(req,res);
    }
    catch (error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    login
};