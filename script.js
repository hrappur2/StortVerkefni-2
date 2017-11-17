document.addEventListener('DOMContentLoaded', function() {
  program.init();
});

var program = (function() {
  var videolist;

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
    videolist.appendChild(a);

    const b = document.createElement('div');
    b.classList.add('videolist__video');
    a.appendChild(b);

    const lengd = data.categories[index].videos.length; //lengd video fylkisins fyrir viðkomandi category

    for (var i=0; i<lengd; i++) {
      //console.log(data.categories[index].videos[i]);
      var id = data.categories[index].videos[i];
      //fáum 1-4 úr id en byrjum á 0 þess vegna -1:
      var c = document.createElement('img'); //ATH á eftir að adda link á myndirnar
      c.setAttribute('src', data.videos[id-1].poster);
      c.classList.add('videolist__poster');
      b.appendChild(c);
    }
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
    videolist = document.querySelector('.videolist'); //divið í index.html
    readJSON(); //lesum videos.json
  }

  return {
    init: init
  }
})();
