<?php
	session_start();
	session_unset();
	session_destroy();
	var_dump($_SESSION);
	header('location: /mirasoltiresupply');
?>