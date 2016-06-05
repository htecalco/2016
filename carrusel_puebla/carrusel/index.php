<script language="javascript">
	siguiente=0;
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
		});
		return vars;
	}
	
	if (typeof(getUrlVars()["id"])!=='undefined'){
		var actual=getUrlVars()["id"];
	}else{
		var actual = 0;
	}
	if (typeof(getUrlVars()["e"])!=='undefined'){
		eleccion=getUrlVars()["e"];
		
	}else{
		var eleccion = 'gobernador';
	}
	if (typeof(getUrlVars()["p"])!=='undefined'){
		portada=getUrlVars()["p"];
		
	}else{
		var portada = 0;
	}
	
</script>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PROGRAMA DE RESULTADOS ELECTORALES PRELIMINARES DE PUEBLA 2016</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <link rel="stylesheet" type="text/css" href="css/reset.css" />
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
    
 
  </head>
  <body>
    <header>
        <div class="logo-instituto"></div>
        <div class="datos-elecciones">
            <h3>PUEBLA <span class="set-year">2016</span></h3>
            <h4>PROGRAMA DE RESULTADOS ELECTORALES PRELIMINARES</h4>
        </div>
        <div class="logo-proisi"><img src="images/logo_proisi.png" alt="" /></div>
    </header>

    <section>
      <!-- CONTENIDO -->
        <div class="container">
            <div class="header distrito-municipio"></div>
            <div class="charts">
            	<div class="section-1">
            		<div class="totales">
            			<ul>
            				<li>Total de Actas: <span class="purple total-actas">0</span></li>
            				<li><!-- Total de Votos: <span class="purple total-votos">0</span> --></li>
            				<li>Lista Nominal: <span class="purple lista-nominal">0</span></li>
            			</ul>
            		</div>
            		<div class="subsection-1">
            			<!--<div class="table">

            				<table class="table table-stripped votos-partidos">
								<thead>
									<tr>
										<th>Partido</th>
										<th>Votos por Partido</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>

							
            			</div>-->
            			<div class="column-chart"></div>
<!--             			<div class="clear"></div> -->
            		</div>
            	</div>
            	<div class="section-2">
            		<div class="pie-chart-1"></div>
            		<div class="pie-chart-2"></div>
            	</div>
            	<div class="clear"></div>
            </div>
        </div>
        <!-- FIN DE CONTENIDO -->
    </section>
    <small id="txtsimulacro" style="font-size: .62em;"></small>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/highcharts.js"></script>
    <script type="text/javascript" src="js/getCharts.js"></script>
    <script type="text/javascript">
    	$(document).ready(function (){
	    	$.ajaxSetup({ cache: false });
	    	if (portada==1){
		    	app_portada.categoria = eleccion;
				app_portada.id = actual;
				app_portada.getData();
	    	}else{
    			app.categoria = eleccion;
				app.id = actual;
				app.getData();
			}
    	});
    </script>
  </body>
</html>

<script language="Javascript">	
    	window.setTimeout(function(){
	    	if (portada==1){
		    	window.location.href = "gobernador.php?e="+eleccion+"&id="+siguiente+'&p='+portada
	    	}else{
    			window.location.href = "index.php?e="+eleccion+"&id="+siguiente+'&p='+portada
    		}
    	},10000);	
</script>
