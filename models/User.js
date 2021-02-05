const knex = require('../database/connection');
const bcrypt = require('bcrypt');
class User{
	async list(){
		try {
			var result = await knex.select("*").from("account");
			if(result.length > 0)
			return result;
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
	async insert(name,email,password){
		
		try{
			let hash = await bcrypt.hash(password, 10);
			let result = await knex.insert({name, email, password: hash}).table('account');
			return result = {
				"name": name,
				"email": email,
				"password": password
			};
		}catch(o_error){
			console.log(o_error);
		}
	}
	async view(email){
		try{
			let result = await knex.select(["name","email","password"]).where({email:email}).table("account").first();
				if(result)
					return result;
		}catch(o_error){
			console.table(o_error);
			return undefined;
		}
	}
}
module.exports = new User();