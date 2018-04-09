import Component from './component';

class DmistylesFetch extends Component {
  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    function arrProccesing(webObj) {
      const actionWeb = webObj.action;
      const idWeb = webObj.id;

      const httpslinkpart = 'https://ums-honeybadger.herokuapp.com/';
      if (actionWeb === 'user:updated') {
        const url = `${httpslinkpart}user/${idWeb}`;
        console.log(url);
        this.emit('DmistylesFetchUser', url, document);
        // fetchuser(url);
        // this.emit('DmistylesFetch', url, document);
        console.log(url);
      } else if (actionWeb === 'group:updated') {
        const url = `${httpslinkpart}group/${idWeb}`;
        console.log(url);
        this.emit('DmistylesFetchGroup', url, document);
        // fetchgroup(url);
      }
    }
    socket.onmessage = (event) => {
      const webObj = JSON.parse(event.data);
      this.emit('DmistylesFetch', event, document);
      arrProccesing(webObj);
      // console.log(webObj);
    };

    this.on('', this.DmistylesFetch.bind(this));
  }

  DmistylesFetch() {
    console.log('blablabla');
    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesFetch;
