$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	$('#accounts').css('display', 'none');
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1'
		}, success: function(result){
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '</tr>';
			});
			$('#tbody_recent').append(tbody);
		},async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1,2'
		}, success: function(result){
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '</tr>';
			});
			$('#tbody_all').append(tbody);
		}, async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'getAllAccounts',
		}, success: function(result){
			var tbody = '';
			$.each(result.accounts, function(i, item) {
				tbody += '<tr id="' + item.USER_ID + '">';
				tbody += '<td>'+ item.USER_ID + '</td>';
				tbody += '<td>'+item.USER_FNAME + ' ' + item.USER_LNAME + '</td>';
				tbody += '<td>'+item.USER_CONTACT_NO + '</td>';
				tbody += '</tr>';
			});
			$('#tbody_accounts').append(tbody);
		}, async: false
	});

	$('#searchButton').click(function(){
		$('#tbody_all').html('');
		var keyword = $('#keyword').val();
		var action = 'getCommentsLike';
		if(keyword == ''){
			action = 'getComments';
			keyword = '1,2';
		}
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'comments',
				action: action,
				keyword: keyword
			}, success: function(result){
				var tbody = '';
				$.each(result.comments, function(i, item) {
					tbody += '<tr id="' + item.COMMENT_ID + '">';
					tbody += '<td>'+item.COMMENT_NAME + '</td>';
					tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
					tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
					tbody += '</tr>';
				});
				$('#tbody_all').append(tbody);
			}
		});
	})

	$('table').delegate('tr', 'click',function(){
		var value='';
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'comments',
				action: 'getCommentsId',
				keyword: $(this).attr('id')
			}, success: function(result){
				$.each(result.comments, function(i, item) {
					value = item.COMMENT_MESSAGE
				});
				$('#comment_value').text(value);
			}
		});
		$('#comment_dialog').dialog();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'comments',
				action: 'updateCommentsStatus',
				keyword: $(this).attr('id')
			}
		});
	})

	$('#accounts_link').click(function(){
		$('#accounts').css('display', 'inherit');
		$('#comments').css('display', 'none');
		$('#accounts_link').addClass('active');
		$('#comments_link').removeClass('active');
			
	})

	$('#comments_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'inherit');
		$('#accounts_link').removeClass('active');
		$('#comments_link').addClass('active');
			
	})
})


