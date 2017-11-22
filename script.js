document.addEventListener('DOMContentLoaded', function() {
  program.init();
});

var program = (function() {
  var videolist;
  var video;
  var source;
  var localparse;
  var getlocal;

  var imagediv;
  var back;
  var next;
  var pause;
  var play;
  var playOverlay;
  var overlayDiv;
  var mute;
  var unmute;
  var fullscreen;

  var backImg;
  var nextImg;
  var pauseImg;
  var playImg;
  var playoverlayImg;
  var muteImg;
  var unmuteImg;
  var fullscreenImg;

  function showData(data) { //sækir gögn og býr til element
    const lengd = data.categories.length; //hversu margir flokkar

      for (var i=0; i<lengd; i++) { //búum til element fyrir alla flokka
        createElement(data, i);
    }
  }

  function createElement(data, index) {
    const a = document.createElement('div');
    a.classList.add('videolist__category');
    const h2 = document.createElement('h2'); //element fyrir category titil
    const r1 = document.createElement('div');
    const c1 = document.createElement('div');
    h2.classList.add('videolist__h2');

    r1.classList.add('row');
    c1.classList.add('col-12');

    h2.innerHTML = data.categories[index].title;

    c1.appendChild(h2);
    r1.appendChild(c1);
    a.appendChild(r1);

    const section = document.createElement('section');
    const r2 = document.createElement('div');
    const c2 = document.createElement('div');
    r2.classList.add('row-center');
    c2.classList.add('col');
    c2.classList.add('col-10');
    c2.classList.add('videolist__line');
    r2.appendChild(c2);

    section.appendChild(a);
    section.appendChild(r2);

    videolist.appendChild(section);

    const b = document.createElement('div');
    b.classList.add('videolist__videos');
    b.classList.add('row');
    a.appendChild(b);

    const lengd = data.categories[index].videos.length; //lengd video fylkisins fyrir viðkomandi category

    //ATH eftir að adda link á myndir og ná í tímaupplýsingar úr json
    for (var i=0; i<lengd; i++) {
      var id = data.categories[index].videos[i];

      var c = document.createElement('div');
      c.classList.add('videolist__videoData');
      c.classList.add('col');
      c.classList.add('col-4');
      c.classList.add('col-sm-6');
      c.classList.add('col-sms-12');
      b.appendChild(c);

      var d = document.createElement('a');
      d.setAttribute('id', data.videos[id-1].id);
      const videoid = data.videos[id-1].id;
      d.setAttribute('href', 'video.html?id=' + videoid);
      d.classList.add('videolist__posterAndDuration');
      c.appendChild(d);

      var e = document.createElement('img'); //ATH á eftir að adda link á myndirnar
      e.setAttribute('src', data.videos[id-1].poster);
      e.classList.add('videolist__poster');
      d.appendChild(e);

      var f = document.createElement('h4');
      f.classList.add('videolist__duration');
      var dur = data.videos[id-1].duration;
      var minutes = Math.floor(dur / 60);
      var seconds = dur - minutes * 60;
      if ((seconds/10) < 1) seconds = '0' + seconds; //ef sekúndur eru undir 10
      f.innerHTML = minutes + ":" + seconds;
      d.appendChild(f);

      var g = document.createElement('h4');
      g.classList.add('videolist__title');
      g.innerHTML = data.videos[id-1].title;
      c.appendChild(g);

      const created = Date.now() - data.videos[id-1].created; //ms síðan var uploadað
      const s = created / 1000; //sec síðan uploadað
      const days = Math.floor(s / (60 * 60 * 24));
      const hours = Math.floor(s / (60 * 60));
      var strengur;
      if ((days/365) >= 1) {
        const a = parseInt(days/365);
        if (a == 1) strengur = 'Fyrir 1 ári síðan';
        else strengur = 'Fyrir ' + a + ' árum síðan';
      }
      else if ((days/30) >= 1) {
        const a = parseInt(days/30);
        if (a == 1) strengur = 'Fyrir 1 mánuði síðan';
        else strengur = 'Fyrir ' + a + ' mánuðum síðan';
      }
      else if ((days/7) >= 1) {
        const a = parseInt(days/7);
        if (a == 1) strengur = 'Fyrir 1 viku síðan';
        else strengur = 'Fyrir ' + a + ' vikum síðan';
      }
      else if ((days) >= 1) {
        const a = parseInt(days);
        if (a == 1) strengur = 'Fyrir 1 degi síðan';
        else strengur = 'Fyrir ' + a + ' dögum síðan';
      }
      else {
        const a = parseInt(hours);
        if (a == 1) strengur = 'Fyrir 1 klukkustund síðan';
        else strengur = 'Fyrir ' + a + ' klukkustundum síðan';
      }
      console.log(strengur);

      var h = document.createElement('div');
      h.classList.add('videolist__created');
      h.innerHTML = strengur;
      c.appendChild(h);
    }
  }

  function getvideo() {
    getlocal = window.localStorage.getItem('datastore');
    localparse = JSON.parse(getlocal);
    var url = window.location.href;
    var urlid = url.substring(url.length-1);
    var playme;
    var playmetitle;
    var iflength = localparse.videos.length;
    if (urlid <= iflength) {
      playme = localparse.videos[urlid-1].video;
      playmetitle = localparse.videos[urlid-1].title;
      showvideo(playme, playmetitle);
    }
    else {
      const videodisplay = document.querySelector('.videodisplay');
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('videoplay__error');

      const h1 = document.createElement('h1');
      h1.classList.add('videoplay__hError');
      h1.textContent = 'Myndbandaleigan';
      errorDiv.appendChild(h1);
      const h4 = document.createElement('h4');
      h4.classList.add('videoplay__hError');
      h4.textContent = 'Videó er ekki til';
      errorDiv.appendChild(h4);
      videodisplay.appendChild(errorDiv);
    }

  }

  function showvideo(playme, playmetitle) {

    const videodisplay = document.querySelector('.videodisplay');
    video = document.createElement('div');
    video.classList.add('videoplay__video');
    source = document.createElement('video');
    source.classList.add('videoplay__source');

    const h1video = document.createElement('h1');
    h1video.classList.add('videoplay__h1');
    const jsontitle = JSON.stringify(playmetitle);
    h1video.textContent = jsontitle.substring(1, jsontitle.length-1);
    const h1coldiv = document.createElement('div');
    h1coldiv.classList.add('col');
    h1coldiv.classList.add('col-8');
    h1coldiv.appendChild(h1video);

    // Div fyrir video og overlay
    overlayDiv = document.createElement('div');
    source.setAttribute('src', playme);
    overlayDiv.appendChild(source);
    video.appendChild(overlayDiv);

    const r3 = document.createElement('div');
    r3.appendChild(h1coldiv);
    r3.classList.add('row-center');
    video.classList.add('col');
    video.classList.add('col-8');
    r3.appendChild(video);

    videodisplay.appendChild(r3);

    imagediv = document.createElement('div');

    imagediv.classList.add('videoplay__buttons');

    back = document.createElement('button');
    next = document.createElement('button');
    pause = document.createElement('button');
    play = document.createElement('button');
    playOverlay = document.createElement('button');
    mute = document.createElement('button');
    unmute = document.createElement('button');
    fullscreen = document.createElement('button');

    backImg = document.createElement('img');
    nextImg = document.createElement('img');
    pauseImg = document.createElement('img');
    playImg = document.createElement('img');
    playoverlayImg = document.createElement('img');
    muteImg = document.createElement('img');
    unmuteImg = document.createElement('img');
    fullscreenImg = document.createElement('img');

    back.classList.add('videoplay__button');
    next.classList.add('videoplay__button');
    pause.classList.add('videoplay__button');
    play.classList.add('videoplay__button');
    playOverlay.classList.add('videoplay__overbutton');
    overlayDiv.classList.add('videoplay__overlay');
    mute.classList.add('videoplay__button');
    unmute.classList.add('videoplay__button');
    fullscreen.classList.add('videoplay__button');

    backImg.src = "img/back.svg";
    nextImg.src = "img/next.svg";
    pauseImg.src = "img/pause.svg";
    playImg.src = "img/play.svg";
    playoverlayImg.src = "img/play.svg";
    muteImg.src = "img/mute.svg";
    unmuteImg.src = "img/unmute.svg";
    fullscreenImg.src = "img/fullscreen.svg";

    back.appendChild(backImg);
    next.appendChild(nextImg);
    pause.appendChild(pauseImg);
    play.appendChild(playImg);
    playOverlay.appendChild(playoverlayImg);
    mute.appendChild(muteImg);
    unmute.appendChild(unmuteImg);
    fullscreen.appendChild(fullscreenImg);

    imagediv.appendChild(back);
    imagediv.appendChild(play);
    imagediv.appendChild(mute);
    imagediv.appendChild(fullscreen);
    imagediv.appendChild(next);

    overlayDiv.appendChild(playOverlay);

    video.appendChild(imagediv);

    back.addEventListener("click", backEvent);
    next.addEventListener("click", nextEvent);
    pause.addEventListener("click", pauseEvent);
    play.addEventListener("click", playEvent);
    source.addEventListener("click", playOverlayEvent);
    mute.addEventListener("click", muteEvent);
    unmute.addEventListener("click", unmuteEvent);
    fullscreen.addEventListener("click", fullscreenEvent);

    const gobackDiv = document.createElement('div');
    const gobackLink = document.createElement('a');

    gobackDiv.classList.add('videoplay__goback');
    gobackLink.classList.add('videoplay__gobacklink');


    gobackLink.appendChild(document.createTextNode('Til baka'));
    gobackLink.title = 'Til baka';
    gobackLink.href = 'index.html';

    gobackDiv.appendChild(gobackLink);
    video.appendChild(gobackDiv);

  }

  function backEvent(e) {
    e.preventDefault();
    source.currentTime -= 3;
  }

  function nextEvent(e) {
    e.preventDefault();
    source.currentTime += 3;
  }

  function pauseEvent(e) {
    e.preventDefault();
    source.pause();
    imagediv.removeChild(pause);
    imagediv.insertBefore(play, imagediv.children[1]);

    video.insertBefore(overlayDiv, video.children[0]);

  }

  function playEvent(e) {
    e.preventDefault();
    source.play();
    imagediv.removeChild(play);
    imagediv.insertBefore(pause, imagediv.children[1]);
  }

  function playOverlayEvent(e) {
    e.preventDefault();

    if (source.currentTime > 0 && !source.paused && !source.ended) {
      source.pause();
      imagediv.removeChild(pause);
      imagediv.insertBefore(play, imagediv.children[1]);
      overlayDiv.appendChild(playOverlay);
    } else {
      source.play();
      imagediv.removeChild(play);
      imagediv.insertBefore(pause, imagediv.children[1]);
      overlayDiv.removeChild(playOverlay);
    }
  }

  function muteEvent(e) {
    e.preventDefault();
    source.muted = true;
    imagediv.removeChild(mute);
    imagediv.insertBefore(unmute, imagediv.children[2]);
  }

  function unmuteEvent(e) {
    e.preventDefault();
    source.muted = false;
    imagediv.removeChild(unmute);
    imagediv.insertBefore(mute, imagediv.children[2]);
  }

  function fullscreenEvent(e) {
    source.webkitRequestFullscreen();
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
        window.localStorage.setItem('datastore', JSON.stringify(results));
        showData(results); //sendum gögnin í showData fallið
      }
    }; //gera ráðstafanir fyrir errors?
    r.send();
  }

  function init() {
    videolist = document.querySelector('.videolist'); //divið í index.html

    if (videolist !== null) {
      const h1 = document.createElement('h1');
      h1.textContent = 'Myndbandaleigan';
      videolist.appendChild(h1);
      readJSON(); //lesum videos.json
    }
    else {
      getvideo();
    }
  }

  return {
    init: init
  }
})();
