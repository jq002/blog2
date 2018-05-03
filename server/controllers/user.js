const User=require('../models/user')
const md5=require('md5')
const jwt=require('jsonwebtoken')
const config=require('../config')

class UserController{
    static async initUser() {
        let user=await User.find().exec().catch(err=>{
            console.log(err)
        })
        //配置admin账号
        if(user.length===0){
            user=new User({
                username:config.admin.username,
                password:md5(config.admin.password).toUpperCase()
            })
        }
        await user.save().catch(err=>{
            console.log(err)
        })      
    }
    static async postLogin(ctx){
        const username=ctx.request.body.username;
        const password=ctx.request.body.password;
        let user=await User.findOne({
            username
        }).exec();
        if(user!==null){
            if(user.password===password){
                const token=jwt.sign({
                    uid:user._id,
                    name:user.username,
                    exp:Math.floor(Date.now()/1000)+2*60//2分钟
                },config.jwt.secret);
                ctx.body={
                    success:true,
                    uid:user._id,
                    name:user.username,
                    token:token
                }
            }else{
                ctx.throw(401,'password error')
            }
        }else{
            ctx.throw(401,'username error')
        }

    }
}

module.exports=UserController