function loadBloomberg() {
  $(function() {
    $('.bloomberg').each(function() {
      $(this).qtip({
        title: 'Asdf',
        content: {
          text: $(this)[0].id
        }
      });
    });
    console.log('b');
  });
  console.log('a');
}
loadBloomberg();
