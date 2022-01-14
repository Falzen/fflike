/*
BACKLOG
- 
- 

DONE
- 
- 

AMELIO
- 
- 

*/


$(document).ready(function() {
	init();
});

function init() {
	rivets.bind($('#tabletop'), {
		players: players
	});
	refreshHand('topHand')
	refreshHand('bottomHand');
}


var settings = {

}

// gameTurn
var gt = {
	whoseTurn: 'bottom',
	isCardSelected: false,
	selectedCardId: null
}

function setEventListeners() {
	$(document).on('click', '.card-container', function(ev) {
		if(gt.isCardSelected) {
			gt.isCardSelected = false;
			gt.selectedCardId = null;
			return;
		}
		gt.isCardSelected = true;
		gt.selectedCardId = ev.target


	});
}

//MODEL
var players = {
	top: {
		hand: [],
		backSoldiers: [],
		frontSoldiers: []
	},
	bottom: {
		hand: [],
		backSoldiers: [],
		frontSoldiers: []
	}
}
var shortSwordStrike = {
	name: 'simple attack',
	description: "attacks with short sword",
	damage: 4,
	targetType: 'solo',
	canBeTargeted: 'enemies,front',
	hasInBackDisadvantage: false,
	hasTargetInBackDisadvantage: false,
}
var fanOfKnives = {
	name: 'fan of knives',
	description: "attacks with multiple knives",
	damage: 2,
	canBeTargeted: 'enemies,front',
	targetType: 'row',
	hasInBackDisadvantage: true,
	hasTargetInBackDisadvantage: true,
}




var cardIdcpt = 0;
var oneCard = {
	id: ++cardIdcpt,
	name: 'cartTest'+cardIdcpt,
	hp: 7,
	hpMax: 7,
	passiveAttak: 2,
	skills: [new Skill(shortSwordStrike), new Skill(fanOfKnives)]
}

players.top.hand.push(new Card(oneCard), new Card(oneCard));
players.bottom.hand.push(new Card(oneCard), new Card(oneCard));


function refreshHand(handId) {
	// choose data from handid
	let wantedHand = handId == 'bottomHand' ? 
		players.bottom.hand : handId == 'topHand' ? 
		players.top.hand : null;

	$('#'+handId).html('<td class="fake-for-height"></td>');
	var output = '';
	for (let i = 0; i < wantedHand.length; i++) {
		output += makeCardDom(wantedHand[i]);
	}
	$('#'+handId).append(output);
}


function makeCardDom(data) {
	let output = '<td id="card" data-cardid="'+ data.id + '">'
					+ '<div class="card-container hand bottom-hand">'
						+ '<div class="card-content">'
							+ '<div class="hp-container">'
								+ '<p class="">' + data.passiveAttak + '</p>'
								+ '<p class="">' + data.hp + '</p>'
							+ '</div>'
							+ '<h3>' + data.name + '</h3>'
						 	+ '<p>id : ' + data.id + '</p>'
					 	+ '</div>'
					 + '</div>'
				+ '</td>';
	return output;
}