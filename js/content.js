$(function(){
	$('#home, #about_us').height($(window).height());
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";

	/**************Event Handlers***************/
	$('#navigation_row').load('http://mirasoltiresupply.com/navigation.php');
	$('#footer').load('footer.php');
	checklogin();

    $.ajax({
        type: 'POST',
        url: ajaxURL,
        data:{
            type: 'session',
            action: 'countCart'
        }, success: function(result){
            $('#cart_count').text(result.qty);
        }
    })
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

    $('#cu_button').click(function(){
    	var cu_name = $('#cu_name').val();
    	var cu_email = $('#cu_email').val();
    	var cu_pnum = $('#cu_pnum').val();
    	var cu_msg = $('#cu_message').val();
    	$.ajax({
    		type: 'POST',
    		url: ajaxURL,
    		data:{
    			type: 'comments',
    			action: 'addComment',
    			name: cu_name,
    			email: cu_email,
    			pnum: cu_pnum,
    			msg: cu_msg
    		},success: function(){
    			alert('Comment Sent');
    		}
    	});
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
		  			$('#account').attr("href", "http://mirasoltiresupply.com/account/index.php");
                   
				}else{
					$('#logout').css("display", "none");
				}
			}
		});
	}
function addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

})