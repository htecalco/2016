var app = {
    categoria : '',
    id : 0,
    getData : function (){
        $.get('../json/'+app.categoria+'.json', app.getCharts);
    },
    getCharts : function (data){
	    $('#txtsimulacro').html('Act. ' + data['extradata']['hora_actualizacion'] + '<br>V. ' + data['extradata']['simulacro']);
        entidades=data['data'];
        
        if (entidades.length!=0){
	        entidad=entidades[app.id];
	        console.log(entidades[Number(app.id)+1]);
	        if (typeof(entidades[Number(app.id)+1])!=='undefined'){
		        siguiente=Number(app.id)+1;
		        portada = app.categoria=='gobernador' && siguiente%5 == 0 ? 1 : 0
	        }else{
		        siguiente=0;
		        portada= app.categoria=='gobernador' ? 1 : 0 ;
	        }
	        var nombreSeccion = 'ELECCI&Oacute;N DE ' + app.categoria.toUpperCase() + ': ' + entidad.nombre;
	        var totalActas = entidad.total_actas;
			var totalVotos = entidad.total_de_votos;
			var listaNominal = entidad.lista_nominal;
			
	        $('.distrito-municipio').html(nombreSeccion);
			$('span.total-actas').text(totalActas);
			$('span.total-votos').text(totalVotos);
			$('span.lista-nominal').text(listaNominal);
			
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
	
	            //if ( partido.en_grafica ){
	                
	                obj.name = partido.partido_siglas;
	                
	                
	                obj.y = Number(partido.votos);
	                obj.color = partido.color;
	
	                dataGrafica.push(obj);
	            //}
	
	            //if ( partido.en_tabla ){
	
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
	                markup += '<td class="text-center"><img src="images/partidos/'+imagen+'" width="40px" alt=""></td>';
	                markup += '<td class="ng-binding">'+partido.votos+'</td>';
	                markup += '</tr>';
	            //}
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
	            colors: ['#AD026D', '#BBB'],
	            series: [{
	                type: 'pie',
	                name: 'Participación Ciudadana',
	                data: [
	                    ['Votos '+porcentajeVotacion+'%', porcentajeVotacion],
						['Abstencionismo '+(Math.round(porcentajeAbstencionismo * 10000) / 10000)+'%', porcentajeAbstencionismo],
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
	            colors: ['#AD026D', '#BBB'],
	            series: [{
	                type: 'pie',
	                name: 'Captura de Actas',
	                data: [
	                    ['Capturadas '+porcentajeActasCapturadas+'%', porcentajeActasCapturadas],
						['Por Capturar '+(Math.round(porcentajeActasXCapturar * 10000) / 10000)+'%', porcentajeActasXCapturar],
	                ]
	            }],
	            credits: { enabled: false }
	        });
        
        }//IF SIN DATOS
    }
};

var app_portada = {
    categoria : '',
    id : 0,
    getData : function (){
	    console.log(app_portada.categoria);
        $.get('../json/'+app_portada.categoria+'.json', app_portada.getCharts);
    },
    getCharts : function (data){
        entidad=data['portada'];
        //console.log(entidades.length);
        console.log(portada);
        
		    portada= 0 ;
			siguiente=app_portada.id;
	        var nombreSeccion = 'GR&Aacute;FICAS GLOBALES DE LA '+entidad.titulo.toUpperCase();
	        var totalActas = entidad.actas_totales;
			var totalVotos = entidad.votos;
			var actasEsperadas = entidad.actas_esperadas;
			var actasCapturadas = entidad.actas_acopiadas;
			var actasPublicadas = entidad.TotalActasProcesadasGobernador;
			var actasContabilizadas = entidad.actas_correctas;
			var actasInconsistentes = entidad.ActasConInconsistencia;
			//var listaNominal = entidad.lista_nominal;
			
	        $('.distrito-municipio').html(nombreSeccion);
			//$('span.total-actas').text(totalActas);
			$('span.total-votos').text(totalVotos);
			$('span.actas-esperadas').text(actasEsperadas);
			$('span.actas-capturadas').text(actasCapturadas);
			$('span.actas-publicadas').text(actasPublicadas);
			$('span.actas-contabilizadas').text(actasContabilizadas);
			$('span.actas-inconsistentes').text(actasInconsistentes);
			//$('span.lista-nominal').text(listaNominal);
			$('#txtsimulacro').html('Act. ' + data['extradata']['hora_actualizacion'] + '<br>V. ' + data['extradata']['simulacro']);
        
        
        var porcentajeVotacion = Number(entidad.porcentaje_participacion);
        var porcentajeAbstencionismo = 100 - porcentajeVotacion;
        var porcentajeActasCapturadas = Number(entidad.PorcentajeActasCapturadasGobernador);
        var porcentajeActasXCapturar = 100 - porcentajeActasCapturadas;

        var dataGrafica = [];
        var markup = '';   
		var partidos_barras='<tr>';
        for ( var i = 0; i < entidad.candidatos.length; i++ ){
            var obj = {};
            var partido = entidad.candidatos[i];
            var imagen = '';

           
                
                obj.name = partido.nombre;
                
                
                obj.y = Number(partido.votos);
                obj.color = partido.color;

                dataGrafica.push(obj);
           
                /*if ( partido.partido_imagen === null && partido.img_coalicion === null ){
                    imagen = partido.partido_siglas + '.png';
                } else {
                    if ( partido.imagen !== null ){*/
                        imagen = partido.imagen;
                    /*} 
                    if ( partido.img_coalicion !== null ){
                        imagen = partido.img_coalicion;
                    }
                }*/

                markup += '<tr>';
                markup += '<td class="text-center"><img src="images/partidos/'+imagen+'" width="60px" alt=""></td>';
                markup += '<td class="ng-binding">'+partido.votos+'</td>';
                markup += '</tr>';
                partidos_barras += '<td align="center"><img src="images/partidos/'+imagen+'" width="100px"></td>';
            
        }
		partidos_barras +='</tr>';
        $('.votos-partidos tbody').html(markup);
		$('#imagenespartidos tbody').append(partidos_barras);
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
	            showInLegend: false,
                name: 'Candidatos',
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
            colors: ['#AD026D', '#BBB'],
            series: [{
                type: 'pie',
                name: 'Participación Ciudadana',
                data: [
                    ['Votos '+porcentajeVotacion+'%', porcentajeVotacion],
                    ['Abstencionismo '+(Math.round(porcentajeAbstencionismo * 10000) / 10000)+'%', porcentajeAbstencionismo],
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
            colors: ['#AD026D', '#BBB'],
            series: [{
                type: 'pie',
                name: 'Captura de Actas',
                data: [
                    ['Capturadas '+porcentajeActasCapturadas+'%', porcentajeActasCapturadas],
                    ['Por Capturar '+(Math.round(porcentajeActasXCapturar * 10000) / 10000)+'%', porcentajeActasXCapturar],
                ]
            }],
            credits: { enabled: false }
        });
    }
};