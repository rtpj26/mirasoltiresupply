<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/css/mycart.css">
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/js/mycart.js"></script>
		<?php 	if(isset($_SESSION['users'][0]['USER_ID']))
					if($_SESSION['users'][0]['USER_TYPE_ID'] == 0 || $_SESSION['users'][0]['USER_TYPE_ID'] == 1) 
						header('location:http://mirasoltiresupply.com/admin'); 
		?>
	</head>
	<body>
		<div id="navigation_row"></div>
		<div class="logo"><img src="http://mirasoltiresupply.com/assets/logo_altered.png" width="150px;"/></div>
		<div></div>
		<div class="page-wrap container"  id="mycart"></div>
			<div>
				<div></div>
				<div>
					<h1 class="product_title">MY CART</h1>
				</div>
				<div class="custom-hr">&nbsp</div>
				<center>
				<div style="overflow:auto; max-height:400px;">
				<table class="table">
					<thead>
						<th><center>Qty.</center></th>
						<th><center>Unit</center></th>
						<th><center>Description</center></th>
						<th><center>Unit Price</center></th>
						<th><center>Amount</center></th>
						<th><center>Actions</center></th>
					</thead>
					<tbody id="table_data"></tbody>
					<tr>
						<td colspan="4" style="background-color: #000;"></td>
						<td id="grandtotal">Amount: </td>
						<td style="background-color: #000;"></td>
					</tr>
				</table>
			</div>
			</center>
			<button id="wishlist" type="button" style="color:#fff; text-decoration: none;">ADD TO WISHLIST</button>
			
			<button id="order" style="color:#fff; text-decoration: none;">ORDER!</button>
			</div>
		
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
	
</html>
