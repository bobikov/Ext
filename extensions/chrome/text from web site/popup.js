$(document).ready(function(){
	var serchtag,
		delim;
	$('#ptag').click(function(){
		chrome.tabs.executeScript({file: 'ptag.js'});
		
	})
	$('#r_block').click(function(){
		chrome.tabs.executeScript({file: 'r_block.js'});
		
	})
	$('#all_aph').click(function(){
		chrome.tabs.executeScript({file:'all_aph.js'});
	})
	$('#p_frame_tag').click(function(){
		chrome.tabs.executeScript({file:'p_fr_tag.js'});
	})
	$('#quote').click(function(){
		chrome.tabs.executeScript({file:'quote.js'});
	})

	$('#anytag').on('keydown', function() {
		if (event.which==13) {
			searchtag = $("#anytag").val();
			delim = $("#delim").val();
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  			chrome.tabs.sendMessage(tabs[0].id, {searchtag: searchtag, delim:delim})	
			})
			chrome.tabs.executeScript({file: "anytag.js"});
		}
		
	});
	$("#what_elem_del").on('keydown', function(){
		if (event.which == 13){
			var what_del = $("#what_elem_del").val();
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  			chrome.tabs.sendMessage(tabs[0].id, {what_del:what_del}, function(response){
	  			console.log(response)
	  			})	
			})
		}
	});

	$("#blockquote").click(function(){
		chrome.tabs.executeScript({file: 'blockquote.js'});
	})
});
