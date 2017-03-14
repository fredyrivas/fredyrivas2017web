<?php


$log_directory = $_REQUEST['imagepath'];

$jsonopen = '{"directory": [   ';
$jsonend = ']}';
$jsoncontent = '';


foreach(glob($log_directory.'/*.*') as $file) {

    $jsoncontent .= '{"imagepath": "'.$file.'"},';
    $jsontext = substr_replace($jsoncontent, '', -1);

}


echo $jsonopen . $jsontext . $jsonend;


?>