<?php

include_once dirname(__FILE__)."/../php/db_connect.php";

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
		$sql = empty($sortBy) ? "SELECT * FROM `tire` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 ORDER BY TIRE_SIZE, TIRE_RIM" :  "SELECT * FROM `tire` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getDistinctTireBrand(){
		$sql = "SELECT DISTINCT TIRE_BRAND FROM `tire`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function getDistinctTireSize(){
		$sql = "SELECT DISTINCT TIRE_SIZE FROM `tire`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function getDistinctTireDesign(){
		$sql = "SELECT DISTINCT TIRE_DESIGN FROM `tire`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}



	public static function getDistinctWheelBrand(){
		$sql = "SELECT DISTINCT WHEEL_BRAND FROM `wheel`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function getDistinctWheelHoles(){
		$sql = "SELECT DISTINCT WHEEL_HOLES FROM `wheel`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function getDistinctWheelSize(){
		$sql = "SELECT DISTINCT WHEEL_RIM FROM `wheel`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}



	public static function getDistinctBatteryBrand(){
		$sql = "SELECT DISTINCT SUBSTRING_INDEX(`BATTERY_DESCRIPTION`, ' ', 1) AS brand FROM battery;";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function getDistinctBatteryPlate(){
		$sql = "SELECT DISTINCT BATTERY_PLATES FROM `battery`";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;	
	}

	public static function searchTire($key){
		$sql = "SELECT * FROM `tire` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 AND TIRE_RIM LIKE '%".$key."%' OR TIRE_SIZE LIKE '%".$key."%' OR TIRE_LI_SS LIKE '%".$key."%' OR TIRE_BRAND LIKE '%".$key."%' OR TIRE_DESIGN LIKE '%".$key."%' OR TIRE_NAME LIKE '%".$key."%' GROUP BY TIRE_ID ORDER BY TIRE_SIZE, TIRE_RIM";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchTireByField($key, $field){
		$sql = "SELECT * FROM `tire` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 1 AND ". $field ." LIKE '%".$key."%' ORDER BY TIRE_SIZE, TIRE_RIM";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getWheels($sortBy){
		$sql = empty($sortBy) ? "SELECT * FROM `wheel` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2 ORDER BY WHEEL_RIM" :  "SELECT * FROM `wheel` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchWheel($key){
		$sql = "SELECT * FROM `wheel` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2 AND WHEEL_RIM LIKE '%".$key."%' OR WHEEL_BRAND LIKE '%".$key."%' OR WHEEL_COLOR LIKE '%".$key."%' OR WHEEL_HOLES LIKE '%".$key."%' GROUP BY WHEEL_ID ORDER BY WHEEL_RIM";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchWheelByField($key, $field){
		$sql = "SELECT * FROM `wheel` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 2 AND ". $field ." LIKE '%".$key."%' ORDER BY WHEEL_RIM";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getBatteries($sortBy){
		$sql = empty($sortBy) ? "SELECT * FROM `battery` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3 ORDER BY BATTERY_PLATES" :  "SELECT * FROM `battery` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3 ORDER BY " . $sortBy;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchBattery($key){
		$sql = "SELECT * FROM `battery` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3 AND BATTERY_DESCRIPTION LIKE '%".$key."%' OR BATTERY_PLATES LIKE '%".$key."%' GROUP BY BATTERY_ID ORDER BY BATTERY_PLATES";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function searchBatteryByField($key, $field){
		$sql = "SELECT * FROM `battery` A INNER JOIN `product` B WHERE B.PRODUCT_ID = A.PRODUCT_ID AND B.PRODUCT_TYPE = 3 AND ". $field ." LIKE '%".$key."%' ORDER BY BATTERY_PLATES";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function deleteProduct($id){
		$sql = "DELETE FROM `product` WHERE PRODUCT_ID = :id" ;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute(array(':id'=>$id));
		return;
	}

	public static function deleteTire($id){
		$sql = "DELETE FROM `tire` WHERE PRODUCT_ID = :id";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute(array(':id'=>$id));
		return;
	}

	public static function deleteWheel($id){
		$sql = "DELETE FROM `wheel` WHERE PRODUCT_ID = :id";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute(array(':id'=>$id));
		return;
	}

	public static function deleteBattery($id){
		$sql = "DELETE FROM `battery` WHERE PRODUCT_ID = :id";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute(array(':id'=>$id));
		return;
	}

	public static function getTireData($id){
		$sql = "SELECT * FROM `tire` A INNER JOIN `product` B ON A.PRODUCT_ID = B.PRODUCT_ID WHERE A.PRODUCT_ID = ".$id;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getWheelData($id){
		$sql = "SELECT * FROM `wheel` A INNER JOIN `product` B ON A.PRODUCT_ID = B.PRODUCT_ID WHERE B.PRODUCT_ID = ".$id;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function getBatteryData($id){
		$sql = "SELECT * FROM `battery` A INNER JOIN `product` B ON A.PRODUCT_ID = B.PRODUCT_ID WHERE B.PRODUCT_ID = ".$id;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$result = $pdo_1->fetchAll(PDO::FETCH_ASSOC);
		return $result;
	}

	public static function updateTire($id,$rim,$size,$liss,$brand,$design){
		$sql = "UPDATE `tire` SET TIRE_RIM='".$rim."', TIRE_SIZE='".$size."',TIRE_LI_SS='".$liss."',TIRE_BRAND='".$brand."',TIRE_DESIGN='".$design."' WHERE TIRE_ID = " . $id;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		return;
	}
			

	public static function updateWheel($id, $rim,$brand,$color,$holes){
		$sql = "UPDATE `wheel` SET WHEEL_RIM = '" . $rim . "', WHEEL_BRAND = '" . $brand . "', WHEEL_COLOR = '" . $color . "', WHEEL_HOLES = '" . $holes . "' WHERE WHEEL_ID = " . $id;
		var_dump($sql);   
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		return;
	}

	public static function updateBattery($id, $desc, $plate){
		$sql = "UPDATE `battery` SET BATTERY_DESCRIPTION = '" . $desc . "', BATTERY_PLATES = '" . $plate . "' WHERE BATTERY_ID = " . $id;
		var_dump($sql);   
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		return;
	}

	public static function updateProduct($pid, $qty, $price){
		$sql = "UPDATE `product` SET PRODUCT_STOCK = " . $qty . ", PRODUCT_COST_PER_UNIT = " . $price . " WHERE PRODUCT_ID = " . $pid;
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		return;
	}	

	public static function addProduct($productType, $costPerUnit, $initStock){
		$sql = "INSERT INTO `product` VALUES (NULL, '". $productType . "', '".$costPerUnit."', '".$initStock."')";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function addTire($prodId, $rim, $size, $liss, $brand, $design, $fname){
		$sql = "INSERT INTO `tire` VALUES (NULL, '". $prodId . "', '".$rim."', '".$size."', '".$liss."', '".$brand. "', '".$design."', '', '".$fname."')";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function addWheel($prodId, $rim, $brand, $color, $holes,  $fname){
		$sql = "INSERT INTO `wheel` VALUES (NULL, '". $prodId . "', '".$rim."', '".$brand."', '".$color."', '".$holes. "', '".$fname."')";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}

	public static function addBattery($prodId, $type, $description, $plates,  $fname){
		$sql = "INSERT INTO `battery` VALUES (NULL, '". $prodId . "', '".$type."', '".$description."', '".$plates."', '".$fname."')";
		$pdo_1 = self::$pdo->prepare($sql);
		$pdo_1->execute();
		$lastId = self::$pdo->lastInsertId();
		return $lastId;
	}
}
?>