<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="/mirasoltiresupply/account/css/myaccount_style.css">
		<script language="javascript" type="text/javascript" src="/mirasoltiresupply/account/js/myaccount.js"></script>
	</head>
	<body>
		<div style="height: 30px;"></div>
		
		<div class="page-wrap container " style="width:100%;">
			<div id="myaccount-sidebar">
				<div class="text-center profile-logo">
					<img src="/mirasoltiresupply/assets/logo_altered.png" />
				</div>
				<div class="profile-menu active">
					<a href="#myaccount-body-profile">MY PROFILE</a>
				</div>
				<div class="profile-menu">
					<a href="#myaccount-body-transactions">TRANSACTIONS</a>
				</div>
				<div class="profile-menu">
					<a href="/mirasoltiresupply/php/logout.php">LOGOUT</a>
				</div>

			</div>
			<div id="myaccount-body">
				<div id="navigation_row"></div>
				<div id="myaccount-body-content">
					<div id="myaccount-body-profile">
						<h1 class="product-title" style="font-size:170%"><strong>MY ACCOUNT</strong></h1>
						<div class="top-bottom-red-border" style="">
							<label class="padded-right-30">ACCOUNT ID</label>
							<label id="account-id" class="checkout-data">1001</label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">NAME</label>
							<label id="account-lname" class="checkout-data">GERONAGA</label>
							<label id="account-fname" class="checkout-data">| NICOLE</label>
							<label id="account-mname" class="checkout-data">| B</label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">ADDRESS</label>
							<label id="account-address" class="checkout-data">GREENSVILLE 1, KAPPA ST. BACOLOD CITY</label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">EMAIL</label>
							<label id="account-email" class="checkout-data">nicolegeronaga@gmail.com</label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">GENDER</label>
							<label id="account-gender" class="checkout-data">FEMALE</label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">CONTACT NUMBER</label>
							<label id="account-contact" class="checkout-data">09171234567</label>
						</div>
						<div id="profile-update-link">
							<em><a href="#">update and save profie</a></em>
						</div>
					</div>
				</div>
			</div>

		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
