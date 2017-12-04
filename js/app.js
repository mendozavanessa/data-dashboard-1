
/** *******************************************************/
window.addEventListener('load', function() {
  var view = document.getElementById('overview'),
    students = document.getElementById('students'),
    paginaview = document.getElementById('paginaView'),
    paginaStudents = document.getElementById('paginaStudents'),
    total = document.getElementById('total'),
    porcentaje = document.getElementById('porcentaje'),
    meta = document.getElementById('meta'),
    prctmeta = document.getElementById('prctmeta'),
    boxTeacher = document.getElementById('box-teacher'),
    boxJedi = document.getElementById('box-jedi'),
    filtro = document.getElementById('filtro'),
    nps = document.getElementById('nps'),
    npsPorciento = document.getElementById('nps-porciento'),
    boxExpectativa = document.getElementById('box-expectativa'),
    pointTech = document.getElementById('tech'),
    pointHse = document.getElementById('hse'),
    totalTechSprint = document.getElementById('totalTechSprint'),
    prctTechSprint = document.getElementById('prctTechSprint'),
    totalHseSprint = document.getElementById('totalHseSprint'),
    prctHseSprint = document.getElementById('prctHseSprint');
  filtro.addEventListener('change', function(event) {
    switch (event.target.value) {
    case '0': sedePromo('LIM', '2016-2');
      break;
    case '1':sedePromo('LIM', '2017-1');
      break;
    case '2':sedePromo('LIM', '2017-2');
      break;
    case '3':sedePromo('AQP', '2016-2');
      break;
    case '4':sedePromo('AQP', '2017-1');
      break;
    case '5':sedePromo('SCL', '2016-2');
      break;
    case '6':sedePromo('SCL', '2017-1');
      break;
    case '7':sedePromo('SCL', '2017-2');
      break;
    case '8':sedePromo('CDMX', '2017-1');
      break;
    case '9':sedePromo('CDMX', '2017-2');
      break;
    }
    // funcion que llamara cada caso que pertenezca la opcion clikeada como parametros pasamos la sede y la promocion datos que estan en la data.js
    function sedePromo(sede, promo) {
      sprintFunction(sede, promo);
      // respondiendo primera pregunta. Hallando la cantidad de alumnas y el porcentaje recorriendo un array se puede contar cuantas alumnas hay
      var arr = data[sede][promo]['students'];
      var current = 0;
      var nocant = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].active === true) {
          current++;
        } else {
          nocant++;
        }
      }
      var deserted = parseInt((nocant / arr.length) * 100);
      total.textContent = current;
      porcentaje.textContent = deserted + '%';
      drawTotalStudents(current, deserted);
      /* ***************************************************Cantida de alumnas que superan el objetivo*****************************************************/
      var sumaScore = 0;
      for (var i = 0; i < arr.length; i++) {
        var sumaHse = 0;
        var sumaTech = 0;
        for (var j = 0; j < data[sede][promo]['students'][i]['sprints'].length; j++) {
          var tech = data[sede][promo]['students'][i]['sprints'][j]['score']['tech'];
          var hse = data[sede][promo]['students'][i]['sprints'][j]['score']['hse'];
          sumaHse = sumaHse + hse;
          sumaTech = sumaTech + tech;
        }
        if (sumaHse > 3360 && sumaTech > 5040) {
          sumaScore++;
        }
      }
      meta.innerHTML = sumaScore;
      var prctsumaScore = ((sumaScore / arr.length) * 100).toFixed(2);
      prctmeta.textContent = prctsumaScore + '%';

      /* ***************************************************************cantida de nps*********************************************************************/
      var totalNpsSprint = 0;
      var sprintArray = [0, 0, 0, 0];
      var arrayNPS = [];
      var sprintRaitings = data[sede][promo].ratings.length;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var raitingspNpsromoters = data[sede][promo].ratings[i].nps.promoters;
        var raitingspNpsDetractors = data[sede][promo].ratings[i].nps.detractors;
        var NpsSprint = raitingspNpsromoters - raitingspNpsDetractors;
        arrayNPS[i] = NpsSprint;
        totalNpsSprint += NpsSprint;
      }
      var prctTotalNpsSprint = (totalNpsSprint / sprintRaitings).toFixed(2);
      nps.textContent = prctTotalNpsSprint + '%';
      // para los porcentajes promoters - pasive y detractors
      // Promoters
      var totalPromoters = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var raitingspNpsromoters = data[sede][promo].ratings[i].nps.promoters;
        totalPromoters += raitingspNpsromoters;
      }
      var npsTotalPromoters = (totalPromoters / sprintRaitings).toFixed(2);
      // Pasive
      var totalPasive = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var raitingspNpsromoters = data[sede][promo].ratings[i].nps.passive;
        totalPasive += raitingspNpsromoters;
      }
      npsTotalPasive = (totalPasive / sprintRaitings).toFixed(2);
      // Detractors
      var totalDetractors = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var raitingspNpsromoters = data[sede][promo].ratings[i].nps.detractors;
        totalDetractors += raitingspNpsromoters;
      }
      var npsTotalDetractors = (totalDetractors / sprintRaitings).toFixed(2);

      npsPorciento.innerHTML = npsTotalPromoters + '% Promoters' + '<br>' + npsTotalPasive + '% Passive' + '<br>' + npsTotalDetractors + '% Detractors';
      for (var i = 0; i < data[sede][promo].ratings.length; i++) {
        sprintArray[i] = arrayNPS[i];
      }
      drawNetPromoter(sprintArray[0], sprintArray[1], sprintArray[2], sprintArray[3]);
      /* *********************************************calculando los puntos obtenidos en tech********************************************************************/

      /* ********************************************************calculando los puntos en hse*******************************************************************/

      /* **************************************porcentaje de la expectativa de las alumnas respecto a laboratoria**************************************************/
      var pctjStudentsSat = 0;
      var arrayMeet = [];
      sprintArray = [0, 0, 0, 0];
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var studentsCumple = data[sede][promo].ratings[i].student.cumple;
        var studentsSupera = data[sede][promo].ratings[i].student.supera;
        var studentSat = studentsCumple + studentsSupera;
        pctjStudentsSat += studentSat;
        arrayMeet[i] = data[sede][promo].ratings[i].student.cumple;
      }
      var totalSatisfation = (pctjStudentsSat / sprintRaitings).toFixed(2);
      boxExpectativa.textContent = totalSatisfation + '%';
      for (var i = 0; i < data[sede][promo].ratings.length; i++) {
        sprintArray[i] = arrayMeet[i];
      }
      drawStudentSatisfation(sprintArray[0], sprintArray[1], sprintArray[2], sprintArray[3]);
      /* *********************************************promedio de los profesores********************************************************************/
      var ptPromTeacher = 0;
      sprintArray = [0, 0, 0, 0];
      var arrayteacherRating = [];
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var ptTeacher = data[sede][promo].ratings[i].teacher;
        ptPromTeacher += ptTeacher;
        arrayteacherRating[i] = data[sede][promo].ratings[i].teacher;
      }
      var scoreTeacher = (ptPromTeacher / sprintRaitings).toFixed(2);
      boxTeacher.textContent = scoreTeacher;

      for (var i = 0; i < data[sede][promo].ratings.length; i++) {
        sprintArray[i] = arrayteacherRating[i];
      }
      drawTeacherRating(sprintArray[0], sprintArray[1], sprintArray[2], sprintArray[3]);

      /* *************************************************promedio jedi*****************************************************************/
      var ptPromJedis = 0;
      sprintArray = [0, 0, 0, 0];
      var arrayJedi = [];
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var ptJedis = data[sede][promo].ratings[i].jedi;
        ptPromJedis += ptJedis;
        arrayJedi[i] = data[sede][promo].ratings[i].jedi;
      }
      var ptJedistotal = (ptPromJedis / sprintRaitings).toFixed(2);
      boxJedi.textContent = ptJedistotal;

      for (var i = 0; i < data[sede][promo].ratings.length; i++) {
        sprintArray[i] = arrayJedi[i];
      }

      drawJediRatings(sprintArray[0], sprintArray[1], sprintArray[2], sprintArray[3]);
    }
  });
  function sprintFunction(sede, promo) {
    sprintFiltroTech.addEventListener('change', function(event) {
      var nsprint = parseInt(event.target.value) + 1;
      var arraySprintTech = [0, 0, 0, 0];

      for (var i = 0; i < data[sede][promo].students.length ; i++) {
        var totalStudents = data[sede][promo].students.length;
        for (var j = 0; j < data[sede][promo].students[i].sprints.length ; j++) {
          var stuScoreTech = data[sede][promo].students[i].sprints[j].score.tech;
          var sprintNumber = data[sede][promo].students[i].sprints[j].number;
          if (sprintNumber === nsprint && stuScoreTech >= 1260) {
            arraySprintTech[nsprint - 1] = arraySprintTech[nsprint - 1] + 1;
          }
        }
      }
      var porcentajeTech = (((arraySprintTech[nsprint - 1]) / data[sede][promo].students.length) * 100);
      totalTechSprint.textContent = arraySprintTech[nsprint - 1];
      prctTechSprint.textContent = (((arraySprintTech[nsprint - 1]) / data[sede][promo].students.length) * 100).toFixed(2) + '%';

      drawSkillTech(porcentajeTech, (100 - porcentajeTech));
    });
    sprintFiltroHse.addEventListener('change', function(event) {
      var nsprint = parseInt(event.target.value) + 1;
      var arraySprintHse = [0, 0, 0, 0];
      for (var i = 0; i < data[sede][promo].students.length ; i++) {
        var totalStudents = data[sede][promo].students.length;
        for (var j = 0; j < data[sede][promo].students[i].sprints.length ; j++) {
          var stuScoreHse = data[sede][promo].students[i].sprints[j].score.hse;
          var sprintNumber = data[sede][promo].students[i].sprints[j].number;
          if (sprintNumber === nsprint && stuScoreHse >= 840) {
            arraySprintHse[nsprint - 1] = arraySprintHse[nsprint - 1] + 1;
          }
        }
      }
      var porcentajeHSE = (((arraySprintHse[nsprint - 1]) / data[sede][promo].students.length) * 100);
      totalHseSprint.textContent = arraySprintHse[nsprint - 1];
      prctHseSprint.textContent = (((arraySprintHse[nsprint - 1]) / data[sede][promo].students.length) * 100).toFixed(2) + '%';
      drawSkillHSE(porcentajeHSE, (100 - porcentajeHSE));
    });
  }
  /* evento click para la navegacion facetada de students para que muestre cuando se haga click y se borre la vista de overview*/
  students.addEventListener('click', function() {
    paginaView.classList.remove('enabled');
    paginaView.classList.add('disabled');
    paginaStudents.classList.remove('disabled');
    paginaStudents.classList.add('enabled');
  });
  /* evento click para la navegacion facetada overview para que se muestre******************************************/
  view.addEventListener('click', function() {
    paginaView.classList.remove('disabled');
    paginaView.classList.add('enabled');
    paginaStudents.classList.remove('enabled');
    paginaStudents.classList.add('disabled');
  });
});

