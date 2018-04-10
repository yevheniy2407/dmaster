import Component from './component';

class CreateAndSave extends Component {
  init() {
    this.on('Arra', this.CreateAndSavePLEASE.bind(this));
  }
  CreateAndSavePLEASE() {
    const createbutton = document.querySelector('#createButton');
    const savebutton = document.querySelector('#saveButton');
    const city = document.querySelector('#city');
    const range_credit = document.querySelector('#range_credit');
    const group_id = document.querySelector('.select-dropdown', '.dropdown-trigger');
    const first_name = document.querySelector('#first_name');
    const last_name = document.querySelector('#last_name');
    const phone = document.querySelector('#phone');
    const street = document.querySelector('#street');
    const zip_code = document.querySelector('#zip_code');
    const label = document.querySelectorAll('.label');
    const modalAdd = document.querySelector('#modalAdd');
    const tbody = document.querySelector('#tbody');
    const groupid = document.querySelector('#groupid');
    const pagetitle = document.querySelector('.page-title');
    createbutton.addEventListener('click', () => {
      const allllgroups = document.querySelectorAll('.button');
      let grouppost;

      allllgroups.forEach((element) => {
        const listgroup = element.classList.item(2);
        if (`${group_id.value}s` === listgroup) {
          const mymygroup = element.classList.item(1);
          grouppost = mymygroup[5];
        }
      });

      function createNewProfile() {
        const formData = new FormData();
        formData.append('city', city.value);
        formData.append('credits', Number(range_credit.value));
        formData.append('group_id', Number(grouppost));
        formData.append('name', `${first_name.value} ${last_name.value}`);
        formData.append('phone', phone.value);
        formData.append('street', street.value);
        formData.append('zip_code', Number(zip_code.value));
        return fetch('https://ums-honeybadger.herokuapp.com/user', {
          method: 'POST',
          body: formData,
        }).then(response => response.json());
      }

      createNewProfile()
        .then(res => res.json())
        .then(() => console.log)
        .catch(error => error);
    });

    function editUser(tr) {
      const credits = tr.getAttribute('credits');
      const instance = M.Modal.getInstance(modal);
      instance.open();
      let idgroup = tr.classList.item(0);
      const listgroups = document.querySelectorAll('.button');

      for (let i = 0; i <= 4; i += 1) {
        const list = tr.getElementsByTagName('td')[i];
        const str = list.innerText;
        const res = str.split(' ');
        if (i === 0) {
          first_name.value = res[0];
          last_name.value = res[1];
        } else if (i === 1) street.value = list.innerText;
        else if (i === 2) zip_code.value = list.innerText;
        else if (i === 3) city.value = list.innerText;
        else if (i === 4) phone.value = list.innerText;
      }

      listgroups.forEach((element) => {
        const parentgroup = element.classList.item(1);
        if (parentgroup === idgroup) {
          const is_admin = element.getAttribute('is_admin');

          label.forEach((element2) => {
            element2.click();
          });

          if (is_admin === 'true') {
            range_credit.setAttribute('disabled', '');        
          }
          else {
            range_credit.removeAttribute('disabled');
            if (credits === '0') {
              range_credit.setAttribute('disabled', '');
              first_name.setAttribute('disabled', '');
              last_name.setAttribute('disabled', '');
              street.setAttribute('disabled', '');
              zip_code.setAttribute('disabled', '');
              city.setAttribute('disabled', '');
              phone.setAttribute('disabled', '');
              group_id.setAttribute('disabled', '');
            }
          }
        }
      });

      idgroup = idgroup[5];
      if (idgroup === '1') group_id.value = 'Administrator';
      else if (idgroup === '2') group_id.value = 'Merchant';
      else if (idgroup === '3') group_id.value = 'Operator';
      else if (idgroup === '4') group_id.value = 'Client';
      else if (idgroup === '5') group_id.value = 'Resellers';

      range_credit.value = credits;
      saveuserinvalid = 0;
      EventListenerPut(tr);
    }

    function EventListenerPut(tr) {
      savebutton.addEventListener('click', () => {
        tr.remove();
        if (saveuserinvalid === 0) {
          saveuserinvalid = 1;

          const algroups = document.querySelectorAll('.button');
          let grouppost;

          algroups.forEach((element) => {
            const listgroup = element.classList.item(2);
            if (`${group_id.value}s` === listgroup) {
              const mymygroup = element.classList.item(1);
              grouppost = mymygroup[5];
            }
          });

          let urlput = 'https://ums-honeybadger.herokuapp.com/user';
          const idmyuser = tr.getAttribute('id');
          urlput = `${urlput}/${idmyuser}`;

          function createNewProfile() {
            const formData = new FormData();
            formData.append('city', city.value);
            formData.append('credits', Number(range_credit.value));
            formData.append('group_id', Number(grouppost));
            formData.append('name', first_name.value + ' ' + last_name.value);
            formData.append('phone', phone.value);
            formData.append('street', street.value);
            formData.append('zip_code', Number(zip_code.value));
            return fetch(urlput, {
              method: 'PUT',
              body: formData,
            }).then(response => response.json());
          }

          createNewProfile()
            .then(res => res.json())
            .then(() => console.log)
            .catch(error => error);
        }
      });
    }
    this.emit();
  }
}

export default CreateAndSave;
