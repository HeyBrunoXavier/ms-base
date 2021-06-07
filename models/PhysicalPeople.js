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
   	* @param {*} physical
   	* @author HeyBrunoXavier
   	* @description Visualização de pessoas fisicas
   	*/
	async view(id){
		try{
			let o_response = await knex('physical_people').where({id: id}).first();
			return o_response;
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
			let st_physical = await knex('physical_people').where({id: id}).del().returning("*");
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

}
module.exports = new PhysicalPeople();