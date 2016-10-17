<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/tires/css/tires.css">
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/tires/js/tires.js"></script>
		<?php 	if(isset($_SESSION['users'][0]['USER_ID']))
					if($_SESSION['users'][0]['USER_TYPE_ID'] == 0 || $_SESSION['users'][0]['USER_TYPE_ID'] == 1) 
						header('location:../admin'); 
		?>
	</head>
	<body>
		<div id="navigation_row"></div>
		<div class="logo"><img src="../assets/logo_altered.png" width="150px;"/></div>
		<div id="tires"></div>
		<div class="page-wrap container"  id="prod-tire">
			<div>
				<div></div>
				<div>
					<h1 class="product_title">TIRES</h1>
					<div id="sidebar-white">
						<h1 class="text-center">SEARCH</h1>
						<input type="text" name="keyword" id="keyword" class="text-center keyword-red"/>
						<br /><br />
						<h4 class="sidebar-font-white text-center">Filter By:</h4>
						<hr class="hr-red">
						<ul id="filters-white">
							<li><!--<a href="#" id="byBrand" class="sort">By Brand</a>-->
								<select id="byBrand" class="sort">
									<option value="">Brand</option>
								</select>
							</li>
							<li><select id="bySize" class="sort">
									<option value="">Size</option>
								</select></li>
							<li><select id="byDesign" class="sort">
									<option value="">Design</option>
								</select></li>
						</ul>
					</div>
					<div id="tire_enum">
					</div>
				</div>
			</div>
		</div>
		<div id="quantityInquiry" role="dialog">
			<form>
				<label>
					Enter number of tires to purchase:
					<input id="qtyPurchased" type="number" value="1" min="1" max="10" step="1" onkeydown="return false;"/><br>
					<input id="selected_id" type="hidden"/>
					<input id="selected_desc" type="hidden"/>
					<input id="selected_price" type="hidden"/>
					<input id="selected_type" type="hidden"/>
					<input id="selected_prod_id" type="hidden"/>
					<input id="selected_item_id" type="hidden"/>
					<input id="selected_item_max" type="hidden"/>
					<button id="sendToCart" type="button">Confirm</button>
					<button id="cancel" type="button">Cancel</button>
				</label>
			</form>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->

	</body>
</html>



