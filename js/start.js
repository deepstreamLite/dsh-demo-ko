var client = deepstream( 'localhost:6020' ),
	user;

client.login({ username: 'ds-simple-input-' + client.getUid() }, function( success ){
	if( success ) {
		doIt();
	}
});

function doIt() {
	var bindInput = function( record, path, inputElement ) {
		inputElement.on( 'keyup', function(){
			record.set( path, inputElement.val() );
		});

		record.subscribe( path, function( value ){
			inputElement.val( value );
		}, true );
	};

	user = client.record.getAnonymousRecord();

	bindInput( user, 'firstname', $( 'input.firstname' ) );
	bindInput( user, 'lastname', $( 'input.lastname' ) );

	$('button').click(function(){
		user.setName( $(this).attr( 'name' ) );
	});

}