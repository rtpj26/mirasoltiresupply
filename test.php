<?php
	$x = 9;
	echo gettype($x) . "<br>";
	$y = "9";
	echo gettype($y) . "<br>";
	echo $x == $y . "<br>";
	echo $x === 9 ? "1" : "0";
?>