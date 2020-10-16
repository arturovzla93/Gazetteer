<?php
  include "get-data.php";

  $lat = $_GET['lat'];
  $lon = $_GET['lon'];

  $apiURL = "api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=26e93c5ec4abe76207f910820d11c766";
  echo getData($apiURL); // JSON data
?>