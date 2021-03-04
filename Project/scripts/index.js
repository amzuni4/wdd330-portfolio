//not for use. Just to uderstand the Json Structure
var superDb = [
];

var fav = JSON.parse(localStorage.getItem("favList"));
if (fav == null)
   fav =[];

const inputName = document.getElementById('inputName');
const snackbar = document.getElementById('snackbar');
const results = document.getElementById('results');

//Superhero Name Input
inputName.onkeyup = function (){
	var name = inputName.value;

	if (name !== ''){
		fetch('https://superheroapi.com/api.php/1953802511419258/search/' + name.trim())
		.then(response => response.json())
		.then(data => {
			createCard(data)
		})
		.catch(err => console.log(err));
	}
}

function createCard(data) {
	if (data.response === 'error') {
		results.innerHTML = '<div style ="margin-top:50px; color:white; "No results found! Please try again"</div>';
	}
	else {
		results.innerHTML = null;

		//creating cards for all the results
		for (let i = 0; i < data.results.length && i < 10; i++){


			//creating card elements
			var card = document.createElement('div');
			var cardImage = document.createElement('img');
			var cardContainer = document.createElement('div');
			var cardText = document.createElement('div');
			var favButton = document.createElement('div');
			var detailsButton = document.createElement('div');


			card.classList.add('result-card');
			cardImage.classList.add('result-card-image');
			cardContainer.classList.add('result-card-container');
			favButton.classList.add('favButton');
			detailsButton.classList.add('detailsButton');

			//add superhero names
			cardText.innerHTML = data.results[i].name;
			cardContainer.appendChild(cardText);

			//adding display images to cards from results
			cardImage.src = data.results[i].image.url;
			card.appendChild(cardImage);

			//adding Details button to all cards
			detailsButton.innerHTML = 'Know my superpowers';
			cardContainer.appendChild(detailsButton);


			//If search results already in my fav list, 
			//show add button else remove the button
			let cardId = data.results[i].id;
			if(fav.includes(cardId)){
				favButton.innerHTML = "Remove from my favorites";
				favButton.classList.add('bg-red');
			} else{
				favButton.innerHTML = "Add to my favorites";
				favButton.classList.add(bg-green);
			}
			cardContainer.appendChild(favButton);
			card.appendChild(cardContainer);

			//linking id with favorite and details button to add to 
			//favorites, or display details respectively

			favButton.setAttribute('divType','fav-btn');
			detailsButton.setAttribute('divType', 'details-btn');

			//appending all cards to Results-div
			results.appendChild(card);
			}
	}
}

results.onclick = function (event){
	var id = event.target.getAttribute('superheroID');
	var div = event.target.getAttribute('divType');

	//handle if favorites button is clicked
	if (div === 'fav-btn'){
		if(id === null)
			return;
		if (fav.includes(id)){
			var i = fav.indexOf(id);
			fav.splice(i, 1);
			event.target.innerHTML = "Add to my favorites";
			event.target.classList.remove('bg-red');
			event.target.classList.add('bg-green');
			showSnackbar(false);
		}else {
			fav.push(id);
			event.target.innerHTML = "Remove from my favorites";
			event.target.classList.remove('bg-green');
			event.target.classList.add('bg-red');
			showSnackbar(true);
		}
		localStorage.setItem("favList", JSON.stringify(fav));
	}
	//else if show details button is clicked.
	else if (div === 'details-btn'){
		if (id === null)
			return;
		window.open("details.html?id=" + id, "_self");
	}
}

//Show snackbar on Favorite' Change
function showSnackbar(value){
	//adding visibility to snack bar
	snackbar.classList.add('visible');

	if (value ){
		snackbar.innerHTML = "Added to Favorites";
	}
	else {
		snackbar.innerHTML = "Removed from favorites";
	}
	//snackbar timeout
	setTimeout(function (){ 
		snackbar.classList.remove("visible"); }, 3000);
}