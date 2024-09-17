 // off canvas section -start



 
// Stiky-top

  $(window).scroll(function() {
    if($(this).scrollTop()>50) {
        $( "header" ).addClass("stick-me");
    } else {
        $( "header" ).removeClass("stick-me");
    }
});





// function resize(){

//     if ($(window).width()<991){
//         $('#myNav').addClass('mobile');
//     }
//     else {$('#myNav').removeClass('mobile');}
// }

// $(document).ready(function(){
// $(window).resize(resize);
// resize();
// }); 


// mouse move image

var currentX = '';
var currentY = '';
var movementConstant = .010;
$(document).mousemove(function(e) {
  if(currentX == '') currentX = e.pageX;
  var xdiff = e.pageX - currentX;
  currentX = e.pageX;
   if(currentY == '') currentY = e.pageY;
  var ydiff = e.pageY - currentY;
  currentY = e.pageY; 
  $('.mouse-move div').each(function(i, el) {
      var movement = (i + 1) * (xdiff * movementConstant);
      var movementy = (i + 1) * (ydiff * movementConstant);
      var newX = $(el).position().left + movement;
      var newY = $(el).position().top + movementy;
      $(el).css('left', newX + 'px');
      
  });
});


// Stiky-top
 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".hsolution");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let _hsolution = `${50 - (_mouseX - _w) * 0.03}% ${100 - (_mouseY - _h) * 0.00}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1},  ${_hsolution}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();

 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".esolution");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let _esolution = `${50 - (_mouseX - _w) * 0.03}% ${100 - (_mouseY - _h) * 0.00}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1},  ${_esolution}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();


 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".agrisolution");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let _agrisolution = `${50 - (_mouseX - _w) * 0.03}% ${100 - (_mouseY - _h) * 0.00}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1},  ${_agrisolution}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();


 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".product");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _product = `${50 - (_mouseX - _w) * 0.01}% ${100 - (_mouseY - _h) * 0.00}%`;
        
        let x = `${_depth3}, ${_depth2}, ${_depth1}, ${_product} `;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();


 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".products");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _products = `${50 - (_mouseX - _w) * 0.01}% ${100 - (_mouseY - _h) * 0.00}%`;
        
        let x = `${_depth3}, ${_depth2}, ${_depth1}, ${_products} `;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();

 (function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".products-bg");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${00 - (_mouseY - _h) * 0.0}%`;
        let _productsbg = `${50 - (_mouseX - _w) * 0.01}% ${100 - (_mouseY - _h) * 0.00}%`;
        
        let x = `${_depth3}, ${_depth2}, ${_depth1}, ${_productsbg} `;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();




(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".product-icon");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/1;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
        let _producticon = `${50 - (_mouseX - _w) * 0.01}% ${100 - (_mouseY - _h) * 0.00}%`;
        let x = `${_depth3}, ${_depth2}, ${_depth1},  ${_producticon}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();





// Full page Menu Section
function openNav() {
  document.getElementById("myNav").style.height = "95%";
}
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}





// Full page Menu Section
  


$('#leads-slides').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    autoplay: true,
    autoPlaySpeed: 5000,
    autoPlayTimeout: 5000,
    responsiveClass:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInUp',
    smartSpeed:200,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1,
            loop:true,
            dots:false,
        }
    }
})


$('#product-details').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay: false,
    autoPlaySpeed: 5000,
    responsiveClass:true,
    rewindNav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1,
            loop:true,
            dots:false,
        }
    }
})


$('#benefits-slides').owlCarousel({
  
    loop:true,
    margin:10,
    mouseDrag:false,
    autoplay:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInUp',
    smartSpeed:200,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1,
            loop:true,
            
        }
    }
})


$('#impact-slides').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay: true,
    autoPlaySpeed: 5000,
    responsiveClass:true,
    animateOut: 'fadeOut',
    animateIn: 'fadeInDown',
    smartSpeed:200,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1,
            loop:true,
            dots:false,
        }
    }
})

// Common Owl section

//  $('.owl-carousel').owlCarousel({
//     margin:10,
//     nav:true,
//     autoplay: true,
//     autoPlaySpeed: 7000,
//     autoPlayTimeout: 7000,
//     autoplayHoverPause: true,
//     responsiveClass:true,
//     responsive:{
//         0:{
//             items:1,
//             nav:true
//         },
//         600:{
//             items:1,
//             nav:false
//         },
//         1000:{
//             items:1,
//             nav:true,
//             loop:true,


            
//         }
//     }
// })

 // Common Owl section


 var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("content-slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000);    
}

 // environment section











/* <script>
        init_pointer({
            
        })

</script> */





