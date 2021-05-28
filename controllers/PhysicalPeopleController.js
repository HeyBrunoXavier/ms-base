const PHYSICAL = require("../models/PhysicalPeople");
const PARSER = require("../utils/Parser");
class PhysicalPeopleController {
	/**
   	* @method list
   	* @description Listagem de pessoas fisica
   	* @param {*} request
   	* @param {*} response
   	*/
 	async list(request, response){
		let o_response = await PHYSICAL.list();
		return response.json(o_response).status(200).end();
	}
  
	/**
  	* @method insert
   	* @description Inserção de uma pessoas fisica
   	* @param {*} request
   	* @param {*} response
  	*/
 	async insert(request,response){
		try{
			let o_response = {
				"id_person": request.body.person,
				"cpf": PARSER.ParserCPF(request.body.cpf),
				"date-birth": PARSER.ParserDate(request.body['date-birth']),
				"genre": request.body.genre
			}
			if(!o_response.id_person) 
				return response.status(406).end("ERR_PERSON_FIELD_EMPTY");
			if(!o_response.cpf) 
				return response.status(406).end("ERR_INVALID_CPF_FIELD");
			if(o_response.cpf == false)
				return response.status(406).end("ERR_INVALID_FORMAT_CPF");
			if(!o_response['date-birth']) 
				return response.status(406).end("ERR_INVALID_EMAIL_FIELD");
			if(o_response['date-birth'] == false)
				return response.status(406).end("ERR_INVALID_FORMAT_DATE_BIRTH");
			if(!o_response.genre) 
				return response.status(406).end("ERR_GENRE_FIELD_EMPTY");

			let o_physical = await PHYSICAL.insert(o_response);
			
			if(o_physical.constraint == "physical_people_id_person_unique") 
				return response.status(406).end("ERR_DUPLICATE_PERSON");
			if(o_physical.constraint == "physical_people_cpf_unique")
				return response.status(406).end("ERR_DUPLICATE_CPF");
			if(o_physical.constraint == "physical_people_id_person_foreign") 
				return response.status(406).end("ERR_PERSON_NOT_FOUND");
			
			return response.json(o_physical).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method view
   	* @description Visualização de uma pessoas fisica
   	* @param {*} request
   	* @param {*} response
  	*/
	  async view(request,response){
		try{
			
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method update
   	* @description Atualização de uma pessoas fisica
   	* @param {*} request
   	* @param {*} response
  	*/
	  async update(request,response){
		try{
			
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method delete
   	* @description Exclusão de uma pessoas fisica
   	* @param {*} request
   	* @param {*} response
  	*/
	  async delete(request,response){
		try{
			
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}


}
module.exports = new PhysicalPeopleController();