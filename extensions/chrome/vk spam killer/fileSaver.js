
function onInitFs(fs) {
	 		if ($.cookie('ids')!==undefined){
			fileWriteAppend($.cookie('ids').toString());
   	   		$.removeCookie('ids');
   	   		
   	   		hider();
   	   		readFile();
		}
		else{
			readFile();
		}
	$(document).ready(function(){
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
			sendResponse(ids);
			
		});

	});
	function createFile(name){
		fs.root.getFile(name, {create:true, exclusive:true}, function(file){
				console.log('file ' + name + ' created');
		})
	}
	// createFile('banlist.txt');
	function readFile(){
		fs.root.getFile('banlist.txt', {}, function(entry){
			entry.file(function(file){
				var reader = new FileReader();
				reader.onloadend=function(e){
					ids = this.result.split(',');
					console.log(this.result);
					
				};
			
				reader.readAsText(file);
			},errorHandler);
		},errorHandler);
	}
	// readFile();
	function fileReWrite(){
		fs.root.getFile('banlist.txt', {create: false}, function(entry){
				entry.createWriter(function(fileWriter) {
     				fileWriter.onwriteend = function(e) {
     					if (fileWriter.length === 0) {
					        //fileWriter has been reset, write file
					        fileWriter.write(blob);
					        console.log('Write completed.');
					    } 
					    else {
					        //file has been overwritten with blob
					        //use callback or resolve promise
        					 console.log('overwritten.');
        				}
	      			};
      				fileWriter.onerror = function(e) {
       					console.log('Write failed: ' + e.toString());
      				};
      				fileWriter.truncate(0);
      				var blob = new Blob(["/idtest"], {type:'text/plain'});
			}, errorHandler);
		}, errorHandler);
	}
	// fileReWrite();
	function fileWriteAppend(ban_id){
		fs.root.getFile('banlist.txt', {create: false}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				fileWriter.seek(fileWriter.length);
				fileWriter.onwriteend = function(e) {
        				console.log('Write completed.');
      				};
      				fileWriter.onerror = function(e) {
       					console.log('Write failed: ' + e.toString());
      				};
				var blob = new Blob([',' + ban_id], {type:'text/plain'});
				fileWriter.write(blob);
			}, errorHandler);
		}, errorHandler);
	}
	// fileWriteAppend();
	function deleteAllEntriesFromRoot(){
		var dirReader = fs.root.createReader();
		var entries = [];
		dirReader.readEntries(function(entries) {
			for(var i = 0; i < entries.length; i++) {
				entries[i].remove(function(){
					console.log('files and dirs removed');
				})
			}
		})
	}
	// deleteAllEntriesFromRoot();
	function getAllEntriesFromRoot(){
		var dirReader = fs.root.createReader();
		var entries = [];
		dirReader.readEntries(function(entries){
			for(var i = 0; i < entries.length; i++){
				if (entries[i].isFile){
					console.log(entries[i].name);

				}
				else if (entries[i].isDirectory){
					console.log(entries[i].name);

				}
			}
		})
	}
	// getAllEntriesFromRoot();
}
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

var requestedBytes = 1024*1024*280;
webkitRequestFileSystem(window.TEMPORARY, requestedBytes, onInitFs, errorHandler);
var ids;
var banlist;

$.get(chrome.extension.getURL('banlist.json'), function(data){
	var parsedFile = $.parseJSON(data);
	var listIds = parsedFile[0].items;
	banlist = listIds;
});

