import Component from './component';

class DmistylesFetch extends Component {
  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = (event) => {
      const webObj = JSON.parse(event.data);
      this.emit('DmistylesFetch', event, document);
      this.arrProccesing(webObj);
      // console.log(webObj);
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
