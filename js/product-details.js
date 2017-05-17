$(document).ready(function(){

//Form Start	
	    $(".form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            firstName: {
                required: true
            },
            lastName: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: "Please enter your first name."
            },
            lastName: {
                required: "Please enter your last name."
            },
            email: {
                required: "Please enter your email address.",
                email: "This is not a valid email address."
            }
        }
    });
//Form end

//get request

		var baseURL =  "https://parkland-csc175.github.io/csc175data/bestbuy/product";
		var itemSku = getAllUrlParams().itemsku;
	//request for product details
	$.ajax({
		url: baseURL + "-details-" + itemSku + ".json",
		success: function(data){
			$.each(data.products, function(i, item){
				$(".thumbnail img").attr("src", item.image);
				$(".caption-full .pull-right").text(item.regularPrice);
				$(".caption-full h4 a").text(item.name);
				//link to where? $(".caption-full h4 a").attr("href", "?");
			});
		}
	}).done(function(data){
		console.log(itemSku);
	});
	//request for product reviews
	$.ajax({
		url: baseURL + "-reviews-" + itemSku + ".json",
		success: function(data){
			$("#numberComments").text(data.reviews.length + " comments");
		//average rating
			var totalRating = 0;

			for(var i = 0; i < data.reviews.length; i++){
				totalRating += data.reviews[i].rating;
			}
			$("#avgRating").text(totalRating/data.reviews.length + " ");


			for(var i = 0; i < Math.round(totalRating/data.reviews.length); i++){
					var starSpan = $("<span></span>");
					$(starSpan).attr("class", "glyphicon glyphicon-star");
					$("#avgRating").append(starSpan);
				}
			for (var i = 0; i < (5 - (Math.round(totalRating/data.reviews.length))); i++){
				var emptyStarSpan = $("<span></span>");
				$(emptyStarSpan).attr("class", "glyphicon glyphicon-star-empty");
				$("#avgRating").append(emptyStarSpan);
				}

		//add review info
			$(".well").empty();
			$(".well").append("<div class=text-right></div>");
			$(".well .text-right").append("<a href=#leave-a-comment>Leave a Comment</a>");
			$(".text-right a").attr("class", "btn btn-success");


			$.each(data.reviews, function(i, item){
				$(".well .text-right").after("<hr>");
				$("hr").attr("id", item.id);
				$("#" + item.id).after("<p>" + item.comment + "</p>");
				$("#" + item.id).append("<span>" + item.reviewer[0].name + ",</span>");
				$("#" + item.id).append("<span> Rating: " + item.rating + "  </span>");
				$("#" + item.id).append("<span class=pull-right>" + item.submissionTime + "</span>");
				for(var i = 0; i < item.rating; i++){
					var starSpan = $("<span></span>");
					$(starSpan).attr("class", "glyphicon glyphicon-star");
					$("#" + item.id).append(starSpan);
				}
				for (var i = 0; i < (5 -item.rating); i++ ){
					var emptyStarSpan = $("<span></span>");
					$(emptyStarSpan).attr("class", "glyphicon glyphicon-star-empty");
					$("#" + item.id).append(emptyStarSpan);
				}
			});
			$("hr").append("<div class=row></div>");
			$("hr .row").append("<div class=col-md-12></div>");


		}
	}).done(function(data){
		console.log(itemSku);
	});


//access url
//from https://www.sitepoint.com/get-url-parameters-with-javascript/
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}


});



