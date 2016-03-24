myApp.controller('CheckInsController', ['$scope', '$rootScope', '$location', '$firebaseArray', '$routeParams', '$firebaseObject', 'FIREBASE_URL',
  function($scope, $rootScope, $location, $firebaseArray, $routeParams, $firebaseObject, FIREBASE_URL){

    $scope.whichUser = $routeParams.uId;
    $scope.whichMeeting = $routeParams.mId;

    var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins');

    var checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    $scope.order = "firstname";
    $scope.direction = null;
    $scope.query = '';
    $scope.recordId = '';

    $scope.addCheckin = function(){
      var checkinsInfo = $firebaseArray(ref);
      var myData = {
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: Firebase.ServerValue.TIMESTAMP
      }; //myData

      checkinsInfo.$add(myData).then(function(){
        $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinsList');
      }); //Send data to Firebase
    }; //AddCheckin

    $scope.deleteCheckin = function(id){
      var refDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser +
        '/meetings/' + $scope.whichMeeting + '/checkins/' + id);
      var record = $firebaseObject(refDel);
      record.$remove(id);
    };

    $scope.pickRandom = function(){
      var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
      $scope.recordId = checkinsList.$keyAt(whichRecord);
    }; //pick winner

}]); //Controller