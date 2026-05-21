const validator = require("validator")
const validateSignUpData = (req)=>{
    const{firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not define")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Correct");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error('password is not correct')
    }

}
module.exports = validateSignUpData;


