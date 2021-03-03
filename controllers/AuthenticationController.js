const User = require('../models/User');
const Auth = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/routes');
class authentication {
  /**
   * @method Auth
   * @description Autenticação de usuário
   * @param {*} request
   * @param {*} response
   */
	async auth(request,response){
		try{
			let st_authorization = String(request.headers.authorization).split(' ')[1];
			let [email, password] = Buffer.from(st_authorization, 'base64').toString('utf-8').split(':');
			if(!email || !password) return response.status(400).end();
			let user = await User.findByEmail(email);
			if(!user) return response.status(404).end();
			let isMatch = bcrypt.compareSync(password, user.password);
			if(isMatch){
				let token = await jwt.sign({user:user.id}, process.env.SECRET, {expiresIn:3600})
				await Auth.createAuthentication(user.id,token);
				response.set('X-TOKEN', token);
				return response.status(204).end();
			}
			return response.status(404).end('Invalid Email or Password');
		}catch (error){
			console.error(error);
			return response.status(400).end();
		}
	}
	async logout(request,response){
		try {
			let logout = await Auth.deleteAuthentication(request.body.user);
			if(!logout) return response.status(403).send("Falha ao deslogar");
			return response.status(200).send("Deslogado com sucesso");
		} catch (error) {
			console.error(error);
			return response.status(400).end();
		}
	}
}
module.exports = new authentication();
