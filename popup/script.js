var cadreNote = document.getElementById("cadreNote");
var cadreBase = document.getElementById("cardreBase");
var cadreTab = document.getElementById("cadreTab");
var cadreTabs = document.getElementById("cadreTabs");

var buttonEleve = document.getElementById("buttonEleve");
var buttonClasse = document.getElementById("buttonClasse");
var hr1 = document.getElementById("hr1");
var hr2 = document.getElementById("hr2");
var hr3 = document.getElementById("hr3");
var hr4 = document.getElementById("hr4");
var hr5 = document.getElementById("hr5");
var hr6 = document.getElementById("hr6");
var vr1 = document.getElementById("vr1");
var vr2 = document.getElementById("vr2");
var vr3 = document.getElementById("vr3");

var tabContentEleve = document.getElementById("tabContentEleve");
var tabContentClasse = document.getElementById("tabContentClasse");

var matiereNoteList = document.getElementsByClassName("matiereNoteList");

var cadreMoyenneGenerale = document.getElementById("moyenneGenerale");
var firstTime = true;

function isScrollBar() {
    elem = document.documentElement;
    var condition = elem.scrollHeight > elem.clientHeight;

    if(condition) {
      document.body.style.overflowY  = "scroll";

    }
    else {
      document.body.style.overflowY = "auto";
    }

    return condition
}

document.body.onclick = function() {
  var isScrollBarBool = isScrollBar();

  var widthBody = document.body.offsetWidth;
  var widthButtonEleve = buttonEleve.offsetWidth;
  var heightButtonEleve = buttonEleve.offsetHeight - 1;

  if(isScrollBarBool)
  {
      widthBody -= 15;
  }

  hr1.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7 + "px";
  hr1.style.top = "0px";
  hr1.style.width = widthButtonEleve + "px";

  hr2.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7 + "px";
  hr2.style.top = heightButtonEleve + "px";
  hr2.style.width = widthButtonEleve + "px";

  hr3.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7 + widthButtonEleve + "px";
  hr3.style.top = "0px";
  hr3.style.width = widthButtonEleve + "px";

  hr4.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7 + widthButtonEleve + "px";
  hr4.style.top = heightButtonEleve + "px";
  hr4.style.width = widthButtonEleve + "px";

  hr5.style.left = "0px";
  hr5.style.top = heightButtonEleve + "px";
  hr5.style.width = (widthBody - 2 * widthButtonEleve) / 2 + 7  + "px";
  
  hr6.style.left = widthBody - 12  + "px";
  hr6.style.top = heightButtonEleve + "px";
  hr6.style.width = (widthBody - 2 * widthButtonEleve) / 2 + 10 + "px";

  vr1.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7  + "px";
  vr1.style.height = heightButtonEleve + "px";

  vr2.style.left = (widthBody - 2 * widthButtonEleve) / 2 + 7 + widthButtonEleve +  "px";
  vr2.style.height = heightButtonEleve + "px";

  vr3.style.left = widthBody - 12 + "px";
  vr3.style.height = heightButtonEleve + "px";
}

buttonEleve.onclick = function() {
  buttonEleve.style.color = "#ff6c00";
  buttonClasse.style.color = "#bbb";
  hr1.style.visibility = "visible";
  hr2.style.visibility = "hidden";
  hr3.style.visibility = "hidden";
  hr4.style.visibility = "visible";

  vr1.style.visibility = "visible";
  vr3.style.visibility = "hidden";

  var elems = document.getElementsByClassName("matiereNoteEleveList")

  if (tabContentClasse.style.display === "block") {
    for (i = 0; i < elems.length; i++) {
      elems[i].animate([
        { transform: 'translateX(-100%)' },
        { transform: 'translateX(0%)' }
      ], {
        duration: 250,
      });
    }
  }

  tabContentEleve.style.display = "block";  
  tabContentClasse.style.display = "none"; 
  firstTime = true;
};

buttonClasse.onclick = function() {
  buttonEleve.style.color = "#bbb";
  buttonClasse.style.color = "#ff6c00";
  hr1.style.visibility = "hidden";
  hr2.style.visibility = "visible";
  hr3.style.visibility = "visible";
  hr4.style.visibility = "hidden";

  vr1.style.visibility = "hidden";
  vr3.style.visibility = "visible";

  var elems = document.getElementsByClassName("matiereNoteClasseList")

  if (tabContentEleve.style.display === "block") {
    for (i = 0; i < elems.length; i++) {
      elems[i].animate([
        { transform: 'translateX(100%)' },
        { transform: 'translateX(0%)' }
      ], {
        duration: 250,
      });
    }
  }

  tabContentEleve.style.display = "none"; 
  tabContentClasse.style.display = "block"; 
};

buttonEleve.click();

setTimeout(
function clickUpdate() {
  document.body.click();
}, 300);
