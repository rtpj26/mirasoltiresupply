<?php
	session_start();
	header('Content-type: application/json');

	include_once('../classes/Transaction.class.php');
	include_once('../classes/Contact.class.php');
	include_once('../classes/Account.class.php');

	if($_GET['code'] == '0'){
		$rescue_name = $_POST['rName'];
		$rescue_loc = $_POST['rLoc'];
		$rescue_contact = $_POST['rContact'];
		$rescue_requisition = $_POST['rReq'];
		$rescue_id = Transaction::createRescue($rescue_name, $rescue_loc, $rescue_contact, $rescue_requisition);
	}else if($_GET['code'] == '1'){
		$semail = $_POST['semail'];
		$spass = $_POST['spass'];
		$details = Account::findAccount($_POST['semail'], $_POST['spass']);
				
		if($details) die(json_encode(array('success'=>true, 'logged_in'=>true,'u_data'=>$details, 'fname'=>$details[0]['USER_FNAME'],
			'lname'=>$details[0]['USER_LNAME'], 'id'=>$details[0]['USER_ID'], 'email'=>$details[0]['USER_EMAIL'], 'address'=>$details[0]['USER_ADDRESS'],
			'gender'=>$details[0]['USER_GENDER'], 'contact'=>$details[0]['USER_CONTACT_NO'])));
		else die(json_encode(array('success'=>false)));
	}else if($_GET['code'] == '2'){
		$fname = $_POST['fName'];
		$email = $_POST['email'];
		$pnum = $_POST['pnum'];
		$pass = $_POST['pass'];

		$details = Account::findAccount($email, $pass);
		if($details){
			die(json_encode(array('success'=>false)));
		}else{//$success = Account::addAccount($_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['pnum'], $_POST['pass'], $_POST['address']);
			//$success = Account::addAccount('test', 'test', 'test@test.net', '1234', '1234', '12314');

			$success = Account::addAccount($_POST['fname'], "", $_POST['email'], $_POST['pnum'], $_POST['pass'], "");
			if(!$success)die(json_encode(array('success'=>true, 'duplicate'=>false)));
			else die(json_encode(array('success'=>false)));
		}
	}else if($_GET['code'] == '3'){
		$id = $_POST['id'];
		$details = Transaction::getUserTransactions($id);
		if($details) die(json_encode(array('success'=>true, 'details'=>$details)));
		else die(json_encode(array('success'=>false)));
	}
?>
