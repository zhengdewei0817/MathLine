(function(win) {
	function export_raw(name, data) {
	var urlObject = window.URL || window.webkitURL || window;

	var export_blob = new Blob([data]);

	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	save_link.href = urlObject.createObjectURL(export_blob);
	save_link.download = name;
	fake_click(save_link);
}

function fake_click(obj) {
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent(
		"click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
	);
	obj.dispatchEvent(ev);
}
	
	console.log($("iframe")[0].contentWindow.zdwconfig)
	
	$("#down").zdw_addEvent("mouseup",function(){
			console.log($("iframe")[0].contentWindow.zdwconfig)
			var str = "(function(win){win.zdwconfig ="+JSON.stringify($("iframe")[0].contentWindow.zdwconfig)+"})(window)"
			export_raw("app.js",str)
	})
	
	
})(window)