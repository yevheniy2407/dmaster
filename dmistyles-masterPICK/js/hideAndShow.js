import Component from './component';

class hideAndShow extends Component {
  init() {
    this.on('hideAndShow', this.hideAndShow.bind(this), document);
  }
  hideAndShow(mygroup) {
    function hideandshow(mygroup) {
      const allusers = document.querySelectorAll('.user');

      allusers.forEach((element) => {
        element.setAttribute('hidden', 'true');
        if (element.classList.contains(activebutton) === true) {
          element.removeAttribute('hidden');
        }
      });
    }

    hideandshow(mygroup);

    this.emit('DmistylesFetch', this, document);
  }
}

export default hideAndShow;
