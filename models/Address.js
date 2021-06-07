const knex = require('../database/connection');

class Address {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de endereço pessoas
   */
  async list(){
		try {
			var o_response = await knex.select("*").from("address");
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
   * @param {*} address
   * @author HeyBrunoXavier
   * @description Inserção de pessoas fisicas
   */
  	async insert(address){
		try{
			let st_address = await knex('address').insert(address).returning("*");
			let o_response = {
				"id": st_address[0].id,
				"person": st_address[0].id_person,
				"zip-code": st_address[0]['zip-code'],
				"complement": st_address[0].complement,
				"number": st_address[0].number,
				"city": st_address[0].city,
				"uf": st_address[0].uf,
				"country": st_address[0].country,
				"hash": st_address[0].hash
			}
			return o_response;
		}catch(error){
			console.error(error);
			return error
		}
	}

	/**
   	* @method view
   	* @param {*} address
   	* @author HeyBrunoXavier
   	* @description Visualização de endereço
   	*/
	async view(id){
		try{
			let o_response = await knex('address').where({id: id}).first();
			return o_response;
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
	async update(id,id_person,zip_code,complement,number,city,uf,country,hash){
		try{
			let st_people = await knex('address').update({id_person: id_person, zip_code: zip_code, complement: complement, number: number, city: city, uf: uf , country: country, hash: hash}).where({id: id}).returning("*");
			console.log(st_people);
			return st_people;
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
module.exports = new Address();