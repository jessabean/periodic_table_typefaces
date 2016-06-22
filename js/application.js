// Build the typeface card 
var buildCard = function(event){
  target = event.target;

  var rank      = $(target).data('rank');
  var name      = $(target).data('title');

  $.get('templates/typeface-card.mustache.html',
    function (template, textStatus, jqXhr) {

      var cardData = {
        name: $(target).data('title'),
        rank: $(target).data('rank')
      };

      cardData.lower = function () {
        return function (text, render) {
          text = render(text).replace(/\é/g,"e");
          return render(text).replace(/(\.\s)|\s/g, '-').toLowerCase();
        };
      };
   
    var typefaceCardHtml = Mustache.render(template, cardData);
    $('.typeface-meta').html(typefaceCardHtml);
  });
};

// Build the typeface meta modal and toggle visibility
var showMetaFullScreen = function(event) {
  var target = event.target; // li.typeface
  var family = $(target).data('family').replace(/\é/g,"e").replace(/(\.\s)|\s/g, '-').toLowerCase();
  $.get('templates/typeface-meta.mustache.html',
    function (template, textStatus, jqXhr) {

      var typefaceData = {
        name: $(target).data('title'),
        abbreviation: $(target).textContent,
        rank: $(target).data('rank'),
        family: $(target).data('family'),
        designer: $(target).data('designer'),
        year: $(target).data('year'),
      };

      typefaceData.lower = function () {
        return function (text, render) {
          text = render(text).replace(/\é/g,"e");
          return render(text).replace(/(\.\s)|\s/g, '-').toLowerCase();
        };
      };
   
    var typefaceMetaHtml = Mustache.render(template, typefaceData);
    $('.typeface-meta-fullscreen').html(typefaceMetaHtml);
  });

  $('.typeface-meta-fullscreen').toggleClass('is-active ' + family);
};

// Build the typefaces table from JSON file
var buildPeriodicTable = function() {
  $.getJSON('./js/typefaces.json', {}, function (typefaceData, textStatus, jqXHr) {
     $.get('templates/typeface-table.mustache.html', function (template, textStatus, jqXhr) {
      typefaceData.lower = function () {
        return function (text, render) {
          text = render(text).replace(/\é/g,"e");
          return render(text).replace(/(\.\s)|\s/g, '-').toLowerCase();
        };
      };

      var typefaceTableHtml = Mustache.render(template, typefaceData);
      $('#main').prepend(typefaceTableHtml);

      $(".typeface").each(function(){
        var spacerCount = parseInt($(this).attr('data-spacer'));
        var spacers = [];

        if(spacerCount > 0) {
          for(i=0; i<spacerCount; i++) {
            spacers.push('<li class="spacer"></li>');
            $(this).after(spacers.join('\n'));
            spacers = [];
          }
        }
      });

     });
   });
};

$( document ).ready(function() {
  buildPeriodicTable();

  $(document).on("mouseenter", "li.typeface", function(event){
    buildCard(event);
    $('.typeface-meta').removeClass('is-hidden');
  });

  $(document).on("mouseleave", "li.typeface", function(){
    $('.typeface-meta').addClass('is-hidden');
  });

  $(document).on("click", "li.typeface", showMetaFullScreen);

  $(document).on("click", ".modal__close", function(){
    $('.modal-container').removeClass('is-active');
  })
});
