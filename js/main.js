jQuery(function ($) {
  "use strict",
    // Preloader
    $(window).load(function () {
      $(".preloader").fadeOut("slow", function () {
        $(this).remove();
      });
    });
  // Navigation Scroll
  $(window).scroll(function (event) {
    Scroll();
  });

  $(".navbar-collapse ul li a").click(function () {
    $("html, body").animate(
      { scrollTop: $(this.hash).offset().top - 72 },
      1000
    );
    return false;
  });

  // User define function
  function Scroll() {
    var contentTop = [];
    var contentBottom = [];
    var winTop = $(window).scrollTop();
    var rangeTop = 200;
    var rangeBottom = 500;
    $(".navbar-collapse")
      .find(".scroll a")
      .each(function () {
        contentTop.push($($(this).attr("href")).offset().top);
        contentBottom.push(
          $($(this).attr("href")).offset().top +
            $($(this).attr("href")).height()
        );
      });
    $.each(contentTop, function (i) {
      if (winTop > contentTop[i] - rangeTop) {
        $(".navbar-collapse li.scroll")
          .removeClass("active")
          .eq(i)
          .addClass("active");
      }
    });
  }
  $(document).ready(function () {
    $(".navbar-nav li a").click(function (event) {
      $(".navbar-collapse").collapse("hide");
    });
  });

  // Slider Height
  var slideHeight = $(window).height() * 0.7;
  $("#main-carousel .item").css("height", slideHeight);

  $(window).resize(function () {
    "use strict", $("#main-carousel .item").css("height", slideHeight);
  });

  // portfolio filter
  $(window).load(function () {
    "use strict", ($portfolio_selectors = $(".portfolio-filter >li>a"));
    if ($portfolio_selectors != "undefined") {
      $portfolio = $(".portfolio-items");
      $portfolio.isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      $portfolio_selectors.on("click", function () {
        $portfolio_selectors.removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr("data-filter");
        $portfolio.isotope({ filter: selector });
        return false;
      });
    }
  });

  /*
	// Single Portfolio
	$('#folio-items').on('click','.mask a',function(event){
		event.preventDefault();

		var link = $(this).data('single_url');
		var full_url = '#portfolio-details',
			parts = full_url.split("#"),
			trgt = parts[1],
			target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 1200);
		$('#single-portfolio').slideUp(1000, function(){
			$(this).load(link,function(){
				$(this).slideDown(1000);
			});
		});
	});

	// Close Single Portfolio
	$('#portfolio-details').on('click','.close-item',function(){
		var full_url = '#folio-items',
			parts = full_url.split("#"),
			trgt = parts[1],
			target_offset = $("#"+trgt).offset(),
			target_top = target_offset.top;

		$('html, body').animate({scrollTop:target_top}, 1400);

		$("#single-portfolio").slideUp(1000);
	});	
	*/

  //$(".portfolio-image").click(function(){alert("The paragraph was clicked.");});

  //Initiat WOW JS
  new WOW().init();

  // Google Map Customization
});

// Preloader function
var cSpeed = 7;
var cWidth = 75;
var cHeight = 75;
var cTotalFrames = 8;
var cFrameWidth = 75;
var cImageSrc = "images/sprites.gif";

var cImageTimeout = false;

function startAnimation() {
  document.getElementById("loaderImage").innerHTML =
    '<canvas id="canvas" width="' +
    cWidth +
    '" height="' +
    cHeight +
    '"><p>Your browser does not support the canvas element.</p></canvas>';

  //FPS = Math.round(100/(maxSpeed+2-speed));
  FPS = Math.round(100 / cSpeed);
  SECONDS_BETWEEN_FRAMES = 1 / FPS;
  g_GameObjectManager = null;
  g_run = genImage;

  g_run.width = cTotalFrames * cFrameWidth;
  genImage.onload = function () {
    cImageTimeout = setTimeout(fun, 0);
  };
  initCanvas();
}

function imageLoader(s, fun) {
  //Pre-loads the sprites image
  clearTimeout(cImageTimeout);
  cImageTimeout = 0;
  genImage = new Image();
  genImage.onload = function () {
    cImageTimeout = setTimeout(fun, 0);
  };
  // genImage.onerror = new Function("alert('Could not load the image')");
  genImage.src = s;
}

//The following code starts the animation
new imageLoader(cImageSrc, "startAnimation()");
