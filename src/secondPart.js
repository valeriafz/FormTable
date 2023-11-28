const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      return response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  
  const fun = () => {
    const form = document.getElementById('userForm'); 
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const lastname = formData.get('lastname');
      const firstname = formData.get('firstname');
      const age = formData.get('age');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const password = formData.get('pass'); 
      const repeatPassword = formData.get('repeatpass'); 
  
      const phoneNumberPattern = /^[0-9()+-]*$/;
      const isValidPhoneNumber = phoneNumberPattern.test(phone);
      
      if (!isValidPhoneNumber || phone.length < 9) {
        console.error('Invalid phone number.');
        return; 
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(email);
  
      if (!isValidEmail) {
        console.error('Invalid email format.');
        return; 
      }
  
      if (password.length < 6) {
        console.error('Password must be at least 6 characters long.');
        return; 
      }
  
      const postDataObject = {
        lastname,
        firstname,
        age,
        phone,
        email,
        password,
        repeatPassword
      };
  
      try {
        const json = JSON.stringify(postDataObject);
        console.log('Data to be sent:', json);
        const response = await postData('http://localhost:3000/users', json);
        console.log('Response from server:', response);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  };
  
  fun();
  