<?php
	session_start();
	header('Content-type: application/json');

	include_once('../classes/Account.class.php');
	include_once('../classes/Product.class.php');

	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "POST"){
		$a = $_POST['action'];
		$t = $_POST['type'];

		if($t == 'account_control'){
			if($a == 'checkSessionLoggedIn'){
				if(isset($_SESSION['users'])){
					if($_SESSION['users'][0]['USER_ID'] > 0) die(json_encode(array("success"=>true,"logged_in"=>true, "u_details"=>$_SESSION['users'])));
				}
				//else if($_SESSION['users'][0]['USER_ID'] <= 0) die(json_encode(array("success"=>true,"logged_in"=>false)));
				else die(json_encode(array("logged_in"=>false)));
				//else die(json_encode(array("success"=>false)));
			}else if($a == 'signup'){
				$details = Account::findAccount($_POST['email'], $_POST['pass']);
				if($details){
					$_SESSION['users'] = $details;
					die(json_encode(array('success'=>true, 'duplicate'=>true)));
				}else{
					$success = Account::addAccount($_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['pnum'], $_POST['pass']);
					if($success)die(json_encode(array('success'=>true, 'duplicate'=>false)));
					else die(json_encode(array('success'=>false, 'duplicate'=>false)));
				}
			}else if($a == 'login'){
				$details = Account::findAccount($_POST['semail'], $_POST['spass']);
				if($details){
					$_SESSION['users'] = $details;
					die(json_encode(array('success'=>true, 'u_data'=>$details)));
				}else die(json_encode(array('success'=>false)));
			}
		}elseif($t == 'product'){
			if($a == 'getTires'){
				if(isset($_POST['sortby'])){
					$result = Product::getTires($_POST['sortby']);
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}else{
					$result = Product::getTires("");
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}
			}else if($a == 'getWheels'){
				if(isset($_POST['sortby'])){
					$result = Product::getWheels($_POST['sortby']);
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}else{
					$result = Product::getWheels("");
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}
			}
			else if($a == 'getBatteries'){
				if(isset($_POST['sortby'])){
					$result = Product::getBatteries($_POST['sortby']);
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}else{
					$result = Product::getBatteries("");
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}
			}else if($a == 'searchTire'){
				$result = Product::searchTire($_POST['key']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}else if($a == 'searchTireByField'){
				$result = Product::searchTireByField($_POST['key'], $_POST['field']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}
		}elseif($t == 'session'){
			if($a == 'addtocart'){
				$_SESSION['cart'][0][0] = $_POST['product_type'];
				$_SESSION['cart'][0][1] = $_POST['product_id'];
				die(json_encode(array('success'=>true)));
			}
		}
	}
	if($method == "GET"){
		$a = $_GET['action'];
		$t = $_GET['type'];

	}
?>