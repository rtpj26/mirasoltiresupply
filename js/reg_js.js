$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";

	/**************Event Handlers***************/
	$('#signin').click(function(e){
		e.preventDefault(); 
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "account_control",
				action: 'login',
				semail: $('#semail').val(),
				spass: $('#spass').val()
			},
			success: function(result){
				if(result.logged_in){
					alert('Login successful');
					if(result.isAdmin) window.location.replace("http://mirasoltiresupply.com/admin");
					else window.location.replace("http://mirasoltiresupply.com");
					
				}else{
					alert('incorrect credentials');
				}
			},
			error: function(){
				alert('Invalid username/password. Please try again');
			}
		});
	});


	$('#signup').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				fname: $('#fname').val(),
				lname: $('#lname').val(),
				email: $('#email').val(),
				pnum: $('#pnum').val(),
				pass: $('#pass').val(),
				blk: $('#address_blk').val(),
				lt: $('#address_lt').val(),
				phase: $('#address_ph').val(),
				street: $('#address_st').val(),
				subd: $('#address_subd').val(),
				brgy: $('#address_brgy').val(),
				city: $('#address_city').val(),
				prov: $('#address_prov').val(),
				zip: $('#address_zip').val(),
				type: "account_control",
				action: "signup",
			},success: function(){
				alert('New User Added');
			},error: function(){
				alert('New User Added')
			}
		});
	});


})