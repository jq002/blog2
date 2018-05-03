
const jwt=require('jsonwebtoken');
const config=require('./../config');

async function verify(ctx,next) {
    const authorization=ctx.get('Authorization');
    if(authorization===''){
        ctx.throw(401, 'no token detected in http header \'Authorization\'');
    }
    // const token=authorization.split()
    try{
        await jwt.verify(authorization,config.jwt.secret);
    }catch(err){
        if(err.name==='TokenExpiredError'){
            ctx.throw(401,'token expired');
        }
        ctx.throw(401,'invalid token')
    }
    console.log('鉴权成功');
    await next();
}

module.exports=verify