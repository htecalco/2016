var app = {
    categoria : '',
    id : 0,
    simulacro: '',
    getData : function (){
        //$.get('../jsons/'+app.simulacro+'/'+app.categoria+app.id+'.json', app.getCharts);
        $.get('../json/'+app.categoria+'.json', app.getCharts);
    },
    evalCandidato : function (siglas, candidatos){
        var nombre = '';

        switch (siglas){
            case 'PAN':
                nombre = 'Mauricio Vila';
                break;
            case 'SUM PRI+PV+PNA+CC1':
                nombre = 'Nerio Torres';
                break;
            case 'SUM PRD+PT+CC2':
                nombre = 'Carlos Carvajal';
                break;
            case 'MC':
                nombre = 'Ana Rosa Payán';
                break;
            case 'MOR':
                nombre = 'Gilda María Ake';
                break;
            case 'CNR':
                nombre = 'Candidato No Registrado';
                break;
            default:
                nombre = siglas;
        }

        return nombre;
    },
    getCharts : function (data){
        entidades=data['data'];
        //console.log(entidades.length);
        if (entidades.length!=0){
	        entidad=entidades[app.id];
	        console.log(entidades[Number(app.id)+1]);
	        if (typeof(entidades[Number(app.id)+1])!=='undefined'){
		        siguiente=Number(app.id)+1;
	        }else{
		        siguiente=0;
	        }
	        var nombreSeccion = entidad.nombre;
	        var totalActas = entidad.total_actas;
			var totalVotos = entidad.total_de_votos;
			var listaNominal = entidad.lista_nominal;
			
	        $('.distrito-municipio').html(nombreSeccion);
			$('span.total-actas').text(totalActas);
			$('span.total-votos').text(totalVotos);
			$('span.lista-nominal').text(listaNominal);
        }
        
        var porcentajeVotacion = Number(entidad.participacion);
        var porcentajeAbstencionismo = 100 - porcentajeVotacion;
        var porcentajeActasCapturadas = Number(entidad.porcentaje_actas_procesadas);
        var porcentajeActasXCapturar = 100 - porcentajeActasCapturadas;

        var dataGrafica = [];
        var markup = '';

    

        for ( var i = 0; i < entidad.votos_por_partido.length; i++ ){
            var obj = {};
            var partido = entidad.votos_por_partido[i];
            var imagen = '';

            if ( partido.en_grafica ){
                /*if ( app.categoria === 'A' && app.id === 50 ){
                    obj.name = app.evalCandidato(partido.partido_siglas, entidad.infopartidos);
                } else {*/
                    obj.name = partido.partido_siglas;
                //}
                
                obj.y = Number(partido.votos);
                obj.color = partido.color;

                dataGrafica.push(obj);
            }

            if ( partido.en_tabla ){

                /*if ( partido.partido_imagen === null && partido.img_coalicion === null ){
                    imagen = partido.partido_siglas + '.png';
                } else {
                    if ( partido.imagen !== null ){*/
                        imagen = partido.partido_imagen;
                    /*} 
                    if ( partido.img_coalicion !== null ){
                        imagen = partido.img_coalicion;
                    }
                }*/

                markup += '<tr>';
                markup += '<td class="text-center"><img src="images/partidos/'+imagen+'" width="30" height="30" alt=""></td>';
                markup += '<td class="ng-binding">'+partido.votos+'</td>';
                markup += '</tr>';
            }
        }

        $('.votos-partidos tbody').html(markup);

        $('.column-chart').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                min: 0,
                floor: 0,
                title: {
                    text: 'Votos'
                }
            },
            plotOptions: {
                series: {
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Partidos Políticos',
                colorByPoint: true,
                data: dataGrafica
            }],
            credits: { enabled: false }
        });

        $('.pie-chart-1').highcharts({
            chart: {
                plotBackgroundColor: '#fff',
                plotBorderWidth: null,
                plotShadow: false
            },
            plotOptions: {
                 pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            title: {
                text: 'Participación Ciudadana'
            },
            colors: ['#F8831C', '#BBB'],
            series: [{
                type: 'pie',
                name: 'Participación Ciudadana',
                data: [
                    ['Votos', porcentajeVotacion],
                    ['Abstencionismo', porcentajeAbstencionismo],
                ]
            }],
            credits: { enabled: false }
        });

        $('.pie-chart-2').highcharts({
            chart: {
                plotBackgroundColor: '#fff',
                plotBorderWidth: null,
                plotShadow: false
            },
            plotOptions: {
                 pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            title: {
                text: 'Captura de Actas'
            },
            colors: ['#F8831C', '#BBB'],
            series: [{
                type: 'pie',
                name: 'Captura de Actas',
                data: [
                    ['Capturadas', porcentajeActasCapturadas],
                    ['Por Capturar', porcentajeActasXCapturar],
                ]
            }],
            credits: { enabled: false }
        });
    }
};