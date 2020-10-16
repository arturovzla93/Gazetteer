<?php
  include "get-data.php";

  $countryName = $_GET['countryName'];

  $apiURL = "https://restcountries.eu/rest/v2/name/$countryName?fullText=true";
  echo getData($apiURL); // JSON data
?>