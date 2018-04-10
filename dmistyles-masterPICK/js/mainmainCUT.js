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
