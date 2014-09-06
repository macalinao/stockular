$(function() {
  $('.bloomberg').each(function() {
    $(this).qtip({
      title: 'Asdf',
      content: {
        text: $(this)[0].id
      }
    });
  });
});
