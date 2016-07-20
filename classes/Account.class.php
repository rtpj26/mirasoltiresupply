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
		$pdo_1 = self::$pdo->prepare("INSERT INTO `USERS` VALUES(NULL, :fname, :lname, , '', :email, :pass, '', '', :phone, '1')");
		$pdo_1->execute(array(':fname'=>$fname, ':lname'=>$lname, ':email'=>$email, ':pass'=>$pass, ':phone'=>$phone));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return true;
		else return false;
	}
}
?>