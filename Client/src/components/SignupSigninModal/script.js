// script.js

// Get the sign-up link and modal
const signUpLink = document.getElementById('signUpLink');
const signUpModal = document.getElementById('signUpModal');

// Add click event listener to the sign-up link
signUpLink.addEventListener('click', () => {
  // Load the sign-up form content into the modal
  fetch('signup.html')
    .then(response => response.text())
    .then(data => {
      signUpModal.querySelector('.modal-content').innerHTML = data;
      $(signUpModal).modal('show');
    });
});

// Handle form submissions
document.getElementById('signInForm').addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle sign-in logic here
});

document.getElementById('signUpForm').addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle sign-up logic here
});
