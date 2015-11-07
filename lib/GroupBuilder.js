/* www.giovannibeeres.de */

var
MAX_GROUP_SIZE = 4,
MIN_GROUP_SIZE = 4,

Queue = [],

EventExtensions = {
	onGroupFound:function(grp){},
	onGroupCompose:function(grp){},
	onGroupFailed:function(grp){},
	onGroupSuccess:function(grp){},
},

JoinQueue = function(client){
	Queue.push(client);
	
	return true;
},

CancelQueue = function(client){
	RemoveFromQueue(client);
	
	return true;
},

RemoveFromQueue = function(client){
	Queue.splice(Queue.indexOf(client), 1);
};


// client interface

var Interface = function(client){
	this.client = client;
	this.inQueue = false;
	this.inGroup = false;
	this._inBuildStage = false;
};

Interface.prototype = {
	// joining Queue
	join:function(){
		if( this.inQueue == true || this.inGroup == true ) 
			return false;
		else
			return this.inQueue = JoinQueue(this);
	},
	
	// cancel Queue
	cancel:function(){
		if( this.inQueue == true ) 
			return false;
		else
			return this.inQueue = CancelQueue(this);
	}
};

exports.setup = function(outline){
	
	// if( typeof outline.onGroupReady == "function" ) Interface.prototype.onGroupReady = outline.onGroupReady;
	// if( typeof outline.onGroupFound == "function" ) Interface.prototype.onGroupFound = outline.onGroupFound;
	
	if( typeof outline.max == "number" ) MAX_GROUP_SIZE = outline.max;
	if( typeof outline.min == "number" ) MIN_GROUP_SIZE = outline.min;
	
	return { 
		getQueueSize:function(){ return Queue.length; },
		
		class:Interface
	};
};