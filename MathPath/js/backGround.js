/**
 * 
 * 层级关系
 * 
 * Rect //整体背景
 * 
 * <g>//
 * 		<g>坐标容器  注意偏移量
 * 			<g>背景点
 * 				<use>//xlink:href
 * 			<g>横坐标
 * 				<g>线条
 * 				<g>箭头
 * 				<g>文字
 * 				<g>刻度
 * 			<g>纵坐标
 * 				<g>线条
 * 				<g>箭头
 * 				<g>文字
 * 				<g>刻度
 * 			<g>原点
 * 
 * 
 * @param {Object} win
 */



(function(win){
	
	var con = document.getElementById("container");
	
	
	//如果要重新进行绘制 ，可以清空con  然后再执行init()
	init(win.zdwconfig);

	
	function init(myconfig){
		var myline = new zdwdraw();
		//var myconfig = win.zdwconfig;//获取配置信息
		var stageinfo = myconfig.stageinfo;//舞台信息
		var ruleinfo = myconfig.ruleinfo;//刻度尺的信息
		var svg = myline.initstage(stageinfo.svgWidth,stageinfo.svgHeight);
		svg.setAttribute("id",stageinfo.SVGName)
		//创建svg
		con.appendChild(svg)
		//console.log(svg.getBoundingClientRect())
		//创建资源库并添加到svg中
		var defs = myline.createTag("defs");
		svg.appendChild(defs);
		
		
		
		//判断是否创建背景
		if(stageinfo.isCreateCanvas){
			var canvasbj = myline.createRect(stageinfo.canvasWidth,stageinfo.canvasHeight,stageinfo.canvasColor);
			svg.appendChild(canvasbj)
		}
		
		//创建刻度容器
		var axisSprite = myline.createTag("g",ruleinfo.left,ruleinfo.top);
		svg.appendChild(axisSprite);
		

		//-----------------------------创建背景点容器------------------------------------
		
		
		function createBJPoint(){
			
			var point = myline.createCircle("bjpoint",stageinfo.PointSize,stageinfo.PointColor);
			defs.appendChild(point)
			
			
			//创建背景间隔点的容器
			var pointSprite = myline.createTag("g");
			axisSprite.appendChild(pointSprite)
			
			
			
			//计算横向点间距
			var horPointdistances = parseFloat(ruleinfo.horAxisLineLength)/((parseFloat(ruleinfo.horAxislength)-1)*(parseFloat(ruleinfo.horAxisbetween)+1));
			//计算纵向点的间距
			var lenPointdistances = parseFloat(ruleinfo.lenAxisLineLength)/((parseFloat(ruleinfo.lenAxislength)-1)*(parseFloat(ruleinfo.lenAxisbetween)+1));
			//生成点的总个数
			var allPointNum =((parseFloat(ruleinfo.lenAxislength)-1)*(parseFloat(ruleinfo.horAxisbetween)+1))*((parseFloat(ruleinfo.horAxislength)-1)*(parseFloat(ruleinfo.lenAxisbetween)+1));
			//console.log(horPointdistances,parseInt(ruleinfo.horAxisLineLength),(parseInt(ruleinfo.horAxislength)-1))
			//向容器中添加所有的点
			addBJPoint()
			console.log(allPointNum)
			function addBJPoint(){
				for(var i = 0;i<allPointNum;i++){
					var testp = myline.createUse(point);
					pointSprite.appendChild(testp);
					testp.setAttribute("x",(i%((parseFloat(ruleinfo.horAxislength)-1)*(parseInt(ruleinfo.horAxisbetween)+1)))*horPointdistances);
					testp.setAttribute("y",Math.floor(i/((parseFloat(ruleinfo.horAxislength)-1)*(parseInt(ruleinfo.horAxisbetween)+1)))*lenPointdistances);
				}
			}
		}
		
		
		if(stageinfo.isShowPoint){
			createBJPoint();
		}
		
		
		//-----------------------------创建背景点容器end------------------------------------
		
		
		
		
		//--------------------------创建刻度尺容器-----------------------------------------
		
		function createAxisSprite (){
			
			//----------------------------创建横向刻度尺容器-------------------------------------
	
			function createhorAxisSprite(){
					var hengzhouSprite = myline.createTag("g");
					axisSprite.appendChild(hengzhouSprite);
				//------------------创建线条-----------------------------------------------------
					var horAxisLine = myline.createTag("g");
					hengzhouSprite.appendChild(horAxisLine);
					//计算横向点间距
					var horPointdistances = parseInt(ruleinfo.horAxisLineLength)/(parseInt(ruleinfo.horAxislength)-1);
					//计算纵向点的间距
					var lenPointdistances = parseInt(ruleinfo.lenAxisLineLength)/(parseInt(ruleinfo.lenAxislength)-1);
					
					var horAxisOffSet = parseFloat(ruleinfo.horAxisOffSet)*lenPointdistances;
					
					
					var linepath = myline.createLine(0,(horAxisOffSet),parseFloat(ruleinfo.horAxisLineLength),(horAxisOffSet));
					horAxisLine.appendChild(linepath)
					for(var i = 0;i<parseInt(ruleinfo.horAxislength)-1;i++){
						var _X = horPointdistances*i;
						var _Y = (horAxisOffSet);
						linepath.setrule(_X,(_Y-5),_X,(_Y+5));
					}	
				//-------------------到此为止已经画好线  并加上了刻度--------------------------------------
					
					//接下来画线头
					function createhroArrow(){
						var hroarrow = myline.createPolyGon();
						var arr = [[0,0],[20,5],[0,10]];
						hroarrow.setAttrPoint(arr);
						hroarrow.setAttribute("transform","matrix( 1, 0, 0, 1,"+(parseFloat(ruleinfo.horAxisLineLength)-10)+","+(horAxisOffSet-5)+")")
						hengzhouSprite.appendChild(hroarrow);
					}
					
					if(ruleinfo.horAxisShowArrow){
						createhroArrow();
					}
					
				//--------------------到此为止  箭头已经添加完毕-------------------------------------------
					
					//----接下来应该做创建刻度文字-----------------------------
					
					function createRuleTxt(){
						var hrotxt = myline.createText();
						
						var txtarr = (zdwdraw.getNumArr(parseInt(ruleinfo.horAxisfirst),parseInt(ruleinfo.horAxislast),parseInt(ruleinfo.horAxislength)));
						for(var i = 0;i<txtarr.length;i++){
							if(txtarr[i]==0||i==0||i==txtarr.length-1){
								if(ruleinfo.isShowZore){
									hrotxt.addText(txtarr[i],horPointdistances*i-8,horAxisOffSet+20)
								}
							}else{
								hrotxt.addText(txtarr[i],horPointdistances*i-8,horAxisOffSet+20)
							}
							
						}
						hengzhouSprite.appendChild(hrotxt);
					}
					
					
					if(ruleinfo.isShowhorAxisTxt){
						createRuleTxt();
					}
					
					//--------------创建原有文字end------------------------
					
					//--------------创建后添加的文字------------------------
					function createNewHortxt(){
						var newtxt = myline.createText();
						for(var i = 0;i<ruleinfo.NewhorAxis.length;i++){
							newtxt.addText(ruleinfo.NewhorAxis[i].txt,parseFloat(ruleinfo.NewhorAxis[i].x),parseFloat(ruleinfo.NewhorAxis[i].y))
						}
						hengzhouSprite.appendChild(newtxt);
					}
					
					
					if(ruleinfo.isAddNewhorAxisTxt){
						createNewHortxt();
					}
					
					//-------------创建后添加的文字end----------------------
					
					
				//------------------创建线条end---------------------
				
			}
			
			if(ruleinfo.horAxisShow){
				createhorAxisSprite();
			}
		
			//---------------------------创建横向刻度尺容器end-----------------------------------
			
			
			
			//--------------------------创建纵向刻度尺容器---------------------------------------
			
			function createlenAxisSprite(){
				var zongzhouSprite = myline.createTag("g");
				axisSprite.appendChild(zongzhouSprite);
				//------------------------创建线条-----------------------------
				var lenAxisLine = myline.createTag("g");
				zongzhouSprite.appendChild(lenAxisLine);
					//计算横向点间距
				var horPointdistances = parseInt(ruleinfo.horAxisLineLength)/(parseInt(ruleinfo.horAxislength)-1);
					//计算纵向点的间距
				var lenPointdistances = parseInt(ruleinfo.lenAxisLineLength)/(parseInt(ruleinfo.lenAxislength)-1);
					
				var lenAxisOffSet = parseFloat(ruleinfo.lenAxisOffSet)*horPointdistances;
					
					
				var linepath = myline.createLine(lenAxisOffSet,0,lenAxisOffSet,parseFloat(ruleinfo.lenAxisLineLength));
				lenAxisLine.appendChild(linepath)
				for(var i = 0;i<parseInt(ruleinfo.lenAxislength);i++){
					if(i==0){
						
					}else{
						var _Y = lenPointdistances*i;
						var _X = (lenAxisOffSet);
						linepath.setrule((_X-5),(_Y),(_X+5),_Y);
					}
						
				}	
				//-------------------到此为止已经画好线  并加上了刻度--------------------------------------
				
				//接下来画线头
					function createlenArrow(){
						var lenarrow = myline.createPolyGon();
						var arr = [[0,20],[5,0],[10,20]];
						lenarrow.setAttrPoint(arr);
						lenarrow.setAttribute("transform","matrix( 1, 0, 0, 1,"+(lenAxisOffSet-5)+","+(-10)+")")
						zongzhouSprite.appendChild(lenarrow);
					}
					
					if(ruleinfo.lenAxisShowArrow){
						createlenArrow();
					}
				
				//--------------------到此为止  箭头已经添加完毕-------------------------------------------
				//----接下来应该做创建刻度文字-----------------------------
					
					function createRuleTxt(){
						var lentxt = myline.createText();
						
						var txtarr = (zdwdraw.getNumArr(parseInt(ruleinfo.lenAxisfirst),parseInt(ruleinfo.lenAxislast),parseInt(ruleinfo.lenAxislength)));
						for(var i = 0;i<txtarr.length;i++){
							if(txtarr[i]==0||i==0||i==txtarr.length-1){
								
							}else{
								lentxt.addText(txtarr[i],lenAxisOffSet-20,lenPointdistances*(txtarr.length-i)-lenPointdistances)
							}
							
						}
						zongzhouSprite.appendChild(lentxt);
					}
					
					
					if(ruleinfo.isShowlenAxisTxt){
						createRuleTxt();
					}
					
					//--------------创建原有文字end------------------------
				
				
					//--------------创建后添加的文字------------------------
					function createNewLentxt(){
						var newtxt = myline.createText();
						for(var i = 0;i<ruleinfo.NewlenAxis.length;i++){
							newtxt.addText(ruleinfo.NewlenAxis[i].txt,parseFloat(ruleinfo.NewlenAxis[i].x),parseFloat(ruleinfo.NewlenAxis[i].y))
						}
						zongzhouSprite.appendChild(newtxt);
					}
					
					
					if(ruleinfo.isAddNewlenAxisTxt){
						createNewLentxt();
					}
					
					//-------------创建后添加的文字end----------------------
				
				
				
				
				
				
				
				
			}
			
			
			
			
			if(ruleinfo.lenAxisShow){
				createlenAxisSprite();
			}
			
			//------------------------创建纵向刻度尺容器end-------------------------------------
			
			
			
			
			
			
			
			
		}
		
		
		
		if(ruleinfo.showAxis){
			createAxisSprite();
		}
		
		
		
		//--------------------------创建刻度尺容器end-------------------------------------
		
	}
	
	
	
	
	
	
	
	function Log(txt){
		console.log(arguments)
	}
	

	
})(window)


