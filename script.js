document.addEventListener('DOMContentLoaded', function() {
  program.init();
});

var program = (function() {
  var content;

  function showData(data) { //sækir gögn og býr til element
    const lengd = data.categories.length; //hversu margir flokkar

    for (var i=0; i<lengd; i++) { //búum til element fyrir alla flokka
      createElement(data, i);
    }
  }

  function createElement(data, index) {
    const a = document.createElement('div');
    a.classList.add('videolist__category');
    a.innerHTML = data.categories[index].title;

    content.appendChild(a);
  }

  function readJSON(data) { //fall til að lesa videos.json
    var url = 'videos.json'; //verður að keyra live server svo virki!
    var kappa = 'results.videos[0]';
    //showLoading();
    var r = new XMLHttpRequest();
    r.open('GET', url, true);
    r.onload = function() {
      if (r.status >= 200 && r.status < 400) {
        var results = JSON.parse(r.response); //'global' breyta
        showData(results); //sendum gögnin í showData fallið
      }
    }; //gera ráðstafanir fyrir errors?
    r.send();
  }

  function init() {
    content = document.querySelector('.content'); //divið í index.html
    readJSON(); //lesum videos.json
  }

  return {
    init: init
  }
})();
