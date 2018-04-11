import Component from './component';

class DmistylesFetch extends Component {
  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = (event) => {
      const webObj = JSON.parse(event.data);
      this.emit('DmistylesFetch', event, document);
      this.arrProccesing(webObj);

      document.addEventListener('click', () => {
        const city = document.querySelector('#city');
        const range_credit = document.querySelector('#range_credit');
        const group_id = document.querySelector('.select-dropdown', '.dropdown-trigger');
        const first_name = document.querySelector('#first_name');
        const last_name = document.querySelector('#last_name');
        const phone = document.querySelector('#phone');
        const street = document.querySelector('#street');
        const zip_code = document.querySelector('#zip_code');
        const modalAdd = document.querySelector('#modalAdd');
        if (modalAdd.classList.contains('open') === false) {
          range_credit.removeAttribute('disabled');
          first_name.removeAttribute('disabled');
          last_name.removeAttribute('disabled');
          street.removeAttribute('disabled');
          zip_code.removeAttribute('disabled');
          city.removeAttribute('disabled');
          phone.removeAttribute('disabled');
          group_id.removeAttribute('disabled');
          first_name.value = '';
          last_name.value = '';
          street.value = '';
          zip_code.value = '';
          city.value = '';
          phone.value = '';
          range_credit.value = '500';
          group_id.value = 'Choose group';
        }
      });
    };

    this.on('', this.DmistylesFetch.bind(this));
  }

  arrProccesing(webObj) {
    const actionWeb = webObj.action;
    const idWeb = webObj.id;
    let whoComes;

    const httpslinkpart = 'https://ums-honeybadger.herokuapp.com/';
    if (actionWeb === 'user:updated') {
      const url = `${httpslinkpart}user/${idWeb}`;
      whoComes = 'user';
      this.emit('DmistylesFetch', { url, whoComes }, document);
    } else if (actionWeb === 'group:updated') {
      const url = `${httpslinkpart}group/${idWeb}`;
      whoComes = 'group';
      this.emit('DmistylesFetch', { url, whoComes }, document);
    }
  }

  DmistylesFetch() {
    console.log('blablabla');
    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesFetch;
