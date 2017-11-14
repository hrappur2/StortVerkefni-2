'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Niðurteljari!
 */
var Countdown = function () {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  function Countdown() {
    _classCallCheck(this, Countdown);

    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');

    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */


  _createClass(Countdown, [{
    key: 'load',
    value: function load() {
      var data = JSON.parse(window.localStorage.getItem(this.keyName));
      if (data) {
        this.create(data.title, data.date);
      }
      // console.log(JSON.parse(window.localStorage.getItem(this.keyName)));
    }

    /**
     * Tekur við title sem streng og date sem Date hlut
     * Vistar sem json gögn í localStorage undir this.keyName
     */

  }, {
    key: 'save',
    value: function save(title, date) {
      window.localStorage.setItem(this.keyName, JSON.stringify({ title: title, date: date }));
      // console.log(JSON.stringify({ title, date }));
    }

    /**
     * Handler fyrir submit á formi.
     * Sækir gögn úr formi og kallar í this.parseDate()
     * Vistar gögn með this.save() og sýnir niðurteljara með this.create()
     */

  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();

      var title = this.form.querySelector('input[type=text]');
      var date = this.form.querySelector('input[type=date]');
      var time = this.form.querySelector('input[type=time]');

      var dateObject = this.parseDate(date.value, time.value);

      this.save(title.value, dateObject);

      this.create(title.value, dateObject);
    }

    /**
     * Tekur við:
     *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
     *  - time sem streng á forminu "hh:mm", t.d. "09:00"
     * Skilar date hlut með gögnum úr date og time
     */

  }, {
    key: 'parseDate',
    value: function parseDate(date, time) {
      return Date.parse(date, time);
    }

    /**
     * Býr til element fyrir niðurteljara og bætir við this.container
     * Setur this.date sem dagsetningu sem talið er niður að
     * Setur this.element sem element sem geymir niðurteljara
     * Bætir við "eyða" takka sem sér um að eyða niðurteljara með this.delete
     * Byrjar niðurteljara með this.startCounter() og
     * felur form með this.hideForm()
     */

  }, {
    key: 'create',
    value: function create(title, date) {
      this.date = date;

      this.hideForm();

      var heading = document.createElement('h2');
      heading.classList.add('countdown__heading');
      heading.innerHTML = title;

      var div = document.createElement('div');
      div.classList.add('countdown__container');

      this.element = div;

      var button = document.createElement('button');
      button.classList.add('button');
      button.innerHTML = 'Eyða';
      button.addEventListener('click', this.delete.bind(this));

      this.container.appendChild(heading);
      this.container.appendChild(div);
      this.container.appendChild(button);

      this.startCounter();
    }

    /**
     * Felur form með CSS
     */

  }, {
    key: 'hideForm',
    value: function hideForm() {
      this.form.classList.add('form__hidden');
    }

    /**
     * Sýnir form með CSS
     */

  }, {
    key: 'showForm',
    value: function showForm() {
      this.form.classList.remove('form__hidden');
    }

    /**
     * Byrjar niðurteljara með this.count() og keyrir á 1000ms fresti
     * með window.setInterval og setur id á teljara í this.interval
     */

  }, {
    key: 'startCounter',
    value: function startCounter() {
      this.interval = window.setInterval(this.count.bind(this), 1000);
    }

    /**
     * Stöðvar teljara með window.clearInterval á this.interval
     */

  }, {
    key: 'stopCounter',
    value: function stopCounter() {
      window.clearInterval(this.interval);
    }

    /**
     * Býr til element sem heldur utan um teljara, á forminu:
     * <div class="countdown__box">
     *   <span class="countdown__num">num</span>
     *   <span class="countdown__title">title</span>
     * </div>
     * og skilar element
     */

  }, {
    key: 'createElement',
    value: function createElement(num, title) {
      var a = document.createElement('div');
      var b = document.createElement('span');
      var c = document.createElement('span');

      a.classList.add('countdown__box');
      b.classList.add('countdown__num');
      c.classList.add('countdown__title');

      b.innerHTML = num;
      c.innerHTML = title;

      a.appendChild(b);
      a.appendChild(c);
      this.element.appendChild(a);
    }

    /**
     * Eyðir niðurteljara með því að fjarlægja úr localStorage og
     * fjarlægja allt úr this.container.
     * Kallar líka í this.stopCounter() og this.showForm()
     */

  }, {
    key: 'delete',
    value: function _delete() {
      this.container.innerHTML = null;
      window.localStorage.removeItem(this.keyName);
      this.stopCounter();
      this.showForm();
    }

    /**
     * Tekur við remaining sem eru millisekúndur í dagsetningu sem talið er
     * niður í.
     * Útbýr og skilar element sem inniheldur element fyrir daga, klukkustundir,
     * mínútur og sekúndur þar til remaining gerist. Hver „partur“ er búinn til
     * með kalli í this.createElement
     */

  }, {
    key: 'countdown',
    value: function countdown(remaining) {
      var s = remaining / 1000;

      var days = Math.floor(s / (60 * 60 * 24));
      s %= 60 * 60 * 24;
      var hours = Math.floor(s / (60 * 60));
      s %= 60 * 60;
      var mins = Math.floor(s / 60);
      s %= 60;
      var secs = Math.floor(s);

      this.createElement(days, 'Dagar');
      this.createElement(hours, 'Klst');
      this.createElement(mins, 'Mín');
      this.createElement(secs, 'Sek');
    }

    /**
     * Telur niður.
     * Fjarlægir allt úr this.element (ef eitthvað er þar) og athugar síðan hvort
     * this.date (dagsetning sem talið er niður að) sé liðin og ef svo er birtir
     * textann "Komið!" og stoppa teljara með this.stopCounter()
     * Ef ekki liðið uppfærir teljara með því að bæta element úr this.countdown()
     * við this.element
     */

  }, {
    key: 'count',
    value: function count() {
      var remaining = this.date - Date.now();
      this.element.innerHTML = null;
      if (remaining <= 0) {
        var p = document.createElement('p');
        p.innerHTML = 'Komið!';
        p.classList.add('countdown__buid');
        this.element.appendChild(p);
        this.stopCounter();
      } else {
        this.countdown(remaining);
      }
    }
  }]);

  return Countdown;
}();

document.addEventListener('DOMContentLoaded', function () {
  var countdown = new Countdown();
  countdown.load();
});

//# sourceMappingURL=script-compiled.js.map