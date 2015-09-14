/**
 * 这里是用来绘制图像的类
 */

(function(win){
	var zdwPath = function(color,wid,top,right,bottom,left){
		if(color==null||color==undefined||color==""){
			color = "#000000"
		}
		if(wid==null||wid==undefined||wid==""){
			wid=1
		}
		
		
		var path = this.createPath();
		
		
		path.setD = function(arr) {
			str = "";
				for (var i = 0; i < arr.length; i++) {
					if (str == "") {
						str = "M" + arr[0][0] + "," + arr[0][1] + " ";
					} else {
						if((arr[i-1][1]>top&&arr[i-1][1]<bottom)&&(arr[i][1]>top&&arr[i][1]<bottom)&&((arr[i-1][0]>left&&arr[i-1][0]<right)&&(arr[i][1]>left&&arr[i][1]<right))&&Math.abs(arr[i][1]-arr[i-1][1])<(100)){
							str += "M" + arr[i-1][0] + "," + arr[i-1][1] + " "+"L" + arr[i][0] + "," + arr[i][1] + " "+"Z ";
						}
					}
				}

			path.setAttribute("d", str)
		}
		
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", color);
		path.setAttribute("stroke-width", wid);
		
		return path;
		
	}
	/**
	 * 此工具中用到的变量值集合
	 */
	var infoconfig = {
		svgname:"http://www.w3.org/2000/svg",
		x_link_ns:"http://www.w3.org/1999/xlink",
	};
	
	
	var p = zdwPath.prototype;
	
	/**
	 * 创建Path对象
	 */
	p.createPath = function(){
		var _path = document.createElementNS(infoconfig.svgname,"path");
		/**
		 * 设置线条样式
		 */
		_path.setAttrPath = function(){
			
		}
		return _path;
	}
	
	
	
	
	
	
	
	
	
	
	
	win.zdwPath = zdwPath;
})(window)
