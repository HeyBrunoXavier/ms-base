var bodyParser = require('body-parser')
var express = require("express")
const app = express()
var listEndpointsExpress = require("list-endpoints-express");
var router = require("./routes/routes")
const Table = require('cli-table');
const PORT = process.env.PORT || 5000;
require('dotenv').config()
const table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
				 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
				 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
				 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
	style: { 'padding-left': 2, 'padding-right': 2}
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.listen(PORT,() => {
	table.push(
			["Service", `PORT: ${PORT}`,"Running"],
			["Methods", "Paths","ON"],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[0],true],
			[listEndpointsExpress(router)[1].method, listEndpointsExpress(router)[1].paths[0],true],
			[listEndpointsExpress(router)[2].method, listEndpointsExpress(router)[2].paths[0],true],
		);
	console.log(table.toString());
});
