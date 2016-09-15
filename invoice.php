<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('required/mtsRequired.php'); ?>
		<script language="javascript" type="text/javascript" src="/mirasoltiresupply/js/invoice.js"></script>
		<link rel="stylesheet" type="text/css" href="/mirasoltiresupply/css/invoice.css">
	</head>
	<body>
		<div style="height: 30px;"></div>
		<div class="page-wrap container" style="width:80%;">
			<div class="transaction-space">
				<div class="transaction-inner">
					<h1 class="transaction-title">TRANSACTIONS</h1>
					<hr>
					<span class="small-details">Date Issued:<span id="issueDate"></span></span>
					<br>
					<table>
						<thead>
							<th class="th-sm">Qty</th>
							<th class="th-sm">Unit</th>
							<th class="th-lg">Description</th>
							<th class="th-sm">Unit Price</th>
							<th class="th-sm">Amount</th>
						</thead>
						<tbody id="table_data"></tbody>
					</table>
					<div id="transaction-note">
						<span>By:</span>
						<span id="grandtotal">Amount</span>
					</div>
					<div class="other-details">
						<span>Other Details</span>
						<hr id="smallhr">
						<div class="other-details-details">
							<div class="od-column1">
								<strong>Mode: </strong>
								<span id="mop"></span>
								<br>
								<strong>Amount: </strong>
								<span id="amnt"></span>
							</div>
							<div class="od-column2">
								<strong>Mode: </strong>
								<span id="mop"></span>
								<br>
								<strong>Amount: </strong>
								<span id="amnt"></span>
							</div>
							<div class="od-column3">
								<strong>Mode: </strong>
								<span id="mop"></span>
								<br>
								<strong>Amount: </strong>
								<span id="amnt"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="#" id="print" class="no-print" onclick="printPage()">Print this page</a>
			<script>
			function printPage(){
				window.print();
			}
			</script>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
	<style> 
		.link a, .sublink{
			color:#000;
		}
	</style>
</html>
