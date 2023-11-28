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
    const form = document.getElementById('userForm'); // Updated form ID to 'userForm'
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      // Extract specific values from the form data
      const phone = formData.get('phone');
      const email = formData.get('email');
      const password = formData.get('pass'); // Changed to match the 'id' attribute of the password field
      const repeatPassword = formData.get('repeatpass'); // Changed to match the 'id' attribute of the repeat password field
  
      // Validate phone number
      const phoneNumberPattern = /^[0-9()+-]*$/;
      const isValidPhoneNumber = phoneNumberPattern.test(phone);
      
      if (!isValidPhoneNumber || phone.length < 9) {
        console.error('Invalid phone number.');
        // Optionally, you can display an error message to the user here
        return; // Prevent form submission if the phone number is invalid
      }
      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(email);
  
      if (!isValidEmail) {
        console.error('Invalid email format.');
        // Optionally, you can display an error message to the user here
        return; // Prevent form submission if the email format is invalid
      }
  
      // Validate password length
      if (password.length < 6) {
        console.error('Password must be at least 6 characters long.');
        // Optionally, you can display an error message to the user here
        return; // Prevent form submission if the password is too short
      }
  
      // Create an object with the extracted values
      const postDataObject = {
        phone,
        email,
        password,
        repeatPassword
      };
  
      try {
        const json = JSON.stringify(postDataObject);
        console.log('Data to be sent:', json);
  
        // Post the data to the specified URL
        const response = await postData('http://localhost:3000/users', json);
        console.log('Response from server:', response);
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error:', error);
      }
    });
  };
  
  fun();
  