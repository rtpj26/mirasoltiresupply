$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		},
		success: function(result){
			if(!result.logged_in){
				$('#sign-in-label').text('SIGN IN');
				$('#sign-in-fname').text('');
				$('#sign-in-email').text('');
				$('#sign-in-fname').text('');
			    $('#sign-in-email').text('');
			    $('#account-id').text('');
			    $('#account-lname').text('');
			    $('#account-fname').text('');
			    $('#account-mname').text('');
			    $('#account-address').text('');
			    $('#account-email').text('');
				$('#account-gender').text('');
			   $('#account-contact').text('');
			}else{
				$('#sign-in-label').text('SIGNED IN AS');
				$.each(result.u_details, function(i, item) {
				   $('#sign-in-fname').text(item.USER_FNAME);
				   $('#sign-in-email').text(item.USER_EMAIL);
				   $('#account-id').text(item.USER_ID);
				   $('#account-lname').text(item.USER_LNAME);
				   $('#account-fname').text(item.USER_FNAME);
				   $('#account-mname').text(item.USER_M_INITIAL);
				   $('#account-address').text(item.USER_ADDRESS);
				   $('#account-email').text(item.USER_EMAIL);
				   if(item.USER_GENDER == 0)
						$('#account-gender').text("MALE");
					else
						$('#account-gender').text("FEMALE");
				   $('#account-contact').text(item.USER_CONTACT_NO);
				   $('#deliver-to').text(item.USER_FNAME + ' ' + item.USER_M_INITIAL + '. ' + item.USER_LNAME);
					$('#deliver-address').text(item.USER_ADDRESS);

				})
			}
		}

	});
})
