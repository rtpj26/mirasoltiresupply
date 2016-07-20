<?php
	session_start();
	header('Content-type: application/json');

	include_once('../classes/Account.class.php');
	//if(!defined($_SESSION[user][id])){$_SESSION['user']['id'] = 0;}
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
		}else if($a == 'signup'){
			$success = Account::addAccount($_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['pnum'], $_POST['pass']);
			if($success){
				$_SESSION['user']['id'] = $success['USER_ID'];
				die(json_encode(array('success'=>true, 'duplicate'=>false)));
			}
			else die(json_encode(array('success'=>false, 'duplicate'=>false)));
		}
	}
	if($method == "GET"){
		$a = $_GET['action'];
		$t = $_GET['type'];

		if($t == 'account_control'){
			if($a == 'logout'){
				session_unset();
				session_destroy();
				header('location: /mirasoltiresupply/');
			}
		}
	}
?>