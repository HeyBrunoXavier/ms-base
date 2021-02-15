var bodyParser = require('body-parser')
var express = require("express")
const app = express()
var listEndpointsExpress = require("list-endpoints-express");
var router = require("./routes/routes")
const Table = require('cli-table');
require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const table = new Table({
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
				 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
				 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
				 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
	style: { 'padding-left': 2, 'padding-right': 2}
});
app.listen(process.env.PORT,() => {
		table.push(
			["Service", `PORT: ${process.env.PORT}`,"Running"],
      ["Methods", "Paths","ON"],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[0],true],
			[listEndpointsExpress(router)[2].method, listEndpointsExpress(router)[2].paths[0],true],
			[listEndpointsExpress(router)[1].method, listEndpointsExpress(router)[1].paths[1],true],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[2],true],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[3],true],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[4],true],
			[listEndpointsExpress(router)[0].method, listEndpointsExpress(router)[0].paths[1],true],
			[listEndpointsExpress(router)[1].method, listEndpointsExpress(router)[1].paths[0],true],
		);
	console.log(table.toString());
});
