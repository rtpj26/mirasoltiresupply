<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/admin/js/po_bill.js"></script>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/admin/css/po_bill.css">
		
	</head>
	<body>
		<div style="height: 30px;"></div>
		<div class="page-wrap container" style="width:80%;">
			<a href="http://mirasoltiresupply.com/admin/admin.php?link=po" class="no-print">Back to Purchase Orders</a>
			<div class="transaction-space">
				<div class="transaction-space">
				<center>
				<h3>MIRASOL TIRE SUPPLY</h3>
				<span>Rizal St., Bacolod City</span><br>
				<strong>ROY ROBERT T. MIRASOL</strong> ~ Prop.<br>
				<span>VAT. Reg. TIN 137-811-765-0000</span><br>
				<span>Tel. No. 432 0871 / 709 6291 Telefax: 433 6123</span>
				</center>
				<span style="padding:10px"><strong>BILL NO:</strong><span id="csr"></span></span>
				<div class="transaction-inner">
					<h1 class="transaction-title" id="gMOPType">PURCHASE BILL</h1>
					<hr>
					<span class="small-details">Date Issued: <span id="issueDate"></span></span><br>
					<span class="small-details">Supplier: <span id="supplierText"></span></span><br>
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
					<div id="transaction-note" style="margin-bottom: 20px;">
						<span id="grandtotal">Amount: <span id="grandTotalAmount"></span></span>
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
