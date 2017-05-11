function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {

    $("#form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            firstname: {
                required: true
            },
            lastname: {
                required: true
            }
        },
        messages: {
            firstname: {
                required: "Please enter your first name."
            },
            lastname: {
                required: "Please enter your last name."
            },
            email: {
                required: "Please enter your email address.",
                email: "This is not a valid email address."
            }
        }
    }); //end validate
}); //end document ready

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
// $(document).ready(function() {
//     button.click(function() {
//         $("body").css("background-color: yellow");
//     });
// });

