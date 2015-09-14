(function(win){
	
	/**
	 * 此工具中用到的变量值集合
	 */
	var infoconfig = {
		svgname:"http://www.w3.org/2000/svg",
		x_link_ns:"http://www.w3.org/1999/xlink",
	};
	
	
	var zdwDragAndScroller = function(_w,_h,_x,_y,_bgc,_fs,_tx,_ty,_txtinfo,_fontcolor,isShowScr,scrollbarLength,scrnum,tagtexp,controlV,max,min,scrx,scry){
		
		var g = createTextFile(_w,_h,_x,_y,_bgc,_fs,_tx,_ty,_txtinfo,_fontcolor,isShowScr,scrollbarLength,scrnum,tagtexp,controlV,max,min,scrx,scry)



		return g;
		
		
	}
	
	
	/**
	 * _w 背景宽度
	 * _h 背景高度
	 * _x 背景X
	 * _y 背景Y
	 * _bgc 背景颜色
	 * _tx 文字的X坐标 
	 * _ty 文字的Y坐标 
	 * _txtinfo 文字内容 
	 * _fontcolor 文字颜色
	 * isShowScr  是否显示滚动条
	 * scrnum  滚动条显示文字个数
	 * tagtxxp 目标公式的数字 
	 * controlV 控制变量
	 * max 变量的最大值
	 * min 变量的最小值
	 * scrX 滑块的X坐标
	 * scrY 滑块的Y坐标
	 * @param {Object} _w
	 * @param {Object} _h
	 * @param {Object} _x
	 * @param {Object} _y
	 * @param {Object} _bgc
	 * @param {Object} _fs
	 * @param {Object} _tx
	 * @param {Object} _ty
	 * @param {Object} _txtinfo
	 * @param {Object} _fontcolor
	 * @param {Object} isShowScr
	 * @param {Object} scrnum
	 * @param {Object} tagtexp
	 * @param {Object} controlV
	 * @param {Object} max
	 * @param {Object} min
	 * @param {Object} scrx
	 * @param {Object} scry
	 */
	function createTextFile(_w,_h,_x,_y,_bgc,_fs,_tx,_ty,_txtinfo,_fontcolor,isShowScr,scrollbarLength,scrnum,tagtexp,controlV,max,min,scrx,scry){
		var g = createTag("g");
		var rectcom = createTag("rect");
		g.appendChild(rectcom);
		
		_w = initvar(_w,"200");
		_h = initvar(_h,"20");
		_x = initvar(_x,"0");
		_y = initvar(_y,"0");
		_bgc = initvar(_bgc,"#666666");
		_fs = initvar(_fs,"14");
		_txtinfo = initvar(_txtinfo,"");
		_fontcolor = initvar(_fontcolor,"#ffffff");
		_tx = initvar(_tx,"20");
		_ty = initvar(_ty,"20");
//
		scrnum = initvar(scrnum,"5");
		tagtexp = initvar(tagtexp,"0");
		controlV = initvar(controlV,"a");
		max = initvar(max,"5");
		min = initvar(min,"0");
		scrx = initvar(scrx,"5");
		scry = initvar(scry,"5");
		scrollbarLength = initvar(scrollbarLength,"100");
		rectcom.setAttribute("width",_w);
		rectcom.setAttribute("height",_h);
		rectcom.setAttribute("x",_x);
		rectcom.setAttribute("y",_y);
		rectcom.setAttribute("fill",_bgc);
//		
		
//		var foreignObject = createTag("foreignObject");
//		foreignObject.setAttribute("width",_w);
//		foreignObject.setAttribute("height",_h);
//		foreignObject.setAttribute("x",_x);
//		foreignObject.setAttribute("y",_y);
//		g.appendChild(foreignObject);
//		
//		var div = document.createElement("div")
//		foreignObject.appendChild(div);
//		div.setAttribute("style","width:100%;height:100%;font-family: arial;font-size:"+_fs+"px; padding-top:"+_ty+"px; padding-left:"+_tx+"px;");
//		div.innerHTML = _txtinfo;
//		div.innerHTML = "aaaa";

		
		var txt = createTag("text");
		g.appendChild(txt);
		txt.setAttribute("x",parseInt(_x)+parseInt(_tx));
		txt.setAttribute("y",parseInt(_y)+parseInt(_ty));
		txt.setAttribute("fill",_fontcolor);
		txt.setAttribute("font-size",_fs);
		txt.setAttribute("font-family","arial");
		txt.textContent = _txtinfo;
		
		
	
		
		
		
		if(isShowScr){
			g.drag = createDrag(scrollbarLength,scrnum,tagtexp,controlV,max,min);
			g.drag.setAttribute("transform","matrix(1,0,0,1,"+(parseInt(_x)+parseInt(scrx))+","+(parseInt(_y)+parseInt(scry))+")")
			g.appendChild(g.drag)
			
			
			g.setpos = function(pos){
				//console.log((parseInt(_y)+parseInt(scry)))
				return(g.drag.setpos(pos-(parseInt(_x)+parseInt(scrx))-20));
				
			}
			
			
			g.settxt = function(_obj){
				txt.textContent = _obj.variable+"="+_obj.shownum;
			}
			
			
		}
		
		
		
		
		
	


		return g;
	}
	
	
	
	//创建线条
	/**
	 * 绘制线条的长度    显示数字的个数   最大值   最小值
	 * @param {Object} _lineLength
	 * @param {Object} shownum
	 * @param {Object} max
	 * @param {Object} min
	 */
	function createLine(_lineLength,shownum,max,min){
		var g = createTag("g");
		var baseline = createTag("path");
		var num = getNumArr(parseFloat(min),parseFloat(max),parseFloat(shownum));
		baseline.setAttribute("d","M 0,0 L "+parseFloat(_lineLength)+","+0+" Z")
		baseline.setAttribute("stroke","#495F85")
		baseline.setAttribute("stroke-width","2")
		baseline.setAttribute("fill","none")
		g.appendChild(baseline)
		
		var lineshuarr = [];
		
		for(var i = 0;i<(parseFloat(shownum)+1);i++){
			var _line = createTag("line");
			_line.setAttribute("stroke","#495F85");
			_line.setAttribute("stroke-width","2");
			_line.setAttribute("x1",i*(parseFloat(_lineLength)/num.length));
			_line.setAttribute("y1","-10");
			
			_line.setAttribute("x2",i*(parseFloat(_lineLength)/num.length));
			_line.setAttribute("y2","0");
			
			g.appendChild(_line)
			lineshuarr.push(i*(parseFloat(_lineLength)/num.length))
			
		}
		
		
		
		
		g.getx1 = function(){
			return lineshuarr;
		}
		
		g.getnum = function(){
			var num2 = num.concat();
			num2.push(parseFloat(max))
			return num2;
		}
		
		
		
		return g;
	}
	
	
	
	
	function createDragKuai(){
		var pathk = createTag("g");
		var pathb = createTag("path");
		var pathbd = "M 22.05 0	L 0 0 0 46 22.05 46 41 23 22.05 0 M 21 16 L 21 20 17 20 17 16 21 16 M 11 16 L 11 20 7 20 7 16 11 16 M 11 30 L 7 30 7 26 11 26 11 30 M 17 30 L 17 26 21 26 21 30 17 30 Z"
		pathb.setAttribute("d",pathbd);
		pathb.setAttribute("fill","#495F85");
		pathb.setAttribute("stroke","none");
		
		pathk.appendChild(pathb);
		
		var pathd = createTag("path");
		var pathdd = "M 17 26 L 17 30 21 30 21 26 17 26 M 7 30 L 11 30 11 26 7 26 7 30 M 11 20 L 11 16 7 16 7 20 11 20 M 21 20 L 21 16 17 16 17 20 21 20 Z"
		pathd.setAttribute("d",pathdd);
		pathd.setAttribute("fill","#FFFFFF");
		pathd.setAttribute("stroke","none");
		
		pathk.appendChild(pathd);
		

		return pathk;
	}
	
	
	
	
	
	
	function createDrag(scrollbarLength,scrnum,tagtexp,controlV,max,min){
		var line =createLine(scrollbarLength,scrnum,max,min);
		var g = createTag("g")
		
		g.appendChild(line)
		line.setAttribute("transform","matrix( 1, 0, 0, 1,41,23)");
		
		g.kuai = createDragKuai();
		g.appendChild(g.kuai)
		
		g.getpos = function(){
			return this.kuai.getAttribute('transform')
		}
		
		
		var linearrX = line.getx1();
		var shownum = line.getnum();
		console.log(shownum)
		
		/**
		 * 有返回值  返回对象 pos表示移动数值，variable表示控制变量 expression表示控制公式  为数组
		 * @param {Object} posx
		 * @param {Object} posy
		 */
		
		g.setpos = function(posx,posy){
			var aaa = Math.max(Math.min(posx,parseInt(scrollbarLength)),0);
			var curshownum = -1;
			//console.log(aaa,"-----",linearrX)
//			for(var j = 0;j<linearrX.length;j++){
//				var fristnum = linearrX[j]+(linearrX[j+1]-linearrX[j])/2
//				if(aaa<fristnum&&aaa>=linearrX[j]&&aaa<=aaa<linearrX[j+1]){
//					aaa = linearrX[j];
//					curshownum = j;
//				}
//				if(aaa>=fristnum&&aaa<linearrX[j+1]&&aaa>=linearrX[j]){
//					aaa=linearrX[j+1];
//					curshownum = j;
//				}
//				if(j==linearrX.length-1&&aaa>(linearrX[j-1]+(linearrX[j]-linearrX[j-1])/2)){
//					aaa = linearrX[j];
//					curshownum = j;
//				}
//				
//				//console.log(aaa,"********")
//			}
		//console.log(shownum,curshownum)
			g.kuai.setAttribute("transform","matrix( 1, 0, 0, 1,"+aaa+","+(0)+")");
			var answer = {
								pos:parseFloat(((aaa/parseFloat(scrollbarLength))*(parseFloat(max)-parseFloat(min))+parseFloat(min)).toFixed(1)),
								variable:controlV,
								expression:tagtexp,
//								shownum:shownum[curshownum],
								shownum:((aaa/parseFloat(scrollbarLength))*(parseFloat(max)-parseFloat(min))+parseFloat(min)).toFixed(1),
			}
			return answer
		}
		
		
		
		
		
		
		
		return g;
	}
	
	
	
	/**
	 *返回两个数字之间的所有数字
	 * strnum 第一个数字
	 * lastnum 最后一个数字
	 * dis 分割多少份
	 */
	function getNumArr(strnum,lastnum,dis){
		var _arr = new Array();
		if(strnum<0&&lastnum<0){
			var jiange = (strnum*(-1)-lastnum*(-1)+1)/(dis+1);
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		if(strnum<0&&lastnum>=0){
			var jiange = (strnum*(-1)+lastnum+1)/(dis+1);
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		if(strnum>=0&&lastnum>=0){
			var jiange = (lastnum-strnum+1)/(dis+1);
			for(var i = 0;i<dis;i++){
				_arr.push(strnum+(i*jiange));
			}
		}
		console.log(_arr)
		return _arr;
		
	}
	
	
	
	
	
	function initvar(mubiao,initnum){
		
		if(mubiao==null||mubiao==undefined||mubiao==""){
			mubiao=initnum;
			
		}
		return mubiao;
		
	}
	
		/**
	 * 创建svg标签
	 * @param {Object} _tag
	 */
	function createTag(_tag,_left,_top){
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
	
	
	
	win.zdwDragAndScroller = zdwDragAndScroller;
	
})(window)
