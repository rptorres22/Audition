// client/team/controllers/team.client.controller.js

// Create the 'team' controller
angular.module('team', []).controller('TeamController',
    ['$scope', '$routeParams', '$location', 'TeamService',

        function ($scope, $routeParams, $location, TeamService) {


            var ts = TeamService.get({teamName: $routeParams.teamName}, function () {
                //console.log(ts);
            });
            // Create a new controller method for retrieving a list of team
            $scope.find = function () {
                // Use the TeamService 'query' method to send an appropriate GET request
                $scope.teams = new TeamService.query();
            };


            // Create a new controller method for retrieving a single team
            // retreive a single team based on the TeamId route parameter
            // 	which the function obtains directly from the URL
            // 	expects a single document
            $scope.findOne = function () {
                // Use the team 'get' method to send an appropriate GET request
                //console.log('i got here');
                $scope.team = TeamService.get({
                    teamName: "First"
                });
            };


            // Create a new controller method for creating new articles
            $scope.create = function () {

                //console.log(this.usermessage);

                // Use the form fields to create a new TeamService $resource object
                var team = new TeamService({
                    //comes from message form field in $scope
                    //this will get passed to req.body in the server's team controller
                    message: this.usermessage
                });

                // use team resource $save() method to send the new team object
                // to the corresponding RESTful endpoint along with two callbacks.
                // first callback will be executed when the server responds with a success (200) status code
                //	then will use the $location service to navigate to the route
                // second callback will be executed when the server responds with an error status code
                team.$save(
                    function (response) {
                        //$location.path('/' + response._id);
                        $location.path('/');
                    },
                    function (errorResponse) {
                        $scope.error = errorResponse.data.message;
                    }
                );

            };


            $scope.update = function () {
                // Use the team '$update' method to send an appropriate PUT request
                $scope.team.$update(
                    function () {
                        // If an article was updated successfully, redirect the user to the home page
                        //$location.path('/' + $scope.team._id);
                        $location.path('/');
                    },
                    function () {
                        // Otherwise, present the user with the error message
                        $scope.error = errorResponse.data.message;
                    }
                );

            };


            // Create a new controller method for deleting a single team
            // First figure out whether the user is deleting a team from
            // 	a list or directly from the team view.  It will then use
            // 	the team's $remove() method to call the corresponding RESTful endpoint
            // 	if the user deleted the team from a list view, it will then remove the
            // 	deleted object from the teams collection; otherwise, it will
            // 	delete the team then redirect the user back to the list view
            $scope.delete = function (team) {

                // If a team was sent to the method, delete it
                if (team) {
                    // Use the team '$remove' method to delete the team
                    team.$remove(function () {
                        // Remove the team from the teams list
                        for (var i in $scope.teams) {
                            if ($scope.teams[i] === team) {
                                $scope.teams.splice(i, 1);
                            }
                        }
                    });


                } else {
                    // Otherwise, use the team '$remove' method to delete the team
                    $scope.team.$remove(function () {
                        $location.path('/');
                    });
                }
            };

        }

    ]);