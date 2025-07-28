const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

let creatureIdName = [];
let userInput = searchInput.value;

const validCreatures = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureStat = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";

const findCreature = async (input) => {
  try {
    const res = await fetch(validCreatures);
    const data = await res.json();
    if(data.some(creature => creature.id == input || creature.name.toLowerCase() == input.toLowerCase())){
      displayCreature(input);
    } else {
      alert("Creature not found")
    }
  } catch (err) {
    console.log(err); 
  }
}

const displayTypes = (input) => {
  for(let i = 0; i < input.length; i++){
    types.innerHTML += `<p class="${input[i].name} types">${input[i].name.toUpperCase()}</p>`;
  }
}

const displayCreature = async (input) => {
  try {
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`);  
    const data = await res.json();
    creatureName.innerText = data.name.toUpperCase();
    creatureId.innerText = `#${data.id}`;
    weight.innerText = `Weight: ${data.weight}`;
    height.innerText = `Height: ${data.height}`;
    displayTypes(data.types);
    hp.innerText = data.stats[0].base_stat;
    attack.innerText = data.stats[1].base_stat;
    defense.innerText = data.stats[2].base_stat;
    specialAttack.innerText = data.stats[3].base_stat;
    specialDefense.innerText = data.stats[4].base_stat;
    speed.innerText = data.stats[5].base_stat;
  } catch (err) {
    console.log(err);
  }
}

const resetInfo = () => {
  creatureName.innerText = "";
  creatureId.innerText = "";
  weight.innerText = "";
  height.innerText = "";
  types.innerHTML = "";
  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";
}

searchButton.addEventListener('click',() => {
  findCreature(searchInput.value);
  resetInfo();
})