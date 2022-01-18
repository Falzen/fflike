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
	setEventListeners();
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
	$(document).on('click', '.is-card', function(ev) {
		if($(ev.currentTarget).hasClass('is-selected')) {
			$(ev.currentTarget).removeClass('is-selected');
			gt.isCardSelected = false;
			return;
		}
		let cardId = ev.currentTarget.id;
		$('.is-card').removeClass('is-selected');
		$('#' + cardId).addClass('is-selected');
		gt.isCardSelected = true;
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

var skillIdcpt = 0;
let allSkillsList = [];
var shortSwordStrike = {
	techid: ++skillIdcpt,
	techname: 'shortSwordStrike',
	name: 'simple attack',
	description: "attacks with short sword",
	damage: 4,
	targetType: 'solo',
	canBeTargeted: 'enemies,front',
	hasInBackDisadvantage: false,
	hasTargetInBackDisadvantage: false,
}
allSkillsList.push(shortSwordStrike);
var fanOfKnives = {
	techid: ++skillIdcpt,
	techname: 'fanOfKnives',
	name: 'fan of knives',
	description: "attacks with multiple knives",
	damage: 2,
	canBeTargeted: 'enemies,front',
	targetType: 'row',
	hasInBackDisadvantage: true,
	hasTargetInBackDisadvantage: true,
}
allSkillsList.push(fanOfKnives);
let allSkillsTemplatesByTechname = makeMapByAttrFromList(allSkillsList, 'techname')



var cardIdcpt = 0;
var oneCard = {
	id: ++cardIdcpt,
	name: 'cartTest'+cardIdcpt,
	hp: 7,
	hpMax: 7,
	passiveAttack: 2,
	skills: ['shortSwordStrike', 'fanOfKnives']
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

function refreshBattlefieldPartById(whereId) {
	// choose data from handid
	let wantedHand = 
		whereId == 'bottomHand' ? players.bottom.hand : 
		whereId == 'topHand' ? players.top.hand : 
		whereId == 'bottomFrontSoldiers' ? players.bottom.backSoldiers : 
		whereId == 'bottomBackSoldiers' ? players.bottom.frontSoldiers : 
		whereId == 'topFrontSoldiers' ? players.top.backSoldiers : 
		hereId == 'topBackSoldiers' ? players.top.frontSoldiers : 
		 null;

	$('#'+handId).html('<td class="fake-for-height"></td>');
	var output = '';
	for (let i = 0; i < wantedHand.length; i++) {
		output += makeCardDom(wantedHand[i]);
	}
	$('#'+handId).append(output);
}

function makeCardDom(data) {
	let cardDomOutput = 
		'<td id="card{{id}}" class="is-card noselect">' +
		   '<div class="card-container" data-cardid="{{id}}">' +
		      '<div class="card-content">' +
		         '<div class="hp-container">' +
		            '<p class="">{{passiveAttack}}</p>' +
		            '<p class="">{{hp}}</p>' +
		         '</div>' +
		         '<h3>{{name}}</h3>' +
		         '<p>id : {{id}}</p>' +
		      '</div>' +
		   '</div>' +
		'</td>';
	
	let tweakedOutput = cardDomOutput.replaceAll('{{id}}', data.id)
		.replaceAll('{{passiveAttack}}', data.passiveAttack)
		.replaceAll('{{hp}}', data.hp)
		.replaceAll('{{name}}', data.name);

	return tweakedOutput;
}




function makeSkillDom(data) {
	let skillDomOutput = 
		'<li class="skill">' +
		 	'<p id="skill-name">{{name}}</p>' +
		 	'<p id="skill-description">{{description}}</p>' +
		 	'<p id="skill-details">' +
			 	'<span id="skill-dmg">{{damage}}</span>' +
			 	'&nbsp;(<span id="skill-type">{{targetType}}</span>)' +
		 	'</p>' +
	 	'</li>';


	let tweakedOutput = skillDomOutput.replaceAll('{{name}}', data.name)
		.replaceAll('{{description}}', data.description)
		.replaceAll('{{damage}}', data.damage)
		.replaceAll('{{targetType}}', data.targetType);

	return tweakedOutput;
}