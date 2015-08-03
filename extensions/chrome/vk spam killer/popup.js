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
	// $('<div class="loader-inner ball-pulse">').insertAfter($('.logo'));
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {message: "test"}, function(response){
			for (var i = 0; i<response.length; i++){
				// banlist.value+response[i]+'\n';
				banlist.innerHTML+="<span><a href='https://vk.com"+response[i]+"'>"+response[i]+"</a> <button class='unbun' >Unbun</button></span><br>";
				// banlist.innerHTML +=response[i];				
			}	
			$('#bar').text('Banned: '+response.length);
		});
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