// Import jQuery
import $ from 'jquery';

// Constants
const API_URL = 'https://smileschool-api.hbtn.info/';
const API_URL = 'https://smileschool-api.hbtn.info/quotes';
const CAROUSEL_SELECTOR = '#quote-carousel, #popular-carousel, #latest-carousel';

// Helper functions
function showLoader() {
  $('.loader').show();
}

function hideLoader() {
  $('.loader').hide();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRatingStars(starCount) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < starCount) {
      stars += '<img src="images/star_on.png" alt="star on" width="15px" height="15px" />';
    } else {
      stars += '<img src="images/star_off.png" alt="star off" width="15px" height="15px" />';
    }
  }
  return stars;
}

// Carousel functions
function getQuotesCarouselData() {
  $.ajax({
    url: API_URL + 'quotes',
    method: 'GET',
    beforeSend: showLoader,
    success: function(response) {
      hideLoader();
      const carouselHtml = response.map((quote, index) => {
        return `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${quote.pic_url}" class="d-block align-self-center rounded-circle" alt="Carousel Pic ${index + 1}" />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">« ${quote.text}</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
      $(CAROUSEL_SELECTOR).html(carouselHtml);
      $(CAROUSEL_SELECTOR).carousel({
        interval: false
      });
    },
    error: function() {
      hideLoader();
      alert('Failed to load quotes API');
    }
  });
}

function getPopularCarouselData() {
  $.ajax({
    url: API_URL + 'popular-tutorials',
    method: 'GET',
    beforeSend: showLoader,
    success: function(response) {
      hideLoader();
      const carouselHtml = response.map((card, index) => {
        return `
          <div class="carousel-item">
            <div class="card justify-content-center">
              <img src="${card.thumb_url}" class="card-img-top" alt="Video thumbnail" />
              <div class="card-img-overlay text-center">
                <img src="images/play.png" alt="Play" width="64px" class="d-flex mx-auto play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${card.title}</h5>
                <p class="card-text text-muted">${card['sub-title']}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${card.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${card.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating row">
                    ${getRatingStars(card.star)}
                  </div>
                  <span class="main-color">${card.duration}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
      $(CAROUSEL_SELECTOR).html(carouselHtml);
      $(CAROUSEL_SELECTOR).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $(CAROUSEL_SELECTOR + ' .carousel-control-prev'),
        nextArrow: $(CAROUSEL_SELECTOR + ' .carousel-control-next'),
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    },
    error: function