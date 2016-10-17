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
		<div class="logo"><img src=" /home/mirasolt/public_html/assets/logo_altered.png" /></div>
		<div id="batteries"></div>
		<div class="page-wrap container"  id="prod-batt">
			<div>
				<div></div>
				<div>
					<h1 class="product_title">BATTERIES</h1>
					<div id="sidebar">
						<h1 class="text-center">SEARCH</h1>
						<input type="text" name="keyword" id="keyword" class="text-center"/>
						<br /><br />
						<h4 class="sidebar-font text-center">Filter By:</h4>
						<hr>
						<ul id="filters">
							<li>By Brand</li>
							<li>By Maintenance</li>
							<li>By Plates</li>
						</ul>
					</div>
					<div id="batt_enum"></div>

				</div>
			</div>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
		<!--Override-->
		<style> 
			.link a{
				color:#fff;
			}

			.sublink{
				color: #000;
			}
		</style>
	</body>
</html>
