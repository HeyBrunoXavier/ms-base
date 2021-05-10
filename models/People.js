const { returning } = require('../database/connection');
const knex = require('../database/connection');

class People {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de pessoas
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
   * @description Inserção de pessoas
   */
  	async insert(people){
		try{
			let st_people = await knex('people').insert(people).returning("*");
			let o_people = {
				"id": st_people[0].id,
				"name": st_people[0].name,
				"phone": st_people[0].phone,
				"email": st_people[0].email,
				"type": st_people[0].type
			}
			return o_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method view
   	* @param {*} people
   	* @author HeyBrunoXavier
   	* @description Visualização de pessoas
   	*/
	async view(id){
		try{
			let st_people = await knex('people').where({id: id}).first();
			return st_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method updated
   	* @param {*} people
   	* @author HeyBrunoXavier
   	* @description Inserção de pessoas
   	*/
	async updated(id,name,phone,email,type){
		try{
			let st_people = await knex('people').update({name: name, phone: phone, email: email, type: type}).where({id: id}).returning("*");
			let o_people = {
				"id": st_people[0].id,
				"name": st_people[0].name,
				"phone": st_people[0].phone,
				"email": st_people[0].email,
				"type": st_people[0].type
			}
			return o_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method delete
   	* @param {*} people
   	* @author HeyBrunoXavier
   	* @description Inserção de pessoas
   	*/
	   async delete(id){
		try{
			let st_people = await knex('people').where({id: id}).del().returning("*");
			let o_people = {
				"id": st_people[0].id,
				"name": st_people[0].name,
				"phone": st_people[0].phone,
				"email": st_people[0].email,
				"type": st_people[0].type
			}
			return o_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

}
module.exports = new People();