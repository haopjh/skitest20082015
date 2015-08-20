(function() {

	//The number list is generated below
	//Dimensions help to identify the size of the grid
	var dimensions = 0;
	var compiledList = formatNumberList();
	var overallRoute = [];

	//Get all routes possible
	for (var i=0; i<compiledList.length; i++) {
		for (var j=0; j<compiledList[i].length; j++) {
			searchNextJump([],i,j);
		}
	}


	var longestRoute = 0;
	var steepestJump = 0;
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

	console.log(longestRoute, steepestJump);

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

	function formatNumberList() {
		var numberList = [
		4,8,7,3,
		2,5,9,3,
		6,3,2,5,
		4,4,1,6
		];

		//Not the best implementation
		dimension = Math.sqrt(numberList.length);
		var tempList = [];
		//Format the data into 2 dimensional data
		for(var i=0; i<dimension*dimension; i++) {
			var column = Math.floor(i/dimension);
			if(tempList[column]) {
				tempList[column].push(numberList[i]);
			} else {
				tempList.push([numberList[i]]);
			}
		}
		return tempList;
	}

	

}());