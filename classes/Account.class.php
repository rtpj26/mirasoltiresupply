<?php

include_once "../php/db_connect.php";

Account::start($db_obj);

class Account{
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

	public static function addAccount($fname, $lname, $email, $phone, $pass){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `users` VALUES(NULL, :fname, :lname, '', :email, :pass, '', '', :phone, '2', '', '')");
		$pdo_1->execute(array(':fname'=>$fname, ':lname'=>$lname, ':email'=>$email, ':pass'=>$pass, ':phone'=>$phone));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return false;
		else return true;
	}

	public static function findAccount($email, $pass){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `users` WHERE USER_EMAIL=:email AND USER_PASSWORD=:pass");
		$pdo_1->execute(array(':email'=>$email, ':pass'=>$pass));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}

	public static function editDeliveryDetails($userid, $deliveryName, $deliveryAddress){
		$pdo_1 = self::$pdo->prepare('UPDATE users SET USER_DELIVERY_NAME = :deliveryName, USER_DELIVERY_DETAIL = :deliveryAddress WHERE USER_ID= :userid');
		$pdo_1->execute(array(':deliveryName'=>$deliveryName, ':deliveryAddress'=>$deliveryAddress, ':userid'=>$userid));
		
	}

	public static function getAllAccounts(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `users` WHERE USER_TYPE_ID = 2");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}
}
?>