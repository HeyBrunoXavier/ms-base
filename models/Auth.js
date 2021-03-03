const knex = require('../database/connection');
class Auth{
	async createAuthentication(user,token){
        try{
			let o_response = await knex('authentication').insert({user,token})
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}
    async findByTokenUser(user,token){
        try {
            let o_response = await knex('authentication').where({user,token}).first();
            return o_response;
        } catch (error) {
            console.error(error);
        }
    }
    async deleteAuthentication(user){
        try {
            let o_response = await knex('authentication').where({user}).del();
            return o_response;
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = new Auth();
