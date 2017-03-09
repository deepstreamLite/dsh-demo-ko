ds = deepstream( 'localhost:6020' );
koTools = new KoTools( ko );

ds.login({ username: 'ds-simple-input-' + ds.getUid() }, function(){
	ko.applyBindings( new AppViewModel() );
});

/**
 * Class AppViewModel
 */
AppViewModel = function() {
	this.users = koTools.getViewList(  UserListEntryViewModel, ds.record.getList( 'users' ) );
	this.user = new UserViewModel();
};

AppViewModel.prototype.addUser = function() {
	var name = 'users/' + ds.getUid(),
		record = ds.record.getRecord( name );

	record.set({ firstname: 'New', lastname: 'User', title: '-' });
	this.users.getList().addEntry( name );
};

AppViewModel.prototype.selectUser = function( userAppViewModel ) {
	this.user.record.setName( userAppViewModel.record.name );
	this.users.callOnEntries( 'isActive', [ false ] );
	userAppViewModel.isActive( true );
};

/**
 * Class UserListEntryViewModel
 */
UserListEntryViewModel = function( userRecordName, viewList ) {
	this.record = ds.record.getRecord( userRecordName );
	this.viewList = viewList;
	this.firstname = koTools.getObservable( this.record, 'firstname' );
	this.lastname = koTools.getObservable( this.record, 'lastname' );
	this.title = koTools.getObservable( this.record, 'title' );
	this.isActive = ko.observable( false );
};

UserListEntryViewModel.prototype.deleteUser = function( viewModel, event ) {
	event.stopPropagation();
	this.viewList.getList().removeEntry( this.record.name );
	this.record.delete();
};

/**
 * Class UserViewModel
 */
UserViewModel = function() {
	this.record = ds.record.getAnonymousRecord();
	this.firstname = koTools.getObservable( this.record, 'firstname' );
	this.lastname = koTools.getObservable( this.record, 'lastname' );
	this.title = koTools.getObservable( this.record, 'title' );
	this.street = koTools.getObservable( this.record, 'street' );
	this.number = koTools.getObservable( this.record, 'number' );
	this.postcode = koTools.getObservable( this.record, 'postcode' );
	this.city = koTools.getObservable( this.record, 'city' );
};

