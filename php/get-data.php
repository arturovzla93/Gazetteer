<?php
  function getData($url) {
    // create & initialize a curl session
    $curl = curl_init();

    // set our URL with curl_setopt()
    curl_setopt($curl, CURLOPT_URL, $url);

    // return the transfer as a string, also with setopt()
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // curl_exec() excutes the started curl session
    $output = curl_exec($curl);

    // close curl resources to free up system resources
    curl_close($curl);

    return $output; // in JSON format
  }
?>