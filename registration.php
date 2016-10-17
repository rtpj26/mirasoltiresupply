<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php 	

				if(isset($_SESSION['users'][0]['USER_ID'])){
					if($_SESSION['users'][0]['USER_ID'] > 0 && $_SESSION['users'][0]['USER_TYPE_ID'] == 2){
						header('location:http://mirasoltiresupply.com'); 
					}
					else{
						//header("Location: http://".$_SERVER['HTTP_HOST']."/admin", true, 302);
						header('location:http://mirasoltiresupply.com/admin'); 
					}
				}
		?>
		<?php require('required/mtsRequired.php'); ?>
		
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/js/reg_js.js"></script>
	</head>
	<body>
		<div id="navigation_row"></div>
		<div class="page-wrap container" id="reg">
			
			<div id="registration_form">
				<div id="sign_up">
					<form id="sign_up_form" method="POST">
						<h1 class="title">REGISTER</h1>
						<hr>
						<form role="form" id="registration">
							<input class="custom_input_2" type="text" placeholder="FIRST NAME" size="40" name="fname" id="fname" required/><br>
							<input class="custom_input_2" type="text" placeholder="LAST NAME" size="40" name="lname" id="lname" required/><br>
							<input class="custom_input_2" type="email" placeholder="EMAIL" size="40" name="email" id="email"required/><br>
							<input class="custom_input_2" type="text" placeholder="PHONE NUMBER"  size="40" name="pnum" id="pnum" required/><br>

							<input class="custom_input_2" type="text" placeholder="BLK."  size="5" name="address" id="address_blk"/>
							<input class="custom_input_2" type="text" placeholder="LT."  size="5" name="address" id="address_lt"/>
							<input class="custom_input_2" type="text" placeholder="PHASE"  size="14" name="address" id="address_ph"/><br>
							<input class="custom_input_2" type="text" placeholder="ST."  size="10" name="address" id="address_st"/>
							<input class="custom_input_2" type="text" placeholder="SUBD."  size="22" name="address" id="address_subd"/><br>
							<input class="custom_input_2" type="text" placeholder="BRGY."  size="40" name="address" id="address_brgy"/><br>
							<input class="custom_input_2" type="text" placeholder="CITY"  size="40" name="address" id="address_city" required/><br>
							<input class="custom_input_2" type="text" placeholder="PROVINCE"  size="40" name="address" id="address_prov"/><br>
							<input class="custom_input_2" type="text" placeholder="ZIP"  size="40" name="address" id="address_zip"/><br>
							

							<input class="custom_input_2" type="password" placeholder="PASSWORD" size="40" vname="pass" id="pass" required/><br>
							<input class="custom_input_2" type="password" placeholder="VERIFY PASSWORD" size="40" name="vpass" id="vpass" required/><br><br>
							<button type="button" class="reg_button" id="signup">Sign up!</button>
						</form>
					</form>
				</div>
				<div id="sign_in">
					<form id="sign_in_form" method="POST">
						<h1 class="title">/ SIGN IN</h1>
						<hr>
						<form role="form" id="registration">
							<input class="custom_input_3" type="email" id="semail" placeholder="EMAIL" size="40" name="semail" required/><br>
							<input class="custom_input_3" type="password" id="spass" placeholder="PASSWORD"  size="40" name="spass" required/><br><br>
							<button class="si_button" id="signin">Sign in!</button>
							<button type="button" class="si_button_2 rfloat">Forgot Password</button>
						</form>
				</div>
			</div>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
