const frank = {
	name: "Frankenstein",
	image:
		"https://dc703.4shared.com/img/KgD3oHOIea/s24/17c28b4ccb0/frank__1_?async&rand=0.23906991597676241",
	attributes: {
		AGILIDADE: 2,
		SUSTO: 7,
		DESTREZA: 1
	}
};

const reAnimator = {
	name: "RE-ANIMATOR",
	image:
		"https://dc703.4shared.com/img/ejY-tr6Jea/s24/17c2921b780/newanimator__3_?async&rand=0.6124987178113368",
	attributes: {
		AGILIDADE: 5,
		SUSTO: 1,
		DESTREZA: 9
	}
};

const theFly = {
	name: "THE FLY",
	image:
		"https://dc772.4shared.com/img/IjkBvxUeea/s24/17c0ad1d440/FLY?async&rand=0.30550091558766135",
	attributes: {
		AGILIDADE: 9,
		SUSTO: 9,
		DESTREZA: 7
	}
};

const creep = {
	name: "CREEP",
	image:
		"https://dc731.4shared.com/img/ixkXi2tXiq/s24/17c0adcd890/CREEP?async&rand=0.6783244159856536",
	attributes: {
		AGILIDADE: 10,
		SUSTO: 10,
		DESTREZA: 10
	}
};

const invisibleMan = {
	name: "The Invisible Man",
	image:
		"https://dc610.4shared.com/img/IJ-NzGuviq/s24/17c2921b780/invisibleman__1_?async&rand=0.41708505051661904",
	attributes: {
		AGILIDADE: 4,
		SUSTO: 8,
		DESTREZA: 10
	}
};

const doctorHyde = {
	name: "Dr. Jekyll and Mr. Hyde",
	image:
		"https://dc715.4shared.com/img/xHzFLAs4ea/s24/17c2928eb40/drmr?async&rand=0.36917518919096204",
	attributes: {
		AGILIDADE: 5,
		SUSTO: 8,
		DESTREZA: 10
	}
};

const listOfCards = [
	frank,
	reAnimator,
	theFly,
	creep,
	invisibleMan,
	doctorHyde
];

let playerPoints = 0;
let machinePoints = 0;

const btnDraw = document.querySelector("#btnDraw");
const btnChoose = document.querySelector("#btnChoose");
const gameOptions = document.querySelector("#gameOptions");
const options = document.querySelector("#options");
const playerCard = document.querySelector("#playerCard");
const machineCard = document.querySelector("#machineCard");
const numberOfCards = document.querySelector("#numberOfCards");
const btnNextRound = document.querySelector("#btnNextRound");

btnChoose.disabled = true;
btnNextRound.disabled = true;

function updateScoreboard() {
	const scoreboard = document.querySelector("#scoreboard");
	let scoreboardResult = `PLACAR: Jogador: ${playerPoints} vs ${machinePoints} Máquina`;
	scoreboard.textContent = scoreboardResult;
}
updateScoreboard();

function updateNumberOfCards() {
	numberOfCards.textContent = `Quantidade de cartas no deck: ${listOfCards.length}`;
}
updateNumberOfCards();

function drawCard() {
	let ramdomCardMachine = parseInt(Math.random() * listOfCards.length);
	cardOfMachine = listOfCards[ramdomCardMachine];
	listOfCards.splice(ramdomCardMachine, 1);
	let ramdomCardPlayer = parseInt(Math.random() * listOfCards.length);
	cardOfPlayer = listOfCards[ramdomCardPlayer];
	listOfCards.splice(ramdomCardPlayer, 1);
	btnDraw.disabled = true;
	btnChoose.disabled = false;
	displayPlayerCard(cardOfPlayer);
	displayOptions(cardOfPlayer);
	updateNumberOfCards();
}

function displayPlayerCard(card) {
	playerCard.insertAdjacentHTML("afterbegin", generateCard(card));
}

function generateCard(card) {
	let cardHTML = `
        <img src="${card.image}" class="img-card" alt="Imagem do ${card.name}" />`;
	for (attribute in card.attributes) {
		cardHTML += `<p>${attribute}  :  ${card.attributes[attribute]}</p>`;
	}
	return cardHTML;
}

function displayOptions(card) {
	for (let attribute in card.attributes) {
		attributeOptions = `
        <input type="radio" id="${attribute}" name="attribute" value="${attribute}" checked />
        <label for="${attribute}"> ${attribute}: ${cardOfPlayer.attributes[attribute]}</label><br>`;
		options.insertAdjacentHTML("beforeend", attributeOptions);
	}
}

function getSelectedAttribute() {
	let radioButton = document.getElementsByName("attribute");
	let attribute = false;
	for (let i = 0; i < radioButton.length; i++) {
		if (radioButton[i].checked) {
			attribute = radioButton[i].value;
		}
	}
	return attribute;
}

function displayMachineCard(card) {
	machineCard.insertAdjacentHTML("afterbegin", generateCard(card));
}

function play() {
	let selectedAttribute = getSelectedAttribute();
	if (
		cardOfPlayer.attributes[selectedAttribute] >
		cardOfMachine.attributes[selectedAttribute]
	) {
		options.insertAdjacentHTML(
			"afterbegin",
			`<h3>Você ganhou em um confronto horripilante! A carta do oponente
        "${cardOfMachine.name}" tem o atributo "${selectedAttribute}" menor</h3>`
		);
		playerPoints++;
	} else if (
		cardOfPlayer.attributes[selectedAttribute] <
		cardOfMachine.attributes[selectedAttribute]
	) {
		options.insertAdjacentHTML(
			"afterbegin",
			`<h3>Você perdeu um confronto horripilante! A carta do oponente
        "${cardOfMachine.name}" tem o atributo "${selectedAttribute}" maior</h3>`
		);
		machinePoints++;
	} else {
		options.insertAdjacentHTML(
			"afterbegin",
			`<h3>Você empatou, ambos são horripilantes! A carta do oponente
        "${cardOfMachine.name}" tem o atributo "${selectedAttribute}" igual</h3>`
		);
	}
	displayMachineCard(cardOfMachine);

	if (listOfCards.length === 0) {
		options.innerHTML = "";
		options.insertAdjacentHTML(
			"afterbegin",
			`Fim de jogo! Acabaram as cartas do deck`
		);
		if (playerPoints > machinePoints) {
			options.insertAdjacentHTML(
				"beforeend",
				`<p>Parabéns! Você é mais horripilante que seu oponente</p>`
			);
		} else if (machinePoints < playerPoints) {
			options.insertAdjacentHTML(
				"beforeend",
				`<p>Você perdeu, seu oponente é muito mais horripilante!</p>`
			);
		} else {
			options.insertAdjacentHTML("beforeend", `<p>HA! Empate!</p>`);
		}
	} else {
		btnNextRound.disabled = false;
	}

	btnChoose.disabled = true;
	updateScoreboard();
}

function nextRound() {
	playerCard.innerHTML = "";
	machineCard.innerHTML = "";
	options.innerHTML = "";
	btnDraw.disabled = false;
	btnNextRound.disabled = true;
}