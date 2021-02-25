const knex = require('../database/connection');

class People {
  /**
   * @method list
   * @author HeyBrunoXavier
   */
  async list(){
		try {
			var o_response = await knex.select("*").from("people");
			if(o_response.length > 0){
				delete o_response[0].password;
				return o_response;
			}
		}catch (erro) {
			console.log(erro);
			return false;
		}
	}
  /**
   * @method insert
   * @param {*} people
   * @author HeyBrunoXavier
   */
  async insert(people){
		try{
			let o_people = await knex('people').insert(people);
			return o_people = {
				"name": people.name,
				"cpf": people.cpf,
				"idade": people.idade,
				"cep": people.cep,
				"estado": people.estado,
				"cidade": people.cidade
			}
		}catch(error){
			console.error(error);
			return error
		}
	}
}
module.exports = new People();