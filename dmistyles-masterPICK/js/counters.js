import Component from './component';

class Counters extends Component {
  init() {
    this.on('countMEPLEAS', this.countMe.bind(this));
  }
  countMe() {
    let numeratorusers = 0;
    const alllgroups = document.querySelectorAll('.button');
    const alllusers = document.querySelectorAll('.user');
    alllgroups.forEach((element) => {
      const actiongroup = element.classList.item(1);
      const span2 = element.querySelector('.badge');
      alllusers.forEach((element2) => {
        const actionusergroup = element2.classList.item(0);
        if (actiongroup === actionusergroup) {
          numeratorusers += 1;
        }
      });
      span2.innerText = numeratorusers;
      numeratorusers = 0;
    });
    this.emit();
  }
}

export default Counters;
