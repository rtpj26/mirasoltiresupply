<?php

include_once "../php/db_connect.php";

Product::start($db_obj);

class Product{
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

	public static function getTires($sortBy){
		if($sortBy == ""){
			$pdo_1 = self::$pdo->prepare("SELECT * FROM TIRE A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1");
			$pdo_1->execute();
		}else{
			$pdo_1 = self::$pdo->prepare("SELECT * FROM TIRE A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 ORDER BY :sortby");
			$pdo_1->execute(array(":sortby" => $sortBy));
		}
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

}
?>