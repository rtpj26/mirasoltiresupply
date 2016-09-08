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

	public static function createPurchaseTransaction($user_id, $mop){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `transaction` VALUES(NULL, :user_id, 1, NOW(), :mop, 1)");
		$pdo_1->execute(array(':user_id' => $user_id, ':mop' => $mop));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return false;
		else return true;

	}

	
}
?>