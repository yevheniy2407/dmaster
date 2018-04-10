let socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');

let activebutton;
let mygroup;
let valuegroupmenu;
let numeratorusers = 0;
let currentTr;
let actionUserEditing;
let saveuserinvalid = 0;

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

const inputtemplate = [
  { name: '' },
  { street: '' },
  { zipCode: '' },
  { city: '' },
  { phoneNumber: '' }
];

const inputtemplategroup = [
  { group_id: '' },
  { is_admin: '' }, 
  { name: '' }
];

document.addEventListener('click', function() {
  if (modalAdd.classList.contains('open') === false) {
    range_credit.removeAttribute('disabled');
    first_name.removeAttribute('disabled');
    last_name.removeAttribute('disabled');
    street.removeAttribute('disabled');
    zip_code.removeAttribute('disabled');
    city.removeAttribute('disabled');
    phone.removeAttribute('disabled');
    group_id.removeAttribute('disabled');
    first_name.value = '';
    last_name.value = '';
    street.value = '';
    zip_code.value = '';
    city.value = '';
    phone.value = '';
    range_credit.value = '500';
    group_id.value = 'Choose group';
  }
});

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
      tr.classList.add('group' + data.group_id);
      tr.classList.add('user');
      addMerchant();
      mygroup = 'group' + data.group_id;
      hideandshow(mygroup);
      countusers();
      tr.addEventListener('dblclick', function() {
        actionUserEditing = tr.id;
        currentTr = tr.id;
        editUser(tr);
      });
    })
    .catch(error => console.log(error));
}

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
        let id = 'id' + data.name;
        li.setAttribute('id', id);
        let href = '#/' + data.name;
        a.setAttribute('href', href);
        a.innerText = data.name;
        a.appendChild(span);
        span.classList.add('badge');
        span.setAttribute('data-badge-caption', '');

        li.setAttribute('is_admin', data.is_admin);
        li.classList.add('button');
        li.classList.add('group' + data.group_id);
        li.classList.add(data.name);
        let optionmenu = document.querySelector('#optionmenu');
        let option = document.createElement('option');
        optionmenu.appendChild(option);
        option.innerText = data.name;
        li.addEventListener('click', function() {
          let allbuttons = document.querySelectorAll('.button');

          allbuttons.forEach(function(element) {
            element.classList.remove('active');
          });
          li.classList.add('active');
          activebutton = 'group' + data.group_id;
          pagetitle.innerText = data.name;
          hideandshow(mygroup);
        });
      }
      addMerchant();
      countusers();
    })
    .catch(error => console.log(error));
}

function hideandshow(mygroup) {
  let allusers = document.querySelectorAll('.user');

  allusers.forEach(function(element) {
    element.setAttribute('hidden', 'true');

    if (element.classList.contains(activebutton) === true) {
      element.removeAttribute('hidden');
    }
  });
}

function countusers() {
  let alllgroups = document.querySelectorAll('.button');
  let alllusers = document.querySelectorAll('.user');
  alllgroups.forEach(function(element) {
    let actiongroup = element.classList.item(1);
    let span2 = element.querySelector('.badge');
    alllusers.forEach(function(element2) {
      let actionusergroup = element2.classList.item(0);
      if (actiongroup === actionusergroup) {
        numeratorusers++;
      }
    });
    span2.innerText = numeratorusers;
    numeratorusers = 0;
  });
}

socket.onopen = function() {
  console.log('Connected');
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log('Closed');
  } else {
    console.log('Breakup connection');
  }
  console.log('Code: ' + event.code + ' reason: ' + event.reason);
};

socket.onmessage = function(event) {
  let webObj = JSON.parse(event.data);
  arrProccesing(webObj);
  // console.log(webObj);
};

socket.onerror = function(error) {
  console.log('Error ' + error.message);
};

function arrProccesing(webObj) {
  let actionWeb = webObj.action;
  let idWeb = webObj.id;

  const httpslinkpart = 'https://ums-honeybadger.herokuapp.com/';
  if (actionWeb === 'user:updated') {
    let url = httpslinkpart + 'user/' + idWeb;
    fetchuser(url);
  } else if (actionWeb === 'group:updated') {
    let url = httpslinkpart + 'group/' + idWeb;
    fetchgroup(url);
  } else if (actionWeb === 'user:removed') {
    let url = httpslinkpart + 'user/' + idWeb;
    console.log(url);
    let httpdata = fetchme(url);
    console.log(httpdata);
  } else if (actionWeb === 'group:removed') {
    let url = httpslinkpart + 'group/' + idWeb;
    console.log(url);
    let httpdata = fetchme(url);
    console.log(httpdata);
  }
}

createbutton.addEventListener('click', () => {
  let allllgroups = document.querySelectorAll('.button');
  let grouppost;

  allllgroups.forEach(function(element) {
    let listgroup = element.classList.item(2);
    if (group_id.value + 's' === listgroup) {
      let mymygroup = element.classList.item(1);
      grouppost = mymygroup[5];
    }
  });

  function createNewProfile() {
    const formData = new FormData();
    formData.append('city', city.value);
    formData.append('credits', Number(range_credit.value));
    formData.append('group_id', Number(grouppost));
    formData.append('name', first_name.value + ' ' + last_name.value);
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
  let credits = tr.getAttribute('credits');
  let instance = M.Modal.getInstance(modal);
  instance.open();
  let idgroup = tr.classList.item(0);
  let listgroups = document.querySelectorAll('.button');

  for (let i = 0; i <= 4; i++) {
    let list = tr.getElementsByTagName('td')[i];
    let str = list.innerText;
    let res = str.split(' ');
    if (i === 0) {
      first_name.value = res[0];
      last_name.value = res[1];
    } 
    else if (i === 1) street.value = list.innerText;
    else if (i === 2) zip_code.value = list.innerText;
    else if (i === 3) city.value = list.innerText;
    else if (i === 4) phone.value = list.innerText;
  }
  
  listgroups.forEach(function(element) {
    let parentgroup = element.classList.item(1);
    if (parentgroup === idgroup) {
      let is_admin = element.getAttribute('is_admin');
      // console.log(is_admin);

      label.forEach(function(element) {
        element.click();
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

      let algroups = document.querySelectorAll('.button');
      let grouppost;

      algroups.forEach(function(element) {
        let listgroup = element.classList.item(2);
        if (group_id.value + 's' === listgroup) {
          let mymygroup = element.classList.item(1);
          grouppost = mymygroup[5];
        }
      });

      let urlput = 'https://ums-honeybadger.herokuapp.com/user';
      let idmyuser = tr.getAttribute('id');
      urlput = urlput + '/' + idmyuser;

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
