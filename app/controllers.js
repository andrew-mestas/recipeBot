angular.module("allRecipeCtrls", [])

.controller('RecipeAppController',['$scope', 'recipe', function RecipeAppController($scope, recipe) {
  $scope.recipes = [];
  $scope.search = "";
  var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) { 
      console.log(event.results[0][0].transcript); 
      var search = event.results[0][0].transcript;
      recipe.search.get({q: search}, function(data){
        $scope.recipes = [];
        $scope.search = data.body.query;
        console.log(data);
        $scope.recipes = data.results;
      })
    }

  $scope.voiceCtrl = function() { $scope.search = "Listening..."; recognition.start(); }


}]);
