//get element by id's
const name = document.getElementById('superhero-name');
const image = document.getElementById('superhero-img');
const fav = document.getElementById('favorite');
const snackbar = document.getElementById('snackbar');

//get super id for deets
const params = new URLSearchParams(window.location.search);
var id = params.get('id');

//getting fav list from local storage
var favList = JSON.parse(localStorage.getItem("favList")) == null
	? []
	: JSON.parse(localStorage.getItem("favList"));

	//fetch super deets from API 
	fetch(`https://superheroapi.com/api.php/1953802511419258/${id}`)
		.then(res => res.json())
		.then(data => showDetails(dat))
		.catch(err => console.log(err));

//render superhero deets
function showDetails(data){
	//setting name
	name.innerHTML = data.name;

	//setting display image
	image.src = data.image.url;
	image.alt = "Image not found";

	//setting favs
	?
	fav.innerHTML = '<i id="fav-icon" class ="fas fa-heart fa-4x"></i>'
	:
	fav.innerHTML = '<i id="fav-icon" class="far fa-heart fa-4x"></i>'

	//setting power meters
	for(var i in data.powerstats){
		document.getElementById(i).innerHTML = data.powerstats[i] + "%";
		//power meter style setting
		document.getElementById(i).style.width = data.powerstats[i] + "%";
	}

	//setting appearance props
	for (var i in data.appearance){
		document.getElementById(i).innerHTML = data.appearance[i];
	}

	//setting bio
	for (var i in data.biography){
		document.getElementById(i).innerHTML = data.biography[i];
	}

	//setting work props
	for (var i in data.work){
		document.getElementById(i).innerHTML = data.work[i];
	}
	//setting Connections props
	for (var i in data.connections){
		document.getElementById(i).innerHTML = data.connections[i];
	}
}

//handling add to favorites (on click)
fav.onclick = function (){
	//if superheros not in favs, add to fav list
	if (!favList.includes(id)){
		favList.push(id);
		//changing fav icon class
		fav.innerHTML = '<i id="fav-icon class="fas fa-heart fa-4x"></i>';
		showSnackbar(true);
	}

	//else remove from favs
	else{
		var i = favList.indexOf(id);
		favList.splice(i, 1);
		//changing fav-icon class
		fav.innerHTML = '<i id="fav-icon" class="far fa-heart"></i>';
		showSnackbar(false);
	}

	//save favs to local
	localStorage.setItem("favList", JSON.stringify(favList));
}
//show snackbar on favs change
function showSnackbar(value){

	//adding visibility to snackbar
	snackbar.classList.add('visible');

	if(value){
		snackbar.innerHTML = "Added to Favorites";	
	} else {
		snackbar.innerHTML = "Removed from Favorites";
	}
	//snackbar timeout
	setTimeout(function (){ snackbar.classList.remove("visible"); }, 3000);

}