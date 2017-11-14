/**
 * Niðurteljari!
 */
class Countdown {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  constructor() {
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
  load() {
    const data = JSON.parse(window.localStorage.getItem(this.keyName));
    if (data) {
      this.create(data.title, data.date);
    }
    // console.log(JSON.parse(window.localStorage.getItem(this.keyName)));
  }

  /**
   * Tekur við title sem streng og date sem Date hlut
   * Vistar sem json gögn í localStorage undir this.keyName
   */
  save(title, date) {
    window.localStorage.setItem(this.keyName, JSON.stringify({ title, date }));
    // console.log(JSON.stringify({ title, date }));
  }

  /**
   * Handler fyrir submit á formi.
   * Sækir gögn úr formi og kallar í this.parseDate()
   * Vistar gögn með this.save() og sýnir niðurteljara með this.create()
   */
  submit(e) {
    e.preventDefault();

    const title = this.form.querySelector('input[type=text]');
    const date = this.form.querySelector('input[type=date]');
    const time = this.form.querySelector('input[type=time]');

    const dateObject = this.parseDate(date.value, time.value);

    this.save(title.value, dateObject);

    this.create(title.value, dateObject);
  }

  /**
   * Tekur við:
   *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
   *  - time sem streng á forminu "hh:mm", t.d. "09:00"
   * Skilar date hlut með gögnum úr date og time
   */
  parseDate(date, time) {
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
  create(title, date) {
    this.date = date;

    this.hideForm();

    const heading = document.createElement('h2');
    heading.classList.add('countdown__heading');
    heading.innerHTML = title;

    const div = document.createElement('div');
    div.classList.add('countdown__container');

    this.element = div;

    const button = document.createElement('button');
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
  hideForm() {
    this.form.classList.add('form__hidden');
  }

  /**
   * Sýnir form með CSS
   */
  showForm() {
    this.form.classList.remove('form__hidden');
  }

  /**
   * Byrjar niðurteljara með this.count() og keyrir á 1000ms fresti
   * með window.setInterval og setur id á teljara í this.interval
   */
  startCounter() {
    this.interval = window.setInterval(this.count.bind(this), 1000);
  }

  /**
   * Stöðvar teljara með window.clearInterval á this.interval
   */
  stopCounter() {
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
  createElement(num, title) {
    const a = document.createElement('div');
    const b = document.createElement('span');
    const c = document.createElement('span');

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
  delete() {
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
  countdown(remaining) {
    let s = remaining / 1000;

    const days = Math.floor(s / (60 * 60 * 24));
    s %= (60 * 60 * 24);
    const hours = Math.floor(s / (60 * 60));
    s %= (60 * 60);
    const mins = Math.floor(s / 60);
    s %= 60;
    const secs = Math.floor(s);

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
  count() {
    const remaining = this.date - Date.now();
    this.element.innerHTML = null;
    if (remaining <= 0) {
      const p = document.createElement('p');
      p.innerHTML = 'Komið!';
      p.classList.add('countdown__buid');
      this.element.appendChild(p);
      this.stopCounter();
    } else {
      this.countdown(remaining);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countdown = new Countdown();
  countdown.load();
});
