// Focus div based on nav button click
const show = document.getElementById("singlenav");

show.addEventListener("click",showData)
function showData() {
	document.getElementById("single").classList.remove("hidden");
	document.getElementById("single").classList.add("active");
}
// Flip one coin and show coin image to match result when button clicked
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

// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
