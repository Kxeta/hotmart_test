$( document ).ready(function() {
	$('.msg_container.active_msg_container').fadeIn('fast');

});
$('.msg_menu_link').on('click', function(e){
	e.preventDefault();
	var group = $(this).attr('href');
	var parent = $(this).parent();
	if(group !== undefined){
		$('.msg_container.active_msg_container').fadeOut('fast',function(){
			$('.active').removeClass('active');
			$('.msg_container.active_msg_container').removeClass('active_msg_container');
			$('#msg_group_'+group).addClass('active_msg_container');
			parent.addClass('active');
			$('.msg_container.active_msg_container').fadeIn('fast');
		});
	}
});

$('#sidebar_menu').on('click','.add_shortcut', function(e){
	e.preventDefault();
	var number = $('.add_shortcut').length;
	number += 1;
	$('#sidebar_menu').append('<li class="hotlinks hotlinks_item"><a href="#" class="add_shortcut"><img src="dist/images/icon_add.png" alt="Adicionar Atalho"></a><a class="shortcut_link" href="#">Atalho '+number+'</a></li>');
});