/* ******GRAFICOS */
function drawTotalStudents(current, deserted) {
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var dataTest = new google.visualization.DataTable();
    dataTest.addColumn('string', 'Topping');
    dataTest.addColumn('number', 'Slices');
    dataTest.addRows([
      ['Inscritas', current],
      ['Desertaron', deserted],
    ]);
    var options = {
      'colors': ['#109618', '#dc3912'],
      'width': 300,
      'height': 150 };
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_enrollment'));
    chart.draw(dataTest, options);
  }
}
function drawNetPromoter(s1, s2, s3, s4) {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Sprint', 'Porcentaje', { role: 'style' } ],
      ['S1', s1, 'gold'],
      ['S2', s2, '#ea7430'],
      ['S3', s3, '#1b9e77'],
      ['S4', s4, '#4285f4']
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' },
      2]);

    var options = {
      width: 300,
      height: 200,
      bar: {groupWidth: '85%'},
      legend: { position: 'none' },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div_nps'));
    chart.draw(view, options);
  }
}
function drawSkillTech(current, deserted) {
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var dataTest = new google.visualization.DataTable();
    dataTest.addColumn('string', 'Topping');
    dataTest.addColumn('number', 'Slices');
    dataTest.addRows([
      ['Aprobaron', current],
      ['Desaprobaron', deserted],
    ]);
    var options = {
      'colors': ['#9B2534', '#379C63'],
      'width': 320,
      'height': 150 };
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_techs'));
    chart.draw(dataTest, options);
  }
}

