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
		$sql = empty($sortBy) ? "SELECT * FROM TIRE A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1" :  "SELECT * FROM TIRE A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchTire($key){
		$sql = "SELECT * FROM TIRE A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 AND TIRE_RIM LIKE '%".$key."%' OR TIRE_SIZE LIKE '%".$key."%' OR TIRE_LI_SS LIKE '%".$key."%' OR TIRE_BRAND LIKE '%".$key."%' OR TIRE_DESIGN LIKE '%".$key."%' OR TIRE_NAME LIKE '%".$key."%' GROUP BY TIRE_ID";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getWheels($sortBy){
		$sql = empty($sortBy) ? "SELECT * FROM WHEEL A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2" :  "SELECT * FROM WHEEL A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getBatteries($sortBy){
		$sql = empty($sortBy) ? "SELECT * FROM BATTERY A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3" :  "SELECT * FROM BATTERY A INNER JOIN PRODUCT B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

}
?>