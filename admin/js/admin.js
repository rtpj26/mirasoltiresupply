$(function(){
	$('#switch-menu-welcome').mouseenter(function(){
		$('#switch-menu-welcome').html('<br><br>logout?');
	});

	$('#switch-menu-welcome').mouseleave(function(){
		$('#switch-menu-welcome').html('<br>welcome<br>back<br>admin<br>');
	});

	$('#switch-menu-welcome').click(function(){
		if($('#switch-menu-welcome').text('logout?')){
			alert('logout -- temporary placeholder');
		}
	});

})
