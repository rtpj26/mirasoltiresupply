<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="css/po.css">
		<script language="javascript" type="text/javascript" src="js/po.js"></script>

		<?php if($_SESSION['users'][0]['USER_TYPE_ID'] == 1) ?>
	</head>
	<body>
		<div class="admin-wrapper">
			<center><h1>ADD NEW PURCHASE ORDER</h1></center>
			<div id="item_selection" style="float:left; width: 48%; margin-right:4%">
				<div id="type-navigation">
					<ul>
						<li id="nav-tire">TIRES</li>
						<li id="nav-wheel">WHEELS</li>
						<li id="nav-battery">BATTERIES</li>
					</ul>
				</div>
				<div id="item-enum">
					<table id="item_enum_table">
					<thead>
						<th width="50%">Description</th>
						<th width="25%">Price</th>
						<th width="25%">Action</th>
					</thead>
					<tbody id="item_enum_body"></tbody>
				</table>
				</div>
			</div>
			<div id="item_list" style="float:left; width:48%;">
				<label>Supplier: </label>
				<input type="text" id="supplier" />
				<table id="item_table">
					<thead>
						<td>Description</td>
						<td>Quantity</td>
						<td>Price</td>
						<td>Total Price</td>
						<td>Action</td>
					</thead>
					<tbody id="item_body"></tbody>
				</table>

				<span style="float: right;">
					<button id="createPO">Create Purchase Order</button>
				</span>
			</div>
		</div>

		<div id="item_qty" role="dialog" style="display: none; overflow: hidden;">
			<label>
				Enter quantity to purchase:
				<input id="qtyPurchased" type="number" value="1" min="1" step="1" onkeydown="return false;"/><br>
				<input id="selected_id" type="hidden"/>
				<input id="selected_desc" type="hidden"/>
				<input id="selected_price" type="hidden"/>
				<input id="selected_type" type="hidden"/>
				<input id="selected_prod_id" type="hidden"/>
				<input id="selected_item_id" type="hidden"/><br>
				<button id="sendToPOCart" type="button">Confirm</button>
				<button id="cancel" type="button">Cancel</button>
			</label>
		</div>
	</body>
</html>
