<?php 
header("Access-Control-Allow-Origin: *");
$message =  print_r($_REQUEST, true);
mail("sorabh.vasistha@gmail.com", "Tool Hit On Server", $message);
echo '[]';
 ?>