var showMeta = function(event){
  target = event.target;

  var rank      = $(target).data('rank');
  var bg        = $(target).data('bg');
  var name      = $(target).data('title');
  var family    = $(target).data('family');
  var designer  = $(target).data('designer');
  var year      = $(target).data('year');

  $('.typeface-meta').html(
    '<div class="card">' +
    '<span class="rank">' + rank + '</span>' +
    '<i class="' + bg + '"></i>' +
    '<span class="title">' + name + '</span>' +
    '</div>'
  );

  $('.typeface-meta').toggleClass('is-hidden');
};

var showMetaFullScreen = function(event) {
  var target = event.target;

  var rank      = $(target).data('rank');
  var bg        = $(target).data('bg');
  var name      = $(target).data('title');
  var family    = $(target).data('family');
  var designer  = $(target).data('designer');
  var year      = $(target).data('year');

  $('.typeface-meta-fullscreen').html(
    '<div class="modal">' +
      '<div class="modal__actions">' +
        '<button class="modal__close" type="button"><i class="ico ico-close"></i><span class="visually-hidden">close</span></button>' +
      '</div>' +
      '<div class="media">' +
        '<div class="media__figure">' +
          '<div class="card">' +
            '<span class="rank">' + rank + '</span>' +
            '<i class="' + bg + '"></i>' +
            '<span class="title">' + name + '</span>' +
          '</div>' +
        '</div>' +
      '<div class="media__body">' +
        '<span class="family">' + family + '</span>' +
        '<span class="designer">' + designer + '</span>' +
        '<span class="year">' + year + '</span>' +
      '</div>' +
    '</div>'
  );

  $('.typeface-meta-fullscreen').toggleClass('is-active');

};

$( document ).ready(function() {
  $("li.typeface").hover(showMeta);  
  $(document).on("click", "li.typeface", showMetaFullScreen);
  $(document).on("click", ".modal__close", function(){
    $('.modal-container').removeClass('is-active');
  })
});
