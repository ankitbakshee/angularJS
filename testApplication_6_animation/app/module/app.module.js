var appModule=angular.module('appModule',['ngRoute']);

appModule.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'/app/views/home.html',
        controller:'chartController'
    })
    .when('/directory',{
        templateUrl:'/app/views/directory.html',
        controller:'appController'
        
    }).when('**',{redirectTo:'/home'})
    .otherwise({
        redirectTo:'/'
});

}]);


appModule.controller('appController',['$scope','$http',function($scope,$http){

    $scope.removeCharacter= function(dbz){
        var removedCharacter=$scope.dbzCharacters.indexOf(dbz);
        $scope.dbzCharacters.splice(removedCharacter,1);

    };

    $scope.addNinja=function(){
        $scope.dbzCharacters.push({
        name:$scope.newChar.name,
        role:$scope.newChar.role,
        powerLevel:$scope.newChar.powerLevel,
        highestLevel:$scope.newChar.highestLevel,
        color:$scope.newChar.color
    });
    $scope.newChar.name="";
    $scope.newChar.role="";
    $scope.newChar.powerLevel="";
    $scope.newChar.highestLevel="";
    $scope.newChar.color="";
    $scope.popUp=modal;
    };
$http.get('/content/dbz-characters.json').then(function(response){
$scope.dbzCharacters=response.data;
});
   /* $scope.dbzCharacters=[
        {
            "photo":"content/goku_blue.png",
            "name":"Goku",
            "role":"saiyan",
            "powerLevel": "9000000",
            "highestLevel":"Super Saiyan God/Blue",
            "color":"skyblue"
        },
        {
            "photo":"content/vegeta_blue.png",
            "name":"Vegeta",
            "role":"saiyan",
            "powerLevel": "9000000",
            "highestLevel":"Super Saiyan God/Blue",
            "color":"skyblue"
        },
        {
            "photo":"content/piccolo.png",
            "name":"Piccolo",
            "role":"namekian",
            "powerLevel": "4000000",
            "highestLevel":"Super Namekian",
            "color":"green"
        },
        {
            "photo":"content/gohan.png",
            "name":"Gohan",
            "role":"saiyan",
            "powerLevel": "8000000",
            "highestLevel":"Ultimate Gohan",
            "color":"black"
        },
        {
            "photo":"content/buu.png",
            "name":"Majjin Buu",
            "role":"villian",
            "powerLevel": "7500000",
            "highestLevel":"Kid Buu",
            "color":"pink"
        },
        {
            "photo":"content/ginyu.png",
            "name":"Captain Ginyu",
            "role":"Freiza's Army leader of ginyu force",
            "powerLevel": "2000000",
            "highestLevel":"Level up Ginyu",
            "color":"purple"
        },
        {
            "photo":"content/whis.png",
            "name":"Whis",
            "role":"angel and lord beerus's attendent",
            "powerLevel": "9999999999999",
            "highestLevel":"Normal form",
            "color":"lightblue"
        }

    ]
*/



}]);

appModule.controller('chartController',['$scope',function($scope){
$scope.g=3;
$scope.v=3;
$scope.b=4;
$scope.t=2;
$scope.m=2;
$scope.strong=function(){
    $scope.g +=1;
    drawChart();
}
$scope.weak=function(){
    $scope.g -=1;
    drawChart();
}

 // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Goku', $scope.g],
          ['Majjin Buu', $scope.m],
          ['Trunks' ,$scope.t],
          ['Lord Beerus', $scope.b],
          ['Vegeta', $scope.v]
        ]);

        // Set chart options
        var options = {'title':'Power Levels',
                       'width':600,
                       'height':500};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        // var chart2 = new google.visualization.Histogram(document.getElementById('hist_div'));
        chart.draw(data, options);
        // chart2.draw(data,options);
      }

}]);
