const People = require("../models/People");
const PHONE = require("../utils/Parser");
class PeopleController {
	/**
   	* @method list
   	* @description Listagem de pessoas
   	* @param {*} request
   	* @param {*} response
   	*/
 	async list(request, response){
		let people = await People.list();
		return response.json(people).status(200).end();
	}
  
	/**
  	* @method insert
   	* @description Inserção de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
 	async insert(request,response){
		try{
			let o_response = {
				"name": request.body.name,
				"phone": PHONE.mtel(request.body.phone),
				"email": request.body.email,
				"type": request.body.type
			}
			if(!request.body.name) 
				return response.status(406).end("name field is empty");
			if(!request.body.phone) 
				return response.status(406).end("phone field is empty");
			if(!request.body.email) 
				return response.status(406).end("email field is empty");
			if(!request.body.type) 
				return response.status(406).end("type field is empty");
			let people = await People.insert(o_response);
			if(people.constraint == "people_email_unique") 
				return response.status(406).end("ERR_DUPLICATE_EMAIL");
			return response.json(people).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

	/**
  	* @method view
   	* @description Visualização de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	async view(request,response){
		try{
			console.log(request.params.id);
			if(request.params.id){
				let list_people = await People.list();
				for(let st_people of list_people){
					if(request.params.id == st_people.id){
						let people = await People.view(request.params.id);
						return response.json(people).status(200).end();
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
  	* @method update
   	* @description Atualização de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	  async update(request,response){
		try{
			let st_id = request.params.id;
			let st_name = request.body.name;
			let st_phone = PHONE.mtel(request.body.phone);
			let st_email = request.body.email;
			let st_type = request.body.type;
			let st_hash = request.headers['transaction-hash'];

			if(!st_name) 
				return response.status(406).end("Name field is empty");
			if(!st_phone) 
				return response.status(406).end("Phone field is empty");
			if(!st_email) 
				return response.status(406).end("Email field is empty");
			if(!st_type) 
				return response.status(406).end("Type field is empty");
			if(!st_hash) 
				return response.status(406).end("Hash field is empty");

			if(st_id){
				let people = await People.updated(st_id,st_name,st_phone,st_email,st_type,st_hash);
				if(people.constraint == "people_email_unique") 
					return response.status(406).end("ERR_DUPLICATE_EMAIL");
				return response.json(people).status(200).end();
			}
			else{
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
   	* @description Exclusão de uma pessoa
   	* @param {*} request
   	* @param {*} response
  	*/
	  async delete(request,response){
		try{
			let id = request.params.id;
			if(id){
				let people = await People.delete(id);
				return response.json(people).status(200).end();
			}
			else{
				return response.status(400).end();
			}
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}


}
module.exports = new PeopleController();