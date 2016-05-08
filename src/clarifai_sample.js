// node_example.js - Example showing use of Clarifai node.js API

var Clarifai = require('./clarifai_node.js');
Clarifai.initAPI("1eJp5SQVxg3P2NMlW0nGnJNsJkYSVUpZ-NFEk19f", "o6aDJGKMAYRTHtjNbQNv9UyUITv_A5j1nZLUvgqy");

//var localFile





// Setting a throttle handler lets you know when the service is unavailable because of throttling. It will let
// you know when the service is available again. Note that setting the throttle handler causes a timeout handler to
// be set that will prevent your process from existing normally until the timeout expires. If you want to exit fast
// on being throttled, don't set a handler and look for error results instead.

Clarifai.setThrottleHandler( function( bThrottled, waitSeconds ) { 
	console.log( bThrottled ? ["throttled. service available again in",waitSeconds,"seconds"].join(' ') : "not throttled");
});

function commonResultHandler( err, res ) {
	if( err != null ) {
		if( typeof err["status_code"] === "string" && err["status_code"] === "TIMEOUT") {
			console.log("TAG request timed out");
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ALL_ERROR") {
			console.log("TAG request received ALL_ERROR. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "TOKEN_FAILURE") {
			console.log("TAG request received TOKEN_FAILURE. Contact Clarifai support if it continues.");				
		}
		else if( typeof err["status_code"] === "string" && err["status_code"] === "ERROR_THROTTLED") {
			console.log("Clarifai host is throttling this application.");				
		}
		else {
			console.log("TAG request encountered an unexpected error: ");
			console.log(err);				
		}
	}
	else {
		if(true) {
			// if some images were successfully tagged and some encountered errors,
			// the status_code PARTIAL_ERROR is returned. In this case, we inspect the
			// status_code entry in each element of res["results"] to evaluate the individual
			// successes and errors. if res["status_code"] === "OK" then all images were 
			// successfully tagged.
			if( typeof res["status_code"] === "string" && 
				( res["status_code"] === "OK" || res["status_code"] === "PARTIAL_ERROR" )) {

				// the request completed successfully
				for( i = 0; i < res.results.length; i++ ) {
					if( res["results"][i]["status_code"] === "OK" ) {
					
						var all_tags = res["results"][i].result["tag"]["classes"];
					
						var all_probs = res["results"][i].result["tag"]["probs"] ;
	

						var tags = [].concat.apply([], all_tags);
						var dict = {};
					
						tags.forEach( function (tag) {
					
							if (dict[tag]){
								dict[tag] +=1;
							}
							else {
								dict[tag] = 1;
							}        	
						});

						var key_tags = Object.keys(dict).map(function (key){
							return [key, dict[key]];
						});
							
						
							
						key_tags.sort(function (a,b) {
							return b[1] - a[1];
						});
						return key_tags;
					} //end of if statement results
				}//end of for loop
			} //end of if statement typeof 
		}//end of if statement true
	}//end of else statement
}//end of function
				
				// 


// exampleTagSingleURL() shows how to request the tags for a single image URL
function exampleTagSingleURL(test) {

	//PUT IMAGE OR VIDEO FILE IN TestImageURL
	var testImageURL = test || 'https://d3macfshcnzosd.cloudfront.net/049605285_main_xxl.mp4';
	var ourId = "name of video or image"; // this is any string that identifies the image to your system

	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: force a timeout response
	// Clarifai.setRequestTimeout( 100 ); // in ms - expect: ensure no timeout 

	 return Clarifai.tagURL( testImageURL , ourId, commonResultHandler );
}


// exampleTagMultipleURL() shows how to request the tags for multiple images URLs
function exampleTagMultipleURL() {
	var testImageURLs = [ 
	"http://www.clarifai.com/img/metro-north.jpg", 
	"http://www.clarifai.com/img/metro-north.jpg" ];
	var ourIds =  [ "train station 1", 
	                "train station 2" ]; // this is any string that identifies the image to your system

	Clarifai.tagURL( testImageURLs , ourIds, commonResultHandler ); 
}

// exampleFeedback() shows how to send feedback (add or remove tags) from 
// a list of docids. Recall that the docid uniquely identifies an image previously
// presented for tagging to one of the tag methods.
function exampleFeedback() {
// these are docids that just happen to be in the database right now. this test should get 
// upgraded to tag images and use the returned docids.
var docids = [
	"15512461224882630000",
	"9549283504682293000"
	];
	var addTags = [
	"addTag1",
	"addTag2"
	];
	Clarifai.feedbackAddTagsToDocids( docids, addTags, null, function( err, res ) {

	} );

	var removeTags = [
	"removeTag1",
	"removeTag2"
	];
	Clarifai.feedbackRemoveTagsFromDocids( docids, removeTags, null, function( err, res ) {

	} );
}



module.exports = {
	exampleTagSingleURL: exampleTagSingleURL
};
