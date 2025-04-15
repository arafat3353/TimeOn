const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const phoneInput = document.getElementById('phone');
const otpInput = document.getElementById('otp');
const messageInput = document.getElementById('message');
const messagesDiv = document.getElementById('messages');

// Send OTP
function sendOTP() {
  const phoneNumber = phoneInput.value;
  const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
  });
  auth.signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert('OTP sent!');
    })
    .catch((error) => {
      console.error("Error during OTP send:", error);
    });
}

// Verify OTP
function verifyOTP() {
  const code = otpInput.value;
  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("Login successful!");
      document.getElementById('login').style.display = 'none';
      document.getElementById('chat').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error during OTP verification:", error);
    });
}

// Send Message
function sendMessage() {
  const message = messageInput.value;
  if (message.trim()) {
    db.collection('chats').add({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: auth.currentUser.phoneNumber,
    }).then(() => {
      messageInput.value = '';
    }).catch((error) => {
      console.error("Error sending message:", error);
    });
  }
}

// Logout
function logout() {
  auth.signOut().then(() => {
    document.getElementById('login').style.display = 'block';
    document.getElementById('chat').style.display = 'none';
  });
}

// Auto-delete messages after 1 hour
db.collection('chats').onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    const chatData = doc.data();
    const chatTime = chatData.timestamp.toMillis();
    const currentTime = Date.now();
    if (currentTime - chatTime > 3600000) {
      db.collection('chats').doc(doc.id).delete();
    }
  });
});
