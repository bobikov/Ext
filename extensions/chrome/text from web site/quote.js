arr=[]
aa = $('.quote :first-child p').next();
for (var i =0; i < aa.length; i++){
	arr.push('b'+aa[i].textContent);
}
var newwin = window.open();
newwin.document.write(arr);