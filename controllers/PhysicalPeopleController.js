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
			let o_physical = {
				"id_person": request.body.person,
				"cpf": PARSER.ParserCPF(request.body.cpf),
				"date-birth": PARSER.ParserDate(request.body['date-birth']),
				"genre": request.body.genre
			}
			if(!o_physical.id_person) 
				return response.status(406).end("ERR_PERSON_FIELD_EMPTY");
			if(!o_physical.cpf) 
				return response.status(406).end("ERR_INVALID_CPF_FIELD");
			if(o_physical.cpf == false)
				return response.status(406).end("ERR_INVALID_FORMAT_CPF");
			if(!o_physical['date-birth']) 
				return response.status(406).end("ERR_INVALID_EMAIL_FIELD");
			if(o_physical['date-birth'] == false)
				return response.status(406).end("ERR_INVALID_FORMAT_DATE_BIRTH");
			if(!o_physical.genre) 
				return response.status(406).end("ERR_GENRE_FIELD_EMPTY");

			let o_response = await PHYSICAL.insert(o_physical);
			
			if(o_response.constraint == "physical_people_id_person_unique") 
				return response.status(406).end("ERR_DUPLICATE_PERSON");
			if(o_response.constraint == "physical_people_cpf_unique")
				return response.status(406).end("ERR_DUPLICATE_CPF");
			if(o_response.constraint == "physical_people_id_person_foreign") 
				return response.status(406).end("ERR_PERSON_NOT_FOUND");
			
			return response.json(o_response).status(200).end();
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
			if(request.params.id){
				let v_physical = await PHYSICAL.list();
				for(let st_physical of v_physical){
					if(request.params.id == st_physical.id){
						let o_response = await PHYSICAL.view(request.params.id);
						return response.json(o_response).status(200).end();
					}
				}
				return response.status(404).end("Id not found");
			}else{
				return response.status(400).end();
			}
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
			let id = request.params.id;
			if(id){
				let o_response = await PHYSICAL.delete(id);
				return response.json(o_response).status(200).end();
			}
			else{
				return response.status(404).end();
			}
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}


}
module.exports = new PhysicalPeopleController();