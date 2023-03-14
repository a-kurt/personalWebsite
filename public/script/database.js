// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { getDatabase, ref as storageRef, set, push } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhrFag5wz02izcuOXxUHWpik6xIptmIIo",
    authDomain: "personalwebsite-39985.firebaseapp.com",
    projectId: "personalwebsite-39985",
    storageBucket: "personalwebsite-39985.appspot.com",
    messagingSenderId: "391297515335",
    appId: "1:391297515335:web:3d7390c4e6322332775662",
    measurementId: "G-KR5NPE3CGK",
    databaseURL: "https://personalwebsite-39985-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);


/* Database configuration */
const database = getDatabase();
const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', () => {

    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const subjectInput = document.querySelector('input[name="subject"]');
    const messageInput = document.querySelector('textarea[name="message"]');
    const name = nameInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;
    const timestamp = new Date().toISOString();

    // Validate input
    if (name.trim() === '' || !/^[a-zA-Z ]{3,}$/.test(name)) {
        nameInput.value = '';
        nameInput.classList.add('invalid');
        nameInput.placeholder = "Please enter a valid name with at least 3 characters.";
        return;
    } else {
        nameInput.classList.remove('invalid');
    }

    if (email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
        emailInput.value = '';
        emailInput.classList.add('invalid');
        emailInput.placeholder = "Please enter a valid email address.";
        return;
    } else {
        emailInput.classList.remove('invalid');
    }

    if (subject.trim() === '' || subject.length < 3) {
        subjectInput.value = '';
        subjectInput.classList.add('invalid');
        subjectInput.placeholder = "Please enter a subject with at least 3 characters.";
        return;
    } else {
        subjectInput.classList.remove('invalid');
    }

    if (message.trim() === '' || message.length < 10) {
        messageInput.value = '';
        messageInput.classList.add('invalid');
        messageInput.placeholder = "Please enter a message with at least 10 characters.";
        return;
    } else {
        subjectInput.classList.remove('invalid');
    }

    const btnText = document.querySelector("#btnText");
    btnText.innerHTML = "Sended!";
    submitButton.classList.add("active");
    submitButton.disabled = true;


    // Save contact details to database
    const newContactRef = push(storageRef(database, 'contact/')); // generate a new ID
    set(newContactRef, {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: timestamp

    }).then(() => {
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
    }).catch((error) => {
        alert("An error occurred while submitting your message. Please try again later.");
        console.error(error);
    });


});
