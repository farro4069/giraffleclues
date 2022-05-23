const cluesElement = document.querySelector('.clues__items');
let cluesItemElement = '';
let validWords = dictionary;
const keyboard = document.querySelector('.keyboard__items');
const keyItems = keyboard.querySelectorAll('.keyboard__item');
const oopsItem = keyboard.querySelector('.keyboard__oops');
let nopeLetters = [];
const green = document.querySelector('.green__items');
const greenItems = green.querySelectorAll('.green__item');
const yellow = document.querySelector('.yellow__items');
const yellowItems = yellow.querySelectorAll('.yellow__item');
const modalKeyboard = document.querySelector('.modal__keyboard');
let filteredWords =[];
let tempWords = [];
const modalKeys = modalKeyboard.querySelectorAll('.keyboard__item');
let positionGreen = -1;
let positionYellow = -1;
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
	this.style.backgroundColor = 'var(--green)'
	positionGreen = Array.from(this.parentNode.children).indexOf(this);
	keyboard.style.opacity = "0.2";
	modalKeyboard.style.display = 'block';
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
	modalKeys.forEach(key => key.removeEventListener('click', greenClick));	
	keyItems.forEach(key => {key.textContent == greenLetter? key.style.backgroundColor = 'var(--green)': null;} )
}

function yellows(e) {
	this.style.backgroundColor = 'var(--yellow)'
	positionYellow = Array.from(this.parentNode.children).indexOf(this);
	keyboard.style.opacity = "0.2";
	modalKeyboard.style.display = 'block';
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
	modalKeys.forEach(key => key.removeEventListener('click', yellowClick));
	keyItems.forEach(key => {key.textContent == yellowLetter? key.style.backgroundColor = 'var(--yellow)': null;} )
}

function oopsReset() {
	keyItems.forEach(key => delete key.dataset.nope);
	validWords = dictionary;
}



keyItems.forEach(key => key.addEventListener('click', nopes));
greenItems.forEach(key => key.addEventListener('click', greens));
yellowItems.forEach(key => key.addEventListener('click', yellows));
oopsItem.addEventListener('click', oopsReset)
startOver.addEventListener('click', () => location.reload());

