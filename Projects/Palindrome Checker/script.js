const checkButton = document.getElementById('check-btn');
const textInputElement = document.getElementById('text-input');
const resultElement = document.getElementById('result');

const alertInputValue = () => {
  if (textInputElement.value === ""){
   return alert("Please input a value");
  };
};

const isPalindrome = (str) => {
  let cleanedStr = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
  };

const checkIfPalindrome = () => {
  let contentText = textInputElement.value;
  
  if (isPalindrome(contentText)) {
    resultElement.textContent = `${contentText} is a palindrome`;
  } else {
    resultElement.textContent = `${contentText} is not a palindrome`;
  }
}

checkButton.addEventListener("click", alertInputValue);

checkButton.addEventListener("click", checkIfPalindrome);
