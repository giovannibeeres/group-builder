/* www.giovannibeeres.de */


exports.setup = function(_outline){
	
	if( typeof _outline.onGroupReady == "function" ) Interface.prototype.onGroupReady = _outline.onGroupReady;
	if( typeof _outline.onGroupFound == "function" ) Interface.prototype.onGroupFound = _outline.onGroupFound;
	
};

var
core = {
	addClientToQ:function(client){
		
	},
	
	removeClientFromQ:function(client){
		
	},
	
};


// client interface

var Interface = function(client){
	this.client = client;
	this.inQueue = false;
	this.inGroup = false;
};

Interface.prototype = {
	// joining Queue
	join:function(){
		if( this.inQueue == true || this.inGroup == true ) 
			return false;
		else
			return this.inQueue = core.addClientToQ(this);
	},
	
	// cancel Queue
	cancel:function(){
		if( this.inQueue == true ) 
			return false;
		else
			return this.inQueue = core.removeClientFromQ(this);
	}
};

exports.interface = Interface;