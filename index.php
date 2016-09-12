<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
	</head>
	<body>
		<div class="page-wrap">
			<div id="home">
				<div id="navigation_row"></div>
				<p class="sdlink text-center container" id="au_link">
					<a href="#about_us">ABOUT US<br>
						<span class="glyphicon glyphicon-menu-down"></span>
					</a>
				</p>
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
					<p class="sdlink text-center" id="cu_link">
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
						<img src="/mirasoltiresupply/assets/54LOCATION.jpg" width="500px"/><br><br>
						<img src="/mirasoltiresupply/assets/map.jpg" width="500px"/>
					</div><br><br>
					<div class="col-md-3"></div>
				</div>
			</div>
		</div>
		<img src="/mirasoltiresupply/assets/back-top.png" class="scrollup" />
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
