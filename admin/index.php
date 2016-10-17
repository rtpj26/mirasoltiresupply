<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script language="javascript" type="text/javascript" src="js/admin.js"></script>
	</head>
	<body>
		<div class="page-wrap container"  id="prod-batt">
			<div class="menu-container">
				<div class="row menu-top-margin-10">
					<h1 style="position: absolute; left:5%; top:2%;"><strong>WELCOME BACK <span id="admintype">ADMIN</span></strong></h1>
					<div id="account-link" class="col-md-6">
						<a href="admin.php?link=account">
						<div class="menu-box-1" style="background-color:#666">
							<center>
								<br>
								<img class="menu-box-img" src="../assets/accounts.png" /><br>
								<label>accounts</label><br><br>
								<div width="180px" height="60px" class="amarker" style="background-color:#cc3333; margin-top:-20px;">&nbsp</div>
							</center>
						</div>
						</a>
					</div>
					<div id="inventory-link" class="col-md-6">
						<a href="admin.php?link=inventory">
						<div class="menu-box-1 " style="background-color: #999">
							<center><br>
								<img class="menu-box-img" src="../assets/inventory.png" /><br>
								<label>inventory</label><br><br>
								<div width="180px" height="60px" class="imarker" style="background-color:#cc3333; margin-top:-20px;">&nbsp</div>
							</center>
						</div>
						</a>
					</div>
				</div>

				<div class="row menu-top-margin-10">
					<div id="rescue-link" class="col-md-6">
						<a href="admin.php?link=rescue">
						<div class="menu-box-1 rescue-block" style="background-color:#999">
							<center>
								<br>
								<img class="menu-box-img" src="../assets/rescue.png" /><br>
								<label>rescue</label><br>
								<div width="180px" height="60px" class="rmarker" style="background-color:#cc3333; margin-top:0px;">&nbsp</div>
							</center>
						</div>
						</a>
					</div>
					<div id="comment-link" class="col-md-6">
						<a href="admin.php?link=comments">
						<div class="menu-box-1 " style="background-color: #666">
							<center><br>
								<img class="menu-box-img" src="../assets/comments.png" /><span class="unread_count" id="unread">0</span><br>
								<label>comments</label><br><br>
								<div width="180px" height="60px" class="cmarker" style="background-color:#cc3333; margin-top:-20px;">&nbsp</div>
							</center>
						</div>
					</a>
					</div>
				</div>

				<div class="row menu-top-margin-10">
					<div id="pcode-link" class="col-md-6">
						<a href="admin.php?link=pcode">
						<div class="menu-box-1" style="background-color:#666">
							<center>
								<br>
								<img class="menu-box-img" src="../assets/promocode.png" height="110px"/><br>
								<label>promo code</label><br>
								<div width="180px" height="60px" class="pmarker" style="background-color:#cc3333; margin-top:0px;">&nbsp</div>
							</center>
						</div>
						</a>
					</div>
					<div id="po-link" class="col-md-6">
						<a href="admin.php?link=po">
						<div class="menu-box-1 " style="background-color: #999">
							<center><br>
								<img class="menu-box-img" src="../assets/purchase_order.png" height="110px"/><br>
								<label>purchase order</label><br><br>
								<div width="180px" height="60px" class="pomarker" style="background-color:#cc3333; margin-top:-20px;">&nbsp</div>
							</center>
						</div>
					</a>
					</div>
				</div>


				<div class="row menu-top-margin-10">
					<div id="sales-link" class="col-md-6">
						<a href="admin.php?link=sales">
						<div class="menu-box-1" style="background-color: #999">
							<center>
								<br>
								<img class="menu-box-img" src="../assets/sales.png" height="100px"/><br>
								<label>Sales</label><br>
								<div width="180px" height="60px" class="smarker" style="background-color:#cc3333; margin-top:10px;">&nbsp</div>
							</center>
						</div>
						</a>
					</div>
					<div id="switch-menu-welcome" class="col-md-6 menu3">
						<div style="background-color: #c33"  >
							<center>
								<p><br>welcome<br>back<br></p>
							</center>
						</div>
					</div>
				</div>


			</div>
		</div>
		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
