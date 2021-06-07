class Parser {

	mtel(st_phone){
		st_phone = st_phone.replace(/\D/g,"");					//Remove tudo o que não é dígito
		st_phone = st_phone.replace(/^(\d{2})(\d)/g,"($1) $2");	//Coloca parênteses em volta dos dois primeiros dígitos
		st_phone = st_phone.replace(/(\d)(\d{4})$/,"$1-$2");	//Coloca hífen entre o quarto e o quinto dígitos
		return st_phone;
	}

	ParserDate(date){
		let dt_data = date;
		if(dt_data == '')
			return false;

		let rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
		let st_data = dt_data.match(rxDatePattern);
		if (st_data == null)
			return false;
		
		return st_data[0];
	}

	ParserCPF(st_cpf){
		let num = st_cpf.replace(/[^\d]/g, ''); //remove todos os caracteres não numéricos
		let len = num.length; //guarda o número de digitos até o momento
		if(len <= 6){
			st_cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');  
		}else if(len <= 9){
			st_cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
		}else{
			st_cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
		}
		let rxDatePattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
		let o_cpf = st_cpf.match(rxDatePattern);
		if (o_cpf == null)
			return false;
		return o_cpf[0];
	}

	ParserCEP(st_cep){
		st_cep = st_cep.replace(/\D/g,"")
		st_cep = st_cep.replace(/^(\d{2})(\d)/,"$1.$2")
		st_cep = st_cep.replace(/\.(\d{3})(\d)/,"$1-$2")
		if(st_cep)
			return st_cep;
		return false;
	}
	
}

module.exports =  new Parser();