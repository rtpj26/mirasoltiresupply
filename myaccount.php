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
					<span id="sign-in-fname"></span>
					<span id="sign-in-email"></span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="profile-div" class="collapse"></div>
				
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
					<button>Save and Continue</button>
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
