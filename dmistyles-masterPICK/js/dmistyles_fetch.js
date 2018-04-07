import Component from './component';

class DmistylesFetch extends Component {
  init() {
    const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    socket.onmessage = (event) => {
      const webObj = JSON.parse(event.data);
      console.log(webObj);
    };
    this.on('', this.DmistylesFetch.bind(this));
  }

  DmistylesFetch() {
    this.emit();
  }
}

export default DmistylesFetch;
