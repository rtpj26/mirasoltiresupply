<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/js/checkout.js"></script>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/css/checkout.css">
		<?php 	if(isset($_SESSION['users'][0]['USER_ID']))
					if($_SESSION['users'][0]['USER_TYPE_ID'] == 0 || $_SESSION['users'][0]['USER_TYPE_ID'] == 1) 
						header('location: http://mirasoltiresupply.com/admin'); 
		?>
	</head>
	<body>
		<div style="height: 30px;"></div>
		<div id="navigation_row" style="margin-right:40px;"></div>
		<div class="page-wrap container" style="width:80%;">
			<h1 class="product-title" style="float:right; font-size:300%"><strong>CHECK OUT!</strong></h1>
			<div id="account-wrapper">
				<div class="collapse-title" data-toggle="collapse" href="#profile-div" id="profile-title">
					<span class="glyphicon glyphicon-lock"></span>
					<span id="sign-in-label">SIGNED IN AS</span>
					<span id="sign-in-fname"></span>
					<span id="sign-in-email"></span>
					<span id="collapse-profile" style="margin-right: -235px;">+</span>
				</div>
				<div id="profile-div" class="collapse" style="width:1050px;">
					<div id="logged-in">
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
					<div id="n-logged-in">
						
							<form id="form-sign-in" method="POST">
								<div class="row">
									<div class="col-md-2"></div>
									<div class="col-md-4">
										<center>
											<label>SIGN IN</label>
											<hr>
											<div class="row">
												<div class="col-md-6">
													<label><strong>EMAIL* </strong></label>
												</div>
												<div class="col-md-6">
													<input class="custom-input-checkout" type="text" name="semail" id="semail"/>
												</div>
											</div>
											
											<div class="row">
												<div class="col-md-6">
													<label><strong>PASSWORD* </strong></label>
												</div>
												<div class="col-md-6">
													<input class="custom-input-checkout" type="password" name="spass" id="spass"/>
												</div>
											</div>
											
										</center>
										<p href="#" id="checkout_login" class="custom-checkout-login"><strong>SIGN IN <span class="glyphicon glyphicon-play"></span></strong></p>
										<br>
									</div>
									<div class="col-md-4">
										<form id="sign_up_form" method="POST">
											<center><label>REGISTER</label></center>
											<hr>
												<div class="row">
													<div class="col-md-6" >
														<label ><strong>FIRST NAME </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="text" size="40" name="fname" id="fname" required/><br>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6" >
														<label><strong>LAST NAME </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="text"  size="40" name="lname" id="lname" required/><br>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6">
														<label><strong>EMAIL </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="email" size="40" name="email" id="email"required/><br>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6">
														<label><strong>PHONE NUMBER </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="text"   size="40" name="pnum" id="pnum" required/><br>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6">
														<label><strong>ADDRESS </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="text" placeholder="Blk"   size="20" name="address_blk" id="address_blk"/>
														<input class="custom-input-checkout" type="text" placeholder="Lt"  size="20" name="address_lt" id="address_lt"/>
														<input class="custom-input-checkout" type="text" placeholder="Phase"  size="20" name="address_ph" id="address_ph"/>
														<input class="custom-input-checkout" type="text" placeholder="Street"  size="20" name="address_st" id="address_st"/>
														<input class="custom-input-checkout" type="text" placeholder="Subd"  size="25" name="address_subd" id="address_subd"/>
														<input class="custom-input-checkout" type="text" placeholder="Brgy"  size="25" name="address_brgy" id="address_brgy"/>
														<input class="custom-input-checkout" type="text" placeholder="City"  size="25" name="address_city" id="address_city"/>
														<input class="custom-input-checkout" type="text" placeholder="Province"  size="25" name="address_prov" id="address_prov"/>
														<input class="custom-input-checkout" type="text" placeholder="Zip"  size="10" name="address_zip" id="address_zip"/>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6">
														<label><strong>PASSWORD </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="password"  size="40" vname="pass" id="pass" required/><br>
													</div>
												</div>
												<div class="row">
													<div class="col-md-6">
														<label><strong>VERIFY PASSWORD </strong></label>
													</div>
													<div class="col-md-6">
														<input class="custom-input-checkout" type="password"  size="40" name="vpass" id="vpass" required/><br><br>
													</div>
												</div>
												<p href="#" id="signup" class="custom-checkout-login"><strong>SIGN UP <span class="glyphicon glyphicon-play"></span></strong></p>
												<br>
											</form>

									</div>
									<div class="col-md-2"></div>
								</div>
							</form>
	
								
					</div>
				</div>
				
				<div class="collapse-title" data-toggle="collapse" href="#delivery-div" id="delivery-title">
					<span class="glyphicon glyphicon-pushpin"></span>
					<span id="sign-in-label">DELIVERY INFORMATION</span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="delivery-div" class="collapse">
					<div class="box">
						
						<span id="deliver-to">Enter Delivery Info</span><span class="glyphicon glyphicon-pencil" id="editDelivery" style="float: right;"></span><br>
						<p id="deliver-address"><span class="glyphicon glyphicon-pushpin"></span> here</p><br>
						<p id="deliver-contact"><span class="glyphicon glyphicon-phone"></span></p>
					</div>
					<div>
						<button class="checkout-button" id="save2">Save and Continue</button>
					</div>
				</div>


				<div class="collapse-title" data-toggle="collapse" href="#payment-div" id="payment-title">
					<span class="glyphicon glyphicon-credit-card"></span>
					<span id="sign-in-label">
					CHOOSE YOUR PAYMENT METHOD </span>
					<span id="collapse-profile">+</span>
				</div>
				<div id="payment-div" class="collapse">
					<div id="payment-method-selection">
						<div class="row">
							<div class="col-md-4">
								<center>
									<a href="#" id="credit-selection">CREDIT CARD</a>
								</center>
							</div>
							<div class="col-md-4">
								<center>
									<a href="#" id="cod-selection">CASH ON DELIVERY</a>
								</center>
							</div>
							<div class="col-md-4">
								<center>
									<a href="#" id="check-selection">CHEQUE</a>
								</center>
							</div>
						</div>
					</div>
					<div id="selected-mop">
						<div id="selected-cc" class="arrow_box_1">
							<center><p>We accept 
								<input type="radio" id="ccard-mc" name="ccard" checked val="MASTER CARD"/>
								<img src="http://mirasoltiresupply.com/assets/Master-Card-icon.png" width="50px"/>
								<input type="radio" id="ccard-v" name="ccard" val="VISA"/>
								<img src="http://mirasoltiresupply.com/assets/credit_visa.png" width="50px"/>
							</p></center>
							<br>
							<div class="row">
								<div class="col-md-2 mop-label">
									<strong><label class="">CARD NO:</label></strong>
								</div>
								<div class="col-md-4">
									<input type="text" maxlength="16" name="card-no" id="card-no" class="mop-input"/>
								</div>
								<div class="col-md-2 mop-label">
									<strong><label class="">NAME IN CARD:</label></strong>
								</div>
								<div class="col-md-4">
									<input type="text" name="card-name" id="card-name" class="mop-input"/>
								</div>
							</div>
							<br>
							<div class="row">
								<div class="col-md-2 mop-label">
									<strong><label class="">EXPIRY DATE:</label></strong>
								</div>
								<div class="col-md-4">
									<select name="card-expiry-month" id="card-expiry-month" class="mop-input mop-num">
										<option value="1">January</option>
										<option value="2">February</option>
										<option value="3">March</option>
										<option value="4">April</option>
										<option value="5">May</option>
										<option value="6">June</option>
										<option value="7">July</option>
										<option value="8">August</option>
										<option value="9">September</option>
										<option value="10">October</option>
										<option value="11">November</option>
										<option value="12">December</option>
									</select>
									<select name="card-expiry-year" id="card-expiry-year" class="mop-input mop-num">

									</select>

									<!--
									<input type="text" name="card-expiry-month" id="card-expiry-month" class="mop-input mop-num" placeholder="MM"/>
									<input type="text" name="card-expiry-year" id="card-expiry-year" class="mop-input mop-num" placeholder="YYYY"/>
									-->
								</div>
								<div class="col-md-2 mop-label">
									<strong><label class="">SECURITY CODE:</label></strong>
								</div>
								<div class="col-md-4">
									<input type="text" name="card-security" id="card-security" maxlength = "3" class="mop-input mop-security"/>
									<img src="http://mirasoltiresupply.com/assets/csc_visamc.png" width="50px"/>
								</div>
							</div>
							<center><button id="mop-cc-save">Save and Continue</button></center>
						</div>



						<div id="selected-cod" class="arrow_box_2">
							<center>
								<img src="http://mirasoltiresupply.com/assets/truck.png" width="200px"/>
								<span class="glyphicon glyphicon-play" style="font-size:400%;padding-left:50px; padding-right:50px;"></span>
								<img src="http://mirasoltiresupply.com/assets/payment-512.png" width="200px"/>
							</center>
							<br>
							<label class="cod-step1"><strong>YOUR ORDER WILL BE DELIVERED TO YOU</strong></label>
							<label class="cod-step2"><strong><center>PAY OUR DELIVERY STAFF IN CASH AND COLLECT YOUR ORDER</center></strong></label>
							<br>
							<center><button id="mop-cod-save">Save and Continue</button></center>
						</div>




						<div id="selected-c" class="arrow_box_3">
							<div class="row" style="margin-top:30px;">
								<div class="col-md-3"></div>
								<div class="col-md-3 c-labels" >
									<label><strong>BANK*</strong></label>
								</div>
								<div class="col-md-3">
									<!--<input class="c-input" id="c-bank" name="c-bank" />-->
									<select id="c-bank" name="c-bank" class="c-input">
										<option value="BDO - Hilado">BDO - Hilado</option>
										<option value="BDO - Lacson">BDO - Lacson</option>
										<option value="BDO - East">BDO - East</option>
										<option value="BDO - Libertad">BDO - Libertad</option>
										<option value="BDO - Mandalagan">BDO - Mandalagan</option>
										<option value="BDO - Rosario Lacson">BDO - Rosario Lacson</option>
										<option value="BDO - Araneta">BDO - Araneta</option>
										<option value="BPI - Mandalagan">BPI - Mandalagan</option>
										<option value="BPI - Gatuslao">BPI - Gatuslao</option>
										<option value="BPI - Lacson">BPI - Lacson</option>
										<option value="BPI - La Salle">BPI - La Salle</option>
										<option value="BPI - Araneta">BPI - Araneta</option>
										<option value="BPI - Rizal">BPI - Rizal</option>
										<option value="BPI - Robinsons">BPI - Robinsons</option>
										<option value="BPI - Ayala North Point">BPI - Ayala North Point</option>
										<option value="BPI - Galo">BPI - Galo</option>
										<option value="BPI - Libertad">BPI - Libertad</option>
										<option value="BPI - East Mall">BPI - East Mall</option>
										<option value="BPI - Capitol Subd.">BPI - Capitol Subd.</option>
										<option value="Metrobank - Lacson">Metrobank - Lacson</option>
										<option value="Metrobank - Araneta">Metrobank - Araneta</option>
										<option value="Metrobank - Capitol">Metrobank - Capitol</option>
										<option value="Metrobank - East Side">Metrobank - East Side</option>
										<option value="Metrobank - Gatuslao">Metrobank - Gatuslao</option>
										<option value="Metrobank - Mandalagan">Metrobank - Mandalagan</option>
										<option value="Metrobank - Northdrive">Metrobank - Northdrive</option>
										<option value="Metrobank - Gonzaga">Metrobank - Gonzaga</option>
										<option value="Metrobank - Libertad">Metrobank - Libertad</option>
										<option value="Metrobank - Singcang">Metrobank - Singcang</option>
										<option value="East West - Lacson">East West - Lacson</option>
										<option value="East West - Hilado">East West - Hilado</option>
										<option value="East West - Carlos Hilado Highway">East West - Carlos Hilado Highway</option>
										<option value="RCBC - Luzuriaga">RCBC - Luzuriaga</option>
										<option value="RCBC - Locsin">RCBC - Locsin</option>
										<option value="RCBC - Hilado">RCBC - Hilado</option>
										<option value="RCBC - Lacson">RCBC - Lacson</option>
										<option value="RCBC - Libertad Ext.">RCBC - Libertad Ext.</option>
										<option value="RCBC - Burgos">RCBC - Burgos</option>
										<option value="RCBC - Mandalagan">RCBC - Mandalagan</option>
										<option value="Security Bank - Rizal">Security Bank - Rizal</option>
										<option value="Security Bank - Lacson">Security Bank - Lacson</option>
										<option value="Security Bank - Hilado">Security Bank - Hilado</option>
										<option value="China Bank - Araneta">China Bank - Araneta</option>
										<option value="China Bank - B.S. Aquino Drive">China Bank - B.S. Aquino Drive</option>
										<option value="China Bank - Lacson">China Bank - Lacson</option>
									</select>
								</div>
								<div class="col-md-3"></div>
							</div>
							<div class="row" style="margin-top:30px;">
								<div class="col-md-3"></div>
								<div class="col-md-3 c-labels" >
									<label><strong>CHECK NUMBER*</strong></label>
								</div>
								<div class="col-md-3">
									<input class="c-input" maxlength="8" id="c-num" name="c-num" />
								</div>
								<div class="col-md-3"></div>
							</div><br>
							<center><button id="mop-c-save">Save and Continue</button></center>
						</div>
					</div>
				
				</div>

				<div class="collapse-title" data-toggle="collapse" href="#review-div" id="review-title">
					<span class="glyphicon glyphicon-ok-sign"></span>
					<span id="sign-in-label">PLACE AND REVIEW ORDERS</span>
					<span id="collapse-profile">+</span>			
				</div>				
				<div id="review-div" class="collapse">
					<table class="table">
						<thead>
							<th><center>Qty.</center></th>
							<th><center>Unit</center></th>
							<th><center>Description</center></th>
							<th><center>Unit Price</center></th>
							<th><center>Amount</center></th>
						</thead>
						<tbody id="table_data"></tbody>
						<tr>
							<td colspan="2" style="background-color: #000;"></td>
							<td style="background-color: #000; color: #fff; text-size: 80%;" id="codeStatus"></td>
							<td style="background-color: #000; color: #fff">Promo Code: <input style="width:80px; color: #000;" id="discCode" type="text" /></td>
							<td id="grandtotal">Amount: </td>
						</tr>
					</table>
					<center>
					<table>
						<tr>
							<th><h4>Account information</h4></th>
							<th><h4>Delivery Details</h4></th>
						</tr>
						<tr>
							<td style="padding-right:100px;">
								<strong>Name: </strong><span id="account-lname-r"></span>, <span id="account-fname-r"></span> <span id="account-mname-r"></span><br>
								<strong>Address: </strong><span id="account-address-r"></span><br>
								<strong>Email: </strong><span id="account-email-r"></span><br>
								<strong>Contact Number: </strong><span id="account-contact-r"></span><br>
							</td>
							<td>
								<strong>Delivery Name: </strong><span id="deliver-to-r"></span><br>
								<strong>Delivery Address: </strong><span id="deliver-address-r"></span><br>
								<strong>Delivery Contact: </strong><span id="deliver-contact-r"></span>
							</td>
						</tr>
					</table><br>
					<center><strong>Mode of Payment: </strong><span id="mop_text"></span></center>
					<center><span id="codNote" style="display: none"><strong>*NOTE: PLEASE PAY EXACT AMOUNT UPON DELIVERY</strong></span></center>
					
					<center><button id="order">ORDER!</order></center>
				</center>
				</div>
			</div>

		</div>
		<div id="editDeliveryDialog" role="dialog" >
			<center>
				<strong><span class="glyphicon glyphicon-pencil"></span> EDIT DELIVERY INFORMATION</strong><br>
			</center><br>
			<div id="dinfo-wrap">
				<span class="dinfo-label">NAME: </span> <br>
				<span class="dinfo-input"><input class="dinfo-input" id="dinfo-name" type="text"><br>
				<span class="dinfo-label">ADDRESS: </span><br> 
				<span class="dinfo-input"><input class="dinfo-input" id="dinfo-address" type="text"></br>
				<span class="dinfo-label">CONTACT NO: </span><br> 
				<span class="dinfo-input"><input class="dinfo-input" id="dinfo-contact" type="text"></br>
			</div><br><br>
			<center>
				<button id="save-dinfo">SAVE</button>
				<button id="close-dinfo">CANCEL</button>
			</center>
		</div>

		<!--<div id="footer" class="site-footer"></div>-->
	</body>
	<style> 
		.link a, .sublink{
			color:#000;
		}
	</style>
</html>
