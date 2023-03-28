const fellowForm = document.getElementById('fellow-form');
const fellowFullname = document.getElementById('fellow-fullname');
const fellowAddress = document.getElementById('fellow-address');
const fellowNumber = document.getElementById('fellow-number');
const fellowPostal = document.getElementById('fellow-postal');
const fellowMode = document.getElementById('fellow-mode');

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  if (fellowFullname.value === '' || fellowAddress.value === '' || fellowNumber.value === '' || fellowMode.value === '') {
     return alert('Please fill in fields');
  }

  const sendBody = {
    fullName: fellowFullname.value,
    address: fellowAddress.value,
    attendanceMode: fellowMode.value,
    phoneNumber: fellowNumber.value,
    postalCode: fellowPostal.value || ''
  };

  try {
    const res = await fetch('http://localhost:5000/api/v1/locate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Location already exists!');
    }

    alert('Location added!');
    window.location.href = '/public/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

fellowForm.addEventListener('submit', addStore);