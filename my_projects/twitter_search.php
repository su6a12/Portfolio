<?php

require_once('TwitterAPIExchange.php');

$settings = array(
				'oauth_access_token' => '361606849-XOglA9EQL9n6WAUZRnR9sg6Sgl2On4zJAVDw3szm',
				'oauth_access_token_secret' => 'ryFWzX5IphnF2JaAKS0ETNYdHq9DHOAjJFfsPYLrG1BJw',
				'consumer_key' => '1YDSwV2GWtMrz9QXFVBpfHJwV',
				'consumer_secret' => 'MAzY49ZDQ41NkBehtyrPHnV5qT88ci899LBzv1J14jBSyREvAj'
);

$url = 'https://api.twitter.com/1.1/search/tweets.json';

$requestMethod = "GET";

$hashtag = $_GET["hashtag"];

//$hash = str_replace("#", "%23", $hashtag);


// set up query for given hashtags and limit results to 20 tweets
$getfield = "?q=%23" . $hashtag . "&result_type=recent&count=5";


$twitter = new TwitterAPIExchange($settings);

echo $twitter
			->setGetfield($getfield)
			->buildOauth($url, $requestMethod)
			->performRequest();

?>