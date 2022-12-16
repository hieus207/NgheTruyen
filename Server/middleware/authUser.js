import jwt from 'jsonwebtoken'

export function authenToken(req,res,next) {
    if(!(req.method==="GET")){
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            res.sendStatus(401)
        }
        const token = authorizationHeader.split(" ")[1]
        if(!token){
            res.sendStatus(401)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data)=>{
            if(error){
                res.sendStatus(403)
            }
            else
                next()
        })
    }
    else{
        next()
    }
}