const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
function showError(element, message) {
  const formControl = element.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
  //   console.dir(formControl);
}

// show success outline
function showSuccess(element) {
  const formControl = element.parentElement;
  formControl.className = "form-control success";
}

function checkValidEmail(input) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.parentElement.querySelector("label").innerText;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max + 1} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkValidEmail(email);
  checkPasswordsMatch(password, password2);
});

function validateNickName(input) {
  if (input.value.trim() === "") {
    input.setCustomValidity("별명은 꼭 입력해주세요");
    showError(input, "별명은 꼭 입력해주세요");
  } else if (input.value.trim().length < 2) {
    input.setCustomValidity("별명이 너무 짧습니다");
    showError(input, "별명이 너무 짧습니다");
  } else {
    input.setCustomValidity("");
    showSuccess(input);
  }

  return true;
}
