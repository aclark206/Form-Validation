const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("mail");
const title = document.getElementById("title");
const otherTitle = document.getElementById("other-title");
const basic = document.querySelector(".basic");
const design = document.querySelector("#design");
const color = document.querySelector("#color");
const activities = document.querySelector(".activities");
const cc = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
const payment = document.querySelector("#payment");
const ccNum = document.querySelector("#cc-num");
const ccNumError = document.querySelector("#cc-num-error");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const register = document.querySelector("button");
const errorMsg = document.createElement("label");
let totalCost = 0;

/* - - - - - - - - - Event Listeners - - - - - - - - - - - - - */

// Job Role Listener
// When Other is selected from the Job Role drop down menu, a 
// text field appears to enter the other job Role into
title.addEventListener("change", (e) => {
	const otherTitle = document.getElementById("other-title");

	if (e.target.value == 'other') {
		// display text box
		otherTitle.style.display = "block";
		otherTitle.previousElementSibling.style.display = "block";
	}
	else{
		// make the text box go disappear
		otherTitle.style.display = "none";
		otherTitle.previousElementSibling.style.display = "none";
	}
});

// T shirt Theme Listener
// When a Theme is selected, only show the Color options available for that theme
design.addEventListener("change", (e) => {
	
	// display the color select menu
	color.style.display = "block";
	color.previousElementSibling.style.display = "block";
	
	// reset the chosen color when theme is changed.
	color.value = '';  
	
	let colors = color.options;
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

// Workshop Listener
// When an event is checked, the total price at the bottom is changed
// and conflicting events are either disabled 
// unchecked events reduce the total price and enable conflicting events
activities.addEventListener("change", (e) => { 

	/* - - - - - - -  Adjust Cost of Workshops   */
	const total = document.querySelector('#total');
	if (e.target.name == 'all') {
		(e.target.checked)? totalCost += 200 : totalCost -= 200;
	}
	else{
		(e.target.checked)? totalCost += 100 : totalCost -= 100;
	}
	
	total.textContent = '$Total: ' + totalCost; 
    (totalCost > 0)	? total.style.display = "block" : total.style.display = "none";
	
	
	/* - - - - - - - - Disable or Enable conflicting workshops - - - - - - - */
	if (e.target.name == 'js-frameworks'){
		const express = document.querySelector("#express");
		if (e.target.checked){
			express.disabled = true;
			express.parentElement.style.color = "Grey";
		}
		else {
			express.disabled = false;
			express.parentElement.style.color = "black";
		}		
	}
	else if (e.target.name == 'express'){
		const frameworks = document.querySelector("#js-frameworks");
		if (e.target.checked){
			frameworks.disabled = true;
			frameworks.parentElement.style.color = "Grey";
		}
		else {
			frameworks.disabled = false;
			frameworks.parentElement.style.color = "black";
		}		
	} 
	else if (e.target.name == 'js-libs'){
		const node = document.querySelector("#node");
		if (e.target.checked){
			node.disabled = true;
			node.parentElement.style.color = "Grey";
		}
		else {
			node.disabled = false;
			node.parentElement.style.color = "black";
		}	
	}
	else if (e.target.name == 'node'){
		const libraries = document.querySelector("#js-libs");
		if (e.target.checked){
			libraries.disabled = true;
			libraries.parentElement.style.color = "Grey";
		}
		else {
			libraries.disabled = false;
			libraries.parentElement.style.color = "black";
		}	
	} 
});// end activities event listener


// payment method listener
// Display the appropriate fields for the method of payment chosen
payment.addEventListener("change", (e) => { 

	if (e.target.value == "credit card"){
		//diasble paypal and bitcoin
		paypal.style.display = "none";
		bitcoin.style.display = "none";
		
		//enable credit card div
		cc.style.display = "block";
	}
	else if (e.target.value == "paypal") {
		// disable bitcoin and credit card 
		cc.style.display = "none";
		bitcoin.style.display = "none";
		
		//enable paypal
		paypal.style.display = "block";
	}
		
	else if (e.target.value == "bitcoin") {
		// disable paypal and credit card
		cc.style.display = "none";
		paypal.style.display = "none";
	
		//enable bitcoin
		bitcoin.style.display = "block";
	}
	else {
		// disable all, no payment option has been chosen
		cc.style.display = "none";
		paypal.style.display = "none";
		bitcoin.style.display = "none";
	}
}); // end payment method listener


// Button listener and form validation
register.addEventListener("click", (e) => { 
	e.preventDefault();
	let errors = 0;
	
	/* - - - - Form Validation - - - - - - -*/
	// name field can't be blank
	if (name.value.length < 2){
		errors++;
		name.style.border = "2px solid red";
	
	}
	else {
		name.style.border = "2px solid #c1deeb";
	}

	// valid email format
	let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	
	if (regex.test(email.value)){
		 email.style.border = "2px solid #c1deeb";
	 }
	 else {
		errors++;
		email.style.border = "2px solid red";

	 }
	 
	 //at least one checkbox must be selected
	 let checked = document.querySelectorAll(".activities input:checked");
	 if ( checked.length < 1) {
		errors++;
		activities.style.border = "2px solid red";
	 }
	 else {
		 activities.style.border = "none";
		 
	 }
	 
	
	// credit card payment verification
	// cc, zip, and cvv fields should not be empty
	
	if (payment.value == "credit card") {
		//reset red border around payment drop down
		payment.style.border = "none"
		
		// Regular Expressions used for making sure data is entered in the correct format
		let ccRegEx = /^[1-9][0-9]{12,15}$/;
		let zipRegEx = /^[1-9][0-9]{4}$/;
		let cvvRegEx = /^[0-9]{3}$/;
		
		// cc field cannot be blank
		if (ccNum.value.length == 0){
			errors++;
			ccNum.style.border = "2px solid red";
			ccNumError.style.display = "block";
			ccNumError.style.fontSize = ".75em";
			ccNumError.style.color = "firebrick";
			ccNumError.textContent = "Please enter a credit card number."
		}
		// cc field should have 13-16 digits	
		else if (ccRegEx.test(ccNum.value)){
			ccNum.style.border = "2px solid #c1deeb";
			ccNumError.style.display = "none";
		}
		else{
			errors++;
			ccNum.style.border = "2px solid red";
			ccNumError.style.display = "block";
			ccNumError.style.fontSize = ".75em";
			ccNumError.style.color = "firebrick";
			ccNumError.textContent = "Credit Card number should have between 13 and 16 digits."
		}
		
		// zip code should be a 5 digit number	
		if (zipRegEx.test(zip.value)){
			zip.style.border = "2px solid #c1deeb";
		}
		else{
			errors++;
			zip.style.border = "2px solid red";
		}
		
		// CVV should  be exactly 3 digits
		if (cvvRegEx.test(cvv.value)){
			cvv.style.border = "2px solid #c1deeb";
		}
		else{
			errors++;
			cvv.style.border = "2px solid red";
		}
		
	}// end if payment == credit card
	else if (payment.value == "select_method"){
		errors++;
		payment.style.border = "2px solid red";
	}
	else {
		//reset red border around payment drop down
		payment.style.border = "none"
	}

	// if there are errors, print a message to the page
	(errors > 0)? errorMsg.style.display = "block" : errorMsg.style.display = "none";
}); // end register button listener/form validation



// real-time email format verification
email.addEventListener("keypress", (e) => {

	let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	
	if (regex.test(email.value)){
		 email.style.border = "2px solid #c1deeb";
	 }
	 else {
		email.style.border = "2px solid red";

	 }
	
});// end email event listener




// On loading the page
document.addEventListener("DOMContentLoaded", (e) => {
	// put focus on the Name element
	name.focus();
	
	// ----   Disabled fields at start of page  ---
	// Optional Other Job Role Text box	
	otherTitle.style.display = "none";
	otherTitle.previousElementSibling.style.display = "none";
	
	
	//Total cost for checked Activities
	const total = document.createElement('label');
	total.id = 'total';
	total.textContent = '$Total';
	total.style.display = "none";
	activities.appendChild(total);
	
	// Credit card fields and payment explanations
	cc.style.display = "none";
	ccNumError.style.display = "none";
	paypal.style.display = "none";
	bitcoin.style.display = "none";
	
	// hide error Msg for if form not filled completely
	errorMsg.textContent = "*** Please complete the red fields in order to register. ***";
	errorMsg.style.color = "firebrick";
	errorMsg.style.backgroundColor = "#c1deeb";
	errorMsg.style.textAlign = "center";
	errorMsg.style.display = "none";
	form.insertBefore(errorMsg, register);
	
	// Hide Color label and select menu
	color.style.display = "none";
	color.previousElementSibling.style.display = "none";

}); // end document loaded event listener

