const fellowForm = document.getElementById('fellow-form');
const fellowFullname = document.getElementById('fellow-fullname');
const fellowAddress = document.getElementById('fellow-address');
const fellowNumber = document.getElementById('fellow-number');
const fellowPostal = document.getElementById('fellow-postal');
const fellowMode = document.getElementById('fellow-mode');
const delBtn = document.querySelector('.del-btn');

const queryString = window.location.search.slice(1);
console.log(queryString);

// load details into html
async function getFellowLocation() {
    const res = await fetch(`https://rhfellowship-locator.onrender.com/api/v1/locate/${queryString}`);
    const {data} = await res.json();

    console.log(data);

    fellowFullname.value = data.fullName || '';
    fellowAddress.value = data.address || '';
    fellowNumber.value = data.phoneNumber || '';
    fellowPostal.value = data.postalCode || '';
    fellowMode.value = data.attendanceMode || '';
    delBtn.setAttribute('data-id', queryString);

}

getFellowLocation();

// delete function
delBtn.addEventListener('click', () => {
    const id = delBtn.getAttribute('data-id');

    // fetch(`http://localhost:5000/api/v1/locate/${id}`, {
    //   method: 'DELETE',
    // })
    fetch(`https://rhfellowship-locator.onrender.com/api/v1/locate/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Data deleted successfully');
          // delete location and go back to index page
          alert('Location deleted!');
          window.location.href = '/public/index.html';
        } else {
          console.error('Failed to delete data');
        }
      })
      .catch(error => {
        console.error(error);
      })
});

// Send POST to API to edit location
async function editStore(e) {
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
      // const res = await fetch(`http://localhost:5000/api/v1/locate/${queryString}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(sendBody)
      // });
      const res = await fetch(`https://rhfellowship-locator.onrender.com/api/v1/locate/${queryString}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendBody)
      });
  
      if (res.status === 400) {
        throw Error('Location already exists!');
      }
  
      alert('Location edited!');
      // window.location.href = '/public/index.html';
      window.location.href = '/index.html';
    } catch (err) {
      alert(err);
      return;
    }
}
  
fellowForm.addEventListener('submit', editStore);