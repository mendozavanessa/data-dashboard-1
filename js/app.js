var region, promotion;
var lima2 = document.getElementById('lima');
var lim172 = document.getElementById('lim172');
var lim171 = document.getElementById('lim171');
var lim162 = document.getElementById('lim162');
var satisfationBox = document.getElementById('satisfation-box');


var divRegion = document.getElementById('divRegion');
var lima = document.getElementById('lim');
var arequipa = document.getElementById('aqp');
var chile = document.getElementById('scl');
var mexico = document.getElementById('cdmx');
var previous = divRegion;
var ulRegion = document.getElementById('ul-region');
var ulAqp = document.getElementById('ul-aqp');
var ulScl = document.getElementById('ul-scl');
var ulCdmx = document.getElementById('ul-cdmx');
var ulLim = document.getElementById('ul-lim');

window.addEventListener('load', function() {
  divRegion.addEventListener('click', showAllRegions);
  lima.addEventListener('click', optionsLima);
  arequipa.addEventListener('click', optionsArequipa);
  chile.addEventListener('click', optionsChile);
  mexico.addEventListener('click', optionsMexico);
  function showAllRegions() {
    // ulRegion.classList.toggle('hidden');
    ulRegion.classList.toggle('hidden');
    ulLim.classList.toggle('hidden');
    paintOptions(lim172, previous);
    // paintOptions(divRegion, previous);
    ulAqp.classList.toggle('hidden');
    ulScl.classList.toggle('hidden');
    ulCdmx.classList.toggle('hidden');
  };
  function paintOptions(option, previous) {
    option.classList.add('yellow');
    if (option !== previous)
      previous.classList.remove('yellow');
  }
  function optionsLima() {
    paintOptions(lima, previous);
    previous = lima;
    ulLim.classList.toggle('hidden');
  }
  function optionsArequipa() {
    paintOptions(arequipa, previous);
    previous = arequipa;
    ulAqp.classList.toggle('hidden');
  }
  function optionsChile() {
    paintOptions(chile, previous);
    previous = chile;
    ulScl.classList.toggle('hidden');
  }
  function optionsMexico() {
    paintOptions(mexico, previous);
    previous = mexico;
    ulCdmx.classList.toggle('hidden');
  }
  /* ***********************************/
  region = lima.dataset.region;
  promotion = lim172.dataset.promotion;
  // Funciones para eventos de cada region y promocion
  showMain(region, promotion);
  // Funciones para cada elemento,
  lima2.addEventListener('click', funcionLima);
  lim172.addEventListener('click', funcionLim172);
  lim171.addEventListener('click', funcionLim171);
  lim162.addEventListener('click', funcionLim162);
});
function showMain(region, promotion) {
  studentsSatisfation(region, promotion);
}
function funcionLima() {
  region = lima2.dataset.region;
  promotion = lim172.dataset.promotion;
}
function funcionLim172() {
  promotion = lim172.dataset.promotion;
  console.log(promotion);
  studentsSatisfation(region, promotion);
}
function funcionLim171() {
  promotion = lim171.dataset.promotion;
  studentsSatisfation(region, promotion);
}
function funcionLim162() {
  promotion = lim162.dataset.promotion;
  studentsSatisfation(region, promotion);
}
/* Función para el porcentaje de estudiantes satisfechas con la experiencia de Laboratoria.*/
function studentsSatisfation(region, promotion) {
  var ratings = data[region][promotion]['ratings'];
  var arrayMeet = [];
  var total = 0;
  var sprintArray = [0, 0, 0, 0];
  for (var i = 0; i < ratings.length; i++) {
    arrayMeet[i] = ratings[i]['student']['cumple'];
  }
  for (var i = 0; i < arrayMeet.length; i++) {
    total = total + arrayMeet[i];
  }
  total = parseInt(total / arrayMeet.length);
  satisfationBox.textContent = total;
  for (var i = 0; i < ratings.length; i++) {
    sprintArray[i] = arrayMeet[i];
  }
  drawStudentSatisfation(sprintArray[0], sprintArray[1], sprintArray[2], sprintArray[3]);
}
/* ****GRAFICOS */
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
