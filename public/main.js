// Adding comment for commit
// Focus div based on nav button click
const homenav = document.getElementById("homenav");
homenav.addEventListener("click",showHome);
function showHome() {
	document.getElementById("home").className = "";
	document.getElementById("homenav").className = "active";
	document.getElementById("single").className = "hidden";
	document.getElementById("singlenav").className = "";
	document.getElementById("multi").className = "hidden";
	document.getElementById("multinav").className = "";
	document.getElementById("guess").className = "hidden";
	document.getElementById("guessnav").className = "";

}



// Flip one coin and show coin image to match result when button clicked

const singlenav = document.getElementById("singlenav");
singlenav.addEventListener("click",showSingle)
function showSingle() {
	document.getElementById("home").className = "hidden";
	document.getElementById("homenav").className = "";
	document.getElementById("single").className = "";
	document.getElementById("singlenav").className = "active";
	document.getElementById("multi").className = "hidden";
	document.getElementById("multinav").className = "";
	document.getElementById("guess").className = "hidden";
	document.getElementById("guessnav").className = "";
}
// Button coin flip element
const coin = document.getElementById("coin")
// Add event listener for coin button
			coin.addEventListener("click", flipCoin)
			function flipCoin() {
                fetch('http://localhost:5000/app/flip/')
  				.then(function(response) {
    			  return response.json();
  				})
				.then(function(result) {
					console.log(result);
					document.getElementById("result").innerHTML = result.flip;
					document.getElementById("quarter").setAttribute("src","assets/img/" + result.flip+".png");
					coin.disabled = false;
				})
            }



// Enter number and press button to activate coin flip series

// Flip multiple coins and show coin images in table as well as summary results
const multinav = document.getElementById("multinav");
multinav.addEventListener("click",showMulti)
function showMulti() {
	document.getElementById("home").className = "hidden";
	document.getElementById("homenav").className = "";
	document.getElementById("single").className = "hidden";
	document.getElementById("singlenav").className = "";
	document.getElementById("multi").className = "";
	document.getElementById("multinav").className = "active";
	document.getElementById("guess").className = "hidden";
	document.getElementById("guessnav").className = "";
}



	// Our flip many coins form
	// Our flip many coins form
	const coins = document.getElementById("coins")
	// Add event listener for coins form
	coins.addEventListener("submit", flipCoins)
	// Create the submit handler
	async function flipCoins(event) {
		event.preventDefault();
		
		const endpoint = "app/flip/coins/"
		const url = document.baseURI+ endpoint
		console.log(url);
		const formEvent = event.currentTarget

		try {
			const formData = new FormData(formEvent);
			const flips = await sendFlips({ url, formData });

			console.log(flips);
			document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
			document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;

			document.getElementById("coinlist").innerHTML = coinList(flips.raw);
		} catch (error) {
			console.log(error);
		}
	}


// Guess a flip by clicking either heads or tails button
const guessnav = document.getElementById("guessnav");
guessnav.addEventListener("click",showGuess)
function showGuess() {
	document.getElementById("home").className = "hidden";
	document.getElementById("homenav").className = "";
	document.getElementById("single").className = "hidden";
	document.getElementById("singlenav").className = "";
	document.getElementById("multi").className = "hidden";
	document.getElementById("multinav").className = "";
	document.getElementById("guess").className = "";
	document.getElementById("guessnav").className = "active";
}

const call = document.getElementById("call");

call.addEventListener("submit",flipCall)

async function flipCall(event) {
	// prevents page from automatically reloading
	event.preventDefault();

	const endpoint = "app/flip/call"
	const url = document.baseURI + endpoint;

	// extract data from the form we created in HTML doc
	const formEvent = event.currentTarget

	try {
		const formData = new FormData(formEvent);

		const results = await sendFlips({url,formData});

		console.log(results);

		document.getElementById("choice").innerHTML = "Guess: + " + results.call;
		document.getElementById("actual").innerHTML = "Actual: " + results.flip;
		document.getElementById("result").innerHTML = "Result: " + results.result;

		document.getElementById("coingame").innerHTML = '<li><img src="assets/img/' + results.call + '.png" class="bigcoin" id="callcoin"></li><li><img src="assets/img/'+results.flip+'.png" class="bigcoin"></li><li><img src="assets/img/'+results.result+'.png" class="bigcoin"></li>';

	} catch (formError) {
		console.log(formError)
	}
}



	// Create a data sender
	async function sendFlips({ url, formData }) {
		const plainFormData = Object.fromEntries(formData.entries());
		const formDataJson = JSON.stringify(plainFormData);
		console.log(formDataJson);

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: formDataJson
		};

		const response = await fetch(url, options);
		return response.json()
	}

// creates an array of images based on a given array of coin results
function coinList(array) {
	let text = "";
	let arrayLength = array.length
	for (let i = 0; i < arrayLength; i++) {
	  text += '<li><img src="assets/img/'+array[i]+'.png" class="bigcoin"></li>';
	}
	return text
  }