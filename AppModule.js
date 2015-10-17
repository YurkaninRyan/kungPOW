
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
			chatBox.style.height = "78%";
		}
		$scope.optionsOpened = !$scope.optionsOpened;
	}

	//function to add the post to the chat 
	$scope.addPost = function() {
		//holds all the data related to making a post
		var postData = {
			"username": "Vuk Petrovic",
			"avatar": "man1.svg",
			"content": "",
			"self": true,  				//will be removed, and checks for self will be done via username
			"blocked": false,
			"starred": false,
			"date": null
		}

		//add the post
		postData.content = $scope.inputMessage;
		var now = new Date();
		postData.date = (now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " - " + 
						(now.getHours() % 12) + ":" + addZero(now.getMinutes());
		$scope.inputMessage = "";
		$scope.postList.push(postData);
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

var placeholders = [
	"Example 1"
]