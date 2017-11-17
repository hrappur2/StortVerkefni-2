'use strict';

document.addEventListener('DOMContentLoaded', function () {
  program.init();
});

var program = function () {
  var videolist;

  function showData(data) {
    //sækir gögn og býr til element
    var lengd = data.categories.length; //hversu margir flokkar

    for (var i = 0; i < lengd; i++) {
      //búum til element fyrir alla flokka
      createElement(data, i);
    }
  }

  function createElement(data, index) {
    var a = document.createElement('div');
    a.classList.add('videolist__category');
    a.innerHTML = data.categories[index].title;
    videolist.appendChild(a);

    var b = document.createElement('div');
    b.classList.add('videolist__videos');
    a.appendChild(b);

    var lengd = data.categories[index].videos.length; //lengd video fylkisins fyrir viðkomandi category

    //ATH eftir að adda link á myndir og ná í tímaupplýsingar úr json
    for (var i = 0; i < lengd; i++) {
      var id = data.categories[index].videos[i];

      var c = document.createElement('div');
      c.classList.add('videolist__videoData');
      b.appendChild(c);

      var d = document.createElement('img'); //ATH á eftir að adda link á myndirnar
      d.setAttribute('src', data.videos[id - 1].poster);
      d.classList.add('videolist__poster');
      c.appendChild(d);

      var e = document.createElement('h4');
      e.classList.add('videolist__title');
      e.innerHTML = data.videos[id - 1].title;
      c.appendChild(e);
    }
  }

  function readJSON(data) {
    //fall til að lesa videos.json
    var url = 'videos.json'; //verður að keyra live server svo virki!
    var kappa = 'results.videos[0]';
    //showLoading();
    var r = new XMLHttpRequest();
    r.open('GET', url, true);
    r.onload = function () {
      if (r.status >= 200 && r.status < 400) {
        var results = JSON.parse(r.response); //'global' breyta
        showData(results); //sendum gögnin í showData fallið
      }
    }; //gera ráðstafanir fyrir errors?
    r.send();
  }

  function init() {
    videolist = document.querySelector('.videolist'); //divið í index.html
    readJSON(); //lesum videos.json
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=script-compiled.js.map