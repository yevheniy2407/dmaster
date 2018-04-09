import Component from './component';

class DmistylesRenderGroup extends Component {
  init() {
    this.on('DmistylesFetchGroup', this.DmistylesRenderUser.bind(this), document);
  }
  DmistylesRenderUser(url) {
    console.log(url);
    // console.log('lel');
    // this.emit('DmistylesFetch');
    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesRenderGroup;
