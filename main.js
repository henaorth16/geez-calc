const input = document.getElementById("input")
let stringOfNum = '3+4+'
let final = false

function append(i, char) {
   if (i == '.' && input.value == ""){
      return
   }
   if(stringOfNum == "" && "+-*/".includes(i)) {
      return
   }
   if("+-*/".includes(stringOfNum[stringOfNum.length - 1]) && "+-*/".includes(i)){
      return
   }
   
   if (final && !"+-*/".includes(i) ){
      stringOfNum = ''
      final = false
      stringOfNum += i
      input.value = char
   }else{
      input.value += char
      stringOfNum += i
      final = false
   }
}

function clearInput(){
   input.value = ""
   stringOfNum = ""
   final = false
}

function backSpace() {
   let val = input.value
   let sub = stringOfNum.slice(0, stringOfNum.length - 1)
   input.value = val.substr(0, val.length - 1)
   stringOfNum = sub
}

function excute() {

   let answer = eval(stringOfNum)
   let isNegative = answer < 0
   let isFloat = Math.ceil(answer) !== answer
   isFloat ? "" :""
   input.value = convertToGeez(answer)
  //  console.log(stringOfNum)
   final = answer ? true : false
}

function convertToGeez(number) {
   const geezSymbols = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
   const geezSymbolsTens = ["፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];
   const geezSymbolsHundreds = [
     "፻",
     "፲፻",
     "፳፻",
     "፴፻",
     "፵፻",
     "፶፻",
     "፷፻",
     "፸፻",
     "፹፻",
     "፺፻",
   ];

   if (number <= 10) {
     if (number === 10) {
       return geezSymbolsTens[0];
     }
     return geezSymbols[number - 1];
   } else if (number <= 100) {
     const tens = Math.floor(number / 10);
     const remaining = number % 10;
     if (number === 100) {
       return geezSymbolsHundreds[0];
     } else if (remaining === 0) {
       return `${geezSymbolsTens[tens - 1]}`;
     } else {
       return `${geezSymbolsTens[tens - 1]}${geezSymbols[remaining - 1]}`;
     }
   } else if (number <= 1000) {
     const hundreds = Math.floor(number / 100);
     const remaining = number % 100;
     if (number === 1000) {
       return `${geezSymbolsTens[0]}${geezSymbolsHundreds[0]}`;
     } else if (remaining === 0) {
       return `${geezSymbols[hundreds - 1]}፻`;
     } else {
       return `${
         hundreds === 1 ? "" : geezSymbols[hundreds - 1]
       }፻${convertToGeez(remaining)}`;
     }
   } else if (number <= 10000) {
     const thousands = Math.floor(number / 100);
     const remaining = number % 100;
     if (number === 10000) {
       return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
     } else if (remaining === 0) {
       return `${convertToGeez(thousands)}፻`;
     } else {
       return `${convertToGeez(thousands)}፻${convertToGeez(remaining)}`;
     }
   } else if (number <= 100000) {
     const tensThousand = Math.floor(number / 10000);
     const remaining = number % 10000;
     if (number === 100000) {
       return `${geezSymbolsTens[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
     } else if (remaining === 0) {
       return `${geezSymbols[tensThousand - 1]}፻፻`;
     } else {
       return `${
         tensThousand === 1 ? "" : geezSymbols[tensThousand - 1]
       }፻፻${convertToGeez(remaining)}`;
     }
   } else if (number <= 1000000) {
     const hundredsThousand = Math.floor(number / 10000);
     const remaining = number % 10000;
     if (number === 1000000) {
       return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
     } else if (remaining === 0) {
       return `${convertToGeez(hundredsThousand)}፻፻`;
     } else {
       return `${convertToGeez(hundredsThousand)}፻፻${convertToGeez(
         remaining
       )}`;
     }
   } else if (number <= 10000000) {
     //Below 10 million
     const onesMillion = Math.floor(number / 10000);
     const remaining = number % 10000;
     if (number === 10000000) {
       return `${geezSymbols[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
     } else if (remaining === 0) {
       return `${geezSymbols[onesMillion - 1]}፻፻፻`;
     } else {
       return `${convertToGeez(onesMillion)}፻፻${convertToGeez(remaining)}`;
     }
   } else {
     // below 100 million
     const tensMillions = Math.floor(number / 10000);
     const remaining = number % 10000;
     if (number === 100000000) {
       return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]} maximum!`;
     } else if (remaining === 0) {
       return `${convertToGeez(tensMillions)}፻፻፻`;
     } else {
       return `${convertToGeez(tensMillions)}፻፻${convertToGeez(remaining)}`;
     }
   }
 }

