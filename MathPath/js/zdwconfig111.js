//这里存储的是配置文件信息

/**
 * 舞台初始化信息   stageinfo
 * 刻度信息 ruleinfo
 * @param {Object} win
 */

(function(win){
	win.zdwconfig = {
		//舞台信息
		stageinfo:{
			svgWidth:"1000",//svg的宽度
			svgHeight:"600",//svg的高度
			isCreateCanvas:true,//是否创建背景
			canvasWidth:"60%",//生成背景的宽度
			canvasHeight:"100%",//生成背景的高度
			canvasColor:"rgba(0,0,255,0.2)",//背景颜色
			isShowPoint:true,//是否显示背景的间距点
			PointColor:"#666666",//背景间距点的颜色
			PointSize:"1px",//背景间距点的半径var
			SVGName:"zdwsvg",//svg的id
		},
		//刻度尺信息
		ruleinfo:{
			top:"30",//刻度尺容器顶部距离
			left:"50",//刻度尺容器左侧距离
			showAxis:true,//是否显示坐标
			isShowZore:true,//是否显示0点刻度
			horAxisfirst:"0",//横向刻度的起始坐标
			horAxislast:"9",//横向坐标的终止坐标
			horAxislength:"8",//横向坐标显示多少位数字
			horAxisbetween:"2",//横向单位坐标轴中包含多少间隔
			horAxisShow:true,//是否显示横向坐标
			horAxisShowArrow:true,//是否显示坐标箭头
			horAxisLineLength:"480",//横向刻度长度
			horAxisOffSet:"5",//横坐标的纵向偏移量，默认为最顶部  0为第一个  1为第二个
			isShowhorAxisTxt:true,//是否显示横向原有数字刻度
			isAddNewhorAxisTxt:true,//是否添加新的文本刻度
			NewhorAxis:[{txt:"π",x:"20",y:"20"},{txt:"x",x:"420",y:"20"}],//横坐标刻度添加的文字信息，包括内容，x，y
			lenAxisfirst:"0",//纵向刻度的起始坐标
			lenAxislast:"10",//纵向坐标的终止坐标
			lenAxislength:"11",//纵向坐标显示多少位数字
			lenAxisbetween:"0",//纵向单位坐标轴中包含多少间隔
			lenAxisShow:true,//是否显示纵向坐标
			lenAxisShowArrow:true,//是否显示坐标箭头
			lenAxisLineLength:"480",//纵向刻度长度
			lenAxisOffSet:"2",//纵坐标的纵向偏移量，默认为最左侧
			isShowlenAxisTxt:true,//是否显示纵向原有数字刻度
			isAddNewlenAxisTxt:true,//是否添加新的文本刻度
			NewlenAxis:[{txt:"π",x:"20",y:"120"}],//纵坐标刻度添加的文字信息，包括内容，x，y
		},
		/**
		 * 这里是绘制具体线条
		 */
		drawLine:{
			line:[
				[
					{
						color:"#0000ff",//线条颜色
						strwid:"2",//线条粗细
						expression:"y=tan(a*x*Math.PI/2/3)",
						variable:["a","b"],//变量
						non:[2,3],//默认值
					}
				],
				[
					{
						color:"#ffffff",//线条颜色
						strwid:"2",//线条粗细
						expression:"y=a/(b*x+c)",
						variable:["a","b","c"],//变量
						non:[2,3],//默认值
					}
				],
				
			]
		},
		/**
		 * 文字说明
		 * 生成公式的组件
		 */
		textFile:{
			txt:[
				[
					{
						width:"200",//宽度
						height:"20",//高度
						bgc:"#ff0000",//背景颜色
						txtinfo:"y=Sin(x^3) - 5*x",//要显示的文字内容
						fontsize:"14",//要显示的文字字号
						x:"600",//x坐标
						y:"100",//y坐标
						fontcolor:"#0000ff",//文字颜色
						isshowVariable:true,//是否显示变量值
						tagetexpression:0,//目标公式
					}
				],
				[
					{
						width:"200",//宽度
						height:"20",//高度
						bgc:"#ff0000",//背景颜色
						txtinfo:"y=x^3 - 5*x",//要显示的文字内容
						fontsize:"14",//要显示的文字字号
						x:"600",//x坐标
						y:"0",//y坐标
						fontcolor:"#ffff00",//文字颜色
						isshowVariable:true,//是否显示变量值
						tagetexpression:0,//目标公式
					}
				]
			]
		},
		/**
		 * 滚动条
		 */
		scrollbarD:{
			scr:[
				[
					{
						width:"300",//宽度
						height:"80",//高度
						bgc:"#ff0000",//背景颜色
						txtinfo:"a=",//要显示的文字内容
						fontsize:"20",//要显示的文字字号
						tx:"20",//文字横向坐标
						ty:"25",//文字的纵向坐标
						x:"600",//x坐标
						y:"122",//y坐标
						fontcolor:"#00ff00",//文字颜色
						isShowScrollbar:true,//是否显示滚动条
						scrollbarLength:"200",//滚动条长度
						scrollbarShowNum:"11",//显示滚动条刻度个数
						tagetexpression:[1],//目标公式
						controlvariables:"a",//控制变量名称
						max:"4",//变量最大值
						min:"-4",//变量最小值
						scrx:"50",//滑块X
						scry:"40",//滑块的Y
					}
				],
				[
					{
						width:"300",//宽度
						height:"80",//高度
						bgc:"#ff0000",//背景颜色
						txtinfo:"b=",//要显示的文字内容
						fontsize:"20",//要显示的文字字号
						tx:"20",//文字横向坐标
						ty:"25",//文字的纵向坐标
						x:"600",//x坐标
						y:"222",//y坐标
						fontcolor:"#00ff00",//文字颜色
						isShowScrollbar:true,//是否显示滚动条
						scrollbarLength:"200",//滚动条长度
						scrollbarShowNum:"7",//显示滚动条刻度个数
						tagetexpression:[1],//目标公式
						controlvariables:"b",//控制变量名称
						max:"3",//变量最大值
						min:"-3",//变量最小值
						scrx:"50",//滑块X
						scry:"40",//滑块的Y
					}
				],
				[
					{
						width:"300",//宽度
						height:"80",//高度
						bgc:"#ff0000",//背景颜色
						txtinfo:"c=",//要显示的文字内容
						fontsize:"20",//要显示的文字字号
						tx:"20",//文字横向坐标
						ty:"25",//文字的纵向坐标
						x:"600",//x坐标
						y:"322",//y坐标
						fontcolor:"#00ff00",//文字颜色
						isShowScrollbar:true,//是否显示滚动条
						scrollbarLength:"200",//滚动条长度
						scrollbarShowNum:"7",//显示滚动条刻度个数
						tagetexpression:[1],//目标公式
						controlvariables:"c",//控制变量名称
						max:"3",//变量最大值
						min:"-3",//变量最小值
						scrx:"50",//滑块X
						scry:"40",//滑块的Y
					}
				]
			]
		}
		
	}
	
	
	
	
	
})(window)
