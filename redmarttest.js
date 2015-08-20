(function() {
	var dimension = 0;
	var compiledList = [];
	var longestRoute = 0;
	var steepestJump = 0;
	var overallRoute = [];

	//Initiate the gathering of data
	getData();

	function getData() {

		var http = require("http");
		var url = "http://s3-ap-southeast-1.amazonaws.com/geeks.redmart.com/coding-problems/map.txt";
		var numberList = "";
		var req = http.get(url, function (res) {
		  	res.setEncoding('utf8');
		  	res.on('data', function (chunk) {
		  		//Retrieves data
		  		numberList += chunk;
		  	});
		  	res.on('end', function () {
		  		//Start the entire process
		  		formatNumberList(numberList);
		  	});
		}).on('error', function(e) {
		  	console.log("Got error: " + e.message);
		});
	}

	function formatNumberList(numberList) {
		numberList = numberList.split(" ");
		numberList.shift();
		numberList.shift();

		// numberList = [
		// 4,8,7,3,
		// 2,5,9,3,
		// 6,3,2,5,
		// 4,4,1,6
		// ];

		dimension = numberList[0];

		//Format the data into 2 dimensional data
		for(var i=0; i<numberList.length; i++) {
			var column = Math.floor(i/dimension);
			if(compiledList[column]) {
				compiledList[column].push(numberList[i]);
			} else {
				compiledList.push([numberList[i]]);
			}
		}

		//Once the data is ready, run the processing method
		runSearch();
		console.log(longestRoute, steepestJump);
	}


	function runSearch() {

		//Get all routes possible
		for (var i=0; i<compiledList.length; i++) {
			for (var j=0; j<compiledList[i].length; j++) {
				searchNextJump([],i,j);
			}
		}

		//Get the longest route with steepest jump
		for (var i=0; i<overallRoute.length; i++) {
			var route = overallRoute[i];
			var routeLength = route.length;
			var routeJump = route[0] - route[routeLength-1];

			if(longestRoute <= routeLength && steepestJump < routeJump) {
				longestRoute = routeLength;
				steepestJump = routeJump;
			}
		}
	}

	function searchNextJump(route, tempX, tempY) {

		var currentNum = getNextJump(tempX, tempY);
		var existingNum = currentNum;
		if(currentNum){
			route.push(currentNum);
		}

		var letsgo = false;

		if(tempX > 0  && 
			getNextJump(tempX-1, tempY) < route[route.length-1]) {
			var newRoute = route.slice(0);
			searchNextJump(newRoute, tempX-1, tempY);
			letsgo = true;
		}
		if(tempY < dimension - 1 && 
			getNextJump(tempX, tempY+1) < route[route.length-1]) {
			var newRoute = route.slice(0);
			searchNextJump(newRoute, tempX, tempY+1);
			letsgo = true;
		}
		if(tempX < dimension-1 && 
			getNextJump(tempX+1, tempY) < route[route.length-1]) {
			var newRoute = route.slice(0);
			searchNextJump(newRoute, tempX+1, tempY);
			letsgo = true;
		}

		if(tempY > 0 && 
			getNextJump(tempX, tempY-1) < route[route.length-1]) {
			var newRoute = route.slice(0);
			searchNextJump(newRoute, tempX, tempY-1);
			letsgo = true;
		}

		if(!letsgo) {
			overallRoute.push(route);
		}
	}

	function getNextJump(x, y) {
		return compiledList[x][y];
	}

	

}());