//get currency codes
var fromCur = document.getElementById("fromCurrency");
var toCur = document.getElementById("toCurrency");

//get input elements
var fromAmount = document.getElementById("convertFrom");
var toAmount = document.getElementById("convertTo");

//get elements displaying the currency symbols
var changeFromCur = document.getElementById("changeFromCur");
var changeToCur= document.getElementById("changeToCur");


fromAmount.addEventListener('input', calculate);
toAmount.addEventListener('input', calculate);


/*function to get attributes containing country flag and currency symbol 
  and change according based on selected currency code to convert from*/
function fromFlagAndCurrency() {
  var changeSrc = fromCur.options[fromCur.selectedIndex].getAttribute("fromSrc");
    var changeCur = fromCur.options[fromCur.selectedIndex].getAttribute("fromCur");
    fromImage.setAttribute("src", changeSrc);
  changeFromCur.innerHTML = changeCur;
}

 fromCur.addEventListener("change", function() {
    fromFlagAndCurrency();
   calculate();
  }); 


/*function to get attributes containing country flag and currency symbol 
  and change according based on selected currency code to convert to*/
function toFlagAndCurrency() {
  var changeSrc = toCur.options[toCur.selectedIndex].getAttribute("toSrc");
    var changeCur = toCur.options[toCur.selectedIndex].getAttribute("toCur");
    toImage.setAttribute("src", changeSrc);
    changeToCur.innerHTML=changeCur;
}

 toCur.addEventListener("change", function() {
    toFlagAndCurrency();
    calculate();
  }); 

//function to calculate the rates based on user input
function calculate() {
  const fromCurrency = fromCur.value;
  const toCurrency = toCur.value;
  
  /*fetch API*/
  fetch(`https://openexchangerates.org/api/latest.json?app_id=b24c183c4dd24ba3b3b3acd7d9636e6b`)
  
  .then(res => res.json())
  .then(res => {
          const rate = res.rates[toCurrency];
    toAmount.value = (fromAmount.value * rate).toFixed(2);
    })
    
  .catch((error)=> {
    console.log(error);
     })
}
calculate();

//IIFE to get current date and time
(function setTime(){
  var today = new Date();
  
  const month = today.toLocaleString('default', { month: 'long' });
  const ordinalDate = today.getDate() + ( [,'st','nd','rd'][/1?.$/.exec(today.getDate())] || 'th' );
  var date = ordinalDate+' '+month+', '+today.getFullYear();
  
  var time = format(today.getHours()) + ":" + format(today.getMinutes()) + ":" + format(today.getSeconds());
  var dateTime = date+' &nbsp;||&nbsp; '+time;
  
   var t = setTimeout(setTime, 100);
  document.getElementById("t1").innerHTML = dateTime;

  
  // add zero to numbers less than 10
  function format(number){
    if (number < 10) 
    {
      number = "0" + number;
    }; 
  return number;
  }
})();