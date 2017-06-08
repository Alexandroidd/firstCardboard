

$(document).ready(function(){

// firebase //
var database = firebase.database();
var character;
var name;
var saying;


function writeCharacter(name, character, saying) {
	var newPostKey = database.ref('/characters/').push().key;
 	firebase.database().ref('characters/' + newPostKey).set({
    name: name,
    character: character,
    saying: saying,	
  });
}






	$('form').submit(function(event) {
	// event.preventDefault();
	character = $('#character').val();
	name = $('#name').val();
	saying = $('#saying').val();

	writeCharacter(name, character, saying);
	console.log(name);
	console.log(character);
	console.log(saying);
	window.location.href = '../worldPage.html';


});




});



