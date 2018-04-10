import Component from './component';

class hideAndShow extends Component {
  init() {
    this.on('hideandshowME', this.hideAndShow.bind(this), document);
  }
  hideAndShow(activebutton) {
    const allusers = document.querySelectorAll('.user');
    allusers.forEach((element) => {
      element.setAttribute('hidden', 'true');
      if (element.classList.contains(activebutton) === true) {
        element.removeAttribute('hidden');
      }
    });

    this.emit();
  }
}

export default hideAndShow;
