$(document).ready(function() {
    $(".gallery").flipping_gallery({
        direction: "forward",
        selector: "> a",
        spacing: 10,
        showMaximum: 10,
        enableScroll: true
    });

	    $(".next").click(function() {
	      $(".gallery").flipForward();
	      return false;
	    });
	    $(".prev").click(function() {
	      $(".gallery").flipBackward();
	      return false;
	    });
});