// ================= DATOS DE LA MALLA =================
const semesters = [
  { sem:'1° Semestre', courses:[
    {id:'formacion',name:'Formación Ciudadana'},
    {id:'ecosistema',name:'Ecosistema Turístico y Patrimonio'},
    {id:'destinos',name:'Destinos Turísticos y Geografía', related:['diseno_prog']},
    {id:'info',name:'Información y Orientación Turística'},
    {id:'guiados',name:'Servicios Turísticos Guiados'},
    {id:'datos',name:'Resolución de Problemas en Datos e Información'}
  ]},

  { sem:'2° Semestre', courses:[
    {id:'admin',name:'Administración'},
    {id:'ingles0',name:'Inglés Inicial', related:['ingles1']},
    {id:'normativa',name:'Normativa y Prevención de Riesgos en Turismo', tfl:true},
    {id:'operaciones',name:'Coordinación de Operaciones Turísticas'},
    {id:'conta',name:'Contabilidad de la Industria Turística', related:['costos']},
    {id:'diseno_prog',name:'Diseño de Programas Turísticos Globales', req:['destinos'], related:['gestion_com'], tfl:true}
  ]},

  { sem:'3° Semestre', courses:[
    {id:'ingles1',name:'Inglés Habilitante', req:['ingles0']},
    {id:'innov1',name:'Innovación y Emprendimiento 1', tfl:true},
    {id:'ventas',name:'Taller de Ventas y Herramientas Tecnológicas'},
    {id:'costos',name:'Costos y Presupuesto para el Turismo', req:['conta']},
    {id:'electivo1',name:'Electivo Tendencias Sector 1'},
    {id:'gestion_com',name:'Gestión Comercial en Turismo', req:['diseno_prog'], tfl:true}
  ]},

  { sem:'4° Semestre', courses:[
    {id:'eng1',name:'English for Tourism and Hospitality 1', req:['ingles1']},
    {id:'ingles2',name:'Inglés Intermedio', req:['ingles1'], tfl:true},
    {id:'dest_int',name:'Taller Destinos Turísticos Inteligentes', tfl:true},
    {id:'exp_sost',name:'Taller Diseño de Experiencias Turísticas Sostenibles', related:['prod_sost'], tfl:true},
    {id:'electivo2',name:'Electivo Tendencias Sector 2', req:['electivo1']},
    {id:'proy_int',name:'Proyecto Integrado', req:['ventas']}
  ]},

  { sem:'5° Semestre', courses:[
    {id:'rrhh',name:'Gestión de Personas'},
    {id:'estad',name:'Estadística'},
    {id:'eng2',name:'English for Tourism and Hospitality 2', req:['eng1']},
    {id:'innov2',name:'Innovación y Emprendimiento 2', tfl:true},
    {id:'patrimonio',name:'Interpretación del Patrimonio', related:['plan_dest'], tfl:true},
    {id:'prod_sost',name:'Taller Diseño de Productos Turísticos Sostenibles', req:['exp_sost']}
  ]},

  { sem:'6° Semestre', courses:[
    {id:'fin',name:'Finanzas', related:['fin_dec'], tfl:true},
    {id:'eng3',name:'English for Tourism and Hospitality 3', req:['eng2']},
    {id:'plan_dest',name:'Planificación de Destinos Turísticos Sostenibles', req:['patrimonio'], tfl:true},
    {id:'regulacion',name:'Regulación Turística Nacional e Internacional', req:['prod_sost'], related:['impacto'], tfl:true},
    {id:'inv_merc',name:'Investigación de Mercados Turísticos', tfl:true},
    {id:'eco_gestion',name:'Economía para la Gestión Turística', tfl:true}
  ]},

  { sem:'7° Semestre', courses:[
    {id:'proyectos',name:'Formulación y Gestión de Proyectos', tfl:true},
    {id:'eng4',name:'English for Tourism and Hospitality 4', req:['eng3']},
    {id:'electivo3',name:'Electivo Tendencias Sector 3'},
    {id:'impacto',name:'Evaluación Impacto Ecosistema Turístico', req:['regulacion']},
    {id:'marketing',name:'Marketing Estratégico de Servicios'},
    {id:'calidad',name:'Gestión de Calidad Turística Sostenible', related:['modelos']}
  ]},

  { sem:'8° Semestre', courses:[
    {id:'fin_dec',name:'Finanzas para la Toma de Decisiones', req:['fin'], tfl:true},
    {id:'eng5',name:'English for Tourism and Hospitality 5', req:['eng4']},
    {id:'innov3',name:'Innovación y Emprendimiento 3', tfl:true},
    {id:'electivo4',name:'Electivo Tendencias Sector 4'},
    {id:'modelos',name:'Modelos de Gestión de Organizaciones Turísticas', req:['calidad']},
    {id:'titulo',name:'Proyecto de Título Profesional', req:['impacto']}
  ]}
];

// ================= LÓGICA =================
let approved = new Set(JSON.parse(localStorage.getItem('approvedCourses') || '[]'));

function canUnlock(course){
  return !course.req || course.req.every(r => approved.has(r));
}

function render(){
  const malla = document.getElementById('malla');
  malla.innerHTML='';

  semesters.forEach(s => {
    const sem = document.createElement('div');
    sem.className='semester';
    sem.innerHTML = `<div class='semester-title'>${s.sem}</div>`;

    s.courses.forEach(c => {
      const div = document.createElement('div');
      div.className='course pending';

      if(!c.req) div.classList.add('free');
      if(c.tfl) div.classList.add('tfl');
      if(c.related) div.classList.add('related');

      if(approved.has(c.id)) div.className='course approved';
      else if(!canUnlock(c)) div.classList.add('locked');

      div.textContent = c.name;

      div.onclick = () => {
        if(!canUnlock(c) && !approved.has(c.id)) return;
        approved.has(c.id) ? approved.delete(c.id) : approved.add(c.id);
        localStorage.setItem('approvedCourses', JSON.stringify([...approved]));
        render();
      }

      sem.appendChild(div);
    });

    malla.appendChild(sem);
  });
}

render();
