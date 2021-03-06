
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
	$scope.$on('$viewContentLoaded', function() {
    	document.getElementsByClassName('chatInput')[0].focus();
	});
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
			chatBox.style.height = "calc(100% - 118px)";
		} else {
			//open options window 
			chatBox.style.height = "calc(100% - 180px)";
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
				document.getElementsByClassName('usernameInput')[0].focus();
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

function getPlaceholder(){
    var rand = Math.floor(Math.random()*10);
    return placeholders[rand];
}

var placeholders = [
	"Say something interesting.",
	"Don't just sit there, say something!",
	"Hahaha isn't this great?",
	"Your mom.",
	"Say something funny.",
	"Nice weather today, isn't it?",
	"I had fun once, it was awful.",
	"Show the world how funny (you think) you are!",
	"Make a new virtual friend",
	"Cat got your tongue?" 
];
