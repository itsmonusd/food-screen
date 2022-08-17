$(document).ready(function () {

    var $root = $('html, body');

    $('a[href^="#"]').click(function() {
        var href = $.attr(this, 'href');

        $root.animate({
            scrollTop: $(href).offset().top
        }, 600, function () {
            window.location.hash = href;
        });

        return false;
    });

    $('.owl-carousel').owlCarousel({
        autoplay: true,
        rewind: true,
        /* use rewind if you don't want loop */
        margin: 20,
        /*
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        */
        responsiveClass: true,
        // autoHeight: true,
        autoplayTimeout: 7000,
        smartSpeed: 800,
        nav: true,
        responsive: {
            0: {
                items: 1,
                margin: 10,
                stagePadding: 20,
            },
            600: {
                items: 3,
                margin: 20,
                stagePadding: 50,
            },
            1000: {
                items: 3
            }
        }
    });

    $('.addToCart').on('click', function (e) { 
        $(this).addClass('d-none');
        $(this).parent().find('.counter').removeClass('d-none');
    })

    // search filter
    $('#searchItems').keyup(function () {
        
        var tr = $('.menu li');
        if ($(this).val().length >= 2) {
            //var inputdata = $.trim($("#trainername").val());

            var noElem = true;
            var val = $.trim(this.value).toLowerCase();

            el = tr.filter(function () {
                return $(this).find('.restaurant-name').text().toLowerCase().match(val);
            });
            if (el.length >= 1) {
                noElem = false;
            }

            tr.not(el).fadeOut();
            el.fadeIn();

        } else {
            tr.fadeIn();

        }
    })


    
});

$(window).scroll(function () {
    if ($(window).scrollTop() >= 100) {
        $('#main-nav').addClass('fixed-header');
        // $('nav div').addClass('visible-title');
    } else {
        $('#main-nav').removeClass('fixed-header');
        // $('nav div').removeClass('visible-title');
    }

    var scrollDistance = $(window).scrollTop();

		// Show/hide menu on scroll
		//if (scrollDistance >= 850) {
		//		$('nav').fadeIn("fast");
		//} else {
		//		$('nav').fadeOut("fast");
		//}
	
    // Assign active class to nav links while scolling
    $('.restaurant-list').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                    $('.navigation a.active').removeClass('active');
                    $('.navigation a').eq(i).addClass('active');
            }
    });
}).scroll();

function toggleCart() {
    $('.order-panel').toggleClass('d-none');
    if ($(window).width() < 420){
      $('.restaurant-panel').toggleClass('mobile-cart');
    }
}

function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;

    // call ajax here
}

function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;

        // call ajax here  

    }else{
        b.parentNode.parentNode.childNodes[1].classList.remove('d-none');
        b.parentNode.classList.add('d-none');
        // call ajax here
    }
}


//location search
    // Prepare location info object.
    var locationInfo = {
        geo: null,
        country: null,
        state: null,
        city: null,
        postalCode: null,
        street: null,
        streetNumber: null,
        reset: function() {
          this.geo = null;
          this.country = null;
          this.state = null;
          this.city = null;
          this.postalCode = null;
          this.street = null;
          this.streetNumber = null;
        }
      };
      
      googleAutocomplete = {
        autocompleteField: function(fieldId) {
          (autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(fieldId)
          )),
            { types: ["geocode"] };
          google.maps.event.addListener(autocomplete, "place_changed", function() {
            // Segment results into usable parts.
            var place = autocomplete.getPlace(),
              address = place.address_components,
              lat = place.geometry.location.lat(),
              lng = place.geometry.location.lng();
      
            // Reset location object.
            locationInfo.reset();
      
            // Save the individual address components.
            locationInfo.geo = [lat, lng];
            for (var i = 0; i < address.length; i++) {
              var component = address[i].types[0];
              switch (component) {
                case "country":
                  locationInfo.country = address[i]["long_name"];
                  break;
                case "administrative_area_level_1":
                  locationInfo.state = address[i]["long_name"];
                  break;
                case "locality":
                  locationInfo.city = address[i]["long_name"];
                  break;
                case "postal_code":
                  locationInfo.postalCode = address[i]["long_name"];
                  break;
                case "route":
                  locationInfo.street = address[i]["long_name"];
                  break;
                case "street_number":
                  locationInfo.streetNumber = address[i]["long_name"];
                  break;
                default:
                  break;
              }
            }
      
            // Preview JSON output.
            // document.getElementById("js-preview-json").innerHTML = JSON.stringify(
            //   locationInfo,
            //   null,
            //   4
            // );
          });
        }
      };
      
      // Attach listener to address input field.
      googleAutocomplete.autocompleteField("address");