
var app = angular.module("kungPowApp", ['ngRoute', 'luegg.directives']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
      	templateUrl: './app.html',
        controller: 'AppController'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

app.controller('AppController', function($scope) {
	$scope.postList = []; $scope.optionsOpened = false;
	$scope.glued = true;
	$scope.inputPlaceholder = getPlaceholder();
	$scope.inputUsername = "User" + new Date().getTime();

	$scope.getClass = function(post) {
		return post.self ? "self" : "notSelf";
	}

	$scope.toggleOptions = function() {
		var chatBox = document.getElementsByClassName('posts')[0];
		if($scope.optionsOpened) {
			//close options window
			chatBox.style.height = "85%";
		} else {
			//open options window 
			chatBox.style.height = "77%";
		}
		$scope.optionsOpened = !$scope.optionsOpened;
	}

	//function to add the post to the chat 
	$scope.addPost = function() {
		if($scope.inputMessage == "" || typeof($scope.inputMessage) == "undefined") return;
		if($scope.inputUsername == "" || typeof($scope.inputUsername) == "undefined") {
			var timeOut = 0;
			if(!$scope.optionsOpened) {
				$scope.toggleOptions();
				timeOut = 600;
			}
			setTimeout(function() {
				$('.usernameInput').notify("Don't be a stranger", {
					"classname": "error",
					"autohide": true,
					"autoHideDelay": 3000,
					"elementPosition": "left"
				});
				return;
			}, timeOut);
		} else {
			//holds all the data related to making a post
			var postData = {
				"username": "",
				"avatar": "man1.svg",
				"content": "",
				"self": true,  				//will be removed, and checks for self will be done via username
				"blocked": false,
				"starred": false,
				"date": null
			}

			//add the post
			postData.content = $scope.inputMessage;
			postData.username = $scope.inputUsername;
			var now = new Date();
			postData.date = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " - " + getCorrectedHour(now.getHours()) + ":" + addZero(now.getMinutes()) + getAMPM(now.getHours());
			$scope.inputMessage = "";
			$scope.postList.push(postData);
		}	
	}	
});

//chat-box
app.directive('chatBox', function() {
	return {
		'templateUrl': '/templates/chatbox.html'
	}
})

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getAMPM(i){
    return (i < 13) ? "AM" : "PM";
}

function getCorrectedHour(i){
    var h = i % 12;
    return (h == 0) ? 12 : h;
}

function getPlaceholder() {

}

var placeholders = [
	"Example 1"
]
