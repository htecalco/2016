<?php
/*header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Fecha en el pasado
	$id='';
	if (!isset($_GET['e'])){
		$elec='A';
		$id=1;
		
	}else{
		$elec=$_GET['e'];
		if (isset($_GET['id'])){
			$id=$_GET['id'];
		}
	}
	

	//obtener nombre de json actual
	$actual=$elec . $id . ".json";
	//obtener json siguiente
	
	$encontrado=false;
	$simulacro=-1;	
	ini_set('auto_detect_line_endings',TRUE);
	$handle = fopen('../archivo.csv','r');
	while ( ($row = fgetcsv($handle) ) !== FALSE ) {
		if ($row[0]==$elec ){
			if ($id==''){
				$id=$row[1];
				$encontrado=true;
				$simulacro=$row[3];
			}elseif ($id==$row[1]){
				$encontrado=true;
				$simulacro=$row[3];
			}elseif ($encontrado){
				$siguiente=$row[1];
				break;
			}
		}elseif ($encontrado){
			break;
		}
	}
	ini_set('auto_detect_line_endings',FALSE);*/
	$id=1;
	//$simulacro=1;
	$elec='gobernador';	
?>

<script language="javascript">
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
	if (typeof(getUrlVars()["eleccion"])!=='undefined'){
		switch (getUrlVars()["eleccion"]){
			case 'a': 
				var eleccion='ayuntamientos';
				break;
			case 'd':
				var eleccion='diputados';
				break;
			case 'g':
				var eleccion='gobernador';
				break;
		}
		
	}else{
		var eleccion = 'gobernador';
	}
	//console.log(eleccion + ' ' + actual);
	
</script>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>PROGRAMA DE RESULTADOS ELECTORALES PRELIMINARES DEL ESTADO 2016</title>
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
            <h3>ESTADO <span class="set-year">2016</span></h3>
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
            			<div class="table">
            				<table class="table table-stripped votos-partidos">
								<thead>
									<tr>
										<th>Partido</th>
										<th>Votos por Partido</th>
									</tr>
								</thead>
								<tbody>
									<!-- Vaciado de partidos -->
								</tbody>
							</table>
							<small style="font-size: .62em;"><?php echo 'P.'.$simulacro?></small>
            			</div>
            			<div class="column-chart"></div>
            			<div class="clear"></div>
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
<?php
if ($simulacro!=-1){?>

    <script type="text/javascript" src="js/jquery.min.js"></script>
    <script type="text/javascript" src="js/highcharts.js"></script>
    <script type="text/javascript" src="js/getCharts.js"></script>
    <script type="text/javascript">
    	$(document).ready(function (){
    		app.categoria = eleccion;
    		app.id = actual;
    		//app.simulacro=<?php echo $simulacro;?>;
    		app.getData();
    	});
    </script>
<?php 
}
?>
  </body>
</html>



<script language="Javascript">
	
    	window.setTimeout(function(){
    		window.location.href = "index.php?e="+eleccion+"&id="+siguiente
    	},10000);
	
</script>