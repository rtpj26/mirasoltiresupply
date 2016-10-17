$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
		$('.amarker').css('display', 'none');
		$('.imarker').css('display', 'none');
		$('.cmarker').css('display', 'none');
		$('.rmarker').css('display', 'none');
		$('.smarker').css('display', 'none');
		$('.pmarker').css('display', 'none');
		$('.pomarker').css('display', 'none');
		$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		}, success: function(result){
			if(!result.isAdmin){
				window.location.replace("http://mirasoltiresupply.com/admin/restricted.php");
			}if(result.isSec){
				$('#admintype').text('SECRETARY');
			}
		}, async: false
	})
	function checkComment(){
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'countUnread',
		},success: function(unread){
			$('#unread').text(unread.unread);
		}	
	});
	}
	
	function checkRescue(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'rescue',
				action: 'checkRescue',
			},success: function(result){
				if(result.status)
					$('.rescue-block').css('background-color', '#600');
			}	
		});

		checkComment();
	}
	$('#switch-menu-welcome').mouseenter(function(){
		$('#switch-menu-welcome').html('<center><br><br>logout?</center>');
	});

	$('#switch-menu-welcome').mouseleave(function(){
		$('#switch-menu-welcome').html('<center><br>welcome<br>back<br></center>');
	});

	$('#switch-menu-welcome').click(function(){
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'account_control',
					action: 'logout'
				},success: function(){
					window.location.replace("http://mirasoltiresupply.com/");
				}
			})
		
	});

	$('#account-link').mouseenter(function(){
		$('.amarker').css('display', 'inherit');
	});

	$('#inventory-link').mouseenter(function(){
		$('.imarker').css('display', 'inherit');
	});

	$('#rescue-link').mouseenter(function(){
		$('.rmarker').css('display', 'inherit');
	});

	$('#comment-link').mouseenter(function(){
		$('.cmarker').css('display', 'inherit');
	});

	$('#sales-link').mouseenter(function(){
		$('.smarker').css('display', 'inherit');
	});

	$('#po-link').mouseenter(function(){
		$('.pomarker').css('display', 'inherit');
	});

	$('#pcode-link').mouseenter(function(){
		$('.pmarker').css('display', 'inherit');
	});
	$('#account-link, #inventory-link, #rescue-link, #comment-link, #sales-link, #pcode-link, #po-link').mouseleave(function(){
		$('.amarker').css('display', 'none');
		$('.imarker').css('display', 'none');
		$('.cmarker').css('display', 'none');
		$('.rmarker').css('display', 'none');
		$('.smarker').css('display', 'none');
		$('.pomarker').css('display', 'none');
		$('.pmarker').css('display', 'none');
	});

	setInterval(checkRescue, 3000);
	

})
