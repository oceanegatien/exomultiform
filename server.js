var express = require('express');
var jade = require('jade');
var validator = require('validator');
var bodyParser = require('body-parser');
var app = express();
var moment = require('moment');
console.log(moment().format());

app.listen(3000, function () {
  console.log('listening on port 3000!');
});


app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var userContent =[];

app.get('/', function(req, res) {
	res.render('index');
});


app.post('/contact', function(req, res) {
	user = req.body;
	ValidateCoordonnées(user);
	
	
});





function ValidateCoordonnées(user) {

	var errors = {};

	var birthdate = moment(user.birthdate).format('DD MM YYYY');
	birthdate = birthdate.split(" ");
	var nowMajorité = moment().subtract(18, 'year').format('DD MM YYYY');
	nowMajorité = nowMajorité.split(" ");
	
	var birthdateArray = [birthdate];
	var nowMajoritéArray = [nowMajorité];

	console.log(birthdate);
	console.log(birthdateArray);
	console.log(nowMajorité);
	console.log(nowMajoritéArray);
	
	if (birthdate[2] > nowMajorité[2]) {
		console.log('trop jeune');
		errors.birthdate = "trop jeune";
	}else if (birthdate[2] < nowMajorité[2]){
		console.log("plus vieux");
	}else if (birthdate[2] === nowMajorité[2]){
		console.log("meme année");
		if (birthdate[1] < nowMajorité[1]) {
			console.log("trop jeune");
			errors.birthdate = "trop jeune";
		}else if (birthdate[1] > nowMajorité[1]){
			console.log("plus vieux");
		}else if (birthdate[1] === nowMajorité[1]){
			console.log("meme mois");
			if (birthdate[0] < nowMajorité[0]) {
				console.log("trop jeune");
				errors.birthdate = "trop jeune";
			}else if (birthdate[0] > nowMajorité[0]){
				console.log("plus vieux");
			}else if (birthdate[0] === nowMajorité[0]){
				console.log("c'est son anniversaire !");
			}
		}
	}
			


	if(validator.isEmpty(user.firstname) === false){
		if (!validator.isAlpha(user.firstname) === true) {
			errors.firstname = "Pas de caractères spéciaux";
		}
	}else {
		errors.firstname = "Merci de remplir ce champ";
	}

	if (validator.isEmpty(user.name) === false) {
		if (!validator.isAlpha(user.name) === true) {
			errors.name = "Pas de caractères spéciaux";
		}
	}else {
		errors.name = "Merci de remplir ce champ";
	}

	if (validator.isEmpty(user.birthdate) === false) {
		console.log("remplis");
	}else {
		errors.birthdate = "Merci de remplir ce champ";
	}

	if (!validator.isEmpty(user.adress) === false) {
		errors.adress = "Merci de remplir ce champ"
	}
console.log(errors);
}