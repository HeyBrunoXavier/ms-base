
class Parser {
	mtel(st_phone){
		st_phone = st_phone.replace(/\D/g,"");					//Remove tudo o que não é dígito
		st_phone = st_phone.replace(/^(\d{2})(\d)/g,"($1) $2");	//Coloca parênteses em volta dos dois primeiros dígitos
		st_phone = st_phone.replace(/(\d)(\d{4})$/,"$1-$2");	//Coloca hífen entre o quarto e o quinto dígitos
		return st_phone;
	}
}
module.exports =  new Parser();