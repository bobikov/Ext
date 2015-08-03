var text = [];
var tag = $('font :nth-child(1)', window.parent.frames[1].document);
	for (var i=0; i<tag.length; i++){
		text.push('b'+tag[i].textContent.replace("/,/g", " "));
	}
var newwin = window.open();
newwin.document.write(text);
