// RANDOM PASSWORD GENERATOR

const passwordResult = document.getElementById('password');
const generatePasswordButton = document.getElementById('refreshBtn');
const copyPassword = document.getElementById('copyBtn');
const lengthPasswordInput = document.getElementById('lengthValue');
const lengthPasswordSlider = document.getElementById('length');
const includeLowercase = document.getElementById('lowercase');
const includeUppercase = document.getElementById('uppercase');
const includeNumbers = document.getElementById('numbers');
const includeSymbols = document.getElementById('symbols');


function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_-=+";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length <= 0) {
    return `(Password length must be at least 1)`;
  }
  if(length > 50) {
    return `(The password length can't be more than 50)`;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
    console.log(randomIndex);
  }

  return password;
}

// Update password length dynamically when slider or input changes
lengthPasswordInput.addEventListener('input', () => {
  lengthPasswordSlider.value = lengthPasswordInput.value;
});

lengthPasswordSlider.addEventListener('input', () => {
  lengthPasswordInput.value = lengthPasswordSlider.value;
});

// Generate password when the button is clicked
generatePasswordButton.addEventListener('click', () => {
  const length = parseInt(lengthPasswordInput.value, 10);
  const password = generatePassword(
    length,
    includeLowercase.checked,
    includeUppercase.checked,
    includeNumbers.checked,
    includeSymbols.checked
  );
  passwordResult.textContent = password;
});

// Copy password to clipboard and show modal
copyPassword.addEventListener('click', () => {
  const password = passwordResult.textContent;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      // Show the modal
      const modal = document.getElementById('copyModal');
      modal.classList.add('show');

      // Hide the modal after 2 seconds
      setTimeout(() => {
        modal.classList.remove('show');
      }, 2000);
    });
  }
});
