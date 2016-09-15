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
		$pdo_1 = self::$pdo->prepare("INSERT INTO `comment` VALUES(NULL, :name, :email, :msg, :contact, 1)");
		$pdo_1->execute(array(':name'=>$name, ':email'=>$email, ':msg'=>$msg, ':contact'=>$contact));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		if($result) return false;
		else return true;
	}	

	public static function getComments($status){

		$sql = "SELECT * FROM `comment` WHERE COMMENT_STATUS IN($status)";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getCommentsId($status){
		$pdo_1 = self::$pdo->prepare("SELECT * FROM `comment` WHERE COMMENT_ID IN(:status)");
		$pdo_1->execute(array(':status'=>$status));
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function updateCommentsStatus($id){
		$pdo_1 = self::$pdo->prepare("UPDATE `comment` SET COMMENT_STATUS = 2 WHERE COMMENT_ID = :id");
		$pdo_1->execute(array(':id'=>$id));
		return;
	}

	public static function getCommentsLike($keyword){
		$sql = "SELECT * FROM `comment` WHERE COMMENT_NAME LIKE '%" . $keyword . "%' OR COMMENT_EMAIL LIKE '%" . $keyword . "%' OR COMMENT_CONTACT_NUM LIKE '%" . $keyword . "%'";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}


}
?>