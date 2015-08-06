function showCookie(){
	chrome.tabs.executeScript({
		file: 'showCookie.js'
	});
}
function delCookie(){
	chrome.tabs.executeScript({
		file: 'delCookie.js'
	});
}
document.addEventListener('DOMContentLoaded', function() {
	// banlist.innerHTML = '<div class="loader-inner ball-pulse"></div>';
	var unbunId;
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {message: "getIds"}, function(response){
			for (var i = 0; i<response.length; i++){
				// banlist.value+response[i]+'\n';
				banlist.innerHTML+="<div class='wrap'><a class='banlist_id' href='https://vk.com"+response[i]+"'>"+response[i]+"</a> <div class='unbun'>Unban</div></div>";
				// banlist.innerHTML +=response[i];				
			}
			$('#bar').text('Banned: '+response.length);
			$('.three-quarters-loader').hide();
			$('#banlist a').click(function(){newwin=window.open(); newwin.location = $(this).attr('href');});

			$('#searchbar').on('keyup', function(){
				val=$('#searchbar').val();
				$('a').contents().filter(function(){
					if (this.textContent==$('#searchbar').val()){
						$('.wrap').not($(this).parent().parent()).hide();
					}
				})
				if($('#searchbar').val()==''){
					$('.wrap').show();
				}		
			})
			$('.unbun').click(function(){
				unbunId =$(this).prev().text();
					chrome.tabs.sendMessage(tabs[0].id, {unbunId:unbunId}, function(response){
						
				})	
			})	
		});
		chrome.tabs.sendMessage(tabs[0].id, {message:"getUnban"}, function(response){
			for (var i = 0; i<response.length; i++){
				unbanned = document.getElementById('unbanned');
					unbanned.innerHTML+="<div class='wrap'><a class='banlist_id' href='https://vk.com"+response[i]+"'>"+response[i]+"</a></div>";
			}		
		})
	});
	// $.get(chrome.extension.getURL('banlist.json'), function(data){
	// 	var parsed = $.parseJSON(data);
	// 	userid = parsed[0].items;
	// 	for (var i = 0; i < userid.length; i++){
	// 		// banlist.value+=userid[i]+'\n';
	// 		banlist.innerHTML+="<span><a href='https://vk.com"+ userid[i]+"'>"+userid[i]+"</a> <button class='unbun' >Unbun</button></span><br>";
			
	// 	}
	// 	$('#bar').text('Banned: '+userid.length);
	// });
	// 
	$('#showCookie').click(function(){
		// cookies = chrome.cookies.get({name: "ids"});
		showCookie();
		// document.getElementById('banlist').innerHTML="<div class='banlist'>" + document.cookie +"</div>" ;


		// for (var i = 0; i<userid.length; i++){
		// 	$('#banlist').html(cookies[i]);
		// }
		
	});
	$('#delCookie').click(function(){
		delCookie();
	});
});