/* ======================= script.js ======================= */
const estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};


function render() {
const malla = document.getElementById("malla");
malla.innerHTML = "";


data.forEach(s => {
const cont = document.createElement("div");
cont.className = "semestre";


const h2 = document.createElement("h2");
h2.textContent = s.semestre;
cont.appendChild(h2);


s.ramos.forEach(r => {
const div = document.createElement("div");
div.className = "ramo";


const aprobado = estado[r.id];
const bloqueado = r.prereq && r.prereq.some(p => !estado[p]);


if (aprobado) div.classList.add("aprobado");
else if (bloqueado) div.classList.add("bloqueado");
else div.classList.add("base");


div.textContent = r.nombre;


if (r.certificable) {
const badge = document.createElement("span");
badge.className = "badge";
badge.textContent = "TFL";
div.appendChild(badge);
}


div.onclick = () => {
if (bloqueado) return;
estado[r.id] = !estado[r.id];
localStorage.setItem("estadoRamos", JSON.stringify(estado));
render();
};


cont.appendChild(div);
});


malla.appendChild(cont);
});
}


render();
