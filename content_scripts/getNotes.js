function getNotesDetail() {
  // init
    var notes = [];
    var matieres = [];  
    var matieresWithNotes = [];
  
    // get all note and matiere
    var allNotes = document.getElementsByClassName("Gras Espace");
  
    // clear list of notes and matiere
    for (let item of allNotes) {
      var text = (item.getAttribute("aria-label"));
  
      if(text !== null) {
        var note = text.substring(text.length - 5, text.length);
        notes.push(note); 
        var matiere = text.substring(0, text.length - 6);
        matieres.push(matiere); 
  
        matieresWithNotes.push([matiere, note]);
      }
    }
    return(matieresWithNotes);
}

function getNotesReleve() {
  var elem = document.getElementsByClassName("liste_contenu_ligne");

  var listLigne = []; 	
	var listMatieres = []; 
  var listNotes = [];
  var listNoteClasses = [];
  var listMatieresNotes = [];
  var listMatieresNotesClasse = [];

  
  for(var i = 0; i < elem.length; i++) {
    var attributes = elem[i].offsetParent.offsetParent.attributes;
    var arialLabel = attributes[1].textContent;
    var posSpace2 = arialLabel.indexOf(" ", 6);
		var posSpace3 = arialLabel.indexOf(" ", 12);
    var ligne = arialLabel.substring(6, posSpace2);
		var colonne = arialLabel.substring(posSpace3 + 1);
    
    if (colonne === "1")
      {
        if (elem[i].innerText.length >= 2){
          listMatieres.push(elem[i].lastChild.firstChild.firstChild.data);
          listLigne.push(ligne);
        }
      }
  }

  for(var i2 = 0; i2 < elem.length; i2++) {
		var attributes = elem[i2].offsetParent.offsetParent.attributes;
  	var arialLabel = attributes[1].textContent;
    var posSpace2 = arialLabel.indexOf(" ", 6);
    var posSpace3 = arialLabel.indexOf(" ", 12);
    var ligne = arialLabel.substring(6, posSpace2);
    var colonne = arialLabel.substring(posSpace3 + 1);
  
    if (colonne === "4") {
    	for(var i = 0; i < listLigne.length; i++) {
      	if (ligne === listLigne[i]) {
					listNotes.push(elem[i2].firstChild.innerText);
        }
    	}
  	}

    else if (colonne === "5") {
    	for(var i = 0; i < listLigne.length; i++) {
      	if (ligne === listLigne[i]) {
					listNoteClasses.push(elem[i2].innerText);
        }
    	}
  	}
  }

  for (i = 0; i < listMatieres.length; i++) {
    if (listNotes[i] !== "") {
      if (listNotes[i].replace(/\s/g, '').length) {
    	  listMatieresNotes.push([listMatieres[i], listNotes[i]]); 
      }
    }
  }

  for (i = 0; i < listMatieres.length; i++) {
    if (listNoteClasses[i] !== "") {
      if (listNoteClasses[i].replace(/\s/g, '').length) {
        listMatieresNotesClasse.push([listMatieres[i], listNoteClasses[i]]); 
      } 
    }
  }

  console.log("releve");

  console.log(listMatieresNotes);
  
  return [listMatieresNotes, listMatieresNotesClasse];
}

function getNotesENT() {
  // init
    var notes = [];
    var notesClasse = [];
    var matieres = [];  
    var matieresWithNotes = [];
    var matieresNotesClasse = [];
  
    // get all note and matiere
    var allMatieres = document.getElementsByClassName("bulletin-matiere-libelle ellipse fw-700");
    var allNotes = document.getElementsByClassName("yui-dt-liner bulletin-note bulletin-note-eleve");
    var allNotesClasse = document.getElementsByClassName("yui-dt-liner bulletin-note");

  
    // clear list of notes and matiere
    for (let matiere of allMatieres) {
      var matiere_txt = matiere.innerHTML;
      matieres.push(matiere_txt.replace(/&amp;/g, "&"));
    }

    for (let note of allNotes) {
      note_txt = note.innerHTML;
      if (note_txt.length === 4)
      {
        note_txt = note_txt + "0";
      }
      notes.push(note_txt);
    }

    for (let i = 2; i < allNotesClasse.length; i += 5) {
      note_txt = allNotesClasse[i].innerHTML;

      if (note_txt.length <= 4)
      {
        note_txt = note_txt + "0";
      }
      notesClasse.push(note_txt);
    }

    for (let i = 0; i < matieres.length; i++){
      if (notes[i] !== "")
      {
      	matieresWithNotes.push([matieres[i], notes[i]]);
      	matieresNotesClasse.push([matieres[i], notesClasse[i]]);
      }
    }

    return([matieresWithNotes, matieresNotesClasse]);
}

(function() {
  console.log("get note");
  var listMatieresNotesClasse = [];
  var titlePronote = document.getElementById("breadcrumbBandeau");
  var titleENT = document.getElementById("releve-eleve");
  if (document.body.contains(titlePronote)) {
    var page = titlePronote.innerText;

    if (page === "Détail de mes notes")
    {
      listMatieresNotesClasse = getNotesDetail();
      listMatieresNotesClasse = [listMatieresNotesClasse, []]
    }
    else if (page === "Relevé de notes")
    {
      listMatieresNotesClasse = getNotesReleve();
    }
    return listMatieresNotesClasse; 
  }
  else if (document.body.contains(titleENT))
  {
    listMatieresNotesClasse = getNotesENT();
    return listMatieresNotesClasse; 
  }
  else {
    return "nothing";
  }
})();
