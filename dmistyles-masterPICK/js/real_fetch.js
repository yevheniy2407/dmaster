import Comment from './component';

class realFetch extends Comment {
  init() {
    this.on('DmistylesFetch', this.realFetchInto.bind(this));
  }
  realFetchInto({ url, whoComes }) {
    if (url !== undefined) {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.emit('fetched', { data, whoComes }, document);
        });
    // .catch(error => console.log(error));
    }
  }
}

export default realFetch;
