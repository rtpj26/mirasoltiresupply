<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/batteries/css/batteries.css">
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/batteries/js/batteries.js"></script>
		<?php 	if(isset($_SESSION['users'][0]['USER_ID']))
					if($_SESSION['users'][0]['USER_TYPE_ID'] == 0 || $_SESSION['users'][0]['USER_TYPE_ID'] == 1) 
						header('location:http://mirasoltiresupply.com/admin'); 
		?>
	</head>
	<body>
		<div id="navigation_row"></div>
		<div class="logo"><img src="http://mirasoltiresupply.com/assets/logo_altered.png" width="150px;"/></div>
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
							<li><select id="byBrand" class="sort">
									<option value="">Brand</option>
								</select></li>
							<li><select id="byPlates" class="sort">
									<option value="">Plates</option>
								</select></li>
						</ul>
					</div>
					<div id="batt_enum"></div>

				</div>
			</div>
		</div>

		<div id="quantityInquiry" role="dialog">
			<form>
				<label>
					Enter number of batteries to purchase:
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
