/**************Sidebar Script******************/
var fancyBoxClass = 'side_menu_1';
         $(document).ready(function () {
                         $("#sidebar").mCustomScrollbar({
                             theme: "minimal"
                         });
         
                         $('#dismiss, .overlay').on('click', function () {
                             $('#sidebar').removeClass('active');
                             $('.overlay').fadeOut();
                         });
         
                         $('#sidebarCollapse').on('click', function () {
                             $('#sidebar').addClass('active');
                             $('.overlay').fadeIn();
                             $('.collapse.in').toggleClass('in');
                             $('a[aria-expanded=true]').attr('aria-expanded', 'false');
                         });
             });
          
          var margin_top_px = '100px';
        $( window ).resize(function(e) {
            var width = $(window).width();
            var height = $(window).height();
            if(width < 600){
               
                margin_top_px = '100px';
            }else{
                margin_top_px = '160px';
                
            }
            
        });
           $(window).trigger('resize');
             
           $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
               fancyBoxClass = this.className.match(/[\w-]*side[\w-]*/g)[0]
         e.preventDefault();
         fancybox_image_filter();
         $(".text-centern").removeAttr("style");
         $(this).siblings('a.active').removeClass("active");
         $(this).addClass("active");
         var index = $(this).index();
            if (index==0) {
                $(".text-centern").removeAttr("style");
            } else if (index==1){
                var sec_index = index+2;
                $("div.bhoechie-tab-menu div.list-group>a:nth-child("+sec_index+")").css("margin-top", margin_top_px);
            } else {
                var sec_index = 2;
                $("div.bhoechie-tab-menu div.list-group>a:nth-child("+sec_index+")").css("margin-top", margin_top_px);
            }
         $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
         $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
         });
             
        
          
           //Firefox
         $('div.bhoechie-tab-menu>div.list-group>').bind('DOMMouseScroll', function(e){
             if(e.originalEvent.detail > 0) {
                $('div.bhoechie-tab-menu>div.list-group>a.active').next().trigger('click'); 
                 
             }else {
                 //scroll up
              $('div.bhoechie-tab-menu>div.list-group>a.active').prev().trigger('click'); 
             }
             //prevent page fom scrolling
             return false;
         });

         //IE, Opera, Safari
         $('div.bhoechie-tab-menu>div.list-group>').bind('mousewheel', function(e){
             if(e.originalEvent.wheelDelta < 0) {
                $('div.bhoechie-tab-menu>div.list-group>a.active').next().trigger('click'); 
            }else {
                 $('div.bhoechie-tab-menu>div.list-group>a.active').prev().trigger('click'); 
             }
             //prevent page fom scrolling
             return false;
         });
/**************End Sidebar Script******************/

/************ Product left menu ******************/
  $(document).on("click", ".bhoechie-tab-menu a", function(){
          var cith_height = $(".centerimgtreetextheight").height();
           $(".centerimgtreetextheightright").css("height",cith_height);
       });
/************End Product left menu ******************/

/***************** All Product Page SLider Section *******************/
            $(document).ready(function() {
              var owl = $('.owl-carousel');
              owl.owlCarousel({
                items: 1,
                loop: true,
                margin: 10,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true
              });
              $('.play').on('click', function() {
                owl.trigger('play.owl.autoplay', [1000])
              })
              $('.stop').on('click', function() {
                owl.trigger('stop.owl.autoplay')
              })
            })
/***************** End All Product Page SLider Section *******************/


/**************** Menu Logo Change Script *****************/
     $(document).ready(function(){
          $(".navbar-header").trigger("click");
      });
        
         function changeimage(){
            setInterval(function(){  
                
            var logo_src = $(".menu_image").attr("src");
                
                
              if(logo_src == "images/logo1.png") { 
                  $(".menu_image").attr("src", "images/logo2.png");
                  $(".menu_image").addClass("animated fadeIn infinite");
              }
              else {
                  $(".menu_image").attr("src", "images/logo1.png");
                  $(".menu_image").addClass("animated fadeIn infinite");
              }
            
            }, 2000);}
/**************** End Menu Logo Change Script *****************/


/******************** Fancybox image Selection Type ******************/
function fancybox_image_filter(){
            //   console.log("-----------------------------",fancyBoxClass)
        selectorClass = '.owl-item:not(.cloned) .'+fancyBoxClass+'_image';
        console.log('-6dsfsdf54654--',selectorClass)
        $().fancybox({
       //   selector : '.owl-item:not(.cloned)',
         selector : selectorClass,
          hash   : false,
          thumbs : {
            autoStart : true
          },
          buttons : [
            'zoom',
            'download',
            'close'
          ]
        });
           }
           fancybox_image_filter();
/******************** End Fancybox image Selection Type ******************/


/********************** Back to Top **********************/
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
/****************** Back to Top **********************/