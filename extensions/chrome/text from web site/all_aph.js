	var text=[];
	var tag = $('.all_aph');
	for (var i=0; i<tag.length; i++){
		text.push('b'+tag[i].textContent.replace("/,/g", " "));
	}
	var newwin=window.open();
	newwin.document.write(text);
	// $(document.body).prepend("<div id='overlay'><div id='dialog_wrapper'><div id='dialog'>"+text+"</dev></div></div>");
	// $("<button id='copy'>Copy</button>").appendTo($('#dialog_wrapper'));
	// $("<button id='close'>Close</button>").appendTo($('#dialog_wrapper'));

