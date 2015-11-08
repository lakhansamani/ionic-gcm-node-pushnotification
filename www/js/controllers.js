angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,RequestsService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    //for registering device
    window.onNotification = function(e){

      console.log('notification received');
       
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            
            var device_token = e.regid;
            RequestsService.register(device_token).then(function(response){
              alert(response);
            });
          }
        break;

        case 'message':
          alert('msg received');
          alert(JSON.stringify(e));
        break;

        case 'error':
          alert('error occured');
        break;

      }
    };


    window.errorHandler = function(error){
      alert('an error occured');
    }


    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': '315194142280',
        'ecb': 'onNotification'
      }
    );
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
