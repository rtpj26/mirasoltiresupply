<html>
	<head>
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="css/printable.css">
		<script language="javascript" type="text/javascript" src="js/printable.js"></script>
	</head>
	<body>
		<div id="dimmer" class="no-print">&nbsp</div>
		<div id="preloader" class="no-print">
			<div id="preloader-inner"></div> 
		</div>
		<div id="sales">
			<strong>Monthly Sale: </strong><span id="monthly_sale"></span>
			<br>
			<br>
			<table id="sales_table">
				<thead id="thead-sales">
					<th>ACCT. NAME</th>
					<th>CSR NO.</th>
					<th>DATE</th>
					<th>SUBTOTAL</th>
					<th>DISCOUNT</th>
					<th>AMOUNT</th>
				</thead>
				<tbody id="tbody_sales">
				</tbody>
			</table>
		</div>
		


	</body>
</html>