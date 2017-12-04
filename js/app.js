
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
    pointHse = document.getElementById('hse');
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
      // respondiendo primera pregunta. Hallando la cantidad de alumnas y el porcentaje recorriendo un array se puede contar cuantas alumnas hay
      var arr = data[sede][promo]['students'];
      var cant = 0;
      var nocant = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].active === true) {
          cant++;
        } else {
          nocant++;
        }
      }
      var calculandoPorcentaje = parseInt((nocant / arr.length) * 100);
      total.textContent = cant;
      porcentaje.textContent = calculandoPorcentaje + '%';
      /* ***************************************************Cantida de alumnas que superan el objetivo*****************************************************/
      var sumaScore = 0;
      for (var i = 0; i < arr.length; i++) {
        debugger;
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
      var sprintRaitings = data[sede][promo].ratings.length;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var raitingspNpsromoters = data[sede][promo].ratings[i].nps.promoters;
        var raitingspNpsDetractors = data[sede][promo].ratings[i].nps.detractors;
        var NpsSprint = raitingspNpsromoters - raitingspNpsDetractors;
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
      /* *********************************************calculando los puntos obtenidos en tech********************************************************************/
      
      /* ********************************************************calculando los puntos en hse*******************************************************************/
      
      /* **************************************porcentaje de la expectativa de las alumnas respecto a laboratoria**************************************************/
      var pctjStudentsSat = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var studentsCumple = data[sede][promo].ratings[i].student.cumple;
        var studentsSupera = data[sede][promo].ratings[i].student.supera;
        var studentSat = studentsCumple + studentsSupera;
        pctjStudentsSat += studentSat;
      }
      var totalSatisfation = (pctjStudentsSat / sprintRaitings).toFixed(2);
      boxExpectativa.textContent = totalSatisfation + '%';
      /* *********************************************promedio de los profesores********************************************************************/
      var ptPromTeacher = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var ptTeacher = data[sede][promo].ratings[i].teacher;
        ptPromTeacher += ptTeacher;
      }
      var scoreTeacher = (ptPromTeacher / sprintRaitings).toFixed(2);
      boxTeacher.textContent = scoreTeacher;
      /* *************************************************promedio jedi*****************************************************************/
      var ptPromJedis = 0;
      for (var i = 0; i < data[sede][promo].ratings.length ; i++) {
        var ptJedis = data[sede][promo].ratings[i].jedi;
        ptPromJedis += ptJedis;
      }
      var ptJedistotal = (ptPromJedis / sprintRaitings).toFixed(2);
      boxJedi.textContent = ptJedistotal;
    }
  });
});