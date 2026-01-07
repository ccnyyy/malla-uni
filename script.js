// ===== DATOS VERIFICADOS SEGÚN PDF DEFINITIVO =====
const semesters = [
 {sem:'1° Semestre',courses:[
  {id:'formacion',name:'Formación Ciudadana'},
  {id:'ecosistema',name:'Ecosistema Turístico y Patrimonio'},
  {id:'destinos',name:'Destinos Turísticos y Geografía',tfl:true},
  {id:'info',name:'Información y Orientación Turística'},
  {id:'guiados',name:'Servicios Turísticos Guiados'},
  {id:'datos',name:'Resolución de Problemas en Datos e Información'}
 ]},
 {sem:'2° Semestre',courses:[
  {id:'admin',name:'Administración'},
  {id:'ingles0',name:'Inglés Inicial'},
  {id:'normativa',name:'Normativa y Prevención de Riesgos en Turismo',tfl:true},
  {id:'operaciones',name:'Coordinación de Operaciones Turísticas'},
  {id:'conta',name:'Contabilidad de la Industria Turística'},
  {id:'diseno',name:'Diseño de Programas Turísticos Globales',req:['destinos'],tfl:true}
 ]},
 {sem:'3° Semestre',courses:[
  {id:'ingles1',name:'Inglés Habilitante',req:['ingles0']},
  {id:'innov1',name:'Innovación y Emprendimiento I',tfl:true},
  {id:'ventas',name:'Taller de Ventas y Herramientas Tecnológicas'},
  {id:'costos',name:'Costos y Presupuesto',req:['conta']},
  {id:'electivo1',name:'Electivo Tendencias Sector I'},
  {id:'gestion',name:'Gestión Comercial en Turismo',req:['diseno'],tfl:true}
 ]},
 {sem:'4° Semestre',courses:[
  {id:'eng1',name:'English for Tourism I',req:['ingles1']},
  {id:'ingles2',name:'Inglés Intermedio',req:['ingles1'],tfl:true},
  {id:'dest_int',name:'Destinos Turísticos Inteligentes',tfl:true},
  {id:'exp',name:'Diseño de Experiencias Turísticas Sostenibles',tfl:true},
  {id:'electivo2',name:'Electivo Tendencias Sector II',req:['electivo1']},
  {id:'proyecto',name:'Proyecto Integrado',req:['ventas']}
 ]},
 {sem:'5° Semestre',courses:[
  {id:'rrhh',name:'Gestión de Personas'},
  {id:'estad',name:'Estadística'},
  {id:'eng2',name:'English for Tourism II',req:['eng1']},
  {id:'innov2',name:'Innovación y Emprendimiento II',tfl:true},
  {id:'patrimonio',name:'Interpretación del Patrimonio',tfl:true},
  {id:'productos',name:'Productos Turísticos Sostenibles',req:['exp'],tfl:true}
 ]},
 {sem:'6° Semestre',courses:[
  {id:'fin',name:'Finanzas',tfl:true},
  {id:'eng3',name:'English for Tourism III',req:['eng2']},
  {id:'plan',name:'Planificación de Destinos Turísticos',req:['patrimonio'],tfl:true},
  {id:'reg',name:'Regulación Turística',req:['productos'],tfl:true},
  {id:'mercados',name:'Investigación de Mercados Turísticos',tfl:true},
  {id:'eco',name:'Economía para la Gestión Turística',tfl:true}
 ]},
 {sem:'7° Semestre',courses:[
  {id:'proyectos',name:'Formulación y Gestión de Proyectos',tfl:true},
  {id:'eng4',name:'English for Tourism IV',req:['eng3']},
  {id:'electivo3',name:'Electivo Tendencias Sector III'},
  {id:'impacto',name:'Evaluación Impacto Ecosistema Turístico',req:['reg']},
  {id:'marketing',name:'Marketing Estratégico de Servicios'},
  {id:'calidad',name:'Gestión de Calidad Turística',tfl:true}
 ]},
 {sem:'8° Semestre',courses:[
  {id:'fin_dec',name:'Finanzas para la Toma de Decisiones',req:['fin'],tfl:true},
  {id:'eng5',name:'English for Tourism V',req:['eng4']},
  {id:'innov3',name:'Innovación y Emprendimiento III',tfl:true},
  {id:'electivo4',name:'Electivo Tendencias Sector IV'},
  {id:'modelos',name:'Modelos de Gestión Turística',req:['calidad']},
  {id:'titulo',name:'Proyecto de Título Profesional',req:['impacto']}
 ]}
];

let approved=new Set(JSON.parse(localStorage.getItem('approved')||'[]'));

function canUnlock(c){return !c.req||c.req.every(r=>approved.has(r));}

function render(){
 const m=document.getElementById('malla');m.innerHTML='';
 semesters.forEach(s=>{
  const box=document.createElement('div');box.className='semester';
  box.innerHTML=`<div class='semester-title'>${s.sem}</div>`;
  s.courses.forEach(c=>{
   const d=document.createElement('div');
   d.className='course pending';
   if(!c.req)d.classList.add('free');
   if(c.tfl)d.classList.add('tfl');
   if(approved.has(c.id))d.className='course approved';
   else if(!canUnlock(c))d.classList.add('locked');
   d.textContent=c.name;
   d.onclick=()=>{
    if(!canUnlock(c)&&!approved.has(c.id))return;
    approved.has(c.id)?approved.delete(c.id):approved.add(c.id);
    localStorage.setItem('approved',JSON.stringify([...approved]));
    render();
   }
   box.appendChild(d);
  });
  m.appendChild(box);
 });
}
render();
