//这是绘制线  圆 背景等功能的类库
//API
//initstage 创建svg  传入参数为宽 高 
//createRect  创建矩形  传入宽  高  颜色
//createTag  创建临时标签用
//createCircle 创建圆  第一个是id  第2个是半径 第3个是填充颜色  第4个是描边颜色   第5个是描边宽   


(function(wnd){
	var zdwdraw =function(){
		
	};
	/**
	 * 此工具中用到的变量值集合
	 */
	var infoconfig = {
		svgname:"http://www.w3.org/2000/svg",
		x_link_ns:"http://www.w3.org/1999/xlink",
	};
	
	var p = zdwdraw.prototype;
	
	/**初始化舞台  创建svg舞台
	 * 宽，高，背景颜色
	 * */
	p.initstage = function(_w,_h){
		var svg = document.createElementNS(infoconfig.svgname,"svg");
		if(_w==null||_w==undefined||_w==""){
			_w = "100%"
		}
		if(_h==null||_h==undefined||_h==""){
			_h = "100%"
		}
		svg.setAttribute("width",_w);
		svg.setAttribute("height",_h);
		return svg
	}
	
	/*
	 * 创建矩形 
	 * 传参 宽
	 * 高
	 * 背景颜色
	 */
	p.createRect = function(_w,_h,_bgC){
		var _rect = document.createElementNS(infoconfig.svgname,"rect")
		
		if(_w==null||_w==undefined||_w==""){
			_w = "100%"
		}
		if(_h==null||_h==undefined||_h==""){
			_h = "100%"
		}
		if(_bgC==null||_bgC==undefined||_bgC==""){
			_bgC = "#ffffff"
		}
		_rect.setAttribute("width",_w);
		_rect.setAttribute("height",_h);
		
		_rect.setAttribute("fill",_bgC);
		
		return _rect;
	}
	
	/**
	 * 创建svg标签
	 * @param {Object} _tag
	 */
	p.createTag = function(_tag,_left,_top){
		var _tag = document.createElementNS(infoconfig.svgname,_tag);
		var issetTr = true;
		if(_left==null||_left==undefined||_left==""){
			_left = 0;
			issetTr = false;
		}
		if(_top==null||_top==undefined||_top==""){
			_top = 0
		}
		
		
		if(issetTr){
			_tag.setAttribute("transform","matrix( 1, 0, 0, 1,"+_left+","+_top+")");
		}
		
		return _tag;
	}
	
	
	/**
	 * 第一个是id  第2个是半径 第3个是填充颜色  第4个是描边颜色   第5个是描边宽   
	 * @param {Object} _r
	 * @param {Object} _stroke
	 * @param {Object} _SW
	 * @param {Object} _fill
	 */
	p.createCircle = function(_id,_r,_fill,_stroke,_SW){
		var _circle = document.createElementNS(infoconfig.svgname,"circle");
		if(_id==null||_id==undefined||_id==""){
			_id = ""
		}
		if(_r==null||_r==undefined||_r==""){
			_r = "10"
		}
		if(_fill==null||_fill==undefined||_fill==""){
			_fill = "#000000"
		}
		if(_stroke==null||_stroke==undefined||_stroke==""){
			_stroke = "#000000"
		}
		if(_SW==null||_SW==undefined||_SW==""){
			_SW = "0"
		}
		_circle.setAttribute("r",_r);
		_circle.setAttribute("id",_id);
		_circle.setAttribute("fill",_fill);
		_circle.setAttribute("stroke",_stroke);
		_circle.setAttribute("stroke-width",_SW);

		return _circle;
	}
	
	
	/**
	 * 创建USE对象
	 * 传入参数为引用目标
	 */
	p.createUse = function(mub){
		var _use = document.createElementNS(infoconfig.svgname,"use");
		_use.setAttributeNS(infoconfig.x_link_ns,"xlink:href","#"+mub.id);
		return _use;
	}
	
	
	/**
	 * 创建线条
	 */
	p.createLine = function(x1,y1,x2,y2,strcol,strW){
		var _g = this.createTag("g")
		var _line = this.createTag("line");
		var _this = this;
		if(strcol==null||strcol==undefined||strcol==""){
			strcol = "#000000";
		}
		if(strW==null||strW==undefined||strW==""){
			strW = 1;
		}

		_line.setAttribute("stroke",strcol);
		_line.setAttribute("stroke-width",strW);
		_line.setAttribute("x1",x1);
		_line.setAttribute("x2",x2);
		_line.setAttribute("y1",y1);
		_line.setAttribute("y2",y2);
		
		_line.setAttribute("stroke-linecap","round");
		_g.appendChild(_line)
		
		/**
		 * 设置刻度尺
		 * ishor 是否是横向  如果为横向，则绘制竖线  如果为竖向，则绘制横线
		 */
		_g.setrule = function(_x1,_y1,_x2,_y2){
			var _line2 = _this.createTag("line");
			_line2.setAttribute("stroke",strcol);
			_line2.setAttribute("stroke-width",strW);
			_line2.setAttribute("x1",_x1);
			_line2.setAttribute("x2",_x2);
			_line2.setAttribute("y1",_y1);
			_line2.setAttribute("y2",_y2);
			_g.appendChild(_line2)
		}
		
	
		return _g;
	}
	
	
	/**
	 *创建多边形
	 */
	p.createPolyGon = function(fill){
		var polygon = this.createTag("polygon");
		var _g = this.createTag("g");
		
		_g.appendChild(polygon)
		
		if(fill==null||fill==undefined||fill==""){
			fill = "#000000"
		}
		
		polygon.setAttribute("fill",fill);
		polygon.setAttribute("stroke-width",0);
		
		/**
		 * 设置多边形形状
		 * 传入的为数组类型
		 * @param {Object} _arr
		 */
		_g.setAttrPoint = function(_arr){
			var data = "";
			for(var i = 0;i<_arr.length;i++){
				data+=_arr[i][0]+","+_arr[i][1]+" "
			}
			polygon.setAttribute("points",data);
		}
		return _g;
	}
	
	
	
	/**
	 *创建文字
	 */
	p.createText = function(){
		var _this = this;
		var _g = _this.createTag("g");
		
		
		/**
		 *add Text
		 */
		_g.addText = function(txt,x,y,fontsize,fill){
			var _txt = _this.createTag("text");
			
			if(fill==null||fill==undefined||fill==""){
				fill = "#000000"
			}
			if(fontsize==null||fontsize==undefined||fontsize==""){
				fontsize = 18;
			}
			_g.appendChild(_txt);
			_txt.setAttribute("font-family","Arial");
			_txt.setAttribute("font-size",fontsize);
			_txt.setAttribute("fill",fill);
			_txt.setAttribute("x",x);
			_txt.setAttribute("y",y);
			_txt.textContent = txt;//这个是用来修改svg txt文本的
			
		}
		
		return _g;
	}
	
	
	
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
	
	
	
	
	/**
	 *返回两个数字之间的所有数字
	 * strnum 第一个数字
	 * lastnum 最后一个数字
	 * dis 分割多少份
	 */
	zdwdraw.getNumArr = function(strnum,lastnum,dis){
		var _arr = new Array();
		if(strnum<0&&lastnum<0){
			var jiange = (strnum*(-1)-lastnum*(-1)+1)/dis;
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		if(strnum<0&&lastnum>=0){
			var jiange = (strnum*(-1)+lastnum+1)/dis;
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		if(strnum>=0&&lastnum>=0){
			var jiange = (lastnum-strnum+1)/dis;
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		return _arr;
		
	}
	
	
	
	
	
	
	
	
	
	wnd.zdwdraw = zdwdraw;
})(window)
