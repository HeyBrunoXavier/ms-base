const knex = require('../database/connection');

class PhysicalPeople {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de pessoas fisicas
   */
  async list(){
		try {
			var o_response = await knex.select("*").from("physical_people");
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
   * @param {*} physical
   * @author HeyBrunoXavier
   * @description Inserção de pessoas fisicas
   */
  	async insert(physical){
		try{
			let st_physical = await knex('physical_people').insert(physical).returning("*");
			let o_response = {
				"id": st_physical[0].id,
				"person": st_physical[0].id_person,
				"cpf": st_physical[0].cpf,
				"date-birth": st_physical[0]['date-birth'],
				"genre": st_physical[0].genre,
				"hash": st_physical[0].hash
			}
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method view
   	* @param {*} people
   	* @author HeyBrunoXavier
   	* @description Visualização de pessoas fisicas
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
   	* @description Inserção de pessoas fisicas
   	*/
	async updated(id,name,phone,email,type,hash){
		try{
			let st_people = await knex('people').update({name: name, phone: phone, email: email, type: type, hash: hash}).where({id: id}).returning("*");
			let o_people = {
				"id": st_people[0].id,
				"name": st_people[0].name,
				"phone": st_people[0].phone,
				"email": st_people[0].email,
				"type": st_people[0].type,
				"hash": st_people[0].hash
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
   	* @description Inserção de pessoas fisicas
   	*/
	   async delete(id){
		try{
			let st_people = await knex('people').where({id: id}).del().returning("*");
			let o_people = {
				"id": st_people[0].id,
				"name": st_people[0].name,
				"phone": st_people[0].phone,
				"email": st_people[0].email,
				"type": st_people[0].type,
				"hash": st_people[0].hash
			}
			return o_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

}
module.exports = new PhysicalPeople();