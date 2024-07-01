const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const protect = async (req, res, next) => {
    let token;
    
    if(req.headers.authorization){
        try {
            token = req.headers.authorization.split(' ')[1];

            const verify = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await userModel.findById(verify.id);

            next();
            
        } catch (err) {
            return res.status(401).json({message: "Not authorized, token expired or not exist"});
        }
    }

    if(!token)
        return res.status(401).json({message: "Not authorized, no token"});
};


module.exports = { protect }