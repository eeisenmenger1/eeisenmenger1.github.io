// custom code for parkland bookstore

$(document).ready(function(){

	$(".row ul").empty(); 
	
	var baseUrl = "https://parkland-csc175.github.io/csc175data/bestbuy/";
	
	$.get(baseUrl + "categories-list.json", function(data){
		$.each(data.categories, function(i, item){  
			var $anchor = $("<a href='#'></a>"); 
			var $li =$("<li></li>"); 
			$($li).attr("class", "category");
			
			$anchor.attr("id",  item.id); 
			$anchor.text(item.name);  
			$li.append($anchor); 
			$(".row ul").append($li);  
		});		
		getCategoryId();
	});

function getCategoryId(){
	$(".category a").each(function(){
		showSubCategories($(this).attr("id"));
	});
}

	function  showSubCategories(id){
		$.get(baseUrl + "category-subcategories-" + id + ".json", function(data){

				var category2 = $("<ul></ul>");
				category2.attr("class", id);
				$("#" + id).after(category2);

				$("#" + id).click(function(){
					console.log("click");
					$("." + id).toggle();
				});

			$.each(data.categories[0].subCategories, function(i, item){
				var li = $("<li>");
				var anchor = $("<a>");



				$(anchor).attr("href", "products-list.html");
				$(anchor).attr("id", item.id);
				$(anchor).text(item.name);
				// $("." + id).append(li);
				$(li).html(anchor);
				$("." + id).append(li);



				$("." + id).hide();

			});
		});
	}
});



