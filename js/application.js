$(document).ready(function() {
  $('.typefaces li').hover(
    function () {
      var rank = $(this).data('rank');
      var bg = $(this).data('bg');
      var name = $(this).data('title');
      var family = $(this).data('family');
      var designer = $(this).data('designer');
      var year = $(this).data('year');

      $('.typeface-meta').html(
        '<div class="card">' +
        '<span class="rank">' + rank + '</span>' +
        '<i class="' + bg + '"></i>' +
        '<span class="title">' + name + '</span>' +
        '</div>' +
        '<span class="family">' + family + '</span>' +
        '<span class="designer">' + designer + '</span>' +
        '<span class="year">' + year + '</span>'
      );

      $('.typeface-meta').toggleClass('is-hidden ');
    }
  );
});