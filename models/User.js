const knex = require('../database/connection');
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
		function create_UUID(st_password){
			var dt = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (dt + Math.random()*16)%16 | 0;
				dt = Math.floor(dt/16);
				return (c=='x' ? r :(r&0x3|0x8)).toString(16);
			});
			st_password = uuid;
			return st_password;
		}
		try{
		let hash = await create_UUID(password);
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
			let result = await knex.select(["name","email","password"]).where({email:email}).table("account");
			if(result.length > 0){
				return result[0];
			}
		}catch(o_error){
			console.table(o_error);
			return undefined;
		}
	}
}
module.exports = new User();