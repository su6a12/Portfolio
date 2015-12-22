<?php

	// Remove whitespace from city input
	$city = str_replace(" ", "", $_GET["city"]);

	$contents = file_get_contents("http://www.weather-forecast.com/locations/".$city."/forecasts/latest");

	preg_match('/3 Day Weather Forecast Summary:<\/b><span class="read-more-small"><span class="read-more-content"> <span class="phrase">(.*?)</', $contents, $matches);

	echo $matches[1];

?>