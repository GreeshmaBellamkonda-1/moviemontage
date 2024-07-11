const UserCredential=require('../models/userCredentialsSchema'); 

const signup=async(req,res)=>{
    try{
        console.log(req);
        const {username,password,uid} = req.body;

        const newUser=new UserCredential({
            username: username,
            password: password,
            uid: uid
        })

        newUser.save();

        return res.json({ success: true, message: 'Signup successful'});

        console.log(uid);
    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const signin=async(req,res)=>{
    try{
        console.log(req);
        const {username,password} = req.body;

        const user=await UserCredential.findOne({username:username, password:password});

        if(user){
            console.log("Login successful");
            return res.status(200).json({ success: true, message: 'Signup successful',uid:user.uid});
        }else{
            return res.status(200).json({ success: false, message: 'Login Failed'});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


module.exports ={signup,signin}