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

	public static function createPurchaseTransaction($user_id, $mop, $mop_id){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction` VALUES(NULL, :user_id, 1, NOW(), :mop, 1, :mop_id)");
		$pdo_1->execute(array(':user_id' => $user_id, ':mop' => $mop, ':mop_id'=>$mop_id));
		$lastId = self::$pdo->lastInsertId();
		if($lastId) return $lastId;
		else return false;
	}

	public static function addTransactionItem($user_id, $transaction_id, $purchase, $qty, $total, $tdetail){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction_detail` VALUES(NULL, :transaction_id, :purchase, :qty, :total, :tdetail)");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id, 'purchase'=>$purchase, ':qty'=>$qty, ':total'=>$total, 'tdetail'=>$tdetail));
	}

	public static function createCreditDetail($cardno, $name, $expiry_month, $expiry_year, $securityCode){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `credit_card`(CC_DATE_RECEIVED, CC_CARD_NO, CC_NAME_IN_CARD, CC_EXPIRATION_MONTH, CC_EXPIRATION_YEAR, CC_SECURITY_CODE) VALUES(NOW(), :card_no, :name, :exp_month, :exp_year, :security)");
		$pdo_1->execute(array(':card_no'=>$cardno, ':name'=>$name, ':exp_month'=>$expiry_month, ':exp_year'=>$expiry_year, ':security'=>$securityCode));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function createCheckDetail($bank, $cnumber, $amount){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `cheque`(CHEQUE_BANK, CHEQUE_NUMBER, CHEQUE_DATE_RECEIVED, CHEQUE_AMOUNT) VALUES(:bank, :cnumber, NOW(), :amount)");
		$pdo_1->execute(array(':bank'=>$bank, ':cnumber'=>$cnumber, ':amount'=>$amount));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}
	
	public static function getTransactionDetails($transaction_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM transaction A INNER JOIN transaction_detail B ON A.TRANSACTION_ID = B.TRANSACTION_ID WHERE A.TRANSACTION_ID=:transaction_id");
		$pdo_1->execute(array(':transaction_id'=>$transaction_id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}	
}
?>