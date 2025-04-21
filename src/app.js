import "./assets/style.css";

let trans = {};
let lang = "no";

async function init() {
  let res = await fetch("/src/assets/trans.json");
  let data = await res.json();
  trans = data;

  applyTranslations();

  await miro.board.ui.on("drop", async ({ x, y, target }) => {
    let type = Array.from(target.classList).filter(
      (className) => className !== "activity" && className !== "miro-draggable"
    )[0];
    if(type !== "formative" && type !== "summative"){
      await addCard(x, y, target.innerHTML, type);
    } else {
      await addAssessmentStar(x,y, type[0].toUpperCase());
    }
  });
}

init();

function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(element =>{
    const key = element.getAttribute("data-i18n");
    element.innerText = trans[lang][key];
  });
}

const cardStyles = {
  acq: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#81E7DE", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#81E7DE", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
  dis: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#86B4F9", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#86B4F9", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
  col: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#FFB575", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#FFB575", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
  pra: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#DEDAFF", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#DEDAFF", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
  pro: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#ADF0C7", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#ADF0C7", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
  inv: {
    color: "#1a1a1a", // Default text color: '#1a1a1a' (black)
    fillColor: "#FFC6C6", // Default shape fill color: transparent (no fill)
    fontFamily: "open_sans", // Default font type for the text
    fontSize: 14, // Default font size for the text, in dp
    textAlign: "center", // Default horizontal alignment for the text
    textAlignVertical: "middle", // Default vertical alignment for the text
    borderStyle: "normal", // Default border line style
    borderOpacity: 1.0, // Default border color opacity: no opacity
    borderColor: "#FFC6C6", // Default border color: '#ffffff` (white)
    borderWidth: 2, // Default border width
    fillOpacity: 1.0, // Default fill color opacity: no opacity
  },
};

async function addCard(x, y, content, type) {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = content;
  const head = tmpDiv.querySelector("strong").textContent;
  const body = tmpDiv.querySelector("p").textContent;

  await miro.board.createShape({
    content: `<strong>${head}</strong><br><br><p>${body}</p>`,
    shape: "rectangle",
    style: cardStyles[type],
    x,
    y,
    width: 244,
    height: 250,
  });
}

async function addAssessmentStar(x, y, type){
  await miro.board.createShape({
    content: `<strong>${type}</strong>`,
    shape: "star",
    style: {
      color: '#1a1a1a', // Default text color: '#1a1a1a' (black)
      fillColor: type === "F" ? '#c0c0c0' : '#EFBF04', // Default shape fill color: transparent (no fill)
      fontFamily: 'open_sans', // Default font type for the text
      fontSize: 18, // Default font size for the text, in dp
      textAlign: 'center', // Default horizontal alignment for the text
      textAlignVertical: 'middle', // Default vertical alignment for the text
      borderStyle: 'normal', // Default border line style
      borderOpacity: 1.0, // Default border color opacity: no opacity
      borderColor: '#ffffff', // Default border color: '#ffffff` (white)
      borderWidth: 2, // Default border width
      fillOpacity: 1.0, // Default fill color opacity: no opacity
    },
    x,
    y,
    width: 50,
    height: 50
  });
}

const langBtn = document.getElementById("switchLang");
langBtn.addEventListener("click", ()=>{
    lang = lang === "no" ? "en" : "no";
    applyTranslations();
});
