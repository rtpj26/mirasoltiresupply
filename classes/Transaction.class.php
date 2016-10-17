<?php

include_once "../php/db_connect.php";

Transaction::start($db_obj);

class Transaction{
	public static $pdo;
	public static $db_obj;
		
	public static function Start($db_obj) {
		self::$db_obj = $db_obj; //similar to this.db_obj = db_obj
		if (isset($db_obj)) { 
			if ($db_obj->isConnected()) {
				self::$pdo = $db_obj->get_db_connect();
			}
		}
	}

	public static function createPurchaseTransaction($user_id, $mop, $mop_id, $sub, $disc, $grand){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction` VALUES(NULL, :user_id, 1, NOW(), :mop, 1, :mop_id, :sub, :disc, :grand, '', '', '')");
		$pdo_1->execute(array(':user_id' => $user_id, ':mop' => $mop, ':mop_id'=>$mop_id, ':sub'=>$sub, ':disc'=>$disc, ':grand'=>$grand));
		$lastId = self::$pdo->lastInsertId();
		if($lastId) return $lastId;
		else return false;
	}

	public static function createPOTransaction($user_id, $sub, $supplier){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction` VALUES(NULL, :user_id, 999, NOW(), '', 1, '', :sub, '', :sub, '', '', :supplier)");
		$pdo_1->execute(array(':user_id' => $user_id, ':sub'=>$sub, ':supplier'=>$supplier));
		$lastId = self::$pdo->lastInsertId();
		if($lastId) return $lastId;
		else return false;
	}


	public static function createWishlistTransaction($user_id, $sub){
		$sql = "INSERT INTO `transaction` VALUES(NULL, " . $user_id . ", 555, NOW(), '', 1, '', '" . $sub ."', '', '" . $sub ."', '', '', '')";
		
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$lastId = self::$pdo->lastInsertId();
		if($lastId) return $lastId;
		else return false;
	}

	public static function createRescue($name, $loc, $contact, $req){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `rescue`(RESCUE_NAME, RESCUE_DATE, RESCUE_LOCATION, RESCUE_CONTACT, RESCUE_REQUISITION, RESCUE_STATUS) VALUES(:name, NOW(), :loc, :contact, :req, 1)");
		$pdo_1->execute(array(':name'=>$name, ':loc'=>$loc, ':contact'=>$contact, ':req'=>$req));
		$lastId = self::$pdo->lastInsertId();
		if($lastId) return $lastId;
		else return false;
	}

