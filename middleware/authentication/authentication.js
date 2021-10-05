const jwt=require('jsonwebtoken')

function authenticate(req,res,next){
    let headers=req.headers['authorization']
    console.log(headers)
    if(headers){
        const token=headers.split(' ')[1]
        const decodedToken=jwt.verify(token,'KEYBOARD CAT')
        if(decodedToken){
            const username=decodedToken.user.username
            models.User.findOne({
                where:{
                    username:username
                }
            })
            .then(authUser=>{
                if(authUser){
                    req.authUserID=authUser.id
                    next()
                }else{
                    res.json({error:'Unable to authenticate'})
                }
            })
        }else{
            res.json({error:'Unable to authenticate'})
        }
    }else{
        res.json({error:'Unable to authenticate'})
    }
}

module.exports=authenticate