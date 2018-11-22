$(document).ready(function() {


        var prevX, prevY = 0;
        var score = 1;

        var imgSrc = $('.polaroid-text').attr('data-src');

        if(!isMobile) {

          $('.shake-item').mousemove(function(e) {
              if (prevX === undefined || prevY === undefined && score > 0) {
                  score -= 0.02;
                  $('button').css('opacity', score);
              } else {
                if (score > 0) {
                  dx = Math.abs(e.pageX - prevX);
                  dy = Math.abs(e.pageY - prevY);
                  score -= 0.02;
                  $('.shake-help').fadeOut(1000);
                  $('.shake-item').css('opacity', score);
                } else {
                  $('.shake-item').css('pointer-events', 'none');
                  $('.shake-item-share').css('pointer-events', 'auto');
                  $('.polaroid-text').attr('src', imgSrc);
                  setTimeout(function() {
                    $('.logo img.two').fadeIn(1000, function(){
                      $('.logo img.one').hide();
                    });
                  },500);
                  e.stopPropagation();
                }
              }
              prevX = e.pageX;
              prevY = e.pageY;
              console.log(score);

            });

        } else {

          var windowHeight = $(window).height();
          $('.shake-content').css('height', windowHeight);

          //create a new instance of shake.js.
          var myShakeEvent = new Shake({
            threshold: 5,
            timeout: 250
          });

          // start listening to device motion
          myShakeEvent.start();

          // register a shake event
          window.addEventListener('shake', shakeEventDidOccur, false);

          //shake event callback
          function shakeEventDidOccur () {
              //put your own code here etc.

              if (score > 0) {
                score -= 0.25;
                $('.shake-help').fadeOut(1000);
                $('.shake-item').css('opacity', score);
              } else {
                myShakeEvent.stop();
                $('.polaroid-text').attr('src', imgSrc);
                setTimeout(function() {
                  $('.logo img.two').fadeIn(1000, function(){
                    $('.logo img.one').hide();
                  });
                },500);
              }

          }

        }


  	var isMobile = false;
  	var w = $(window).width(),
  		h = $(window).height();

  	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || w < 800) {
  		// mobile
  		$('html').addClass('mobile');
  		isMobile = true;
  	} else {
  		// desktop
  		$('html').addClass('desktop');
  	}

});
