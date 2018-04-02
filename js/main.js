var count = 0;
var horact;
var fechact;
var du = {};
du.fecha = '';
du.hora = '';
du.pass = '';
(function(){
	var actualizarHora = function(){
		var fecha = new Date(),
			h = fecha.getHours(),
			min = fecha.getMinutes(),
			seg = fecha.getSeconds(),
			dia = fecha.getDay(),
			d = fecha.getDate(),
            mes = fecha.getMonth(),
            ampm,
            y = fecha.getFullYear();
            
		var ph = document.getElementById('horas'),
			pAMPM = document.getElementById('ampm'),
			pmin = document.getElementById('minutos'),
			pseg = document.getElementById('segundos'),
			pDiaSemana = document.getElementById('diaSemana'),
			pd = document.getElementById('dia'),
			pmes = document.getElementById('mes'),
			py = document.getElementById('year');

		var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        pDiaSemana.textContent = semana[dia];
        
        pd.textContent = d;
        
		var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		pmes.textContent = meses[mes];
		py.textContent = y;

		if (h >= 12) {
			h = h - 12;
			ampm = 'PM';
		} else {
			ampm = 'AM';
        }
        
		if (h == 0 ){
			h = 12;
        }
        
		 if (h < 10){h = '0' + h;}
		ph.textContent = h;
		pAMPM.textContent = ampm;

		if (min < 10){ min = "0" + min; }
		if (seg < 10){ seg = "0" + seg; }

		pmin.textContent = min;
        pseg.textContent = seg;
        // console.log(d + " " + meses[mes] + ", " + y);
        // console.log(h + ":" + min + ampm);
        horact = h + ":" + min + ampm;
        fechact = d + " " + meses[mes] + ", " + y;
        if(du.fecha == fechact && du.hora == horact && seg == "00"){
            detenerAlarma();
        }
	};

	actualizarHora();
    var intervalo = setInterval(actualizarHora, 1000);
}())
$(document).ready(function(){
    $('.datepicker').pickadate({
        selectMonths: false,
        closeOnSelect: false
      });
      $('.timepicker').pickatime({
        default: 'now',
        fromnow: 0,
        twelvehour: true,
        donetext: 'OK',
        cleartext: 'Limpiar',
        canceltext: 'Cancelar',
        autoclose: false,
        ampmclickable: true,
        vibrate: true
      });
});
function nuevaAlarma(){
    fecha = document.getElementById('af').value = '';
    hora = document.getElementById('ah').value = '';
    pass = document.getElementById('pass').value = '';
}
function guardarAlarma(){
    fecha = document.getElementById('af').value;
    hora = document.getElementById('ah').value;
    pass = document.getElementById('pass').value;
    du.fecha = fecha;
    du.hora = hora;
    du.pass = pass;
    // console.log(fecha);
    // console.log(hora);
    if(fecha != '' && hora != '' && pass != ''){
        alarmas = document.getElementById('alarmas');
        count++;
        if(count != 1){
            swal(
                'Lo siento',
                'Sólo se le permite una alarma',
                'error'
            );
        }else{
        tr = document.createElement('tr');
        tmp = document.getElementById('alarmas').value;
        tmp = tmp.replace('{Count}', count);
        tmp = tmp.replace('{Fecha}', fecha);
        tmp = tmp.replace('{Hora}', hora);
        tmp = tmp.replace('{Pass}', pass);
        tr.innerHTML = tmp;
        document.getElementById('tbalarmas').appendChild(tr);
        swal(
            'Felicidades',
            'Alarma agregada correctamente',
            'success'
          );
        nuevaAlarma();
        }
    }else{
        swal(
            'Cuidado',
            'No puede dejar campos vacios',
            'warning'
          );
    }
}
async function detenerAlarma(){
    const {value: password} = await swal({
        imageUrl:'img/swal.jpeg',
        title: 'Ingresa tu Contraseña',
        input: 'password',
        inputPlaceholder: 'Contraseña',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === du.pass) {
              resolve()
            } else {
              resolve('Escribe la contraseña correcta')
            }
          })
        }
      })
      
      if (password) {
        swal(
            'Excelente',
            'Alarma desactivada correctamente',
            'success'
        );
      }
}