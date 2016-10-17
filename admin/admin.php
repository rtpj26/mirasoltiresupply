<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
   		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<?php require('../required/mtsRequired.php'); ?>
		<link rel="stylesheet" type="text/css" href="css/admin_main.css">
		<script language="javascript" type="text/javascript" src="js/admin_main.js"></script>
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.js"></script>
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.time.js"></script>
		<script language="javascript" type="text/javascript" src="../js/jquery.flot.selection.js"></script>

		<?php if($_SESSION['users'][0]['USER_TYPE_ID'] == 1) ?>
	</head>
	<body>
		<div class="admin-wrapper">
			<div class="admin-left-nav">
				<img src="http://mirasoltiresupply.com/assets/logo_altered_red.png" width="130px">
				<ul>
					<li><a href="index.php">DASHBOARD</a></li>
					<li href="rescue" id="rescue_link">RESCUE</li>
					<li href="comments" id="comments_link">COMMENTS</li>
					<li href="inventory" id="inventory_link">INVENTORY</li>
					<li href="accounts" id="accounts_link">ACCOUNTS</li>
					<li href="sales" id="sales_link">SALES</li>
					<li href="promo_code" id="pcode_link">PROMO CODE</li>
					<li href="po" id="po_link">PURCHASE ORDER</li>
				</ul>
			</div>

			<div class="admin-main-content">
				

				<div id="inventory">
					<div>
						<h1><strong>INVENTORY <img src="http://mirasoltiresupply.com/assets/inventory.png" height="45px"></strong></h1>
					</div>
					<br>
					<div>
						<div class="inv-col" id="tire-link">
							<center><img src="http://mirasoltiresupply.com/assets/tire.png" width="190px"/><br>
							<h3>TIRES</h3></center>
						</div>
						<div class="inv-col" id="wheel-link">
							<center><img src="http://mirasoltiresupply.com/assets/wheel.png" width="190px"/><br>
							<h3>WHEELS</h3></center>
						</div>
						<div class="inv-col" id="battery-link">
							<center><img src="http://mirasoltiresupply.com/assets/battery.png" width="190px"/><br>
							<h3>BATTERIES</h3></center>
						</div>
					</div>	
					<div class="inventory-home-adj">&nbsp</div>
				</div>
				<div id="account_details">
					<strong><h1 id="account_detail_name"></h1></strong>
					<br>
					<div id="address_title">
						<span>ADDRESS</span>
					</div><br>
					<address id="account_address"></address>
					<div id="transaction_title">
						<span>TRANSACTIONS</span>
					</div>
					<table id="transaction-table">
						<thead id="transaction-accounts">  
							<th>DATE</th>
							<th>MODE</th>
							<th>STATUS</th>
							<th class='hideable'>ACTIONS</th>
						</thead>
						<tbody id="transaction-tbody"></tbody>
					</table>

				</div>
				<div id="tires-panel">
					<button type="button" id="addTire" class="hideable" style="float:left; background-color: #fff; border-style: none; color: #cc3333;"><span class="glyphicon glyphicon-plus"></span> New Tire</button>
					<div id="tire-search-bar">
						<input type="text" class="tire-input" id="tire-keyword" />
						<button class="tire-search-button">SEARCH</button>
					</div>
					<table id="tire-table">
						<thead>
							<th>SIZE</th>
							<th>RIM</th>
							
							<th>LI/SS</th>
							<th>BRAND</th>
							<th>DESIGN</th>
							<th>PRICE</th>
							<th>QTY</th>
							<th class="hideable">ACTIONS</th>
						</thead>
						<tbody id="tbody_tires">
						</tbody>
					</table>
				</div>

				<div id="wheels-panel">
					<button type="button" id="addWheel" class="hideable" style="float:left; background-color: #fff; border-style: none; color: #cc3333;"><span class="glyphicon glyphicon-plus"></span> New Wheel</button>
					
					<div id="wheel-search-bar">
						<input type="text" class="wheel-input" id="wheel-keyword" />
						<button class="wheel-search-button">SEARCH</button>
					</div>
					<table id="wheel-table">
						<thead>
							<th>RIM</th>
							<th>BRAND</th>
							<th>COLOR</th>
							<th>HOLES</th>
							<th>QTY</th>
							<th>PRICE</th>
							<th class="hideable">ACTIONS</th>
						</thead>
						<tbody id="tbody_wheels">
						</tbody>
					</table>
				</div>

				<div id="batteries-panel">
					<button type="button" id="addBattery" class="hideable" style="float:left; background-color: #fff; border-style: none; color: #cc3333;"><span class="glyphicon glyphicon-plus"></span> New Battery</button>
					
					<div id="batteries-search-bar">
						<input type="text" class="batteries-input" id="batteries-keyword" />
						<button class="batteries-search-button">SEARCH</button>
					</div>
					<table id="batteries-table">
						<thead>
							<th>DESCRIPTION</th>
							<th>PLATES</th>
							<th>QTY</th>
							<th>PRICE</th>
							<th class="hideable">ACTIONS</th>
						</thead>
						<tbody id="tbody_batteries">
						</tbody>
					</table>
				</div>


				<div id="rescue-panel">
					<div id="rescue-search-bar">
						<!--<input type="text" class="batteries-input" id="batteries-keyword" />-->
						<h1>RESCUE</h1>
						<!--<button class="batteries-search-button">SEARCH</button>-->
					</div>
					<table id="rescue-table">
						<thead>
							<th>RESCUE CSR</th>
							<th>RESCUE NAME</th>
							<th>RESCUE DATE</th>
							<th>RESCUE CONTACT</th>
							<th>RESCUE REQUEST</th>
							<th>LOCATION</th>
							<th>STATUS</th>
							
						</thead>
						<tbody id="tbody_rescue">
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

				<div id="promo_code">
					<h1><strong>PROMO CODES</strong></h1>
					<button type="button" id="addpCode" class="hideable" style="float:left; background-color: #fff; border-style: none; color: #cc3333;"><span class="glyphicon glyphicon-plus"></span> New Promo Code</button>
					<br><table id="promo_code_list">
						<thead id="thead-pcode">
							<th>PROMO CODE</th>
							<th>DISCOUNT VALUE</th>
							<th>START DATE</th>
							<th>END DATE</th>
							<th class="hideable">ACTIONS</th>
						</thead>
						<tbody id="tbody_pcodes">
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
							<th>MESSAGE</th>
							<th action="hideable">ACTION</th>
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
							<th>MESSAGE</th>
							<th action="hideable">ACTION</th>
						</thead>
						<tbody id="tbody_all">
						</tbody>
					</table>
				</div>
				<div id="sales">
					<h1><strong>SALES REPORT</strong></h1>
					<div id="sales_column">
						<center>Generate report for</center><br>
						<center>
								<select id="month">
									<option value="1">January</option>
									<option value="2">February</option>
									<option value="3">March</option>
									<option value="4">April</option>
									<option value="5">May</option>
									<option value="6">June</option>
									<option value="7">July</option>
									<option value="8">August</option>
									<option value="9">September</option>
									<option value="10">October</option>
									<option value="11">November</option>
									<option value="12">December</option>
								</select>
								<select id="year"></select>
						</center>
						<br>
						<center><strong><span id="switch_graph"><span class="glyphicon glyphicon-object-align-bottom"></span>Switch to Graph</span> | <span id="print"><span class="glyphicon glyphicon-print"></span>Print Report</span> | Monthly Sale: </strong><span id="monthly_sale"></span></center>
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
					<div id="sales_graph">
						<center><strong><span id="switch_table"><span class="glyphicon  glyphicon-list"></span>Switch to Table</span></strong> </center>
						
						<div id="monthly_graph" style="width: 95%; height: 300px;"></div>
						<div id="yearly_graph" style="width: 95%; height: 300px;"></div>
					</div>
				</div>


				<div id="popanel">
					<h1><strong>PURCHASE ORDER</strong></h1>
					<center><strong><a href="po.php" id="add_po" class="hideable"><span class="glyphicon glyphicon-plus"></span>CREATE NEW PURCHASE ORDER</a></strong></center>
						
					<table id="po_table">
							<thead id="thead-po">
								<th>VP NO.</th>
								<th>DATE</th>
								<th>AMOUNT</th>
								<th>ACTION</th>
							</thead>
							<tbody id="tbody_po">
							</tbody>
						</table>
				</div>


			</div>
			
			
			<div id="comment_dialog" role="dialog">
				<span id="comment_value"></span>
				<button class="close-diag" style="display: none">Close</button>
			</div>

			<div id="updateTire" role="dialog">
				<div class="divWrap">
					<input id="id_tedit" type="hidden" />
					<input id="pid_tedit" type="hidden" />
					<label>SIZE:</label><br>
					<input id="size_tedit" type="text" class="editClass"/>
					<br>
					<label>RIM:</label><br>
					<input id="rim_tedit" type="text" class="editClass"/>
					<br>
					<label>LI/SS:</label><br>
					<input id="liss_tedit" type="text" class="editClass"/>
					<br>
					<label>BRAND:</label><br>
					<input id="brand_tedit" type="text" class="editClass"/>
					<br>
					<label>DESIGN:</label><br>
					<input id="design_tedit" type="text" class="editClass"/>
					<br>
					<label>QTY:</label><br>
					<input id="qty_tedit" type="number" min="0" class="editClass"/>
					<br>
					<label>PRICE:</label><br>
					<input id="price_tedit" type="number" class="editClass"/>
					<br><br>
					<button type="button" id="saveTire">SAVE</button>
					<button type="button" id="cancelsaveTire">CANCEL</button>
				</div>
			</div>
			<div id="updateWheel" role="dialog">
				<div class="divWrap">
					<input id="id_wedit" type="hidden" />
					<input id="pid_wedit" type="hidden" />
					<label>RIM:</label><br>
					<input id="rim_wedit" type="text" class="editClass"/>
					<br>
					<label>BRAND:</label><br>
					<input id="brand_wedit" type="text" class="editClass"/>
					<br>
					<label>COLOR:</label><br>
					<input id="color_wedit" type="text" class="editClass"/>
					<br>
					<label>HOLES:</label><br>
					<input id="holes_wedit" type="text" class="editClass"/>
					<br>
					<label>QTY:</label><br>
					<input id="qty_wedit" type="number" min="0" class="editClass"/>
					<br>
					<label>PRICE:</label><br>
					<input id="price_wedit" type="number" class="editClass"/>
					<br>
					<button type="button" id="saveWheel">SAVE</button>
					<button type="button" id="cancelsaveWheel">CANCEL</button>
				</div>
			</div>
			<div id="updateBattery" role="dialog">
				<div class="divWrap">
					<input id="id_bedit" type="hidden" />
					<input id="pid_bedit" type="hidden" />
					<label>DESCRIPTION:</label><br>
					<input id="description_bedit" type="text" class="editClass"/>
					<br>
					<label>PLATES:</label><br>
					<input id="plates_bedit" type="text" class="editClass"/>
					<br>
					<label>QTY:</label><br>
					<input id="qty_bedit" type="number" class="editClass"/>
					<br>
					<label>QTY:</label><br>
					<input id="price_bedit" type="number" min="0" class="editClass"/>
					<br>	
					<button type="button" id="saveBattery">SAVE</button>
					<button type="button" id="cancelsaveBattery">CANCEL</button>
				</div>
			</div>

			<div id="addTirePanel" role="dialog" style="display: none; overflow-x: hidden">

				<label>Price per unit: </label><br>
				<input id="at_ppu" type="text" class="editClass"/><br>
				<input id="at_stock" type="hidden" value="0" class="editClass"/><br>
				<label>RIM: </label><br>
				<input id="at_rim" type="text" class="editClass"/><br>
				<label>SIZE: </label><br>
				<input id="at_size" type="text" class="editClass"/><br>
				<label>LI/SS: </label><br>
				<input id="at_liss" type="text" class="editClass"/><br>
				<label>BRAND: </label><br>
				<input id="at_brand" type="text" class="editClass"/><br>
				<label>DESIGN: </label><br>
				<input id="at_design" type="text" class="editClass"/><br><br>
				<button type="button" id="save_addTire">SAVE</button>
				<button type="button" id="cancel_addTire">CANCEL</button>
			</div>

			<div id="addWheelPanel" role="dialog" style="display: none; overflow-x: hidden">

				<label>Price per unit: </label><br>
				<input id="aw_ppu" type="text" class="editClass"/><br>
				<input id="aw_stock" type="hidden" value = "0" class="editClass"/><br>
				<label>RIM: </label><br>
				<input id="aw_rim" type="text" class="editClass"/><br>
				<label>BRAND: </label><br>
				<input id="aw_brand" type="text" class="editClass"/><br>
				<label>COLOR: </label><br>
				<input id="aw_color" type="text" class="editClass"/><br>
				<label>HOLES: </label><br>
				<input id="aw_holes" type="number" class="editClass"/><br>
				<button type="button" id="save_addWheel">SAVE</button>
				<button type="button" id="cancel_addWheel">CANCEL</button>
			</div>

			<div id="addBatteryPanel" role="dialog" style="display: none; overflow-x: hidden">

				<label>Price per unit: </label><br>
				<input id="ab_ppu" type="text" class="editClass"/><br>
				<input id="ab_stock" type="hidden" value="0" class="editClass"/><br>
				<label>TYPE: </label><br>
				<input id="ab_type" type="text" class="editClass"/><br>
				<label>DESCRIPTION: </label><br>
				<input id="ab_description" type="text" class="editClass"/><br>
				<label>PLATES: </label><br>
				<input id="ab_plates" type="number" class="editClass"/><br>
				<button type="button" id="save_addBattery">SAVE</button>
				<button type="button" id="cancel_addBattery">CANCEL</button>
			</div>

			<div id="addPromoCodePanel" role="dialog" style="display: none; overflow-x: hidden">
				<label>Promo Code:</label><br>
				<input id="apc_pc" type="text" class="editClass"/><br>
				<label>Discount Value: </label><br>
				<select id="apc_discountValue">
					<option value="5.00">5%</option>
					<option value="10.00">10%</option>
				</select><br>
				<label>Start Date: </label><br>
				<input id="apc_start" type="date" class="editClass"/><br>
				<label>End Date: </label><br>
				<input id="apc_end" type="date" class="editClass"/><br>
				
				<button type="button" id="save_addpCode">SAVE</button>
				<button type="button" id="cancel_addpCode">CANCEL</button>
			</div>

			<div id="editPromoCodePanel" role="dialog" style="display: none; overflow-x: hidden">
				<input id="epc_pid" type="hidden" class="editClass"/><br>
				<label>Promo Code:</label><br>
				<input id="epc_pc" type="text" class="editClass"/><br>
				<label>Discount Value: </label><br>
				<select id="epc_discountValue">
					<option value="5.00">5%</option>
					<option value="10.00">10%</option>
				</select><br>
				<label>Start Date: </label><br>
				<input id="epc_start" type="date" class="editClass"/><br>
				<label>End Date: </label><br>
				<input id="epc_end" type="date" class="editClass"/><br>
				
				<button type="button" id="save_editpCode">SAVE</button>
				<button type="button" id="cancel_editpCode">CANCEL</button>
			</div>


		</div>


		<!--<div id="footer" class="site-footer"></div>-->
	</body>
</html>
