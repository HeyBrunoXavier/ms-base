const knex = require('../database/connection');

class Address {

  /**
   * @method list
   * @author HeyBrunoXavier
   * @description Listagem de endereço
   */
  async list(){
		try {
			var o_response = await knex.select("*").from("address");
			if(o_response.length > 0){
				delete o_response[0].hash;
				delete o_response[0].created_at;
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
   * @description Inserção de endereço
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
   	* @description Atualização de endereço
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
   	* @description Exclusão de endereço
   	*/
	   async delete(id){
		try{
			let st_people = await knex('address').where({id: id}).del().returning("*");
			return st_people;
		}catch(error){
			console.error(error);
			return error
		}
	}

}
module.exports = new Address();