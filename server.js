var express = require('express');
var request = require('request');
var path = require('path');
var app = express();
var unirest = require('unirest');

var PORT = process.env.PORT || 8080;
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './app/index.html'));
});

app.use(express.static(path.join(__dirname, 'app')));
app.get('/searchrecipe/:q', function (req, res){

    console.log(req.params.q);
    var url = "https://api.projectoxford.ai/luis/v1/application?id=edab7fb9-9fb0-4940-8a2b-80e60a2b3abd&subscription-key=c4ac7ed5ec024d6584cdb0f4e4a97c56&q=";
    var search = req.params.q;

    url = url + search;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          body = JSON.parse(body);
          var intent = body.intents.filter((x) => { return x.score >= .50 });
          console.log(intent);
          if (intent[0].intent == "searchRecipe" || intent[0].intent == "whatIHave") {
              var ingredientList = body.entities.map((x) => { return x.entity });
              console.log(ingredientList);
          }


         // unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course")
         var recipeURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?includeIngredients=";
         var recipeMid = ingredientList.join(" ");
         var recipeURL2 = "&number=10&offset=0";
         var URL = recipeURL + recipeMid + recipeURL2;
         unirest.get(URL)
         .header("X-Mashape-Key", "MLucF7fYw1mshpObguF3aKgLcL3zp19J16kjsnWfWoSQ8WuiF6")
         .end(function (result) {
             console.log(result.status, result.headers, result.body);
             res.json({body: body, ingredients: ingredientList, results: result.body.results});

        });




            // Show the HTML for the Google homepage.
        }
    });
});

app.listen(PORT, function() {
  console.log('up and running');
});
