<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
	</head>
	<body>
		<div style="height: 30px;"></div>
		<div id="navigation_row" style="margin-right:40px;"></div>
		<div class="page-wrap container" style="width:80%;">
			<h1 class="product-title" style="float:right; font-size:300%"><strong>CHECK ME OUT!</strong></h1>
			<div id="account-wrapper">
				<div class="collapse-title" data-toggle="collapse" href="#profile-div" id="profile-title">
					<span class="glyphicon glyphicon-lock"></span>
					<span id="sign-in-label">SIGNED IN AS</span>
					<span id="sign-in-fname">NICOLE</span>
					<span id="sign-in-email">nicolegeronaga@gmail.com</span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="profile-div" class="collapse">
					<div class="top-bottom-red-border">
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
				</div>
				
				<div class="collapse-title" data-toggle="collapse" href="#delivery-div" id="delivery-title">
					<span class="glyphicon glyphicon-pushpin"></span>
					<span id="sign-in-label">DELIVERY INFORMATION</span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="delivery-div" class="collapse">
					<div class="box">
						<p id="deliver-to">User</p>
						<p id="deliver-address"><span class="glyphicon glyphicon-pushpin"></span> here</p>
					</div>
					<div class="text-center">
						<button class="checkout-button">Save and Continue</button>
					</div>
				</div>

				<div class="collapse-title" data-toggle="collapse" href="#payment-div" id="payment-title">
					<span class="glyphicon glyphicon-credit-card"></span>
					<span id="sign-in-label">PAYMENT</span>
					<span> CHOOSE YOUR PAYMENT METHOD </span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="payment-div" class="collapse">
					<div class="box">
						<p id="deliver-to">User</p>
						<p id="deliver-address"><span class="glyphicon glyphicon-pushpin"></span> here</p>
					</div>
					<button>Save and Continue</button>
				</div>

				<div class="collapse-title" data-toggle="collapse" href="#review-div" id="review-title">
					<span class="glyphicon glyphicon-ok-sign"></span>
					<span id="sign-in-label">PLACE AND REVIEW ORDERS</span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="review-div" class="collapse">
					<div class="box">
						<p id="deliver-to">User</p>
						<p id="deliver-address"><span class="glyphicon glyphicon-pushpin"></span> here</p>
					</div>
					<button>Save and Continue</button>
				</div>
			</div>

		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
