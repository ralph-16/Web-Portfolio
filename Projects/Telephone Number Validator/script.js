var input = document.getElementById("user-input");
var checkBtn = document.getElementById("check-btn");
var clearBtn = document.getElementById("clear-btn");
var resultsDiv = document.getElementById("results-div");
var numFormat = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

const alertInputValue = () => {
  if (!input.value.trim()) {
    alert("Please provide a phone number");
    return false; 
  }
  return true;
};

const clearResults = () => {
  resultsDiv.innerText = "";
};

const checkInput = (number) => {
  if (numFormat.test(number)) {
    resultsDiv.innerText += 'Valid US Number: ' + number + '\n';
  } else {
    resultsDiv.innerText += 'Invalid US Number: ' + number + '\n';
  }
};

checkBtn.addEventListener("click", () => {
  if (alertInputValue()) { 
    checkInput(input.value.trim());
    input.value = ''; 
  }
});

clearBtn.addEventListener("click", clearResults);


