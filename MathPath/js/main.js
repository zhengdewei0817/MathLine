/**
 * 这里是来加载画线的逻辑的
 * 作为文档类
 */


(function(win){
	
	var zdwconfig = win.zdwconfig;
	var stageinfo = zdwconfig.stageinfo;
	var ruleinfo = zdwconfig.ruleinfo;
	var drawLine = zdwconfig.drawLine;
	var drawLine_line = drawLine.line;
	
	var textFile = zdwconfig.textFile.txt;
	
	var scrollbarD = zdwconfig.scrollbarD.scr;
	
	
	
	
	var con = document.getElementById(stageinfo.SVGName);
	
	
	//-----------------------------------------------------接下来是绘制线条逻辑-----------------------------------------------------------------------------------
	
	
	var mylineG = new zdwdraw();
	var spriteg = mylineG.createTag("g",ruleinfo.left,ruleinfo.top)
	con.appendChild(spriteg)
	
	//创建遮罩
	var maskspriteGe = mylineG.createTag("mask",ruleinfo.left,ruleinfo.top);
	maskspriteGe.setAttribute("id","linemask");
	con.appendChild(maskspriteGe);
	
	var maskg = mylineG.createTag("g");
	maskspriteGe.appendChild(maskg);
	
	var maskrect = mylineG.createRect(parseFloat(ruleinfo.horAxisLineLength),parseFloat(ruleinfo.lenAxisLineLength),"#FFFFFF")
	maskg.appendChild(maskrect)
	
	spriteg.setAttribute("mask","url(#"+"linemask"+")")
	
	
	
//	//计算横向点间距
	var horPointdistancesold = parseInt(ruleinfo.horAxisLineLength)/(parseInt(ruleinfo.horAxislength)-1);
	//计算纵向点的间距
	var lenPointdistancesold = parseInt(ruleinfo.lenAxisLineLength)/(parseInt(ruleinfo.lenAxislength)-1);
	
	//计算横向点间距
	var horPointdistances = parseFloat(ruleinfo.horAxisLineLength)/((parseFloat(ruleinfo.horAxislength)-1)*(parseFloat(ruleinfo.horAxisbetween)+1));
	//计算纵向点的间距
	var lenPointdistances = parseFloat(ruleinfo.lenAxisLineLength)/((parseFloat(ruleinfo.lenAxislength)-1)*(parseFloat(ruleinfo.lenAxisbetween)+1));
	
	
	
	var lenAxisOffSet = parseFloat(ruleinfo.lenAxisOffSet)*horPointdistancesold;
	var horAxisOffSet = parseFloat(ruleinfo.horAxisOffSet)*lenPointdistancesold;
	
	
	//--------------2015年9月13号 --------添加逻辑
	var  drawXFrist = 0;
	var drawXLast = 0;
	//这里的两个变量是用来处理For循环的  第一个可能为负数  如果是负数  则=-lenAxisOffSet
	//  drawXLast 则== lenAxisLineLength+drawXFrist
	drawXFrist = lenAxisOffSet*-1;
	drawXLast = parseFloat(ruleinfo.lenAxisLineLength)+drawXFrist;
	var curselected = -1;//当前选择的ID
	
	
	
	
	
	//存储变量的对象 
	var variable = {};
	//存放线条的数组
	var linearr = [];
	
	
	//创建线条的个数
	var createNum = drawLine_line.length;
	
	//创建所有的变量
	//把变量放到对象中
	createVal(variable,drawLine_line);

	function createVal(vari,arr){
		for(var i = 0;i<arr.length;i++){
			var line_one = arr[i][0].variable;//获取变量数组
//			var nonarr = arr[i][0].non;//获取默认值
//			console.log(line_one,arr )
			vari[i] = {};
			for(var j = 0;j<line_one.length;j++){
				vari[i][line_one[j]] = 0;//默认值为0
			}
		}
	}
	
	
	
	//-----------------------------更新变量数组内容 统一换成最小值--------------------------------
	
	
	function resetVarliableArr(){
		for(var i = 0;i<scrollbarD.length;i++){
			var objtest = scrollbarD[i][0];
//			console.log(scrollbarD)
			var arrtest = objtest.tagetexpression;
			for(var j = 0;j<arrtest.length;j++){
				//console.log(objtest)
				variable[arrtest[j]][objtest.controlvariables] = parseFloat(objtest.min)
			}
		}
	}
	resetVarliableArr();
	//console.log(variable)
	
	
	
	createAll_Line(drawLine_line);
	
	
	function createAll_Line(_arr){
		for(var num =0;num<_arr.length;num++){
			createOne_Line(num,_arr[num])
		}
	}
	
	
	
	
	function createOne_Line(id,obj){
		var gs = Parserformula(drawLine_line[id][0].expression,id,obj);
		console.log(gs)
		var myline = new zdwPath(drawLine_line[id][0].color,drawLine_line[id][0].strwid,-200,ruleinfo.lenAxisLineLength+500,ruleinfo.horAxisLineLength+500,-500);
		spriteg.appendChild(myline);
		linearr.push(myline)
		var arr = [];
		for(var i = -1000;i<1000;i++){
			var x = i/horPointdistances;
			var y;
			//console.log(variable[0].a)
			eval(gs)
			arr.push(translationPos(x*horPointdistances,y*lenPointdistances))
		}
	
		myline.setD(arr)
	}
	
	

	
	//console.log(variable)
	
	
	
	function Log(txt){
		//console.log(arguments)
	}
	
	

	
	
	
	function drawLineF(id,obj){
		console.log(id,obj)
		var gs = Parserformula(drawLine_line[id][0].expression,id,obj);
		var arr = [];
		console.log(gs)
		console.log(variable)
		for(var i = drawXFrist;i<drawXLast;i++){
			var x = i/horPointdistances;
			var y;
			//console.log(variable[0].a)
//			y=Math.sin(x*(variable[1].a))+(variable[1].b);
			eval(gs)
			arr.push(translationPos(x*horPointdistances,y*lenPointdistances))
		}
		linearr[id].setD(arr);
	//	console.log(linearr)
	}
	
	
	
	
	
	
	/**
	 * 处理公式
	 * 左侧  如果平方^转换成Math.pow()
	 * 如果sin  cos  tan   csc
	 * 如果有^标记  则获取标记前后的数字  以及标记后的数字
	 * 解析变量  如果有字母  并且前后为+ - * / =  则  转化成 variable[id]中的[变量]
	 * 
	 * 
	 * @param {Object} mubiao
	 */
	function Parserformula(mubiao,id,obj){
		var str = "";
		
		mubiao = mubiao.replace(/\s/g, "")
		SetMath("sin");
		SetMath("cos");
		SetMath("tan");
		SetMath("abs");
		SetMath("pow");
		
		function SetMath(name){
			var strnum = mubiao.indexOf(name);
			if(strnum!=-1){
				mubiao = mubiao.substring(0,strnum)+"Math."+ mubiao.substr(strnum);
			}
		}
		
		
		function setVariable(){
			var str = ""
			for(var i = 0;i<mubiao.length;i++){
				for(var j = 0;j<obj[0].variable.length;j++){
					if(i==0){
						if(mubiao[i]==obj[0].variable[j]&&(mubiao[i+1]=="+"||mubiao[i+1]=="-"||mubiao[i+1]=="*"||mubiao[i+1]=="/"||mubiao[i+1]=="="||mubiao[i+1]==")"||mubiao[i+1]=="("||mubiao[i+1]==",")){
						//	console.log(mubiao[i])
						}
					}else if(i<mubiao.length-1){
						if(mubiao[i]==obj[0].variable[j]&&(mubiao[i+1]=="+"||mubiao[i+1]=="-"||mubiao[i+1]=="*"||mubiao[i+1]=="/"||mubiao[i+1]=="="||mubiao[i+1]==")"||mubiao[i+1]=="("||mubiao[i+1]==",")&&(mubiao[i-1]=="("||mubiao[i-1]==","||mubiao[i-1]=="+"||mubiao[i-1]=="-"||mubiao[i-1]=="*"||mubiao[i-1]=="/"||mubiao[i-1]=="="||mubiao[i-1]==")")){
							//console.log(mubiao[i])
//							mubiao[i] = "variable[id][j]"
							mubiao = mubiao.substring(0,i)+"(variable["+id+"]."+mubiao[i]+")"+ mubiao.substr(i+1);
						}
					}else{	
						if(mubiao[i]==obj[0].variable[j]&&(mubiao[i-1]=="+"||mubiao[i-1]=="-"||mubiao[i-1]=="*"||mubiao[i-1]=="/"||mubiao[i-1]=="="||mubiao[i-1]==")"||mubiao[i-1]=="("||mubiao[i-1]==",")){
							//console.log(mubiao[i])
//							mubiao[i] = "variable[id][j]"
							mubiao = mubiao.substring(0,i)+"(variable["+id+"]."+mubiao[i]+")";
						}
					}
				}
			}
		}
		
		setVariable();
		
		
		
		//console.log(mubiao)
		
		
		str = mubiao;
		return str
		
	}
	
	
	
	/**
	 *坐标转换方法
	 */
	function translationPos(x,y){
		var testarr = [];
		x = x+lenAxisOffSet;
//		x = Math.min(480,Math.max(0, x+lenAxisOffSet))
		y = horAxisOffSet - (y);
		testarr = [x,y];
		return testarr;
	}
	
	
	
	
	
	
	
	
	//------------------------------------------------------关于绘制线条逻辑已经结束  ，下面为绘制滚动条逻辑------------------------------------------------------------------------
	
	
	
	var txtFileArr = [];
	
	function createscrollbar(){
		//_w,_h,_x,_y,_bgc,_fs,_txtinfo,_fontcolor
		for(var i = 0;i<textFile.length;i++){

			var scrollbar = new zdwTxtAndScroller(textFile[i][0].width,textFile[i][0].height,textFile[i][0].x,textFile[i][0].y,textFile[i][0].bgc,textFile[i][0].fontsize,textFile[i][0].txtinfo,textFile[i][0].fontcolor);
			con.appendChild(scrollbar);
			
			scrollbar.setcenterTxt()
			
			txtFileArr.push(scrollbar);
		}

	}
	
	
	createscrollbar();
	
	
	
	
	
	//----------------------------------------------绘制滚动条文字说明部分结束，下面为绘制滑块部分----------------------------------------------------------------------
	
	var drawDragArr = [];
	
	function createScrollDrag(){
		for(var i = 0;i<scrollbarD.length;i++){
			function t(id){
				var scrollbar = new zdwDragAndScroller(scrollbarD[id][0].width,scrollbarD[id][0].height,scrollbarD[id][0].x,scrollbarD[id][0].y,scrollbarD[id][0].bgc,scrollbarD[id][0].fontsize,scrollbarD[id][0].tx,scrollbarD[id][0].ty,scrollbarD[id][0].txtinfo,scrollbarD[id][0].fontcolor,scrollbarD[id][0].isShowScrollbar,scrollbarD[id][0].scrollbarLength,scrollbarD[id][0].scrollbarShowNum,scrollbarD[id][0].tagetexpression,scrollbarD[id][0].controlvariables,scrollbarD[id][0].max,scrollbarD[id][0].min,scrollbarD[id][0].scrx,scrollbarD[id][0].scry);
				con.appendChild(scrollbar);
				var left = $("#container").css("left");
				leftnum = parseInt(left.split("px")[0])

				$(scrollbar.drag.kuai).zdw_addEvent("mousedown",function(e){
						curselected = id;
				})
				drawDragArr.push(scrollbar);
			}
			t(i)
		}
	}
	
	createScrollDrag();
	
	//----------------------------------滑块滚动条结束------------------------------------------------------
	
	
	
	
	
	
	
	
	
	$(window).zdw_addEvent("mousemove",function(e){
		if(curselected!=-1){
			var scrollbar = drawDragArr[curselected];
			var objtest = (scrollbar.setpos(e.zdwX-leftnum))//注意  此处需要减去LEft
			//console.log(objtest)
			scrollbar.settxt(objtest)
			for(var j = 0;j<objtest.expression.length;j++){
						variable[objtest.expression[j]][objtest.variable] = objtest.pos;
						drawLineF(objtest.expression[j],drawLine_line[objtest.expression[j]])
				}
		}
		
	})
	
		
	$(window).zdw_addEvent("mouseup",function(e){
		curselected=-1
	})
	
	
	
	
	
	
})(window)
