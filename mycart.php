<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="/mirasoltiresupply/css/mycart.css">
		<script language="javascript" type="text/javascript" src="/mirasoltiresupply/js/mycart.js"></script>
	</head>
	<body>
		<div id="navigation_row"></div>
		<div class="logo"><img src="/mirasoltiresupply/assets/logo_altered.png" width="150px;"/></div>
		<div></div>
		<div class="page-wrap container"  id="mycart">
			<div>
				<div></div>
				<div>
					<h1 class="product_title">MY CART</h1>
				</div>
				<div class="custom-hr">&nbsp</div>
				<center>
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
						<td colspan="4" style="background-color: #000;"></td>
						<td id="grandtotal">Amount: </td>
					</tr>
				</table>

			</center>
			<button id="order">ORDER!</order>
			</div>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
	
</html>
