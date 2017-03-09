angular
.module( 'ds-demo', [] )
.service( 'deepstream', function() {
	var client = deepstream( 'localhost:6020' )
		client.login({ username: 'ds-simple-input-' + client.getUid() });

	return client;
})
.controller( 'user', function( deepstream, $scope ){
	var userRecord = deepstream.record.getAnonymousRecord(),
		currentUserName;

	$scope.$watch(function(){
		if( $scope.user && userRecord.name === currentUserName ) {
			userRecord.set( $scope.user );
		}
	});

    userRecord.subscribe(function(){
    	$scope.user = userRecord.get();
    	
    	if( !$scope.$$phase ) {
    		$scope.$apply();
    	}
    });

    $scope.showUser = function( userName ) {
    	currentUserName = userName;
    	userRecord.setName( userName );
    };
});