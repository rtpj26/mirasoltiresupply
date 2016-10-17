<?php
	class database_object {
		function __construct($host, $db, $user, $pass) {
			$this->host = $host;
			$this->db = $db;
			$this->user = $user;
			$this->pass = $pass;
			$this->connected = false;
		}

		function connect() {
			try {
				$this->db_connect = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db, $this->user, $this->pass);
				$this->connected = true;
				return true;
			} catch (Exception $e) {
				$this->connected = false;
				return false;
			}
		}

		function isConnected() {
			return $this->connected;
		}

		function get_db_connect() {
			return $this->db_connect;
		}
	}

	$host 	= "localhost";
	$user 	= "mirasolt_nash";
	$pass  	= "Hello1976";
	$db 	= "mirasolt_mirasoltiresupply";

	$db_obj = new database_object($host, $db, $user, $pass);
	if (!$db_obj->isConnected()) {
		$db_obj->connect();
	}
?>