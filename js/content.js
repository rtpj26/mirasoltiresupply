$(function(){
	$('#home, #about_us').height($(window).height());
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";

	/**************Event Handlers***************/
	$('#navigation_row').load('/mirasoltiresupply/navigation.php');
	//$('#footer').load('footer.php');
	checklogin();

	$(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
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
		  			$('#account').attr("href", "/mirasoltiresupply/account/index.php");
				}else{
					$('#logout').css("display", "none");
				}
			}
		});
	}


})