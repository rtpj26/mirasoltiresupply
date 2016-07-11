<?php
	session_start();
	header('Content-type: application/json');

	$method = $_SERVER['REQUEST_METHOD'];

	if($method == "POST"){
		$a = $_POST['action'];
		$t = $_POST['type'];

		if($t == 'account_control'){
			if($a == 'checkSessionLoggedIn'){
				if($_SESSION['user']['id'] > 0) die(json_encode(array("success"=>true,"logged_in"=>true)));
				else if($_SESSION['user']['id'] > 0) die(json_encode(array("success"=>true,"logged_in"=>false)));
				else die(json_encode(array("success"=>false)));
			}
		}
	}
	if($method == "GET"){
		$a = $_GET['action'];
		$t = $_GET['type'];

		if($t == 'account_control'){
			if($a == 'logout'){
				$_SESSION['user']['id']=0;
				header('location: /mirasoltiresupply/');
			}
		}
	}
?>