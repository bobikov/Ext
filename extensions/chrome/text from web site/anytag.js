chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	sendResponse({farewell:"this is text of anytaf script"});
	console.log(request);
	resp1 = request.searchtag;
	resp2 = request.what_del;

	delim = (request.delim) ? request.delim : 'b' ;
});
var arr = [];
var resp1;
var resp2;
var delim;
if(resp1) {
	var tag = $(resp1);
		for (var i=0; i<tag.length;i++){
		arr.push(delim + tag[i].textContent);
	};
		newwin = window.open();
		newwin.document.write(arr);
}
if(resp2) {
	$(resp2).remove();
}
