<?php
	session_start();
	include_once('../classes/Transaction.class.php');

	Transaction::createCreditDetail('1', '1', '1', '2016', '123');
?>