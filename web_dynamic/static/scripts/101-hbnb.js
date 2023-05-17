// Script that is executed only when DOM is loaded with jQuery

$(document).ready(function () {
let checked_box = {};
let reviewsShown = false;

  // Function to fetch and display reviews
  const fetchReviews = function() {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/places/' + PLACE_ID + '/reviews',
      success: function (data) {
        for (let review of data) {
          const reviewElem = '<li>' + review.text + '</li>';
          $('.reviews > ul').append(reviewElem);
        }
      }
    });
  }

  // Toggle display of reviews
  $('span#show_reviews').click(function() {
    if (!reviewsShown) {
      fetchReviews();
      $('.reviews').show();
      $(this).text('hide');
      reviewsShown = true;
    } else {
      $('.reviews > ul').empty();
      $('.reviews').hide();
      $(this).text('show');
      reviewsShown = false;
    }
  });
// Function to handle checkbox changes
    $('input:checkbox').change(function () {
	if ($(this).is(':checked_box')) {
	    checked_box[$(this).data('id')] = $(this).data('name');
	}
	else {
	    delete checked_box[$(this).data('id')];
	}
	$('div.amenities h4').html(function () {
	    let amenities = [];
	    Object.keys(checked_box).forEach(function (key) {
		amenities.push(checked_box[key]);
	    });
	    if (amenities.length === 0) {
		return ('&nbsp');
	    }
	    return (amenities.join(', '));
	});
    });


const apiStatus = $('DIV#api_status');
$.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
  


$('button').click(function(){
// When the button tag is clicked, make a new POST request to places_search with the list of Amenities, Cities and States checked
    let amenities = Object.keys(checkedBox);
    let cities = []; // Assuming the cities are selected using another checkbox with the data attribute "city-id"
    let states = []; // Assuming the states are selected using another checkbox with the data attribute "state-id"
    
    // Loop through all the checked city checkboxes and store their IDs in an array
    $('input:checkbox[data-city-id]:checked').each(function() {
      cities.push($(this).data('city-id'));
    });
    
    // Loop through all the checked state checkboxes and store their IDs in an array
    $('input:checkbox[data-state-id]:checked').each(function() {
      states.push($(this).data('state-id'));
    });
    
    // Make the POST request with the selected amenities, cities and states
$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: amenities, cities: cities, states: states }),
    success: function (data) {
	for (let currentPlace of data) {
	    $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + currentPlace.description + '</div></article>');
	}
    }
});

});
});
