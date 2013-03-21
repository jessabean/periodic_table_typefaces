$(document).ready(function() {
  $('li').hover(
    function () {
      var rank = $(this).data('rank');
      var name = $(this).data('title');
      var family = $(this).data('family');
      var designer = $(this).data('designer');
      var year = $(this).data('year');

      $('.typeface-meta').html(
        '<span class="rank">' + rank + '</span>' +
        '<span class="title">' + name + '</span>' +
        '<span class="family">' + family + '</span>' +
        '<span class="designer">' + designer + '</span>' +
        '<span class="year">' + year + '</span>'
      );

      $('.typeface-meta').toggleClass('is-hidden');
    }
  );
});