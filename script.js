const cluesElement = document.querySelector('.clues__items');
let cluesItemElement = '';
let validWords = dictionary.sort();
const keyboard = document.querySelector('.keyboard__items');
const keyItems = keyboard.querySelectorAll('.keyboard__item');
let nopeLetters = [];
const green = document.querySelector('.green__items');
const greenItems = green.querySelectorAll('.green__item');
const yellow = document.querySelector('.yellow__items');
const yellowItems = yellow.querySelectorAll('.yellow__item');
const modalKeyboard = document.querySelector('.modal__keyboard');
const oopsItem = modalKeyboard.querySelector('.keyboard__oops');
let filteredWords =[];
let tempWords = [];
const modalKeys = modalKeyboard.querySelectorAll('.keyboard__item');
let positionGreen = -1;
let greenFlag = false;
let positionYellow = -1;
let yellowFlag = false;
const startOver = document.querySelector('.btn__restart');

function filterClues() {
	cluesItemElement = '';
	validWords.forEach(word => {
		cluesItemElement += `<li class='clues__item'>${word}</li>`
	})
	cluesElement.innerHTML = cluesItemElement;
}

function nopes(e) {
	theLetter = e.target.textContent;	
	if (e.target.dataset.nope) {
		n = nopeLetters.indexOf(theLetter);
		nopeLetters.splice(n, 1);
		delete this.dataset.nope;
	} else {	
		nopeLetters.push(e.target.textContent);	
		this.dataset.nope = true;
		filteredWords = [];
		validWords.forEach(word => {
			word.indexOf(theLetter) == -1? filteredWords.push(word): null;
		})
		validWords = filteredWords;
		filterClues()
	}
} 

function greens(e) {
	greenFlag = true;
	this.style.backgroundColor = 'var(--green)';
	positionGreen = Array.from(this.parentNode.children).indexOf(this);
	keyboard.style.opacity = "0.1";
	modalKeyboard.style.display = 'flex';
	modalKeyboard.style.borderColor = 'var(--green)';
	modalKeys.forEach(key => key.addEventListener('click', greenClick));
}

function greenClick(k) {
	greenLetter = k.target.textContent;
	greenItems[positionGreen].textContent = greenLetter;
	keyboard.style.opacity = "1";
	modalKeyboard.style.display = 'none';
	filteredWords = [];
	validWords.forEach(word => {
		word[positionGreen] == greenLetter ? filteredWords.push(word): null;
	})
	validWords = filteredWords;
	filterClues()
	greenFlag = false; 
	modalKeys.forEach(key => key.removeEventListener('click', greenClick));	
	keyItems.forEach(key => {key.textContent == greenLetter? key.style.backgroundColor = 'var(--green)': null;} )
}

function yellows(e) {
	yellowFlag = true;
	this.style.backgroundColor = 'var(--yellow)'
	positionYellow = Array.from(this.parentNode.children).indexOf(this);
	keyboard.style.opacity = "0.05";
	modalKeyboard.style.display = 'flex';
	modalKeyboard.style.borderColor = 'var(--yellow)';
	modalKeys.forEach(key => key.addEventListener('click', yellowClick));
}

function yellowClick(k) {
	yellowLetter = k.target.textContent;
	yellowItems[positionYellow].textContent = yellowLetter;
	keyboard.style.opacity = "1";
	modalKeyboard.style.display = 'none';
	tempWords = [];
	filteredWords = [];
	validWords.forEach(word => {
		word.indexOf(yellowLetter) == -1 ? null: tempWords.push(word);
	})
	tempWords.forEach(word => {
		word[positionYellow] == yellowLetter ? null: filteredWords.push(word);
	})
	validWords = filteredWords;
	filterClues()
	yellowFlag = false;
	modalKeys.forEach(key => key.removeEventListener('click', yellowClick));
	keyItems.forEach(key => {key.textContent == yellowLetter? key.style.backgroundColor = 'var(--yellow)': null;} )
}

function oopsReset() {
	keyboard.style.opacity = "1";
	modalKeyboard.style.display = 'none';
	if (greenFlag === true) {
		greenItems[positionGreen].style.backgroundColor = 'var(--back)'; 
		greenFlag = false;
	}  

	if (yellowFlag === true) {
		yellowItems[positionYellow].style.backgroundColor = 'var(--back)';
		yellowFlag = false;
	}
	modalKeys.forEach(key => key.removeEventListener('click', yellowClick));
	modalKeys.forEach(key => key.removeEventListener('click', greenClick));
}

keyItems.forEach(key => key.addEventListener('click', nopes));
greenItems.forEach(key => key.addEventListener('click', greens));
yellowItems.forEach(key => key.addEventListener('click', yellows));
oopsItem.addEventListener('click', oopsReset)
startOver.addEventListener('click', () => location.reload());

