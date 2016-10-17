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
		$pdo_1 = self::$pdo->prepare("INSERT INTO `users` VALUES(NULL, :fname, :lname, '', :email, :pass, '', '', :phone, '2', '', '', '')");
		$result = $pdo_1->execute(array(':fname'=>$fname, ':lname'=>$lname, ':email'=>$email, ':pass'=>$pass, ':phone'=>$phone));
		$lastId = self::$pdo->lastInsertId();
		if($result) return $lastId;
		else return true;
	}

	public static function addAddress($user_id, $type, $blk, $lt, $ph, $st, $subd, $brgy, $city, $prov, $zip){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `address` VALUES(NULL, :user_id, :type, :blk, :lt, :ph, :st, :subd, :brgy, :city, :prov, :zip)");
		$result = $pdo_1->execute(array(':user_id'=>$user_id, ':type'=>$type, ':blk'=>$blk, ':lt'=>$lt, ':ph'=>$ph, ':st'=>$st, ':subd'=>$subd, ':brgy'=>$brgy, ':city'=>$city, ':prov'=>$prov, ':zip'=>$zip));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function getAcctAddress($user_id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `address` WHERE ADDR_TYPE = 1 and USER_ID = '". $user_id ."'");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}

	public static function updateAddress($user_id, $blk, $lt, $ph, $st, $subd, $brgy, $city, $prov, $zip){
		$pdo_1 = self::$pdo->prepare("UPDATE `address` SET ADDR_BLK = :blk, ADDR_LT = :lt, ADDR_PH = :ph, ADDR_ST = :st, ADDR_SUBD = :subd, ADDR_BRGY = :brgy, ADDR_CITY = :city, ADDR_PROV = :prov, ADDR_ZIP = :zip WHERE USER_ID = :user_id AND ADDR_TYPE = 1");
		$pdo_1->execute(array(':user_id'=>$user_id, ':blk'=>$blk, ':lt'=>$lt, ':ph'=>$ph, ':st'=>$st, ':subd'=>$subd, ':brgy'=>$brgy, ':city'=>$city, ':prov'=>$prov, ':zip'=>$zip));
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function updateAccount($id, $fname, $lname, $email, $address, $contact, $mi, $gender){
		$sql = "UPDATE `users` SET USER_FNAME = '".$fname."', USER_LNAME = '".$lname."', USER_EMAIL = '".$email."', USER_ADDRESS = '".$address."', USER_CONTACT_NO = '".$contact."', USER_M_INITIAL = '".$mi."', USER_GENDER = '".$gender."' WHERE USER_ID = '".$id."'";
		
		$pdo_1 = self::$pdo->prepare($sql);
		$result = $pdo_1->execute();
		
		if($result) return false;
		else return true;

	}

	public static function updatePassword($id, $pass){
		$sql = "UPDATE `users` SET USER_PASSWORD='".$pass."' WHERE USER_ID = '".$id."'";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return false;
		else return true;
	}

	public static function findAccount($email, $pass){
		$pdo_1 = self::$pdo->prepare('SELECT * FROM `users` a INNER JOIN `address` b on a.USER_ID = b.USER_ID WHERE BINARY USER_EMAIL=:email AND BINARY USER_PASSWORD=:pass');
		$pdo_1->execute(array(':email'=>$email, ':pass'=>$pass));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}

	public static function editDeliveryDetails($userid, $deliveryName, $deliveryAddress, $delivery_contact){
		$pdo_1 = self::$pdo->prepare('UPDATE `users` SET USER_DELIVERY_NAME = :deliveryName, USER_DELIVERY_DETAIL = :deliveryAddress, USER_DELIVERY_CONTACT = :delivery_contact WHERE USER_ID= :userid');
		$pdo_1->execute(array(':deliveryName'=>$deliveryName, ':deliveryAddress'=>$deliveryAddress, ':userid'=>$userid, ':delivery_contact'=>$delivery_contact));
		
	}

	public static function getAllAccounts(){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `users` WHERE USER_TYPE_ID = 2");
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}

	public static function getAccountTransactions($id){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM  `users` A INNER JOIN  `transaction` B WHERE A.USER_ID = B.USER_ID and A.USER_ID = :id");
		$pdo_1->execute(array(':id'=>$id));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return $result;
		else return false;
	}
}
?>