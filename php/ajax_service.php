<?php
	session_start();
	header('Content-type: application/json');

	include_once(dirname(__FILE__).'/../classes/Account.class.php');
	include_once(dirname(__FILE__).'/../classes/Product.class.php');
	include_once(dirname(__FILE__).'/../classes/Transaction.class.php');
	include_once(dirname(__FILE__).'/../classes/Contact.class.php');
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "POST"){
		$a = $_POST['action'];
		$t = $_POST['type'];

		if($t == 'account_control'){
			if($a == 'checkSessionLoggedIn'){
				if(isset($_SESSION['users'])){
					if($_SESSION['users'][0]['USER_ID'] > 0) {
						$_SESSION['logged_in']=true;
						$isAdmin = false;
						$isSec = false;
						if($_SESSION['users'][0]['USER_TYPE_ID'] == 1){ $isSec = true;}
						if($_SESSION['users'][0]['USER_TYPE_ID'] < 2) $isAdmin = true;
						die(json_encode(array("success"=>true,"logged_in"=>true, "u_details"=>$_SESSION['users'], "isAdmin"=>$isAdmin, "isSec"=>$isSec)));
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
					$user_id = Account::addAccount($_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['pnum'], $_POST['pass']);

					if($user_id){
						
						$addr_id = Account::addAddress($user_id, 1, $_POST['blk'], $_POST['lt'], $_POST['phase'], $_POST['street'], $_POST['subd'], $_POST['brgy'], $_POST['city'], $_POST['prov'], $_POST['zip']);
						if($addr_id)die(json_encode(array('success'=>true, 'duplicate'=>false)));
						else die(json_encode(array('success'=>false, 'address'=>false)));
					}
					else die(json_encode(array('success'=>false, 'duplicate'=>false)));
				}
			}else if($a == 'updateAccount'){
				$details = Account::findAccount($_POST['email'], $_SESSION['users'][0]['USER_PASSWORD']);
				if($details && $_POST['savedEmail'] <> $_POST['email'] ){
					$_SESSION['users'] = $details;
					die(json_encode(array('success'=>true, 'duplicate'=>true)));
				}else{

					$success = Account::updateAccount($_POST['id'], $_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['address'], $_POST['contact'], $_POST['mi'], $_POST['gender']);
					$success = Account::updateAddress($_POST['id'], $_POST['blk'], $_POST['lt'], $_POST['ph'], $_POST['st'], $_POST['subd'], $_POST['brgy'], $_POST['city'], $_POST['prov'], $_POST['zip']);

					if($success){
						$_SESSION['users'][0]['USER_FNAME'] = $_POST['fname'];
						$_SESSION['users'][0]['USER_LNAME'] = $_POST['lname'];
						$_SESSION['users'][0]['USER_EMAIL'] = $_POST['email'];
						$_SESSION['users'][0]['USER_ADDRESS'] = $_POST['address'];
						$_SESSION['users'][0]['USER_CONTACT_NO'] = $_POST['contact'];
						$_SESSION['users'][0]['USER_M_INITIAL'] = $_POST['mi'];
						$_SESSION['users'][0]['USER_GENDER'] = $_POST['gender'];

						$_SESSION['users'][0]['ADDR_BLK'] = $_POST['blk'];
						$_SESSION['users'][0]['ADDR_LT'] = $_POST['lt'];
						$_SESSION['users'][0]['ADDR_PH'] = $_POST['ph'];
						$_SESSION['users'][0]['ADDR_ST'] = $_POST['st'];
						$_SESSION['users'][0]['ADDR_SUBD'] = $_POST['subd'];
						$_SESSION['users'][0]['ADDR_BRGY'] = $_POST['brgy'];
						$_SESSION['users'][0]['ADDR_CITY'] = $_POST['city'];
						$_SESSION['users'][0]['ADDR_PROV'] = $_POST['prov'];
						$_SESSION['users'][0]['ADDR_ZIP'] = $_POST['zip'];

						die(json_encode(array('success'=>true, 'duplicate'=>false)));
					}else{

						$_SESSION['users'][0]['USER_FNAME'] = $_POST['fname'];
						$_SESSION['users'][0]['USER_LNAME'] = $_POST['lname'];
						$_SESSION['users'][0]['USER_EMAIL'] = $_POST['email'];
						$_SESSION['users'][0]['USER_ADDRESS'] = $_POST['address'];
						$_SESSION['users'][0]['USER_CONTACT_NO'] = $_POST['contact'];
						$_SESSION['users'][0]['USER_M_INITIAL'] = $_POST['mi'];
						$_SESSION['users'][0]['USER_GENDER'] = $_POST['gender'];

						$_SESSION['users'][0]['ADDR_BLK'] = $_POST['blk'];
						$_SESSION['users'][0]['ADDR_LT'] = $_POST['lt'];
						$_SESSION['users'][0]['ADDR_PH'] = $_POST['ph'];
						$_SESSION['users'][0]['ADDR_ST'] = $_POST['st'];
						$_SESSION['users'][0]['ADDR_SUBD'] = $_POST['subd'];
						$_SESSION['users'][0]['ADDR_BRGY'] = $_POST['brgy'];
						$_SESSION['users'][0]['ADDR_CITY'] = $_POST['city'];
						$_SESSION['users'][0]['ADDR_PROV'] = $_POST['prov'];
						$_SESSION['users'][0]['ADDR_ZIP'] = $_POST['zip'];
						die(json_encode(array('success'=>false, 'duplicate'=>false)));
					} 
				}

			}else if($a == 'updatePass'){
				if($_POST['pass'] == $_POST['vpass'] && $_POST['opass'] == $_SESSION['users'][0]['USER_PASSWORD']){
					$success = Account::updatePassword($_POST['id'], $_POST['pass']);
					if($success){
						$_SESSION['users'][0]['USER_PASSWORD'] = $_POST['pass'];
						die(json_encode(array('success'=>true)));
					}else die(json_encode(array('success'=>false)));
				}

			}else if($a == 'login'){
				$details = Account::findAccount($_POST['semail'], $_POST['spass']);
				if($details){
					$_SESSION['users'] = $details;
					$_SESSION['logged_in'] = true;
					if($_SESSION['users'][0]['USER_ID'] > 0) {
						$_SESSION['logged_in']=true;
						$isAdmin = false;
						if($_SESSION['users'][0]['USER_TYPE_ID'] < 2) $isAdmin = true;
					}
				}
				if($details) die(json_encode(array('success'=>true, 'logged_in'=>true,'u_data'=>$details, "isAdmin"=>$isAdmin)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'updateDeliveryDetails'){
				Account::editDeliveryDetails($_SESSION['users'][0]['USER_ID'], $_POST['name'], $_POST['address'], $_POST['contact']);
				$_SESSION['users'][0]['USER_DELIVERY_NAME'] = $_POST['name'];
				$_SESSION['users'][0]['USER_DELIVERY_DETAIL'] = $_POST['address'];
				$_SESSION['users'][0]['USER_DELIVERY_CONTACT'] = $_POST['contact'];
				die(json_encode(array('success'=>true)));
			}else if($a == 'logout'){
				header('location:http://mirasoltiresupply.com/php/logout.php'); 
			}else if($a == 'getAllAccounts'){
				$details = Account::getAllAccounts();
				die(json_encode(array('accounts'=>$details)));
			}else if($a == 'getAccountTransactions'){
				$details = Account::getAccountTransactions($_POST['id']);
				die(json_encode(array('details'=>$details, 'fname'=>$details[0]['USER_FNAME'], 'lname'=>$details[0]['USER_LNAME'], 'address'=>$details[0]['USER_ADDRESS'])));
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
			}else if($a=='getTireData'){
				$details = Product::getTireData($_POST['id']);
				die(json_encode(array('success'=>true, 'details'=>$details)));
			}else if($a =='updateTire'){
				Product::updateTire($_POST['id'],$_POST['rim'],$_POST['size'],$_POST['liss'],$_POST['brand'],$_POST['design']);
				Product::updateProduct($_POST['pid'], $_POST['qty'], $_POST['price']);
				die(json_encode(array('success'=>true)));
			}
			else if($a == 'getWheels'){
				if(isset($_POST['sortby'])){
					$result = Product::getWheels($_POST['sortby']);
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}else{
					$result = Product::getWheels("");
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}
			}
			else if($a=='getWheelData'){
				$details = Product::getWheelData($_POST['id']);
				if($details) return die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));
			}else if($a =='updateWheel'){
				Product::updateWheel($_POST['id'],$_POST['rim'],$_POST['brand'],$_POST['color'],$_POST['holes']);
				Product::updateProduct($_POST['pid'], $_POST['qty'], $_POST['price']);
				die(json_encode(array('success'=>true)));
			}
			else if($a == 'getBatteries'){
				if(isset($_POST['sortby'])){
					$result = Product::getBatteries($_POST['sortby']);
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}else{
					$result = Product::getBatteries("");
					die(json_encode(array('success'=>true, 'productDetails' => $result)));
				}
			}
			else if($a=='getBatteryData'){
				$details = Product::getBatteryData($_POST['id']);
				if($details) return die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));
			}else if($a =='updateBattery'){
				Product::updateBattery($_POST['id'],$_POST['description'],$_POST['plates']);
				Product::updateProduct($_POST['pid'], $_POST['qty'], $_POST['price']);
				die(json_encode(array('success'=>true)));
			}
			else if($a == 'searchTire'){
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
			}else if($a == 'deleteTire'){
				Product::deleteTire($_POST['product_id']);
				die(json_encode(array('success'=>true)));
			}else if($a == 'deleteWheel'){
				Product::deleteWheel($_POST['product_id']);
				die(json_encode(array('success'=>true)));
			}else if($a == 'deleteBattery'){
				Product::deleteBattery($_POST['product_id']);
				die(json_encode(array('success'=>true)));
			}else if($a == 'deleteProduct'){
				Product::deleteProduct($_POST['product_id']);
				die(json_encode(array('success'=>true)));
			}else if($a == 'addTire'){
				$prodId = Product::addProduct('1', $_POST['cost'], $_POST['stock']);
				if($prodId){
					$itemId = Product::addTire($prodId, $_POST['rim'], $_POST['size'], $_POST['liss'], $_POST['brand'], $_POST['design'], $_POST['fname']);
					if($itemId) die(json_encode(array('success'=>true)));
				}
				die(json_encode(array('success'=>false)));
			}else if($a == 'addWheel'){
				$prodId = Product::addProduct('2', $_POST['cost'], $_POST['stock']);
				if($prodId){
					$itemId = Product::addWheel($prodId, $_POST['rim'], $_POST['brand'], $_POST['color'], $_POST['holes'],$_POST['fname']);
					if($itemId) die(json_encode(array('success'=>true)));
				}
				die(json_encode(array('success'=>false)));
			}
			else if($a == 'addBattery'){
				$prodId = Product::addProduct('3', $_POST['cost'], $_POST['stock']);
				if($prodId){
					$itemId = Product::addBattery($prodId, $_POST['types'], $_POST['description'], $_POST['plates'],$_POST['fname']);
					if($itemId) die(json_encode(array('success'=>true)));
				}
				die(json_encode(array('success'=>false)));
			}
			else if($a == 'testUpload'){
				$sourcePath = $_FILES['at_file']['tmp_name'];       // Storing source path of the file in a variable
				$targetPath = "uploads/".$_FILES['at_file']['name']; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;    // Moving Uploaded file
				var_dump($sourcePath);
			    die(json_encode(array('success'=>true)));
			}else if($a == 'getDistinctTireBrand'){
				$brand = Product::getDistinctTireBrand();
				die(json_encode(array('success'=>true, 'brand'=>$brand)));
			}else if($a == 'getDistinctTireSize'){
				$size = Product::getDistinctTireSize();
				die(json_encode(array('success'=>true, 'sizes'=>$size)));
			}else if($a == 'getDistinctTireDesign'){
				$design = Product::getDistinctTireDesign();
				die(json_encode(array('success'=>true, 'design'=>$design)));
			}


			else if($a == 'getDistinctWheelBrand'){
				$brand = Product::getDistinctWheelBrand();
				die(json_encode(array('success'=>true, 'brand'=>$brand)));
			}else if($a == 'getDistinctWheelHoles'){
				$holes = Product::getDistinctWheelHoles();
				die(json_encode(array('success'=>true, 'holes'=>$holes)));
			}else if($a == 'getDistinctWheelSize'){
				$rim = Product::getDistinctWheelSize();
				die(json_encode(array('success'=>true, 'rim'=>$rim)));
			}

			else if($a == 'getDistinctBatteryBrand'){
				$brand = Product::getDistinctBatteryBrand();
				die(json_encode(array('success'=>true, 'brand'=>$brand)));
			}else if($a == 'getDistinctBatteryPlates'){
				$plate = Product::getDistinctBatteryPlate();
				die(json_encode(array('success'=>true, 'plate'=>$plate)));
			}
		}elseif($t == 'session'){
			if($a == 'addtocart'){
				if(!isset($_SESSION['cart_count']) || empty($_SESSION['cart_count'])) $_SESSION['cart_count'] = 0;
				$newArrData = array('type'=>$_POST['product_type'], 'prod_id'=>$_POST['product_id'], 'item_id'=>$_POST['item_id'], 'desc'=>$_POST['desc'], 'price'=>($_POST['price'] * $_POST['qty']),'uprice'=>$_POST['price'], 'id'=>$_SESSION['cart_count'], 'qty'=>$_POST['qty'], 'max'=>$_POST['max']);
				$_SESSION['cart'][$_SESSION['cart_count']++] = $newArrData; 	
				die(json_encode(array('success'=>true, 'current_cart'=>$_SESSION['cart'])));
			}
			elseif($a == 'addtopocart'){
				if(!isset($_SESSION['po_cart_count']) || empty($_SESSION['po_cart_count'])) $_SESSION['po_cart_count'] = 0;
				$newArrData = array('type'=>$_POST['product_type'], 'prod_id'=>$_POST['product_id'], 'item_id'=>$_POST['item_id'], 'desc'=>$_POST['desc'], 'price'=>($_POST['price'] * $_POST['qty']),'uprice'=>$_POST['price'], 'id'=>$_SESSION['po_cart_count'], 'qty'=>$_POST['qty']);
				$_SESSION['po_cart'][$_SESSION['po_cart_count']++] = $newArrData; 	
				die(json_encode(array('success'=>true, 'current_cart'=>$_SESSION['po_cart'])));
			}

			else if($a == 'countCart'){
				if(isset($_SESSION['cart_count'])){
					foreach($_SESSION['cart'] as $amount){
						$qty += $amount['qty'];
					}die(json_encode(array('success'=>false, 'qty'=>$qty)));
				}else{
					die(json_encode(array('success'=>false, 'qty'=>0)));
				}
				
			}else if($a == 'getDataInCart'){
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('cart'=>$_SESSION['cart'], 'total'=>$grandtotal)));
			}else if($a == 'getDataInPOCart'){
				$grandtotal = 0.00;
				foreach($_SESSION['po_cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('cart'=>$_SESSION['po_cart'], 'total'=>$grandtotal)));
			}else if($a == 'removeFromCart'){
				unset($_SESSION['cart'][$_POST['index']]);
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('success'=>true, 'total'=>$grandtotal)));
			}else if($a == 'removeFromPOCart'){
				unset($_SESSION['po_cart'][$_POST['index']]);
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('success'=>true, 'total'=>$grandtotal)));
			}else if($a == 'changeInvId'){
				$_SESSION['tid'] = $_POST['tid'];
				die(json_encode(array('success'=>true)));
			}else if($a == 'changeQty'){
				$_SESSION['cart'][$_POST['index']]['qty'] = $_POST['qty'];
				$_SESSION['cart'][$_POST['index']]['price'] = $_SESSION['cart'][$_POST['index']]['uprice'] * $_POST['qty'];
				$price = $_SESSION['cart'][$_POST['index']]['uprice'] * $_POST['qty'];
				$grandtotal = 0.00;
				foreach($_SESSION['cart'] as $amount){
					$grandtotal += $amount['price'];
				}
				die(json_encode(array('success'=>true, 'price'=>$price, 'total'=>$grandtotal)));
			}
		}elseif($t == 'transaction'){
			if($a == 'getUserTransactions'){
				$details = Transaction::getUserTransactions($_SESSION['users'][0]['USER_ID']);
				if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));

			}else if($a == 'getUserWishlist'){
				$details = Transaction::getUserWishlist($_SESSION['users'][0]['USER_ID']);
				if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));

			}else if($a == 'getUserWishlistDetails'){
				$details = Transaction::getWishlistTransaction($_POST['tid']);
				if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));

			}else if($a == 'getPOTransactions'){
				$details = Transaction::getPOTransactions();
				if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));

			}elseif($a == 'getYearPopulation'){
				$details = Transaction::getYearPopulation();
				if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
				else die(json_encode(array('success'=>false)));

			}else if($a == 'getMYTransaction'){
				$details = Transaction::getMYTransaction($_POST['month'], $_POST['year']);
				$monthly = 0.00;
				foreach($details as $total){
					$monthly += $total['TRANSACTION_G_TOTAL'];
				}
				if($details) die(json_encode(array('success'=>true, 'details'=>$details, 'trCount'=>count($details), 'monthly'=>$monthly)));
				else die(json_encode(array('success'=>false)));
			}
			elseif($a == 'updateTransactionStatus'){
				Transaction::updateTransactionStatus($_POST['id'], $_POST['status']);
				die(json_encode(array('success'=>true)));
			}
			elseif($a == 'updateRescueStatus'){
				Transaction::updateRescueStatus($_POST['id'], $_POST['status']);
				die(json_encode(array('success'=>true)));
			}
			elseif($a == 'createTransaction'){
				if($_POST['promoCode']) $discount = Transaction::getDiscount($_POST['promoCode']);	
				else $discount = 0.00;
				
				$grand = floatval($_POST['subtotal']) - (floatval($_POST['subtotal']) * (floatval($discount) / 100)); 
				//$grand = 0.00;
				var_dump($discount);
				$transactionId = Transaction::createPurchaseTransaction($_SESSION['users'][0]['USER_ID'], $_POST['mop'],$_SESSION['mop_id'], $_POST['subtotal'], (string)$discount, (string)$grand);
				$mopId = $_POST['lastMopId'];
				$_SESSION['tid'] = $transactionId;
				$result_bool = true;
				foreach($_SESSION['cart'] as $purchase_item){
					$result = Transaction::addTransactionItem($_SESSION['users'][0]['USER_ID'] , $transactionId, $purchase_item['prod_id'], $purchase_item['qty'], $purchase_item['price'], $purchase_item['desc']);
					Transaction::updateProductStock($purchase_item['prod_id'],$purchase_item['qty']);
				}
				unset($_SESSION['cart']);
				die(json_encode(array('success'=>true, 'tid'=>$transactionId)));
			}elseif($a == 'createPOTransaction'){
				$transactionId = Transaction::createPOTransaction($_SESSION['users'][0]['USER_ID'],$_POST['total'], $_POST['supplier']);
				$_SESSION['tid'] = $transactionId;
				$result_bool = true;
				foreach($_SESSION['po_cart'] as $purchase_item){
					$result = Transaction::addPOTransactionItem($_SESSION['users'][0]['USER_ID'] , $transactionId, $purchase_item['prod_id'], $purchase_item['qty'], $purchase_item['price'], $purchase_item['desc']);
					Transaction::updatePOProductStock($purchase_item['prod_id'],$purchase_item['qty']);
				}
				unset($_SESSION['po_cart']);
				die(json_encode(array('success'=>true, 'tid'=>$transactionId)));
			}elseif($a == 'createWishlistTransaction'){
				$transactionId = Transaction::createWishlistTransaction($_SESSION['users'][0]['USER_ID'],$_POST['total']);
				$_SESSION['tid'] = $transactionId;
				$result_bool = true;
				foreach($_SESSION['cart'] as $purchase_item){
					$result = Transaction::addPOTransactionItem($_SESSION['users'][0]['USER_ID'] , $transactionId, $purchase_item['prod_id'], $purchase_item['qty'], $purchase_item['price'], $purchase_item['desc']);
					//Transaction::updatePOProductStock($purchase_item['prod_id'],$purchase_item['qty']);
				}
				unset($_SESSION['cart']);
				die(json_encode(array('success'=>true, 'tid'=>$transactionId)));
			}

			elseif($a == 'createCreditDetail'){
				$detail_id = Transaction::createCreditDetail($_POST['card_no'], $_POST['card_name'], $_POST['exp_month'], $_POST['exp_year'], $_POST['card_security'], $_POST['provider']);
				$_SESSION['mop_id'] = $detail_id;
				if($detail_id) die(json_encode(array('success'=>true, 'id'=>$detail_id)));
				else die(json_encode(array('success'=>false)));
			}elseif($a == 'createCheckDetail'){
				$detail_id = Transaction::createCheckDetail($_POST['bank'], $_POST['cnumber'], $_POST['amount']);
				$_SESSION['mop_id'] = $detail_id;
				if($detail_id) die(json_encode(array('success'=>true, 'id'=>$detail_id)));
				else die(json_encode(array('success'=>false)));
			
			}else if($a == "createCODDetail"){
				$detail_id = Transaction::createCODDetail();
				$_SESSION['mop_id'] = $detail_id;
				if($detail_id) die(json_encode(array('success'=>true, 'id'=>$detail_id)));
				else die(json_encode(array('success'=>false)));
			
			}
			else if($a == "getInvoice"){
				$grandTotal = 0.00;
				$details = Transaction::getTransactionDetails($_SESSION['tid']);
				
				$MOPDetails = Transaction::getMOPDetail($details[0]['TRANSCTION_MOP'], $details[0]['TRANSACTION_MOP_ID']);
				foreach($details As $det){
					$grandTotal += $det['TD_TOTAL'];
				}
				die(json_encode(array('details'=>$details, 'mopDetails'=>$MOPDetails, 'grandtotal'=>$grandTotal)));
			}
			else if($a == 'updateInvoice'){
				Transaction::updateInvoice($_POST['id'], $_POST['careof'], $_POST['by']);
				die(json_encode(array('success'=>true)));
			}else if($a=='updateDiscount'){
				$discount = Transaction::getDiscount($_POST['discount']);	
				var_dump($_POST['subtotal']);
				$newTotal = $_POST['subtotal']-($_POST['subtotal'] * ($discount[0]['DISCOUNT_VALUE']/100));		
				var_dump($newTotal);	
				Transaction::updateDiscount($discountValue, $_SESSION['tid'], $newTotal);
				die(json_encode(array('success'=>true)));
			}else if($a == 'checkDiscount'){
				$discount = Transaction::getDiscount($_POST['discount']);	
				if($discount) die(json_encode(array('success'=>true)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'getAllDiscounts'){
				$discount = Transaction::getAllDiscounts();	
				if($discount) die(json_encode(array('success'=>true, 'discount'=>$discount)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'addPromoCode'){
				$discount = Transaction::addPromoCode($_POST['pCode'], $_POST['dVal'], $_POST['start'], $_POST['end']);	
				if($discount) die(json_encode(array('success'=>true)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'updatePromoCode'){
				$discount = Transaction::updatePromoCode($_POST['pCode'], $_POST['dVal'], $_POST['start'], $_POST['end'], $_POST['id']);	
				if($discount) die(json_encode(array('success'=>true)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'deleteDiscount'){
				$discount = Transaction::deletePromoCode($_POST['id']);	
				if($discount) die(json_encode(array('success'=>true)));
				else die(json_encode(array('success'=>false)));
			}else if($a == 'getMonthlyGraphData'){
				$gData = Transaction::getGraphMonthly($_POST['month']);
				if($gData) die(json_encode(array('success'=>true, 'gData'=>$gData['MONTHLY'])));
				else die(json_encode(array('success' => false )));
			}else if($a == 'getYearlyGraphData'){
				$gData = Transaction::getGraphYearly($_POST['year']);
				if($gData) die(json_encode(array('success'=>true, 'gData'=>$gData['YEARLY'])));
				else die(json_encode(array('success' => false )));
			}
		}elseif($t == 'rescue'){
			if($a == 'getRescue'){
				$rescue_details = Transaction::getRescue();
				die(json_encode(array('rescue'=>$rescue_details)));
			}else if($a == 'checkRescue'){
				$rescue_details = Transaction::isRescueStatus1();
				die(json_encode(array('status'=>$rescue_details)));
			}
			else if($a == 'updateRescue'){
				Transaction::updateRescue();
				die(json_encode(array('status'=>true)));
			}
		}elseif($t == 'comments'){
			if($a=='addComment'){
				Contact::addComment($_POST['name'], $_POST['email'], $_POST['msg'], $_POST['pnum']);
				die(json_encode(array('success'=>true)));
			}else if($a=='getComments'){
				$result = Contact::getComments($_POST['keyword']);
				die(json_encode(array('comments'=>$result)));
			}else if($a=='getCommentsLike'){
				$result = Contact::getCommentsLike($_POST['keyword']);
				die(json_encode(array('comments'=>$result)));
			}else if($a=='getCommentsId'){
				$result = Contact::getCommentsId($_POST['keyword']);
				die(json_encode(array('comments'=>$result)));
			}
			else if($a=='updateCommentsStatus'){
				$result = Contact::updateCommentsStatus();
				die(json_encode(array('success'=>true)));
			}else if($a == 'countUnread'){
				$unread = Contact::countUnread();
				die(json_encode(array('unread'=>$unread)));
			}else if($a == 'deleteComment'){
				Contact::deleteComment($_POST['id']);
				die(json_encode(array('success'=>true)));
			}
		}
	}
	if($method == "GET"){
		$a = $_GET['action'];
		$t = $_GET['type'];
		if($t=="transaction"){
			
		}
	}
?>