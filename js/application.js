// Build the typeface meta modal and toggle visibility
var showMetaFullScreen = function(event) {
  var target = event.target; // li.typeface
  var metaFamily = $(target).data('family').replace(/\é/g,"e").replace(/(\.\s)|\s/g, '-').toLowerCase();

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

  $('.typeface-meta-fullscreen').addClass('is-active ' + metaFamily);
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

  $(document).on("click", "li.typeface", showMetaFullScreen);

  $(document).on("click", ".modal__close", function(){
    $('.modal-container').removeClass().addClass('typeface-meta-fullscreen modal-container');
  })
});
