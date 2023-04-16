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

    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)

    return(matieresWithNotes);
}

function getNotesReleve() {
  var elem = document.getElementsByClassName("liste_contenu_ligne");
  var listMatieresNotes = [];
  var listMatieresNotesClasse = [];

	var cadreMatiere = document.getElementsByClassName("Titre liste_gridTitre_cel")[0];

  var offsetWidthMatiere = cadreMatiere.offsetWidth - 5;

  for(var i = 0; i < elem.length; i++) {    
    if (elem[i].offsetWidth == offsetWidthMatiere)
    {
      var arialLabel = elem[i].innerText;
      var posLine = arialLabel.indexOf("\n");
      if(posLine != -1)
        matiere = arialLabel.substring(0, posLine);
      
      note = elem[i + 1].innerText;
      if(note.length >= 4)
        {
          listMatieresNotes.push([matiere, note])
        }

      note = elem[i + 2].innerText;
      if(note.length >= 4)
        {
          listMatieresNotesClasse.push([matiere, note])
        }
    }
  }
  
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
