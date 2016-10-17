<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/account/css/myaccount_style.css">
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/account/js/myaccount.js"></script>
	</head>
	<body>
		<div style="height: 30px;"></div>
		
		<div class="page-wrap container " style="width:100%; overflow: hidden;" >
			<div id="myaccount-sidebar">
				<div class="text-center profile-logo">
					<img src="http://mirasoltiresupply.com/assets/logo_altered.png" />
				</div>
				<div class="profile-menu active">
					<a href="#profile" id="profile-menu">MY PROFILE</a>
				</div>
				<div class="profile-menu">
					<a href="#transactions" id="transaction-menu">TRANSACTIONS</a>
				</div>
				<div class="profile-menu">
					<a href="#wishlist" id="wishlist-menu">WISHLIST</a>
				</div>
				
				<div class="profile-menu">
					<a href="http://mirasoltiresupply.com/php/logout.php">LOGOUT</a>
				</div>

			</div>
			<div id="myaccount-body">
				<div id="navigation_row"></div>
				<div id="myaccount-body-content">
					<div id="profile">
						<h1 class="product-title" style="font-size:170%"><strong>MY ACCOUNT</strong></h1>
						<div class="top-bottom-red-border" style="">
							<label class="padded-right-30">ACCOUNT ID</label>
							<label id="account-id" class="checkout-data"></label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">NAME</label>
							<label id="account-lname" class="checkout-data"></label>
							<label id="account-fname" class="checkout-data">| </label>
							<label id="account-mname" class="checkout-data">| </label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">ADDRESS</label>
							<label id="account-address" class="checkout-data"></label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">EMAIL</label>
							<label id="account-email" class="checkout-data"></label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">GENDER</label>
							<label id="account-gender" class="checkout-data"></label>
						</div>
						<div class="bottom-red-border">
							<label class="padded-right-30">CONTACT NUMBER</label>
							<label id="account-contact" class="checkout-data"></label>
						</div>
						<div id="profile-update-link">
							<em><a href="#" id="updateProfile">update and save profie</a></em>
						</div>
					</div>
					<div id="transaction">
						<h1 class="product-title" style="font-size:170%"><strong>MY TRANSACTIONS</strong></h1>
						<div class="top-bottom-red-border" style="">
							<input id="input-transactions" type="text"/>
							<button type="button" id="search-button-transaction">SEARCH</button>
						</div>
						<div class="transaction-table">
							<table id="transaction-table">
								<thead>
									<th>CSR NO.</th>
									<th>DATE</th>
									<th>MODE</th>
									<th>STATUS</th>
									<th></th>
								</thead>
								<tbody id="tbody_transaction">
								</tbody>
							</table>

						</div>
						
					</div>

					<div id="wishlist" style="display: none; ">
						<h1 class="product-title" style="font-size:170%"><strong>MY WISHLIST</strong></h1>
						
						<div class="wishlist-table">
							<table id="wishlist-table">
								<thead>
									<th>WISHLIST NO.</th>
									<th>DATE</th>
									<th>ACTION</th>
									
								</thead>
								<tbody id="tbody_wishlist">
								</tbody>
							</table>

						</div>
						
					</div>


				</div>
			</div>
			<div id="editAccount" style="display: none;" role="dialog">
				<div class="top-bottom-red-border" style="">
					<label class="padded-right-30">ACCOUNT ID</label>
					<label id="e-account-id" class="checkout-data"></label>
				</div>
				<div class="bottom-red-border">
					<label class="padded-right-30">NAME</label>
					<input id="e-account-lname" class="checkout-data" type="text" placeholder="Last Name" required>|
					<input id="e-account-fname" class="checkout-data" type="text" placeholder="First Name" required>| 
					<input id="e-account-mname" class="checkout-data" type="text" size="1" placeholder="M.I.">
				</div>
				<div class="bottom-red-border">
					<label class="padded-right-30">ADDRESS</label>
					<input id="e-account-address-blk" class="checkout-data" type="text" width="300px" placeholder="Blk">
					<input id="e-account-address-lt" class="checkout-data" type="text" width="300px" placeholder="Lt">
					<input id="e-account-address-ph" style="margin-left: 160px;" class="checkout-data" type="text" width="400px" placeholder="Phase">
					<input id="e-account-address-st" class="checkout-data" type="text" width="500px" placeholder="Street">
					<input id="e-account-address-subd" style="margin-left: 160px;" class="checkout-data" type="text" width="500px" placeholder="Subd.">
					<input id="e-account-address-brgy"  class="checkout-data" type="text" width="500px" placeholder="Brgy.">
					<input id="e-account-address-city" style="margin-left: 160px;"class="checkout-data" type="text" width="500px" placeholder="City">
					<input id="e-account-address-prov"  class="checkout-data" type="text" width="500px" placeholder="Province">
					<input id="e-account-address-zip" style="margin-left: 160px;"class="checkout-data" type="text" width="300px" placeholder="Zip">
				</div>
				<div class="bottom-red-border">
					<label class="padded-right-30">EMAIL</label>
					<input id="e-account-email" class="checkout-data" type="text" placeholder="E-mail" required>
				</div>
				<div class="bottom-red-border">
					<label class="padded-right-30">GENDER</label>
					<select id="e-account-gender">
						<option value="0">Male</option>
						<option value="1">Female</option>
					</select>
				</div>
				<div class="bottom-red-border">
					<label class="padded-right-30">CONTACT NUMBER</label>
					<input id="e-account-contact" class="checkout-data" type="text" placeholder="Contact Number">
				</div>
				<div style="float:left;">
					<button class="ebutton-save" id="ebutton-save">Save</button>
					<button class="ebutton-cancel" id="ebutton-cancel">Cancel</button>
				</div>
				<div style="float:right;">
					<p id="updatePass" style="cursor: pointer;">Update Password</p>
				</div>
				<div style="display: none" id="updatePassword" role="dialog">
					<div class="top-bottom-red-border" style="">
						<label class="padded-right-30">OLD PASSWORD:</label>
						<input id="e-account-opass" class="checkout-data" type="password" placeholder="Old password" required>
					</div>
					<div class="bottom-red-border">
						<label class="padded-right-30">NEW PASSWORD:</label>
						<input id="e-account-npass" class="checkout-data" type="password" placeholder="New password" required>
					</div>
					<div class="bottom-red-border">
						<label class="padded-right-30">VERIFY PASSWORD</label>
						<input id="e-account-vpass" class="checkout-data" type="password" placeholder="Verify password">
					</div>
					<button class="ebutton-save" id="ebutton-save-pass">Save</button>
					<button class="ebutton-cancel" id="ebutton-cancel-pass">Cancel</button>
				</div>
			</div>

		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
