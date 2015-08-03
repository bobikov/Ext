
var ptag = $('blockquote');
var arr = [];

for (var i=0; i<ptag.length;i++){

	arr.push('b' + ptag[i].textContent);

};
newwin = window.open();
newwin.document.write(arr);