	public static function getRescue(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `rescue`");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function addTransactionItem($user_id, $transaction_id, $purchase, $qty, $total, $tdetail){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction_detail` VALUES(NULL, :transaction_id, :purchase, :qty, :total, :tdetail)");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id, 'purchase'=>$purchase, ':qty'=>$qty, ':total'=>$total, 'tdetail'=>$tdetail));
	}


	public static function addPOTransactionItem($user_id, $transaction_id, $purchase, $qty, $total, $tdetail){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction_detail` VALUES(NULL, :transaction_id, :purchase, :qty, :total, :tdetail)");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id, 'purchase'=>$purchase, ':qty'=>$qty, ':total'=>$total, 'tdetail'=>$tdetail));
	}


	public static function updateProductStock($product_id, $qty){
		$pdo_1 = self::$pdo->prepare("UPDATE `product` SET PRODUCT_STOCK = PRODUCT_STOCK-:qty WHERE PRODUCT_ID = :product_id");
		$pdo_1->execute(array(':product_id'=>$product_id, ':qty'=>$qty));
	
	}

	public static function updatePOProductStock($product_id, $qty){
		$pdo_1 = self::$pdo->prepare("UPDATE `product` SET PRODUCT_STOCK = PRODUCT_STOCK+:qty WHERE PRODUCT_ID = :product_id");
		$pdo_1->execute(array(':product_id'=>$product_id, ':qty'=>$qty));
	
	}

	public static function createCreditDetail($cardno, $name, $expiry_month, $expiry_year, $securityCode, $provider){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `credit_card`(CC_DATE_RECEIVED, CC_CARD_NO, CC_NAME_IN_CARD, CC_EXPIRATION_MONTH, CC_EXPIRATION_YEAR, CC_SECURITY_CODE, CC_PROVIDER) VALUES(NOW(), :card_no, :name, :exp_month, :exp_year, :security, :provider)");
		$pdo_1->execute(array(':card_no'=>$cardno, ':name'=>$name, ':exp_month'=>$expiry_month, ':exp_year'=>$expiry_year, ':security'=>$securityCode, ':provider'=>$provider));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function createCheckDetail($bank, $cnumber, $amount){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `cheque`(CHEQUE_BANK, CHEQUE_NUMBER, CHEQUE_DATE_RECEIVED, CHEQUE_AMOUNT) VALUES(:bank, :cnumber, NOW(), :amount)");
		$pdo_1->execute(array(':bank'=>$bank, ':cnumber'=>$cnumber, ':amount'=>$amount));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function createCODDetail(){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `cod`(COD_DATE_RECEIVED, COD_DATE_ISSUED) VALUES(NOW(), NOW())");
		$pdo_1->execute(array(':bank'=>$bank, ':cnumber'=>$cnumber, ':amount'=>$amount));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}
	
	public static function getTransactionDetails($transaction_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction A INNER JOIN transaction_detail B ON A.TRANSACTION_ID = B.TRANSACTION_ID  INNER JOIN product C ON B.PRODUCT_ID = C.PRODUCT_ID WHERE A.TRANSACTION_ID=:transaction_id");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}	

	public static function getWishlistDetails($transaction_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction A INNER JOIN transaction_detail B ON A.TRANSACTION_ID = B.TRANSACTION_ID  INNER JOIN product C ON B.PRODUCT_ID = C.PRODUCT_ID WHERE A.TRANSACTION_ID=:transaction_id");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}	

	public static function getUserTransactions($user_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction WHERE USER_ID = :userId AND TRANSACTION_TYPE != 555 OR TRANSACTION_TYPE != 999");
		$pdo_1->execute(array(':userId'=>$user_id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getUserWishlist($user_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction WHERE USER_ID = :userId and TRANSACTION_TYPE = 555");
		$pdo_1->execute(array(':userId'=>$user_id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	public static function getPOTransactions(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction WHERE TRANSACTION_TYPE = 999");
		$pdo_1->execute(array());
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function updateTransactionStatus($id, $status){
		$pdo_1 = self::$pdo->prepare("UPDATE `transaction` SET TRANSACTION_STATUS=:status WHERE TRANSACTION_ID = :id");
		$pdo_1->execute(array(':status'=>$status, ':id'=>$id));
		return;
	}

	public static function updateRescueStatus($id, $status){
		$pdo_1 = self::$pdo->prepare("UPDATE `rescue` SET RESCUE_A_STATUS=:status WHERE RESCUE_CSR_NO = :id");
		$pdo_1->execute(array(':status'=>$status, ':id'=>$id));
		return;
	}

	public static function getDiscount($code){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM discount WHERE DISCOUNT_PROMO_CODE = '" . $code . "' AND NOW() BETWEEN DATE_SUB(DISCOUNT_START, INTERVAL 1 DAY) AND DATE_ADD(DISCOUNT_END, INTERVAL 1 DAY)");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result[0]['DISCOUNT_VALUE'];
	}

	public static function getDiscountOnDay($code){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM discount WHERE DISCOUNT_PROMO_CODE = :code  AND NOW() BETWEEN DISCOUNT_START AND DISCOUNT_END");
		$pdo_1->execute(array(':code'=>$code));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result[0]['DISCOUNT_VALUE'];
	}

	public static function updateDiscount($discount, $tid, $val){
		$pdo_1 = self::$pdo->prepare("UPDATE `transaction` SET TRANSACTION_G_TOTAL = :val, TRANSACTION_DISCOUNT = :discount WHERE TRANSACTION_ID = :id");
		$pdo_1->execute(array(':discount'=>$discount, ':id'=>$tid, ':val'=>$val));
		return;
	}

	public static function getMOPDetail($mopType, $mopId){
		$sql="";

		if($mopType == "1"){
			$sql = "SELECT * FROM `transaction` A INNER JOIN `credit_card` B on A.TRANSACTION_MOP_ID = B.CC_ID WHERE B.CC_ID = :mopId";
		}else if($mopType == "2"){
			$sql = "SELECT * FROM `transaction` A INNER JOIN `cod` B on A.TRANSACTION_MOP_ID = B.COD_ID WHERE B.COD_ID = :mopId";
		}else if($mopType == "3"){
			$sql = "SELECT * FROM `transaction` A INNER JOIN `cheque` B on A.TRANSACTION_MOP_ID = B.CHEQUE_ID WHERE B.CHEQUE_ID = :mopId";
		}
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute(array(':mopId'=>$mopId));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getMYTransaction($month, $year){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM  `transaction` A INNER JOIN  `users` B ON A.USER_ID = B.USER_ID WHERE MONTH( TEANSACTION_DATE ) = :month AND YEAR( TEANSACTION_DATE ) =:year");
		$pdo_1->execute(array(':month'=>$month, 'year'=>$year));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getWishlistTransaction($tid){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM  `transaction` A INNER JOIN  `transaction_detail` B ON A.TRANSACTION_ID = B.TRANSACTION_ID  INNER JOIN `product` C ON B.PRODUCT_ID = C.PRODUCT_ID WHERE A.TRANSACTION_ID = :tid AND A.TRANSACTION_TYPE=555");
		$pdo_1->execute(array(':tid'=>$tid));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getYearPopulation(){
		$pdo_1 = self::$pdo->prepare("SELECT DISTINCT YEAR( TEANSACTION_DATE ) AS YR FROM `transaction`");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function updateInvoice($id, $careof, $by){
		$pdo_1 = self::$pdo->prepare("UPDATE `transaction` SET TRANSACTION_CAREOF = :careof, TRANSACTION_BY = :by WHERE TRANSACTION_ID=:id");
		$pdo_1->execute(array(':id'=>$id, ':careof'=>$careof, 'by'=>$by));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getAllDiscounts(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `discount`");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}
	public static function addPromoCode($pCode, $dVal, $start, $end){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `discount` VALUES(NULL, :pCode, :dVal, :start, :end)");
		$result = $pdo_1->execute(array(':pCode'=>$pCode, ':dVal'=>$dVal, ':start'=>$start, ':end'=>$end));
		return $result;
	}

	public static function updatePromoCode($pCode, $dVal, $start, $end, $id){
		$pdo_1 = self::$pdo->prepare("UPDATE `discount` SET DISCOUNT_PROMO_CODE = :pCode, DISCOUNT_VALUE = :dVal, DISCOUNT_START = :start, DISCOUNT_END = :end WHERE DISCOUNT_ID = :id");
		$pdo_1->execute(array(':id'=>$id, ':pCode'=>$pCode, 'dVal'=>$dVal, ':start'=>$start, ':end'=>$end));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}	

	public static function deletePromoCode($id){
		$pdo_1 = self::$pdo->prepare("DELETE FROM `discount` WHERE DISCOUNT_ID = :id");
		$pdo_1->execute(array(':id'=>$id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}	

	public static function isRescueStatus1(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `rescue` WHERE RESCUE_STATUS = 1");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if(count($result) > 0 ){ 
		return true;
		}return false;
	}

	public static function updateRescue(){
		$pdo_1 = self::$pdo->prepare("UPDATE `rescue` SET RESCUE_STATUS = 0");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getGraphMonthly($month){
		$pdo_1 = self::$pdo->prepare("SELECT SUM( TRANSACTION_G_TOTAL ) AS MONTHLY FROM  `transaction` WHERE MONTH( TEANSACTION_DATE ) = :month");
		$pdo_1->execute(array(':month'=>$month));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result[0];
	}

	public static function getGraphyearly($year){
		$pdo_1 = self::$pdo->prepare("SELECT SUM( TRANSACTION_G_TOTAL ) AS YEARLY FROM  `transaction` WHERE YEAR( TEANSACTION_DATE ) = :year");
		$pdo_1->execute(array(':year'=>$year));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result[0];
	}
}
?>