function drawSkillHSE(current, deserted) {
  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var dataTest = new google.visualization.DataTable();
    dataTest.addColumn('string', 'Topping');
    dataTest.addColumn('number', 'Slices');
    dataTest.addRows([
      ['Aprobaron', current],
      ['Desaprobaron', deserted],
    ]);
    var options = {
      'colors': ['#9B2534', '#379C63'],
      'width': 320,
      'height': 150 };
    var chart = new google.visualization.PieChart(document.getElementById('chart_div_hse'));
    chart.draw(dataTest, options);
  }
}
function drawStudentSatisfation(s1, s2, s3, s4) {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Sprint', 'Porcentaje', { role: 'style' } ],
      ['S1', s1, 'gold'],
      ['S2', s2, '#ea7430'],
      ['S3', s3, '#1b9e77'],
      ['S4', s4, '#4285f4']
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' },
      2]);

    var options = {
      width: 300,
      height: 200,
      bar: {groupWidth: '85%'},
      legend: { position: 'none' },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_student_satisfation'));
    chart.draw(view, options);
  }
}
function drawTeacherRating(s1, s2, s3, s4) {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Sprint', 'Porcentaje', { role: 'style' } ],
      ['S1', s1, 'gold'],
      ['S2', s2, '#ea7430'],
      ['S3', s3, '#1b9e77'],
      ['S4', s4, '#4285f4']
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' },
      2]);

    var options = {
      width: 300,
      height: 200,
      bar: {groupWidth: '85%'},
      legend: { position: 'none' },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_teacher_rating'));
    chart.draw(view, options);
  }
}
function drawJediRatings(s1, s2, s3, s4) {
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Sprint', 'Porcentaje', { role: 'style' } ],
      ['S1', s1, 'gold'],
      ['S2', s2, '#ea7430'],
      ['S3', s3, '#1b9e77'],
      ['S4', s4, '#4285f4']
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' },
      2]);

    var options = {
      width: 300,
      height: 200,
      bar: {groupWidth: '85%'},
      legend: { position: 'none' },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_jedi_rating'));
    chart.draw(view, options);
  }
}
