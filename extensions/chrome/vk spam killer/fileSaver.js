
function onInitFs(fs) {
		var unn;
	 	if ($.cookie('ids')!==undefined){
			fileWriteAppend($.cookie('ids').toString(),'banlist2.txt');
   	   		$.removeCookie('ids');
   	   		
   	   		hider();
   	   		readFile('banlist2.txt');
		}
		else{
			readFile('banlist2.txt');
		}
	$(document).ready(function(){
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
			if (request.unbunId){
				fileWriteAppend(request.unbunId, 'unbunned.txt');
				for (var i=0; i<ids.length; i++){
					if(ids[i]==request.unbunId){
						ids.splice(i, 1);
						
					}
				}
				fileReWrite('banlist2.txt', ids)
				sendResponse(ids);

			}
			
			else if(request.message=='getUnban'){
				readFile2('unbunned.txt');
				sendResponse(unn);
			}
			else if(request.message=='getIds'){
				sendResponse(ids);
			}
		});
	});
	function createFile(file_name){
		fs.root.getFile(file_name, {create:true, exclusive:true}, function(file){
				console.log('file ' + file_name + ' created');
		})
	}
	// createFile('banlist2.txt');
	function readFile(file_name){
		fs.root.getFile(file_name, {}, function(entry){
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
	function readFile2(file_name){
		fs.root.getFile(file_name, {}, function(entry){
			entry.file(function(file){
				var reader = new FileReader();
				reader.onloadend=function(e){
					unn = this.result.split(',');
					console.log(this.result);	
				};
				reader.readAsText(file);
			},errorHandler);
		},errorHandler);
	}
	// readFile();
	function deleteFile(file_name){
		fs.root.getFile(file_name, {}, function(entry){
			entry.remove(function(msg){
				console.log('file removed');
			})
		})
	}
	// deleteFile();
	function fileReWrite(file_name, text){
		fs.root.getFile(file_name, {create: false}, function(entry){
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
      				var blob = new Blob([text], {type:'text/plain'});
			}, errorHandler);
		}, errorHandler);
	}
	// fileReWrite('unbunned.txt');
	function fileWriteAppend(ban_id, file_name){
		fs.root.getFile(file_name, {create: false}, function(fileEntry) {
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

var requestedBytes = 1024*1024*20;
webkitRequestFileSystem(window.TEMPORARY, requestedBytes, onInitFs, errorHandler);
var ids;
var banlist;

$.get(chrome.extension.getURL('banlist.json'), function(data){
	var parsedFile = $.parseJSON(data);
	var listIds = parsedFile[0].items;
	banlist = listIds;
});

