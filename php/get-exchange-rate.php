<?php
  include "get-data.php";

  $apiURL = "https://openexchangerates.org/api/latest.json?app_id=76752690bb244907baac60e8cdadce7c";
  echo getData($apiURL); // JSON data
?>