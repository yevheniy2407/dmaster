import Component from './component';

class DmistylesRenderGroup extends Component {
  init() {
    this.on('DmistylesFetchGroup', this.DmistylesRenderUser.bind(this), document);
  }
  DmistylesRenderUser(url) {
    let activebutton;
    const groupid = document.querySelector('#groupid');
    const pagetitle = document.querySelector('.page-title');

    function fetchgroup(url) {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          // console.log(data);

          const li = document.createElement('li');
          groupid.appendChild(li);

          function addMerchant() {
            const a = document.createElement('a');
            const span = document.createElement('span');
            li.appendChild(a);
            li.classList.add('button');
            const id = `id${data.name}`;
            li.setAttribute('id', id);
            const href = `#/${data.name}`;
            a.setAttribute('href', href);
            a.innerText = data.name;
            a.appendChild(span);
            span.classList.add('badge');
            span.setAttribute('data-badge-caption', '');

            li.setAttribute('is_admin', data.is_admin);
            li.classList.add('button');
            li.classList.add(`group${data.group_id}`);
            li.classList.add(data.name);
            const optionmenu = document.querySelector('#optionmenu');
            const option = document.createElement('option');
            optionmenu.appendChild(option);
            option.innerText = data.name;
            li.addEventListener('click', () => {
              const allbuttons = document.querySelectorAll('.button');

              allbuttons.forEach((element) => {
                element.classList.remove('active');
              });
              li.classList.add('active');
              activebutton = `group${data.group_id}`;
              pagetitle.innerText = data.name;
              // hideandshow(mygroup);
            });
          }
          addMerchant();
          // countusers();
        })
        .catch(error => console.log(error));
    }

    fetchgroup(url);

    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesRenderGroup;
