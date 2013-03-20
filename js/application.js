$(document).ready(function() {
  $('li').hover(
    function () {
      var name = $(this).data('title');
      var family = $(this).data('family');

      // $(name, family).appendTo($('.typeface-meta'));

      $('.typeface-meta').html(
        '<span class="type-title">' + name + '</span>' +
        '<span class="type-family">' + family + '</span>'
      );

      // $([$('<span>', {
      //   className: 'type-title',
      //   html: name
      // }),
      // $('<span>', {
      //   className: 'type-family',
      //   html: family
      // })]).appendTo($('.typeface-meta'));

      $('.typeface-meta').toggleClass('is-hidden');
    }
  );
});