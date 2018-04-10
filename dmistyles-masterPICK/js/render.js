import Component from './component';

class Render extends Component {
  init() {
    this.on('fetched', this.RenderUser.bind(this));
  }

  RenderUser({ data, whoComes }) {
    // console.log(data);
    // console.log(whoComes);
    let mygroup;
    let actionUserEditing;
    let currentTr;
    let activebutton;
    const inputtemplate = [
      { name: '' },
      { street: '' },
      { zipCode: '' },
      { city: '' },
      { phoneNumber: '' },
    ];
    const tbody = document.querySelector('#tbody');
    const tr = document.createElement('tr');
    const li = document.createElement('li');
    const groupid = document.querySelector('#groupid');
    const pagetitle = document.querySelector('.page-title');
    tbody.appendChild(tr);
    groupid.appendChild(li);

    function addMerchantUser() {
      inputtemplate[0].name = data.name;
      inputtemplate[1].street = data.street;
      inputtemplate[2].zipCode = data.zip_code;
      inputtemplate[3].city = data.city;
      inputtemplate[4].phoneNumber = data.phone;
      inputtemplate.forEach((element) => {
        tr.setAttribute('id', data.user_id);
        const td = document.createElement('td');
        for (const prop in element) {
          td.innerText = element[prop];
        }
        tr.appendChild(td);
      });
    }

    if (whoComes === 'user') {
      tr.setAttribute('credits', data.credits);
      tr.classList.add(`group${data.group_id}`);
      tr.classList.add('user');
      addMerchantUser();
      mygroup = `group${data.group_id}`;
      this.emit('hideandshowME', activebutton, document);
      this.emit('countMEPLEAS', this, document);
      //   countusers();
      tr.addEventListener('dblclick', () => {
        actionUserEditing = tr.id;
        currentTr = tr.id;
        // editUser(tr);
      });
      this.emit();
    }

    if (whoComes === 'group') {
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
        this.emit('hideandshowME', activebutton, document);
        // hideandshow(mygroup);
      });
    //   countusers();
    }
  }
}

export default Render;
