//alert("connected")

const userName = document.getElementById("name");
const gYear = document.getElementById("gyear");
const usn = document.getElementById("usn");
const phonNo = document.getElementById("contact_number");
const email = document.getElementById("email");
//const numberCode=document.getElementById("number_code");
const form1 = document.getElementById("form1");

form1.addEventListener("mouseout", (e) => {
  e.preventDefault();
  checkName();
  checkYear();
  checkUsn();
  checkNumber();
  checkEmail();
});

function validateStudent() {
  if (
    checkName() &&
    checkYear() &&
    checkUsn() &&
    checkNumber() &&
    checkEmail() === true
  ) {
    return true;
  } else {
    return false;
  }
}

function checkName() {
  const userNameValue = userName.value.trim();
  let validRegex = /^[A-Za-z ]+$/;
  if (userNameValue.match(validRegex)) {
    setSucessFor(userName, "Perfect");
    return true;
  } else {
    setErrorFor(userName, "Alphabets only please");
    return false;
  }
}

function checkYear() {
  const gYearValue = gYear.value.trim();
  let validRegex = /^2[0-9 ]+$/;
  if (
    gYearValue.match(validRegex) &&
    gYearValue.length === 4 &&
    gYearValue >= 2005
  ) {
    setSucessFor(gYear, "Perfect");
    return true;
  } else {
    if (gYearValue === "") {
      setErrorFor(gYear, "Numbers only please Starting with 2XXX");
      return false;
    }
    if (gYearValue <= 2005) {
      setErrorFor(gYear, "Graduation year must be greater than 2005");
      return false;
    } else {
      setErrorFor(gYear, "Numbers only please Starting with 2XXX");
      return false;
    }
  }
}

function checkUsn() {
  const usnValue = usn.value.trim();
  let validRegex = /^1[dDbB][A-Za-z0-9]+$/;

  if (usnValue.match(validRegex) && usnValue !== "" && usnValue.length === 10) {
    setSucessFor(usn, "Perfect");
    return true;
  } else {
    if (usnValue == "") {
      setEmptyFor(usn, "Optional");
      return true;
    } else {
      setErrorFor(usn, "Invalid");
      return false;
    }
  }
}

function checkNumber() {
  const phonNoValue = phonNo.value.trim();
  let validRegex = /^[0-9 ]+$/;
  if (phonNoValue.match(validRegex) && phonNoValue.length === 10) {
    setSucessFor(phonNo, "Perfect");
    return true;
  } else {
    if (phonNoValue === "") {
      setErrorFor(phonNo, "Must be Number Only");
      return false;
    }
    if (phonNoValue.length !== 10) {
      setErrorFor(phonNo, "Enter 10 digits");
      return false;
    } else {
      setErrorFor(phonNo, "Must be Number Only");
      return false;
    }
  }
}

function checkEmail() {
  const mail = email.value.trim();
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(validRegex)) {
    setSucessFor(email, "Perfect");
    return true;
  } else {
    setErrorFor(email, "Valid Email please");
    return false;
  }
}

const fName = document.getElementById("fname");
const doj = document.getElementById("doj");
const desg = document.getElementById("desg");
//const fnumber=document.getElementById("number");
const fphon = document.getElementById("contact");
const fmail = document.getElementById("mail");
const form2 = document.getElementById("form2");

form2.addEventListener("mouseout", (event) => {
  event.preventDefault();
  checkFName();
  checkDoj();
  checkDesg();
  checkFmail();
  checkFNumber();
});

function validateStaff() {
  if (checkFName() && checkDesg() && checkFNumber() && checkFmail() === true) {
    return true;
  } else {
    return false;
  }
}

function checkFName() {
  const fNameValue = fName.value.trim();
  let validRegex = /^[A-Za-z ]+$/;
  if (fNameValue.match(validRegex)) {
    setSucessFor(fName, "Perfect");
    return true;
  } else {
    setErrorFor(fName, "Alphabets only please");
    return false;
  }
}

function checkDoj() {
  const dojValue = doj.value.trim();
  if (dojValue !== "") {
    setSucessFor(doj, "Perfect");
    return false;
  } else {
    setErrorFor(doj, "Enter Date of joining in dd-mm-yyy");
    return false;
  }
}

function checkDesg() {
  const desgValue = desg.value.trim();
  let validRegex = /^[A-Za-z ]+$/;
  if (desgValue.match(validRegex)) {
    setSucessFor(desg, "Perfect");
    return true;
  } else {
    setErrorFor(desg, "Enter Designation");
    return false;
  }
}

function checkFmail() {
  const mailValue = fmail.value.trim();
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailValue.match(validRegex)) {
    setSucessFor(fmail, "Perfect");
    return true;
  } else {
    setErrorFor(fmail, "Valid Email please");
    return false;
  }
}

function checkFNumber() {
  const phonNoValue = fphon.value.trim();
  let validRegex = /^[0-9 ]+$/;
  if (phonNoValue.match(validRegex) && phonNoValue.length === 10) {
    setSucessFor(fphon, "Perfect");
    return true;
  } else {
    if (phonNoValue === "") {
      setErrorFor(fphon, "Must be Number Only");
      return false;
    }
    if (phonNoValue.length !== 10) {
      setErrorFor(fphon, "Enter 10 digits");
      return false;
    } else {
      setErrorFor(fphon, "Must be Number Only");
      return false;
    }
  }
}

function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  small.innerText = message;
  formGroup.className = "form-group error";
}

function setSucessFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  small.innerText = message;
  formGroup.className = "form-group sucess";
}

function setEmptyFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  small.innerText = message;
  formGroup.className = "form-group empty";
}
