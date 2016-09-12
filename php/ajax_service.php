<?php
	session_start();
	header('Content-type: application/json');

	include_once('../classes/Account.class.php');
	include_once('../classes/Product.class.php');
	include_once('../classes/Transaction.class.php');
	include_once('../classes/Contact.class.php');
	
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "POST"){
		$a = $_POST['action'];
		$t = $_POST['type'];

		if($t == 'account_control'){
			if($a == 'checkSessionLoggedIn'){
				if(isset($_SESSION['users'])){
					if($_SESSION['users'][0]['USER_ID'] > 0) {
						$_SESSION['logged_in']=true;
						die(json_encode(array("success"=>true,"logged_in"=>true, "u_details"=>$_SESSION['users'])));
					}
				}
				else{
					$_SESSION['logged_in']=false;
				 	die(json_encode(array("logged_in"=>false)));
				}
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
					$_SESSION['logged_in'] = true;
					die(json_encode(array('success'=>true, 'logged_in'=>true,'u_data'=>$details)));
				}else die(json_encode(array('success'=>false)));
			}else if($a == 'updateDeliveryDetails'){

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
			}else if($a == 'searchWheel'){
				$result = Product::searchWheel($_POST['key']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}else if($a == 'searchBattery'){
				$result = Product::searchBattery($_POST['key']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}else if($a == 'searchTireByField'){
				$result = Product::searchTireByField($_POST['key'], $_POST['field']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}else if($a == 'searchWheelByField'){
				$result = Product::searchWheelByField($_POST['key'], $_POST['field']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}else if($a == 'searchBatteryByField'){
				$result = Product::searchBatteryByField($_POST['key'], $_POST['field']);
				die(json_encode(array('success'=>true, 'productDetails' => $result)));
			}
		}elseif($t == 'session'){
			if($a == 'addtocart'){
				if(!isset($_SESSION['cart_count']) || empty($_SESSION['cart_count'])) $_SESSION['cart_count'] = 0;
				$newArrData = array('type'=>$_POST['product_type'], 'prod_id'=>$_POST['product_id'], 'item_id'=>$_POST['item_id'], 'desc'=>$_POST['desc'], 'price'=>$_POST['price'], 'id'=>$_SESSION['cart_count']);
				$_SESSION['cart'][$_SESSION['cart_count']++] = $newArrData; 
	
				die(json_encode(array('success'=>true, 'current_cart'=>$_SESSION['cart'])));
			}else if($a == 'getDataInCart'){
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('cart'=>$_SESSION['cart'], 'total'=>$grandtotal)));
			}else if($a == 'removeFromCart'){
				unset($_SESSION['cart'][$_POST['index']]);
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('success'=>true, 'total'=>$grandtotal)));
			}
		}elseif($t == 'transaction'){
			if($a == 'createTransaction'){
				$transactionId = Transaction::createPurchaseTransaction($_SESSION['users'][0]['USER_ID'], $_POST['mop']);
				$mopId = $_POST['lastMopId'];
				$result_bool = true;
				foreach($_SESSION['cart'] as $purchase_item){
					$result = Transaction::addTransactionItem($_SESSION['users'][0]['USER_ID'] , $transactionId, $purchase_item['prod_id'], 1, $purchase_item['price']);
					if($result) $result_bool &= true;
					else $result_bool &= false;
				}
				unset($_SESSION['cart']);
				die(json_encode(array('success'=>$result_bool)));
			}else if($a == 'createCODDetail'){

			}elseif($a == 'createCreditDetail'){
				$detail_id = Transaction::createCreditDetail($_POST['card_no'], $_POST['card_name'], $_POST['exp_month'], $_POST['exp_year'], $_POST['card_security']);
				$_SESSION['credit_id'] = $detail_id;
				if($detail_id) die(json_encode(array('success'=>true, 'id'=>$detail_id)));
				else die(json_encode(array('success'=>false)));
			}elseif($a == 'createCheckDetail'){
				$detail_id = Transaction::createCheckDetail($_POST['bank'], $_POST['cnumber'], $_POST['amount']);
				$_SESSION['credit_id'] = $detail_id;
				if($detail_id) die(json_encode(array('success'=>true, 'id'=>$detail_id)));
				else die(json_encode(array('success'=>false)));
				
			}
		}elseif($t == 'comments'){
			if($a=='addComment'){
				Contact::addComment($_POST['name'], $_POST['email'], $_POST['msg'], $_POST['pnum']);
				die(json_encode(array('success'=>true)));
			}
		}
	}
	if($method == "GET"){
		$a = $_GET['action'];
		$t = $_GET['type'];

	}
?>