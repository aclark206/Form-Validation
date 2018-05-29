const name = document.getElementById("name");
const title = document.getElementById("title");
const basic = document.querySelector(".basic");
const design = document.querySelector("#design");
//const colors = document.querySelectorAll("#color option");
const color = document.querySelector("#color");


/* - - - - - - - - - Event Listeners - - - - - - - - - - - - - */

// Job Role Listener
// When Other is selected from the Job Role drop down menu, a 
// text field appears to enter the other job Role into
title.addEventListener("change", (e) => {
	const otherTitle = document.getElementById("other-title");

	if (e.target.value == 'other') {
		// display text box
		otherTitle.style.display = "block";
	}
	else{
		// make the text box go disappear
		otherTitle.style.display = "none";
	}
});

// T shirt Theme Listener
// When a Theme is selected, only show the Color options available for that theme
design.addEventListener("change", (e) => {
	let colors = color.options;
	color.value = '';  // reset the chosen color when theme is changed.
	if (e.target.value == "js puns") {
		
		// display colors available for js puns 
		for (let i = 0; i < colors.length; i++){
			
			if (!colors[i].textContent.includes("Puns")) {
				colors[i].style.display = "none";
			}
			else {
				colors[i].style.display = "block";
			}
		}
	}
	else if (e.target.value == "heart js") {
		// display colors available for I <3 JS
		for (let i = 0; i < colors.length; i++){
			if (colors[i].textContent.includes("Puns")) {
				colors[i].style.display = "none";
			}
			else{
				colors[i].style.display = "block";
			}
		}
	}
	else{
		// display all
		for (let i = 0; i < colors.length; i++){
			colors[i].style.display = "block";
		}

	}
});


// main 
document.addEventListener("DOMContentLoaded", (e) => {
	// put focus on the Name element
	name.focus();
	
	// ----   Disabled fields at start of page  ---
	
	const otherTitle = document.createElement('input');
	otherTitle.type = 'text';
	otherTitle.id = "other-title";
	otherTitle.setAttribute('placeholder', "Your Job Role");
	otherTitle.style.display = "none";
	basic.appendChild(otherTitle);
	
	
}); // end document loaded event listener

