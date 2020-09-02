// I moved the dino JSON object into the main JS file. It's a pretty small list, and accessing JSON was not a project requirement. 
const dinoCollection = {
        "Dinos": [
            {
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "...was first discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "...had a skull up to 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "...survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": "372",
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "...had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "...was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "...was actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ]
    }

// Everthing happens after the "Compare" button is clicked. Otherwise, the human form data is blank. 
function btnClick(){  
    
// Generate ordered array of index numbers. From https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
let orderedIndex = Array.from(Array(dinoCollection.Dinos.length).keys()) 

// Shuffle the index order. Shuffle function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  }

  return array;
}
randIndex = shuffle(orderedIndex);

// Access form info.   Helpful: https://www.w3schools.com/js/js_input_examples.asp
let dinoForm = document.getElementById("dino-compare"); 

// Human constructor
function humanConstructor(){
    this.name = dinoForm.elements[0].value;
    this.height = (dinoForm.elements[1].value) + dinoForm.elements[2].value/12;
    this.weight = dinoForm.elements[3].value;
    this.diet = dinoForm.elements[4].value;
}

let human = new humanConstructor();

// Dino constructor 
function dinoConstructor(i){
    //basic info
    this.species = dinoCollection.Dinos[i].species
    this.tilePosition = randIndex[i];
    this.photo = encodeURI(`images/${this.species}.png`) // to get deal with the "space" in Tyrannosaurs Rex.
    // fact methods
    this.compareWeights = function (){
        let weight1 = dinoCollection.Dinos[i].weight;
        let weight2 = human.weight;
        return factor = Math.floor(weight1/weight2);
    }
    this.compareHeights = function (){
        let height1 = dinoCollection.Dinos[i].height;
        let height2 = human.height;
        return factor = (Math.floor((height1/height2)*100))/100; // multilying and dividing by 100 rounds to the first decimal place
    }
    this.compareDiets = function (){
        if (dinoCollection.Dinos[i].height == human.diet){
            return "similar";
        } else {
            return "different";
        }
    }
    // Dino fact array
    this.facts  = [
        `...weighed ${dinoCollection.Dinos[i].weight} pounds.`,
        `...was ${Math.floor((dinoCollection.Dinos[i].height)/12)} feet tall.`,
        `...had a/an ${dinoCollection.Dinos[i].diet} diet.`,
        `...lived in ${dinoCollection.Dinos[i].where}.`,
        `...lived in the ${dinoCollection.Dinos[i].when} period.`,
        `${dinoCollection.Dinos[i].fact}`,
        `...was ${this.compareWeights()} times as heavy as you.`,
        `...was ${this.compareHeights()} times taller than you.`,
        `...had a ${this.compareDiets()} diet than you. She was a/an ${dinoCollection.Dinos[i].diet}!`
    ];
}; 

dinoConstructor.prototype = human;

// Create a randomly-ordered array of new "Dino Objects". The array is a good structure because individual dinos can be referred to later by index number.
let dinoArray = [];
(function(){
    for (let i=0; i<dinoCollection.Dinos.length; i++){
    let newDino = new dinoConstructor(randIndex[i]); // using randIndex here randomizes the order of the resulting dinoArray
    dinoArray.push(newDino);
    }
})(); 

// Load the grid structure onto the DOM. Note that the middle tile is a bit different.
function loadGrid(){ 
    document.getElementById('grid').innerHTML = `
    <div class = "grid-item" id = "0"></div>
    <div class = "grid-item" id = "1"></div>
    <div class = "grid-item" id = "2"></div>
    <div class = "grid-item" id = "3"></div>
    <div class = "grid-item" id = "midTile"></div> 
    <div class = "grid-item" id = "4"></div>
    <div class = "grid-item" id = "5"></div>
    <div class = "grid-item" id = "6"></div>
    <div class = "grid-item" id = "7"></div>
    `; 
}

// Add dino species name, picture, and random fact onto the tile elements in the DOM in random positions.
function loadDinoInfo(){
    randIndex.push(8); // add an index value because there is one more fact than tile position.
    randFactIndex = shuffle(randIndex) // the randomized index is re-shufffled to provide a new random index for the facts.
    for (let i=0; i<dinoArray.length; i++){
        // Pigeon is a special case. It only displays fact #5.   
        if (dinoArray[i].species == 'Pigeon'){
            document.getElementById(i).innerHTML = 
                `<h3>${dinoArray[i].species}</h3>
                <img src= ${dinoArray[i].photo}>
                <p>${dinoArray[i].facts[5]}</p>  
                `;                             
        } else {
        // Other dinos get a random fact from their "fact array".
        document.getElementById(i).innerHTML = 
            `<h3>${dinoArray[i].species}</h3>
            <img src= ${dinoArray[i].photo}>
            <p>${dinoArray[i].facts[randFactIndex[i]]}</p>
            `;      
        }      
    }
}

// Add human name, picture, and greeting onto the center tile element.
function loadHumanInfo(){   
    document.getElementById('midTile').innerHTML = 
        `<h3>${human.name}</h3>
        <img src='images/human.png'> 
        <p>"I'm you!"</p>
        `;
}

// Hide the original input form.
function hideForm(){
    document.getElementById('dino-compare').innerHTML = "";
}

// Now call all of the functions above. This happens now because the functions above share info with each other.
loadGrid();
loadDinoInfo();
loadHumanInfo();
hideForm();

} // End "Button click" function
