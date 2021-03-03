const Auth = require('../models/Auth');
const jwt = require('jsonwebtoken');
class AuthMiddleware {
    async Auth(request,response,next){
        const authToken = request.headers.authorization;
        if(!authToken) return response.status(403).send("Token não enviado!");
        let bearer = authToken.split(' ');
        let token = bearer[1];
        try {
            let decoded = await jwt.verify(token, process.env.SECRET);
            if(!decoded) return response.status(403).send("Token Não Autenticado!");
            request.body['user'] = decoded.user;
            let autheticate = await Auth.findByTokenUser(decoded.user,token);
            if(!autheticate) return response.status(403).send("Não Autenticado!");
            next();
        } catch (error) {
            console.error(error);
            return response.status(400).send("Erro na Autenticação");
        }
    }
}
module.exports = new AuthMiddleware();