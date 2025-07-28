const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const resultOutput = document.getElementById("output");
const romanNumerals = [
  { symbol: 'M', value: 1000 },
  { symbol: 'CM', value: 900 },
  { symbol: 'D', value: 500 },
  { symbol: 'CD', value: 400 },
  { symbol: 'C', value: 100 },
  { symbol: 'XC', value: 90 },
  { symbol: 'L', value: 50 },
  { symbol: 'XL', value: 40 },
  { symbol: 'X', value: 10 },
  { symbol: 'IX', value: 9 },
  { symbol: 'V', value: 5 },
  { symbol: 'IV', value: 4 },
  { symbol: 'I', value: 1 },
];

const checkUserInput = () => { 
  const inputNum = Math.floor(parseInt(numberInput.value));
  if (inputNum <= 0) {
    resultOutput.innerText = "Please enter a number greater than or equal to 1";
    return null;
  } else if (inputNum >= 4000) {
    resultOutput.innerText = "Please enter a number less than or equal to 3999";
    return null;
  } else if (inputNum > 0 && inputNum < 4000) {
    return true;
  } else {
    resultOutput.innerText = "Please enter a valid number";
  };
};

const numberToRomanNum = () => {
    let numResult = ""; 
  let currentNumber = parseInt(numberInput.value);
  for (let i = 0; i < romanNumerals.length; i++) {
    let romanSymbol = romanNumerals[i].symbol;
    let romanValue = romanNumerals[i].value;
    while (currentNumber >= romanValue) {
      numResult += romanSymbol; 
      currentNumber -= romanValue; 
    }
  }
  resultOutput.innerText = numResult;
  return numResult;
};

convertBtn.addEventListener("click", () => {
  if (checkUserInput() === true) {
    numberToRomanNum();
  }
});

