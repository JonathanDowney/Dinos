// I moved the dino JSON object into the main JS file.
// It's a pretty small list, and accessing JSON was not a project requirement.
// In the future, I will use fetch() as specified here:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

const dinoCollection = {
  Dinos: [
    {
      species: 'Triceratops',
      weight: 13000,
      height: 114,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: '...was first discovered in 1889 by Othniel Charles Marsh',
    },
    {
      species: 'Tyrannosaurus Rex',
      weight: 11905,
      height: 144,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: '...had a skull up to 5 feet long.',
    },
    {
      species: 'Anklyosaurus',
      weight: 10500,
      height: 55,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: '...survived for approximately 135 million years.',
    },
    {
      species: 'Brachiosaurus',
      weight: 70000,
      height: '372',
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Jurasic',
      fact: 'An asteroid was named 9954 Brachiosaurus in 1991.',
    },
    {
      species: 'Stegosaurus',
      weight: 11600,
      height: 79,
      diet: 'herbavor',
      where: 'North America, Europe, Asia',
      when: 'Late Jurasic to Early Cretaceous',
      fact: '...had between 17 and 22 seperate places and flat spines.',
    },
    {
      species: 'Elasmosaurus',
      weight: 16000,
      height: 59,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: '...was a marine reptile first discovered in Kansas.',
    },
    {
      species: 'Pteranodon',
      weight: 44,
      height: 20,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: '...was actually a flying reptile, the Pteranodon is not a dinosaur.',
    },
    {
      species: 'Pigeon',
      weight: 0.5,
      height: 9,
      diet: 'herbavor',
      where: 'World Wide',
      when: 'Holocene',
      fact: 'All birds are living dinosaurs.',
    },
  ],
};

// Everthing happens after the "Compare" button is clicked. Otherwise, the human form data is blank.
function btnClick() {
  // Generate ordered array of index numbers. From https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  const orderedIndex = Array.from(Array(dinoCollection.Dinos.length).keys());

  // Shuffle the index order. Shuffle function taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    let currentIndex = array.length; let temporaryValue; let
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
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
  const positionIndex = shuffle(orderedIndex);

  // Access form info.   Helpful: https://www.w3schools.com/js/js_input_examples.asp
  const dinoForm = document.getElementById('dino-compare');

  // Create human object: "human" property names  because it is the prototype for "dino objects".
  // Dino objects which have their own heights, etc, but still reference the human properties.
  const human = {
    humanName: dinoForm.elements[0].value,
    humanHeight: ((dinoForm.elements[1].value) + dinoForm.elements[2].value / 12),
    humanWeight: dinoForm.elements[3].value,
    humanDiet: dinoForm.elements[4].value,
  };

  // Dino constructor
  function DinoConstructor(i) {
    // basic info
    this.species = dinoCollection.Dinos[i].species;
    this.tilePosition = positionIndex[i];
    // "encodeURI" to get deal with the "space" in Tyrannosaurs Rex.
    this.photo = encodeURI(`images/${this.species}.png`).toLowerCase();
    // fact methods
    this.compareWeights = function compareWeights() {
      const weight1 = dinoCollection.Dinos[i].weight;
      const weight2 = this.humanWeight;
      return (Math.floor((weight1 / weight2) * 100)) / 100;
    };
    this.compareHeights = function compareHeights() {
      const height1 = dinoCollection.Dinos[i].height;
      const height2 = this.humanHeight;
      // multilying and dividing by 100 rounds to the first decimal place
      return (Math.floor((height1 / height2) * 100)) / 100;
    };
    this.compareDiets = function compareDiets() {
      if (dinoCollection.Dinos[i].diet === this.humanDiet) {
        return 'similar';
      }
      return 'different';
    };
    // Dino fact array
    this.facts = [
      `...weighed ${dinoCollection.Dinos[i].weight} pounds.`,
      `...was ${Math.floor((dinoCollection.Dinos[i].height) / 12)} feet tall.`,
      `...had a/an ${dinoCollection.Dinos[i].diet} diet.`,
      `...lived in ${dinoCollection.Dinos[i].where}.`,
      `...lived in the ${dinoCollection.Dinos[i].when} period.`,
      `${dinoCollection.Dinos[i].fact}`,
      `...was ${this.compareWeights()} times as heavy as you.`,
      `...was ${this.compareHeights()} times taller than you.`,
      `...had a ${this.compareDiets()} diet than you. She was a/an ${dinoCollection.Dinos[i].diet}!`,
    ];
  }

  DinoConstructor.prototype = human;

  // Create a random-ordered array of "Dino Objects" by iterating through the initial object array.
  // The array is a good structure because dinos can be referred to later by index number.
  const dinoArray = [];
  (function genDinoArray() {
    for (let i = 0; i < dinoCollection.Dinos.length; i += 1) {
      // using randIndex here randomizes the order of the resulting dinoArray
      const newDino = new DinoConstructor(positionIndex[i]);
      dinoArray.push(newDino);
    }
  }());

  // Load the grid structure onto the DOM. Note that the middle tile is a bit different.
  (function loadGrid() {
    const divNum = 9;
    for (let i = 0; i < divNum; i += 1) {
      $('#grid').append('<div class = "grid-item"></div>');
    }
    // dynamically assign cell id's
    let idCount = 0;
    $('#grid div').each(function () {
      $(this).attr('id', idCount); // insert dynamic id for each '<a>'
      idCount += 1;
    });
  }());

  // Add dino species name, picture, and fact onto the tile elements in the DOM in random positions.
  (function loadDinoInfo() {
    // Generate "fact" index (https://www.w3schools.com/JSREF/jsref_from.asp)
    const factIndex = shuffle(Array.from(Array(dinoArray[0].facts.length).keys()));

    for (let i = 0; i < positionIndex.length; i++) {
      // pigeon gets a fixed fact from its "fact array".
      if (dinoArray[i].species === 'Pigeon') {
        document.getElementById(i).innerHTML = `<h3>${dinoArray[i].species}</h3>
        <img src= ${dinoArray[i].photo}>
        <p>${dinoArray[i].facts[5]}</p>`;
      } else {
        // other dinos get a random ract
        document.getElementById(i).innerHTML = `<h3>${dinoArray[i].species}</h3>
            <img src= ${dinoArray[i].photo}>
            <p>${dinoArray[i].facts[factIndex[i]]}</p>`;
      }
    }

    // move dino in center tile to spot 8 to make room for human
    document.getElementById('8').innerHTML = `<h3>${dinoArray[4].species}</h3>
        <img src= ${dinoArray[4].photo}>
        <p>${dinoArray[4].facts[factIndex[4]]}</p>`;
  }());

  // Add human name, picture, and greeting onto the center tile element.
  (function loadHumanInfo() {
    document.getElementById('4').innerHTML = `<h3>${human.humanName}</h3>
            <img src='images/human.png'> 
            <p>"I'm you!"</p>
            `;
  }());

  // Hide the original input form.
  (function hideForm() {
    document.getElementById('dino-compare').innerHTML = '';
  }());

  // Now call all of the functions above.
  // This happens now because the functions above share info with each other.
}
