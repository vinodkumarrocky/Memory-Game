/*
 * Create a list that holds all of your cards
 */
 let x = document.querySelectorAll(".card");//storing nodelist in x
 let y = [...x];//converting nodelist as array
 let deck=document.querySelector(".deck");
let count=0;
let moves=document.querySelector(".moves");
let star=document.querySelector(".stars");
let starCount=document.querySelectorAll(".fa-star");
let hour,min,sec,interval;
let timer=document.querySelector(".timer");
let flipCards=[];//new array
let type, elem;
let modal=document.querySelector(".modal");
function display(){
	//displays the card
         this.classList.add("open","show","disable");
}
function flipOpen(){
	flipCards.push(this);
	//if flipcards[0] and flipcards[1] matches
	//adds match class or else adds unmatch class
	if(flipCards.length === 2)
	 {
		if (flipCards[0].type === flipCards[1].type) {
			movesCount();
			flipCards[0].classList.add("match");
			flipCards[1].classList.add("match");
			flipCards=[];//new array
		}
		else{
			movesCount();
			flipCards[0].classList.add("unmatch");
			flipCards[1].classList.add("unmatch");
			setTimeout(function(){
				flipCards[0].classList.remove("open","show","unmatch","disable");
				flipCards[1].classList.remove("open","show","unmatch","disable");
				flipCards=[];			
 		},400);

	}
}
}
/*function rm(){
            $(document).click(function(){
            $("li").removeClass("disable");
     }); 
}
setTimeout(rm(),500)*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//loads startCards() when page loads
document.body.onload= startCards();
function startCards(){
	x = shuffle(y);//shuffle the cards
	for(let i=0; i < x.length; i++)
	{
		       deck.innerHTML = "";
			[].forEach.call(y, function(item) {
				deck.appendChild(item);
			});
			x[i].classList.remove("open","show","match","disable");
		}	
	for(let i=0;i<starCount.length;i++)
		{
			starCount[i].style.color= "#000";
			starCount[i].style.visibility="";
		}
	count=0;
	moves.innerHTML=count;
	sec=0;
	min=0;
	hour=0;
	timer.innerHTML = hour +" hour "+min+" min "+sec;
	clearInterval(interval);
}
function movesCount(){
	//counts each time two cards flipped
	count++;
	moves.innerHTML=count;
	if(count === 1)
		{
			setTime();		    
		}
	if(count === 13)
		{
			starCount[2].style.color= "#f98d02d6";
		}
	else if(count === 18)
		{
			starCount[1].style.color= "#f98d02d6";
		}
}
function setTime(){
	interval = setInterval(function(){
		timer.innerHTML=hour+" hour "+min+" min "+sec;
		sec++;
		if(sec === 60){
			min++;
			sec= 0;
		}
		if(min === 60)
			{
			    hour++;
				min= 0;
			}
	},1000);
}
function end(){
	let matched=document.querySelectorAll('.match');//query all matched cards
	console.log(matched.length);
	//if all 16 cards matched then popup displays with congratulations message
	if(matched.length === 16)
		{
			clearInterval(interval);
			const totalTime=timer.innerHTML;
			timer.innerHTML=totalTime;
			const totalRating=document.querySelector('.stars').innerHTML;		
			modal.style.display = "block";
			document.querySelector('.totalMoves').innerHTML=count;
			document.querySelector('.totalTime').innerHTML=totalTime;
			document.querySelector('.totalRating').innerHTML=totalRating;			
			// When the user clicks on <span> (x), close the modal
			let span= document.getElementsByClassName("close")[0];
			span.onclick=function(){
				modal.style.display="none";
			}
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
		}
}
for(i=0;i<x.length;i++)
	{
		x[i].addEventListener("click",display);
		x[i].addEventListener("click",flipOpen);
		x[i].addEventListener("click",end);
	}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
