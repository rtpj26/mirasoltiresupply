$(function(){
	$('#home, #about_us').height($(window).height());


	var ajaxURL = "php/ajax_service.php";

	$('#navigation_row').load('navigation.php');
	$('#footer').load('footer.php');
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
})