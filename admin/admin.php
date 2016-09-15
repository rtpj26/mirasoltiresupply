<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="css/admin_main.css">
		<script language="javascript" type="text/javascript" src="js/admin_main.js"></script>
	</head>
	<body>
		<div class="admin-wrapper">
			<div class="admin-left-nav">
				<img src="/mirasoltiresupply/assets/logo_altered_red.png" width="200px">
				<ul>
					<li><a href="index.php">DASHBOARD</a></li>
					<li id="rescue_link">RESCUE</li>
					<li id="comments_link" class="active">COMMENTS</li>
					<li id="inventory_link">INVENTORY</li>
					<li id="accounts_link">ACCOUNTS</li>
				</ul>
			</div>

			<div class="admin-main-content">

				<div id="inventory">
					<div>
						<h1><strong>INVENTORY <img src="/mirasoltiresupply/assets/inventory.png" height="45px"></strong></h1>
					</div>
					<br>
					<div>
						<div class="inv-col" id="tire-link">
							<center><img src="/mirasoltiresupply/assets/tire.png" width="190px"/><br>
							<h3>TIRES</h3></center>
						</div>
						<div class="inv-col" id="wheel-link">
							<center><img src="/mirasoltiresupply/assets/wheel.png" width="190px"/><br>
							<h3>WHEELS</h3></center>
						</div>
						<div class="inv-col" id="battery-link">
							<center><img src="/mirasoltiresupply/assets/battery.png" width="190px"/><br>
							<h3>BATTERIES</h3></center>
						</div>
					</div>	
					<div class="inventory-home-adj">&nbsp</div>
				</div>

				<div id="tires-panel">
					<div id="tire-search-bar">
						<input type="text" class="tire-input" id="tire-keyword" />
						<button class="tire-search-button">SEARCH</button>
					</div>
					<table id="tire-table">
						<thead>
							<th>RIM</th>
							<th>SIZE</th>
							<th>LI/SS</th>
							<th>BRAND</th>
							<th>DESIGN</th>
						</thead>
						<tbody id="tbody_tires">
						</tbody>
					</table>
				</div>

				<div id="accounts">
					<h1><strong>CUSTOMER ACCOUNTS</strong></h1>
					<table id="customer-accounts">
						<thead>
							<th>ACCOUNT ID</th>
							<th>NAME</th>
							<th>CONTACT NUMBER</th>
						</thead>
						<tbody id="tbody_accounts">
						</tbody>
					</table>
					
				</div>
				<div id="comments">
					<h1><strong>COMMENTS</strong></h1>
					<h4><strong>RECENT</strong></h4>
					<table id="recent_comment">
						<thead>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>PHONE</th>
						</thead>
						<tbody id="tbody_recent">
						</tbody>
					</table>
					<input type="text" class="searchComment" id="keyword"/>
					<button id="searchButton">SEARCH</button>
					<br>
					<table id="all_comment">
						<thead>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>PHONE</th>
						</thead>
						<tbody id="tbody_all">
						</tbody>
					</table>
				</div>
			</div>

			<div id="comment_dialog" role="dialog">
				<span id="comment_value"></span>
			</div>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
