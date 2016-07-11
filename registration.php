<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
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
							<input class="custom_input_2" placeholder="NAME" size="40" name="name" required/><br>
							<input class="custom_input_2" placeholder="EMAIL" size="40" name="email" required/><br>
							<input class="custom_input_2" placeholder="PHONE NUMBER"  size="40" name="pnum" required/><br>
							<input class="custom_input_2" placeholder="PASSWORD" size="40" vname="pass" required/><br>
							<input class="custom_input_2" placeholder="VERIFY PASSWORD" size="40" name="vpass" required/><br><br>
							<button class="reg_button">Sign up!</button>
						</form>
					</form>
				</div>
				<div id="sign_in">
					<form id="sign_in_form" method="POST">
						<h1 class="title">/ SIGN IN</h1>
						<hr>
						<form role="form" id="registration">
							<input class="custom_input_3" placeholder="EMAIL" size="40" name="semail" required/><br>
							<input class="custom_input_3" placeholder="PHONE NUMBER"  size="40" name="spass" required/><br><br>
							<button class="si_button">Sign in!</button>
							<button class="si_button_2 rfloat">Forgot Password</button>
						</form>
				</div>
			</div>
		</div>
		<div id="footer" class="site-footer"></div>
	</body>
</html>
