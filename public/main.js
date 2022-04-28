
// Focus div based on nav button click
const homenav = document.getElementById("homenav");
homenav.addEventListener("click",showHome);
function showHome() {
	document.getElementById("home").className = "active";
	document.getElementById("single").className = "hidden";
	document.getElementById("multi").className = "hidden";
	document.getElementById("guess").className = "hidden";

}



// Flip one coin and show coin image to match result when button clicked

const singlenav = document.getElementById("singlenav");
singlenav.addEventListener("click",showSingle)
function showSingle() {
	document.getElementById("home").className = "hidden";
	document.getElementById("single").className = "active";
	document.getElementById("multi").className = "hidden";
	document.getElementById("guess").className = "hidden";}
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

// Flip multiple coins and show coin images in table as well as summary results
const multinav = document.getElementById("multinav");
multinav.addEventListener("click",showMulti)
function showMulti() {
	document.getElementById("home").className = "hidden";
	document.getElementById("single").className = "hidden";
	document.getElementById("multi").className = "active";
	document.getElementById("guess").className = "hidden";
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
		} catch (error) {
			console.log(error);
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
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
