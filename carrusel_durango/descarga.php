<?php
$error=false;
$ch = curl_init();
$directorio = dirname( __FILE__ );
$source = "http://api.prepdurango.org/gobernador/carrusel";
curl_setopt($ch, CURLOPT_URL, $source);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);//tiempo en segundos
$data = curl_exec($ch);
if(curl_errno($ch))
{
    echo 'Curl error: ' . curl_error($ch);
	$error=true;
}
//var_dump(curl_getinfo($ch));
curl_close($ch);

if (!$error){
	$destination = $directorio . "/json/gobernador.json";
	$file = fopen($destination, "w+");
	fputs($file, $data);
	fclose($file);
}

$error=false;
$ch = curl_init();
$source = "http://api.prepdurango.org/diputados/carrusel";
curl_setopt($ch, CURLOPT_URL, $source);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);//tiempo en segundos
$data = curl_exec($ch);
if(curl_errno($ch))
{
    echo 'Curl error: ' . curl_error($ch);
	$error=true;
}
//var_dump(curl_getinfo($ch));
curl_close($ch);

if (!$error){
	$destination = $directorio . "/json/diputados.json";
	$file = fopen($destination, "w+");
	fputs($file, $data);
	fclose($file);
}

$error=false;
$ch = curl_init();
$source = "http://api.prepdurango.org/ayuntamientos/carrusel";
curl_setopt($ch, CURLOPT_URL, $source);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);//tiempo en segundos
$data = curl_exec($ch);
if(curl_errno($ch))
{
    echo 'Curl error: ' . curl_error($ch);
	$error=true;
}
//var_dump(curl_getinfo($ch));
curl_close($ch);

if (!$error){
	$destination = $directorio . "/json/ayuntamientos.json";
	$file = fopen($destination, "w+");
	fputs($file, $data);
	fclose($file);
}

//$string = file_get_contents("elecciones.json");
//$todo = json_decode($string, true);
//$entidades=$todo['data'];


//var_dump($todo['data']);
//var_dump($todo['portada']);
//var_dump($todo['extradata']);
?>