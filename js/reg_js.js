$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";

	/**************Event Handlers***************/
	$('#signin').click(function(){
		login();
	});

	$('#signup').click(function(){
		signup();
	});


	/***************Functions********************/
	function login(){
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
				alert('Login successful');
			},
			error: function(){
				alert('Invalid username/password. Please try again');
			}
		});
	}

	function signup(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				fname: $('#fname').val(),
				lname: $('#lname').val(),
				email: $('#email').val(),
				pnum: $('#pnum').val(),
				pass: $('#pass').val(),
				type: "account_control",
				action: "signup",
			},success: function(){
				alert('New User Added');
			},error: function(){
				alert('Cannot Add New User')
			}
		});
	}
})