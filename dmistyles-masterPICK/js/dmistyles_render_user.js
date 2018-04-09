import Component from './component';

class DmistylesRenderUser extends Component {
  init() {
    this.on('DmistylesFetchUser', this.DmistylesRenderUser.bind(this), document);
  }
  DmistylesRenderUser(url) {
    console.log(url);
    // console.log('lel');
    // this.emit('DmistylesFetch');
    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesRenderUser;
