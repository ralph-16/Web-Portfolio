const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const priceDisplay = document.getElementById("price");
const cidDisplay = document.getElementById("cid");

let noChangeDue = false;
let isInsufficient = false;
let isClosed = false;
let isOpen = false;

let price = 11.95;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const currencyUnits = [
  0.01,
  0.05,
  0.1,
  0.25,
  1,
  5,
  10,
  20,
  100
]

let changeToReturn = [
  ['PENNY: $', 0],
  ['NICKEL: $', 0],
  ['DIME: $', 0],
  ['QUARTER: $', 0],
  ['ONE: $', 0],
  ['FIVE: $', 0],
  ['TEN: $', 0],
  ['TWENTY: $', 0],
  ['ONE HUNDRED: $', 0]
  ];

priceDisplay.innerText = "Total: " + price;
 

const roundOff = (num) => {
  return Math.round(num * 100) / 100;
}

const checkPrice = () => {
  const cash = parseFloat(cashInput.value);
    if (price > cash){
      alert("Customer does not have enough money to purchase the item");
      return false;
    } else if (isNaN(cash)) {
      alert("Invalid Input. Try again.");
      return false;
    } else {
      return true;
    }
}

const resetInputs = () => {
  noChangeDue = false;
  isInsufficient = false;
  isClosed = false;
  isOpen = false;
  changeToReturn = [
    ['PENNY: $', 0],
    ['NICKEL: $', 0],
    ['DIME: $', 0],
    ['QUARTER: $', 0],
    ['ONE: $', 0],
    ['FIVE: $', 0],
    ['TEN: $', 0],
    ['TWENTY: $', 0],
    ['ONE HUNDRED: $', 0]
  ];
}

const printChange = () => {
  for(let i = changeToReturn.length - 1; i >= 0; i--){
    if(changeToReturn[i][1] > 0){
    changeDue.innerText += changeToReturn[i][0] + "" + roundOff(changeToReturn[i][1]) + "\n";
    }
  }
  cashInput.value = "";  
}

const computeChange = () => {
  let change = roundOff(parseFloat(cashInput.value - price));
  let cidCopy = structuredClone(cid); 
  let ctrCopy = structuredClone(changeToReturn);

  if(change == 0){
    noChangeDue = true; 
  } else if (roundOff(cidCopy.reduce((acc, row) => acc + row[1], 0)) < change && change > 0) {
    isInsufficient = true;
  } else {
    for(let i = cid.length - 1; i >= 0; i--){
      while(change >= currencyUnits[i] && cidCopy[i][1] >= currencyUnits[i] && change != 0){
        change = roundOff(change - currencyUnits[i]);
        cidCopy[i][1] = roundOff(cidCopy[i][1] - currencyUnits[i]);
        ctrCopy[i][1] = roundOff(ctrCopy[i][1] + currencyUnits[i]);
      }
    } 
  }

if(roundOff(cidCopy.reduce((acc, row) => acc + row[1], 0)) == 0 && change == 0){
    isClosed = true;
    cid = structuredClone(cidCopy);
    changeToReturn = structuredClone(ctrCopy);
  } else if (roundOff(cidCopy.reduce((acc, row) => acc + row[1], 0)) > 0 && change == 0){
    isOpen = true;
    cid = structuredClone(cidCopy);
    changeToReturn = structuredClone(ctrCopy);
  }
}

const showDue = () => {
  const cash = parseFloat(cashInput.value);
  if(Number.isNaN(cash)){
    changeDue.innerText = "Please input a number";
  }
  if(noChangeDue){
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else if (isInsufficient){
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  } else if(isClosed){
    changeDue.innerText = "Status: CLOSED\n";
  } else if (isOpen){
    changeDue.innerText = "Status: OPEN\n";
  }
}

const displayCid = () => {
  cidDisplay.innerText = "Change in drawer:\n";

  for(let i = changeToReturn.length - 1; i >= 0; i--){
    cidDisplay.innerText += changeToReturn[i][0] + "" + roundOff(cid[i][1]) + "\n";    
  }
}
displayCid(); 



purchaseBtn.addEventListener("click",() => {
  if(checkPrice()){ 
    computeChange();
    showDue();
    printChange();
    displayCid();
  }
  resetInputs();

})


