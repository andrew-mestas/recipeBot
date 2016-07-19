angular.module('recipeServices', ['ngResource'])
  .factory('recipe', ['$resource', function($resource){
    return { search: $resource('/searchrecipe/:q', {}, {
              get: {method: "GET", isArray: false}
    }) }

  }])
