<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<script language="javascript" type="text/javascript" src="http://mirasoltiresupply.com/admin/js/invoice_edit.js"></script>
		<link rel="stylesheet" type="text/css" href="http://mirasoltiresupply.com/admin/css/invoice_edit.css">
		
	</head>
	<body>
		<div style="height: 30px;"></div>
		<div class="page-wrap container" style="width:80%;">
			<a href="http://mirasoltiresupply.com/admin/admin.php?link=accounts" class="no-print">Back to Account</a>
			<div class="transaction-space">
				<div class="transaction-space">
				<center>
				<h3>MIRASOL TIRE SUPPLY</h3>
				<span>Rizal St., Bacolod City</span><br>
				<strong>ROY ROBERT T. MIRASOL</strong> ~ Prop.<br>
				<span>VAT. Reg. TIN 137-811-765-0000</span><br>
				<span>Tel. No. 432 0871 / 709 6291 Telefax: 433 6123</span>
			</center>
				<span style="padding:10px"><strong>SALES NO:</strong><span id="csr"></span></span>
				<div class="transaction-inner">
					<h1 class="transaction-title" id="gMOPType">SALES INVOICE</h1>
					<hr>
					<span class="small-details">Date Issued:<span id="issueDate"></span></span><br>
					<span class="small-details">Care of: <input type="text" id="issueCO"/></span>
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
						<span>Discount: </span><span id="discount"></span>
						<span id="grandtotal">Amount: <span id="grandTotalAmount"></span></span>
						<br>
						<span>Total Before Discount: </span><span id="subtotal"></span>
						
					</div>
					<div class="other-details">
						<span style="float: left; margin-top:10px">Other Details</span>
						<span style="float: right; margin-top:7px"><strong>By: </strong><input type="text" id="issueBy"/></span><br><br>
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
								<strong id="col2Label1"></strong>
								<span id="col2Value1"></span>
								<br>
								<strong id="col2Label2"></strong>
								<span id="col2Value2"></span>
							</div>
							<div class="od-column3">
								<strong id="col3Label1"></strong>
								<span id="col3Value1"></span>
								<br>
								<strong id="col3Label2"></strong>
								<span id="col3Value2"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="#" id="print" class="no-print" onclick="printPage()">Print this page</a>
			<a href="#" id="updateInvoice" class="no-print" style="float:right;">Save Changes</a>
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
