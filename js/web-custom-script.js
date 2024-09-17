 $(document).ready(function() {
         	$('.bxslider').bxSlider();
     
      	$("#sidebar").mCustomScrollbar({
         		theme: "minimal"
         	});
         	$('#dismiss, .overlay').on('click', function() {
         		$('#sidebar').removeClass('active');
         		$('.overlay').fadeOut();
         	});
         	$('#sidebarCollapse').on('click', function() {
         		$('#sidebar').addClass('active');
         		$('.overlay').fadeIn();
         		$('.collapse.in').toggleClass('in');
         		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
         	});
     
         });


$(window).scroll(function() {
            if ($(this).scrollTop()) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });

        $("#toTop").click(function () {
           //1 second of animation time
           //html works for FFX but not Chrome
           //body works for Chrome but not FFX
           //This strange selector seems to work universally
           $("html, body").animate({scrollTop: 0}, 1000);
        });
      