'use strict';

document.addEventListener('DOMContentLoaded', function () {
  program.init();
});

var program = function () {
  //skilgreinum breytur hér vegna scope
  var results;
  var button;

  function click(e) {
    e.preventDefault(); //slökkt á hefðbundinni virkni
    randomString();
  }

  function readJSON(number) {
    //tímabundið til að vinna locally, þarf að downloada cors ext fyrir chrome svo virki (security shit):
    var url = 'https://notendur.hi.is/gon2/vefforritun/st%C3%B3rtverkefni2/videos.json';

    //showLoading();

    var r = new XMLHttpRequest();
    r.open('GET', url, true);
    r.onload = function () {
      if (r.status >= 200 && r.status < 400) {
        var result = JSON.parse(r.response);
        showData(result.videos[0]);
      }
    }; //gera ráðstafanir fyrir errors?

    r.send();
  }

  function showData(data) {
    //sýnum upplýsingarnar sem við viljum sýna
    console.log(data);
  }

  function init() {
    results = document.querySelector('.results'); //result divið
    button = document.querySelector('.generate'); //búa til takkinn
    readJSON();
    //button.addEventListener('click', click);
  }

  return {
    init: init
  };
}();

//# sourceMappingURL=script-compiled.js.map