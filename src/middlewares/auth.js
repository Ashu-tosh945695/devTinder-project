const AuthUser = (req, res, next) => {
  console.log("check the authentication");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    // res.send("data sent successfully");
    next();
  } else {
    res.send("user is unAuthorized");
  }
};

const DeleteUser = (req,res,next)=>{
      console.log("check the deleteData");
    const token = "xyzhh";
    const isAuthorized = token === "xyz";
    if(isAuthorized){
        next();
    }
    else{
         res.send("user is unAuthorized");
    }
}
module.exports = {
    AuthUser,
    DeleteUser
}