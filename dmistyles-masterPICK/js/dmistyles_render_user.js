import Component from './component';

class DmistylesRenderUser extends Component {
  init() {
    this.on('DmistylesFetchUser', this.DmistylesRenderUser.bind(this), document);
  }
  DmistylesRenderUser(url) {
    let mygroup;
    let actionUserEditing;
    let currentTr;
    const tbody = document.querySelector('#tbody');
    const inputtemplate = [
      { name: '' },
      { street: '' },
      { zipCode: '' },
      { city: '' },
      { phoneNumber: '' },
    ];

    function fetchuser(url) {
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          // console.log(data);

          const tr = document.createElement('tr');
          tbody.appendChild(tr);

          function addMerchant() {
            inputtemplate[0].name = data.name;
            inputtemplate[1].street = data.street;
            inputtemplate[2].zipCode = data.zip_code;
            inputtemplate[3].city = data.city;
            inputtemplate[4].phoneNumber = data.phone;
            inputtemplate.forEach((element, index) => {
              tr.setAttribute('id', data.user_id);
              const td = document.createElement('td');
              for (const prop in element) {
                td.innerText = element[prop];
              }
              tr.appendChild(td);
            });
          }
          tr.setAttribute('credits', data.credits);
          tr.classList.add(`group${data.group_id}`);
          tr.classList.add('user');
          addMerchant();
          mygroup = `group${data.group_id}`;
          // hideandshow(mygroup);
          console.log(mygroup);
          this.emit('hideAndShow', this.mygroup, document);
          // countusers();
          tr.addEventListener('dblclick', () => {
            actionUserEditing = tr.id;
            currentTr = tr.id;
            // editUser(tr);
          });
        })
        .catch(error => console.log(error));
    }

    fetchuser(url);

    this.emit('DmistylesFetch', this, document);
  }
}

export default DmistylesRenderUser;
