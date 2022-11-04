const sentence = "Moyenne générale élève: "
const textClasseDetail = "Cette fonction n'est pas encore implémenté ici. Aller dans l'onglet " + '"Relevé".'
const textNoNotes = "Il semblerait qu'il n'y a pas de notes ici."

var cadreNote = document.getElementById("cadreNote");
var cadreBase = document.getElementById("cadreBase");
var cadreTab = document.getElementById("cadreTab");

var buttonEleve = document.getElementById("buttonEleve");
var buttonClasse = document.getElementById("buttonClasse");

var tabContentEleve = document.getElementById("tabContentEleve");
var tabContentClasse = document.getElementById("tabContentClasse");

function isScrollBar() {
  elem = document.documentElement;
  var condition = elem.scrollHeight > elem.clientHeight;

  if(condition) {
    setTimeout(isScrollBar, 100);
    document.body.style.paddingRight = "20px"
  }
  else {
    document.body.style.paddingRight = "5px"
  }

  return condition
}

function caculMoyenne(notesList) {
  additionNotes = 0;

  for (let i = 0; i < notesList.length; i++) {
    notesList[i] = notesList[i].replace(",", ".");
  };  

  notesList.forEach(note => additionNotes += parseFloat(note)); 
   
  moyenne = Math.round((additionNotes / notesList.length) * 100);
  return(moyenne / 100);
}

function createNoteList(matieresWithNotes, tabcontent, className) {
  var nombreNotes = matieresWithNotes.length;
  var idMoyenneGenerale = "moyenneGenerale" + className
  
  for(let i = 0; i < nombreNotes; i++) {
    var divMain = document.createElement("div"); 
    divMain.setAttribute("class", className);
    divMain.setAttribute("data-line", "false");

    var paraMatiere = document.createElement("p"); 
    var contentMatiere = document.createTextNode(matieresWithNotes[i][0]);
    
    var paraNote = document.createElement("p"); 
    var contentNote = document.createTextNode(matieresWithNotes[i][1]);
  
    tabcontent.appendChild(divMain);
    divMain.appendChild(paraMatiere);
    divMain.appendChild(paraNote);

    paraMatiere.appendChild(contentMatiere);
    paraNote.appendChild(contentNote);

    var elemMatiere = paraMatiere;
    elemMatiere.style.font = "12px arial";
    elemMatiere.style.paddingLeft = "10px"
    elemMatiere.style.paddingRight = "10px"

    var elemNote = paraNote;
    elemNote.style.font = "12px arial";
    elemNote.style.paddingRight = "10px";
  }

  var matiereNoteList = document.getElementsByClassName(className);

  for(var i = 0; i < matiereNoteList.length; i++) {
    var elem = matiereNoteList[i]
    elem.onclick = function() {
      if (this.dataset.line === "true" ) {
        this.style.textDecoration = "none";
        this.setAttribute("data-line", "false");
        this.style.backgroundColor = "#1B282D";
      }
      else {
        this.style.textDecoration = "line-through";
        this.setAttribute("data-line", "true");
        this.style.backgroundColor = "#193945";
      }
    }
 
    elem.onmouseout = function()
    {
      if (this.dataset.line === "true" ) {
        this.style.backgroundColor = "#193945";
        this.style.textDecoration = "line-through";
      }
      else {
        this.style.backgroundColor = "#1B282D";
        this.style.textDecoration = "none";
      }
    }

    elem.onmouseover = function()
    {
      if (this.dataset.line === "false" ) {
        this.style.backgroundColor = "#193945";
        this.style.textDecoration = "line-through";
      }
    }
  }

  if (nombreNotes > 0) {
    var cadreMoyenneGenerale = document.createElement("div"); 
    cadreMoyenneGenerale.setAttribute("class", "cadre");
    cadreMoyenneGenerale.setAttribute("id", "cadreMoyenneGenerale");
  
    var paraSentence = document.createElement("p"); 
    paraSentence.setAttribute("id", idMoyenneGenerale);
    var contentSentence = document.createTextNode(sentence);
  
    tabcontent.appendChild(cadreMoyenneGenerale);
    paraSentence.appendChild(contentSentence);
    cadreMoyenneGenerale.appendChild(paraSentence);
  }
}

function getNotesOnExtension(className) {
  var notesList = []; 
  var line = 0; 
  var divMatiereNotes = document.getElementsByClassName(className);

  for(var i = 0; i < divMatiereNotes.length; i++) {
    if (divMatiereNotes[i].dataset.line === "false" ) { 
      var paraNote = divMatiereNotes[i].lastChild;
      var note = paraNote.textContent;
      notesList.push(note); 
    }
    else {
      line++;
    }
  }

  if(divMatiereNotes.length === 0) {
    notesList = [];
  }
  else if(line === divMatiereNotes.length) {
    notesList = ["0"];
  }
  return notesList;
}

function displayUpdate() {
  var elemNoMoyenneClasse = document.getElementById("paraNoMoyenneClasse");
  var elemNoNotes = document.getElementById("paraNoNotes");


  if (tabContentEleve.style.display === "block") {
    var className = "matiereNoteEleveList"
  }
  else {
    var className = "matiereNoteClasseList"
  }

  notesList = getNotesOnExtension(className);
  var moyenne = caculMoyenne(notesList);

  if(isNaN(moyenne))
  {
    if (!document.body.contains(elemNoMoyenneClasse)) {
      cadreTab.remove();
      cadreNote.appendChild(cadreBase);
      document.body.style.width = "150px";
    }
    else {
      cadreBase.remove();
    }
  }
  else
  {
    var lengthMoyenne = moyenne.toString().length;
    if(lengthMoyenne === 1) {
      moyenne = "0" + moyenne + ".00";
    }
    else if(lengthMoyenne === 2) {
      moyenne = moyenne + ".00";
    }
    else if(lengthMoyenne === 3) {
      moyenne = moyenne + "00";
    }
    else if(lengthMoyenne === 4) {
      moyenne = moyenne + "0";
    }
    document.getElementById("moyenneGenerale" + className).textContent = sentence + moyenne;
    cadreBase.remove();
    cadreNote.appendChild(cadreTab);
  }
  
  isScrollBar();
}

window.addEventListener("click", displayUpdate);

browser.tabs.executeScript({
  file: "/content_scripts/getNotes.js"}
  ).then(result => { 
   
  console.log(result);  
  console.log(result[0]);  
  console.log(result[0][0]);
  console.log(result[0][1]);

  if (result[0] !== "nothing") {
    createNoteList(result[0][0], tabContentEleve, "matiereNoteEleveList");
    createNoteList(result[0][1], tabContentClasse, "matiereNoteClasseList");

    if (result[0][0].length === 0) {
      var elementp = document.createElement("p"); 
      elementp.setAttribute("id", "paraNoNotes");
      var textp = document.createTextNode(textNoNotes);
      tabContentEleve.appendChild(elementp);
      elementp.appendChild(textp);
    }

    if (result[0][1].length === 0) {
      var elementp = document.createElement("p"); 
      elementp.setAttribute("id", "paraNoMoyenneClasse");
      var textp = document.createTextNode(textClasseDetail);
      tabContentClasse.appendChild(elementp);
      elementp.appendChild(textp);
    }

    displayUpdate();
  }
  else {
    cadreTabs.remove();
    document.body.style.width = "150px";
    document.body.style.paddingRight = "5px"
  }
});


