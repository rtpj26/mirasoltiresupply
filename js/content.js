$(function(){
	$('#home, #about_us').height($(window).height());
	var ajaxURL = "php/ajax_service.php";

	/**************Event Handlers***************/
	$('#navigation_row').load('navigation.php');
	//$('#footer').load('footer.php');
	//checklogin();

	$('#logout').click(function(){
		logout();
	})

	$('#signin').click(function(){
		login();
	});

	$('#signup').click(function(){
		signup();
	});


	/***************Functions********************/
	function checklogin(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "account_control",
				action: "checkSessionLoggedIn",
			},
			success: function(element){
				if(element['logged_in'] == true){
					$("#logout").css("display", "block");
		  			$("#account").text("My Account");
				}
			}
		});
	}

	
	function logout(){
		$.ajax({
			type: 'GET',
			url: ajaxURL,
			data:{
				type: "account_control",
				action: "logout",
			}
		});
	}

	function login(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "accont_control",
				action: 'login',
				email: $('#semail').val(),
				pass: $('#spass').val()
			},
			success: function(result){
				$_SESSSION['user'] = result.user_details;
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
				type: 'account_control',
				action: 'signup',
				fname: $('#fname').val(),
				lname: $('#lname').val(),
				email: $('#email').val(),
				pnum: $('#pnum').val(),
				pass: $('#pass').val()
			},
			success: function(){
			},
			error: function(){
			}
		})
	}
})