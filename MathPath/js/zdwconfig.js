(function(win) {
	win.zdwconfig = {
		"stageinfo": {
			"svgWidth": "1000",
			"svgHeight": "600",
			"isCreateCanvas": true,
			"canvasWidth": "60%",
			"canvasHeight": "100%",
			"canvasColor": "rgba(0,0,255,0.2)",
			"isShowPoint": true,
			"PointColor": "#666666",
			"PointSize": "1px",
			"SVGName": "zdwsvg"
		},
		"ruleinfo": {
			"top": "30",
			"left": "50",
			"showAxis": true,
			"isShowZore": true,
			"horAxisfirst": "0",
			"horAxislast": "9",
			"horAxislength": "8",
			"horAxisbetween": "2",
			"horAxisShow": true,
			"horAxisShowArrow": true,
			"horAxisLineLength": "480",
			"horAxisOffSet": "5",
			"isShowhorAxisTxt": true,
			"isAddNewhorAxisTxt": true,
			"NewhorAxis": [{
				"txt": "π",
				"x": "20",
				"y": "20"
			}, {
				"txt": "x",
				"x": "420",
				"y": "20"
			}],
			"lenAxisfirst": "0",
			"lenAxislast": "10",
			"lenAxislength": "11",
			"lenAxisbetween": "0",
			"lenAxisShow": true,
			"lenAxisShowArrow": true,
			"lenAxisLineLength": "480",
			"lenAxisOffSet": "2",
			"isShowlenAxisTxt": true,
			"isAddNewlenAxisTxt": true,
			"NewlenAxis": [{
				"txt": "π",
				"x": "20",
				"y": "120"
			}]
		},
		"drawLine": {
			"line": [
				[{
					"color": "#0000ff",
					"strwid": "2",
					"expression": "y=tan(a*x*Math.PI/2/3)",
					"variable": ["a", "b"],
					"non": [2, 3]
				}],
				[{
					"color": "#ffffff",
					"strwid": "2",
					"expression": "y=a/(b*x+c)",
					"variable": ["a", "b", "c"],
					"non": [2, 3]
				}]
			]
		},
		"textFile": {
			"txt": [
				[{
					"width": "200",
					"height": "20",
					"bgc": "#ff0000",
					"txtinfo": "y=Sin(x^3) - 5*x",
					"fontsize": "14",
					"x": "600",
					"y": "100",
					"fontcolor": "#0000ff",
					"isshowVariable": true,
					"tagetexpression": 0
				}],
				[{
					"width": "200",
					"height": "20",
					"bgc": "#ff0000",
					"txtinfo": "y=x^3 - 5*x",
					"fontsize": "14",
					"x": "600",
					"y": "0",
					"fontcolor": "#ffff00",
					"isshowVariable": true,
					"tagetexpression": 0
				}]
			]
		},
		"scrollbarD": {
			"scr": [
				[{
					"width": "300",
					"height": "80",
					"bgc": "#ff0000",
					"txtinfo": "a=",
					"fontsize": "20",
					"tx": "20",
					"ty": "25",
					"x": "600",
					"y": "122",
					"fontcolor": "#00ff00",
					"isShowScrollbar": true,
					"scrollbarLength": "200",
					"scrollbarShowNum": "11",
					"tagetexpression": [1],
					"controlvariables": "a",
					"max": "4",
					"min": "-4",
					"scrx": "50",
					"scry": "40"
				}],
				[{
					"width": "300",
					"height": "80",
					"bgc": "#ff0000",
					"txtinfo": "b=",
					"fontsize": "20",
					"tx": "20",
					"ty": "25",
					"x": "600",
					"y": "222",
					"fontcolor": "#00ff00",
					"isShowScrollbar": true,
					"scrollbarLength": "200",
					"scrollbarShowNum": "7",
					"tagetexpression": [1],
					"controlvariables": "b",
					"max": "3",
					"min": "-3",
					"scrx": "50",
					"scry": "40"
				}],
				[{
					"width": "300",
					"height": "80",
					"bgc": "#ff0000",
					"txtinfo": "c=",
					"fontsize": "20",
					"tx": "20",
					"ty": "25",
					"x": "600",
					"y": "322",
					"fontcolor": "#00ff00",
					"isShowScrollbar": true,
					"scrollbarLength": "200",
					"scrollbarShowNum": "7",
					"tagetexpression": [1],
					"controlvariables": "c",
					"max": "3",
					"min": "-3",
					"scrx": "50",
					"scry": "40"
				}]
			]
		}
	}
})(window)