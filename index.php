<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php');?>
		<?php 	if(isset($_SESSION['users'][0]['USER_ID']))
					if($_SESSION['users'][0]['USER_TYPE_ID'] == 0 || $_SESSION['users'][0]['USER_TYPE_ID'] == 1) 
						header('location: ./admin'); 
		?>
	</head>
	<body>
		<script>
		var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
		$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'account_control',
					action: 'checkSessionLoggedIn'
				}, success: function(result){
					if(result.isAdmin){
						window.location.replace("http://mirasoltiresupply.com/admin/");
					}
				}, async: false
			})
		</script>
		<div class="page-wrap">
			<div id="home">
				<div id="navigation_row"></div>
				<div class="md20">
					<p class="sdlink text-center" id="cu_link" style="position:absolute; bottom: 0px;left:48%">
						<a href="#about_us">
							ABOUT US<br>
							<span class="glyphicon glyphicon-menu-down"></span>
						</a>
					</p>
				</div>
			</div>

			<div id="about_us">
				<div class="md20">
					<p class="sulink text-center" id="nr_link">
						<a href="#navigation_row">
							<span class="glyphicon glyphicon-menu-up"></span><br>
							HOME
						</a>
					</p>
				</div>
				<div id="aboutus_content">
					<center><h1>ABOUT US</h1></center>
					<p>Mirasol Tire Supply is a dealer of tires,batteries, parts and accessories since 1976.
						The owner, Mr. Roberto S. Mirasol, married Haydee F. Tan, began as a used tire dealer at
						the corner of Rizal and Locsin Sts. He rented a place right beside his wife's drug store (Far-
						maia Juarez) and started selling second hand tires. Back then, the price of new tires are so
						expensive that only 10% of the populace can afford to buy. New cars are seldom seen on
						the streets. As time passed, an old lumber yard, beside the store move out, and he took
						over the bodega. As a respected tire dealer in Bacolod. Mirasol Tire Supply was a priority
						tire dealer when Goodyear, Firestone and BF Goodrich began selling new tires.
						Yokohama, a Japanese tire manufacturer, also us the exclusive distributor in Bacolod.
					</p>
				</div>
				<div class="md20">
					<p class="sdlink text-center" id="cu_link" >
						<a href="#contact_us">
							Contact Us<br>
							<span class="glyphicon glyphicon-menu-down"></span>
						</a>
					</p>
				</div>
			</div>

			<div id="contact_us">
				<div class="md20">
					<p class="sulink text-center" id="au_link_2">
						<a href="#about_us">
							<span class="glyphicon glyphicon-menu-up"></span><br>
							About us
						</a>
					</p>
				</div>

				<div id="contact_us_content">
					<h1>Contact Us</h1>
					<form role="form" id="cu_frm">
						<input class="custom_input_f" type="text" name="cu_name" id="cu_name" placeholder="Name*" size="48" required/><br>
						<input class="custom_input" type="text" name="cu_email" id="cu_email" placeholder="E-mail*" size="48" required/><br>
						<input class="custom_input" type="text" name="cu_pnum" id="cu_pnum" placeholder="Phone Number*" size="48" required/><br>
						<textarea class="custom_input" type="text" name="cu_message" id="cu_message"cols="50" rows="4" placeholder="Message*" required/></textarea><br>
						<button class="cu_button" id="cu_button">Send</button>
					</form>
				</div>

				<div class="md20">
					<p class="sdlink text-center" id="loc_link">
						<a href="#location">
							Location<br>
							<span class="glyphicon glyphicon-menu-down"></span>
						</a>
					</p>
				</div>
			</div>

			<div id="location">
				<div class="md20">
					<p class="sulink text-center" id="cu_link_2">
						<a href="#contact_us">
							<span class="glyphicon glyphicon-menu-up"></span><br>
							Contact Us
						</a>
					</p>
				</div><br>

				<div id="location_content" class="row">
					<div class="col-md-1"></div>
					<div class="col-md-4">
						<h3>Store Location</h3>
						<p>Rizal Street<br>
							Bacolod City<br>
							Negros Occidental<br><br>
							info@mirasoltiresupply.com<br>
							+63(43) 433 - 6123
						</p><br><br>
						<h3>Store Hours</h3>
						<p>Mon - Fri<br>
							7:30 AM - 6:00 PM<br>
							Saturday<br><br>
							8:00 AM - 5:00 PM
						</p>
					</div>
					<div class="col-md-4">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.846205188782!2d122.94595781422517!3d10.669043192394442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed1b3cb2e2fe7%3A0x4c3ca735458a4310!2sMirasol+Tire+Supply!5e0!3m2!1sen!2sph!4v1475222494927" width="500" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>

					</div><br><br>
					<div class="col-md-3"></div>
				</div>
			</div>
		</div>
		<img src="./assets/back-top.png" class="scrollup" />
		<div id="footer"></div>
	</body>
	<style> 
		.link a, .sublink{
			color:#000;
		}

		.glyphcontrol{
			color: #fff;
		}
	</style>


</html>
