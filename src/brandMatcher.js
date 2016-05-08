var video_seeds =[
				'b6227c9e7ce7c5d94b627183d38d7426', 
				'76bd0e54d90ccd235a987fa95c36c06f',
				'0d71ef081104a5f20ea6e5fa6cc90d03',
				'01e563a3b73edb520b35290adf9eaa3b',
				'48a9408098eb70c3bc6c532d80a9315e',
				'f8ef4273aafa0f9b1ad754931afcc37b',
				'cee771bbf3319f098a1bf30432139168',
				'8bfb70446a71d124e8b6dfb7687a2bc0'
				]; 

var seeds = { 
			"Nike": ["shoes", "sports", "sneakers", "shirts", "shorts", "bras", "socks", "running", "athletics"],
			"Equinox": ["fitness", "gym", "lift", "running", "exercise ", "stretch", "health"], 
			"Restoration": ["couch", "decorate", "home", "fabric", "design", "simple", "curtain", "lamp", "table"], 
			"Ann Taylor": ["fashion", "blouse", "pants", "dress", "wedding", "heels", "flats", "bags", "jewelry"], 
			"The Home Depot": ["garden", "tool", "renovation", "lighting", "paint", "build", "wood", "storage", "remodel"], 
			"Papyrus": ["cards", "stationary", "gift", "wrapping", "ribbon", "cards", "birthday", "wedding", "journal", "notebooks"], 
			"Brooks Brothers": ["fashion", "blouse", "blazer", "skirt", "dress", "wedding", "flats", "sweater", "tie", "shoes", "heels", "cardigan", "suit", "jacket", "shorts", "sleepwear", "swimwear", "polo"],
			"Paragon": ["sports", "outdoor", "baseball", "basketball", "boating", "cycling", "football", "golf", "hiking", "hockey", "running", "skiing", "snowboarding", "soccer", "spin", "swimming", "tennis", "triathlon", "yoga", "boots", "cycling", "golf", "hiking", "running", "sandals", "tennis"],
			 "True Religion": ["shorts", "pants", "legging", "tees", "tanks", "shirts", "sweatshirts", "bags", "scarves", "hats", "belts", "bottoms", "tops"],
			 "Fresh": ["cleanser", "mask", "moisturizer", "eye", "serum", "toner", "exfoliant", "bath", "oil", "deodorant"],
			 "Dr. Martens": ["boots", "heels", "hiking", "vintage", "waterproof", "industrial", "oxfords", "sandals", "chelsea"],
			 "Scotch and Soda": ["accessories", "fragrance", "bikinis", "blazer", "blouses", "dresses", "coats", "jackets", "jeans", "jumpsuits", "leather", "lingerie", "pants", "shoes", "shorts", "skirts", "sweaters", "tops", "shirts"],
			 "Chipotle": ["food", "mexican", "burrito", "grill", "taco", "nutrition", "salad", "chicken", "steak", "beans", "rice", "tofu", "guacamole", "salsa", "chips", "carnitas", "barbacoa", "sofritas"],
			 "Republic": ["noodle", "food", "nutrition", "dumpling", "calamari", "salmon", "sashimi", "japanese", "wonton", "fried", "salad", "vietnamese", "vegetables", "curry", "spicy", "beef", "chicken", "seafood", "asian", "thai", "padthai", "pork", "rice", "coconut"],
			 "Heartland Brewery": ["beer", "craft", "brewery", "burger", "fries", "salad", "lager", "ale", "oktoberfest", "wings", "bbq", "steak", "chicken", "sandwich", "pint", "pretzel", "fish", "chips"],
			 "Dylan’s Candy Bar": ["candy", "sweets", "chocolates", "gummy", "jelly", "lollipops", "pretzel", "cupcake", "cake", "strawberry", "raspberry", "hazelnut", "s’mores", "toffee", "caramel", "cookies", "cream"],
			 "Blue Water Grill": ["grill", "food", "wine", "cocktail", "shrimp", "brunch", "lunch", "dinner", "dessert", "hamburger", "burger", "cheese", "oysters", "lobsters", "salad", "tuna", "chicken", "japanese", "salmon", "kampachi", "tempura", "taco", "slider", "soup", "scallops", "rigatoni", "dining", "sushi"],
			 "Irvington": ["food", "lunch", "brunch", "dinner", "dining", "breakfast", "bar", "cocktail", "dessert", "wine", "beer", "rum", "whiskey", "tequila", "vodka", "soup", "salad", "fries", "burgers", "sausage", "coffee", "juice", "tuna", "chicken", "salmon", "ham", "sandwich", "lobster", "calamari", "lasagna", "bourbon", "cognac", "rye"],
			 "Starbucks": ["coffee", "mocha", "frappachino", "latte", "espresso", "tea", "beverage", "pastry", "smoothies"],
			 "Barnes & Noble": ["books", "read", "fiction", "nonfiction", "biography", "business", "mystery", "romance", "textbook"],
			 "Sephora": ["mascara", "eyeliner", "lip stick", "foundation", "concealer", "blush", "bronzer", "cleanser", "eyeshadow", "eyebrow", "tanning", "mask", "exfoliant", "nails", "hair"],
			 "Rothmans": ["fashion", "blouse", "blazer", "skirt", "dress", "wedding", "flats", "sweater", "tie", "shoes", "heels", "cardigan", "suit", "jacket", "shorts", "sleepwear", "swimwear", "polo"]
			};

var ClarifaiObject = require('./clarifai_sample');

ZiggeoApi.Events.on("submitted", function (data) {
  tokenToBrandRank(data.video.token);
}); 

loadVideoSeeds(video_seeds)

function loadVideoSeeds(video_seeds){
	video_seeds.forEach(videoID=> {
		console.log('video id ' + videoID)
		$('.main-container').append('<div class="video-container"><ziggeo class="video" ziggeo-video="b6227c9e7ce7c5d94b627183d38d7426"></div>' );
		tokenToBrandRank(videoID).then(rank => {	
		var items = [];
		$.each( rank, function(i, tag) {
		  	if(tag[1] != 0){
		  		items.push( "<li id='" + tag[0] + "'>" +tag[0] + " " + tag[1] + "</li>" );
			}
		});

		$( "<ul/>", {
		  "class": "my-new-list",
		  html: items.join( "" )
		}).appendTo( ".main-container" );
	});
	});
}

function tokenToBrandRank(token){
  var videoToken = token;
  //"https://embed.ziggeo.com/v1/applications/920f77df5c432e929b509ac43ec8329f/videos/"+videoToken+"/video.mp4"
return ClarifaiObject.exampleTagSingleURL("https://embed.ziggeo.com/v1/applications/920f77df5c432e929b509ac43ec8329f/videos/"+videoToken+"/video.mp4").then(videoData => {
  console.log(videoData);
  console.log('foo')
  brandRank = {};
  for(var brand in seeds){
  	brandRank[brand] = 0;
	seeds[brand].forEach(function(brandTag){
	  	videoData.forEach(function(clarifaiTag){
	  		if (brandTag === clarifaiTag[0]){
	  			brandRank[brand] = brandRank[brand] + clarifaiTag[1];
	  		}
	  	});
	});
  };


  	// Create items array
	var rank = Object.keys(brandRank).map(function(key) {
	    return [key, brandRank[key]];
	});

	// Sort the array based on the second element
	rank.sort(function(first, second) {
	    return second[1] - first[1];
	});
    return rank;
	});
}

//<ziggeo class="video" ziggeo-video="cee771bbf3319f098a1bf30432139168"></ziggeo>
$('.clear').click(function(){

});
