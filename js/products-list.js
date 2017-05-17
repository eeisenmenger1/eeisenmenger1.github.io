// custom code for parkland bookstore

$(document).ready(function(){
	$("tbody tr").empty();
		$.get("https://parkland-csc175.github.io/csc175data/bestbuy/products-list.json", function(data){
		$.each(data.products, function(i, item){ 
			var itemRow = $("<tr></tr>");
			$(itemRow).attr("id", item.productId);
			$("tbody").append(itemRow);
			$("#" + item.productId).append("<td>" + item.manufacturer + "</td>");
			$("#" + item.productId).append("<td>" + item.name + "</td>");
			$("#" + item.productId).append("<td>"  + item.regularPrice + "</td>");

			var baseUrl = "https://parkland-csc175.github.io/csc175data/bestbuy/product-details-";
			var itemTwo = $("<td></td>");
			var anchor = $("<a>product-details</a>");

			$(anchor).attr("id", item.sku);
			$(anchor).attr("href", "product-details.html?itemsku=" + $(anchor).attr("id"));

			$(itemTwo).append(anchor);
			$("#" + item.productId).append(itemTwo);
		});		
	});

});