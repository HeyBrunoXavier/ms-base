const ADDRESS = require("../models/Address");
const AXIOS = require("axios");
const CEP = require("../utils/Parser");
class AddressController {
	/**
	 * @method list
	 * @description Listagem de endereço 
	 * @param {*} request
	 * @param {*} response
	 */
	  async list(request,response){
		let o_response = await ADDRESS.list();
		return response.json(o_response).status(200).end();
	}
	/**
  	* @method insert
   	* @description Inserção de um endereço
   	* @param {*} request
   	* @param {*} response
  	 */
 	async insert(request,response){
		try{
			console.log("REQUEST: ",request);			
			let o_address = {
				"id_person": request.body.person,
				"zip_code": CEP.ParserCEP(request.body['zip_code']),
				"complement": request.body.complement,
				"number": request.body.number,
				"city": request.body.city,
				"uf": request.body.uf,
				"country": request.body.country
			}
			if(!o_address.id_person) 
				return response.status(406).end("ERR_INVALID_PERSON_FIELD");
			if(!o_address['zip_code']) 
				return response.status(406).end("ERR_INVALID_ZIP-CODE_FIELD");
			if(!o_address.complement) 
				return response.status(406).end("ERR_INVALID_COMPLEMENT_FIELD");
			if(!o_address.number) 
				return response.status(406).end("ERR_INVALID_NUMBER_FIELD");
			if(!o_address.city) 
				return response.status(406).end("ERR_INVALID_CITY_FIELD");
			if(!o_address.uf) 
				return response.status(406).end("ERR_INVALID_UF_FIELD");
			if(!o_address.country) 
				return response.status(406).end("ERR_INVALID_COUNTRY_FIELD");
			let o_response = await ADDRESS.insert(o_address);
			
			if(o_response.constraint == "address_id_person_unique") 
				return response.status(406).end("ERR_DUPLICATE_PERSON");
			if(o_response.constraint == "address_zip-code_unique") 
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
   	* @description Visualização de endereço fisica
   	* @param {*} request
   	* @param {*} response
  	*/
	async view(request,response){
		try{
			if(request.params.id){
				let v_address = await ADDRESS.list();
				for(let st_address of v_address){
					if(request.params.id == st_address.id){
						let st_response = await ADDRESS.view(request.params.id);
						let st_url = `https://viacep.com.br/ws/${st_response['zip_code']}/json/`;   
						AXIOS.get(st_url)
						.then(function(data){
							let o_response = {
								...st_response,
								"public-place": data.data.logradouro,
								"district": data.data.bairro,
								"ibge": data.data.ibge,
								"gia": data.data.gia,
								"ddd": data.data.ddd,
								"siafi": data.data.siafi
							}
							return response.json(o_response).status(200).end();
						})
						.catch(function(error){
							console.log(error);
							return response.status(400).end();
						})
					}
				}
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
   	* @description Atualização de um endereço
   	* @param {*} request
   	* @param {*} response
  	 */
	   async update(request,response){
		try{
			let st_id = request.params.id;		
			let st_person = request.body.person;
			let st_zip_code = CEP.ParserCEP(request.body['zip-code']);
			let st_complement = request.body.complement;
			let st_number = request.body.number;
			let st_city = request.body.city;
			let st_uf =  request.body.uf;
			let st_country = request.body.country;
			let st_hash = request.headers['transaction-hash'];

			if(!st_person) 
				return response.status(406).end("ERR_INVALID_PERSON_FIELD");
			if(!st_zip_code) 
				return response.status(406).end("ERR_INVALID_ZIP-CODE_FIELD");
			if(!st_complement) 
				return response.status(406).end("ERR_INVALID_COMPLEMENT_FIELD");
			if(!st_number) 
				return response.status(406).end("ERR_INVALID_NUMBER_FIELD");
			if(!st_city) 
				return response.status(406).end("ERR_INVALID_CITY_FIELD");
			if(!st_uf) 
				return response.status(406).end("ERR_INVALID_UF_FIELD");
			if(!st_country) 
				return response.status(406).end("ERR_INVALID_COUNTRY_FIELD");
			if(!st_hash) 
				return response.status(406).end("ERR_INVALID_HASH_FIELD");
			let o_response = await ADDRESS.update(st_id,st_person,st_zip_code,st_complement,st_number,st_city,st_uf,st_country,st_hash);
			
			if(o_response.constraint == "address_id_person_unique") 
				return response.status(406).end("ERR_DUPLICATE_PERSON");
			if(o_response.constraint == "address_zip-code_unique") 
				return response.status(406).end("ERR_PERSON_NOT_FOUND");
			
			return response.json(o_response).status(200).end();
		}
		catch(error){
			console.error(error)
			return response.status(400).end();
		}
	}

}
  module.exports = new AddressController();
  