<?php

include_once "../php/db_connect.php";

Contact::start($db_obj);

class Contact{
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

	public static function addComment($name, $email, $msg, $contact){
		$pdo_1 = self::$pdo->prepare("INSERT INTO `comment` VALUES(NULL, :name, :email, :msg, :contact)");
		$pdo_1->execute(array(':name'=>$name, ':email'=>$email, ':msg'=>$msg, ':contact'=>$contact));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return false;
		else return true;

	}	
}
?>