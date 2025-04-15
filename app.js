window.onload = () => {
    document.getElementById('login').style.display = 'block';
  };
  
  function sendOTP() {
    const phoneNumber = document.getElementById('phone').value;
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        alert("OTP sent!");
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  }
  
  function verifyOTP() {
    const otp = document.getElementById('otp').value;
    window.confirmationResult.confirm(otp)
      .then(result => {
        alert("Login successful!");
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        listenMessages();
      })
      .catch(error => {
        alert("Incorrect OTP");
      });
  }
  
  function sendMessage() {
    const msg = document.getElementById('message').value;
    if (!msg.trim()) return;
    db.collection("messages").add({
      text: msg,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('message').value = "";
  }
  
  function listenMessages() {
    db.collection("messages").orderBy("createdAt").onSnapshot(snapshot => {
      const msgBox = document.getElementById('messages');
      msgBox.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.className = 'msg';
        div.innerText = data.text || '';
        msgBox.appendChild(div);
      });
    });
  }
  
  function logout() {
    auth.signOut().then(() => {
      alert("Logged out");
      document.getElementById('chat').style.display = 'none';
      document.getElementById('login').style.display = 'block';
    });
  }
  