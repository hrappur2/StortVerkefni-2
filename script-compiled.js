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

      var d = document.createElement('div');
      d.classList.add('videolist__posterAndDuration');
      c.appendChild(d);

      var e = document.createElement('img'); //ATH á eftir að adda link á myndirnar
      e.setAttribute('src', data.videos[id - 1].poster);
      e.classList.add('videolist__poster');
      d.appendChild(e);

      var f = document.createElement('div');
      f.classList.add('videolist__duration');
      var dur = data.videos[id - 1].duration;
      var minutes = Math.floor(dur / 60);
      var seconds = dur - minutes * 60;
      if (seconds / 10 < 1) seconds = '0' + seconds; //ef sekúndur eru undir 10
      f.innerHTML = minutes + ":" + seconds;
      d.appendChild(f);

      var g = document.createElement('h4');
      g.classList.add('videolist__title');
      g.innerHTML = data.videos[id - 1].title;
      c.appendChild(g);

      var created = Date.now() - data.videos[id - 1].created; //ms síðan var uploadað
      var s = created / 1000; //sec síðan uploadað
      var days = Math.floor(s / (60 * 60 * 24));
      var hours = Math.floor(s / (60 * 60));
      var strengur;
      if (days / 365 >= 1) {
        var _a = parseInt(days / 365);
        if (_a == 1) strengur = 'Fyrir 1 ári síðan';else strengur = 'Fyrir ' + _a + ' árum síðan';
      } else if (days / 30 >= 1) {
        var _a2 = parseInt(days / 30);
        if (_a2 == 1) strengur = 'Fyrir 1 mánuði síðan';else strengur = 'Fyrir ' + _a2 + ' mánuðum síðan';
      } else if (days / 7 >= 1) {
        var _a3 = parseInt(days / 7);
        if (_a3 == 1) strengur = 'Fyrir 1 viku síðan';else strengur = 'Fyrir ' + _a3 + ' vikum síðan';
      } else if (days >= 1) {
        var _a4 = parseInt(days);
        if (_a4 == 1) strengur = 'Fyrir 1 degi síðan';else strengur = 'Fyrir ' + _a4 + ' dögum síðan';
      } else {
        var _a5 = parseInt(hours);
        if (_a5 == 1) strengur = 'Fyrir 1 klukkustund síðan';else strengur = 'Fyrir ' + _a5 + ' klukkustundum síðan';
      }
      console.log(strengur);

      var h = document.createElement('div');
      h.classList.add('videolist__created');
      h.innerHTML = strengur;
      c.appendChild(h);
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