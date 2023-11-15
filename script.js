const profitRate = 0.10; // 1- percent



//  Code for index.html --------------------------------------------------------------------------------
function calculateRateAndRedirect() {
    var dollarRate = document.getElementById("dollar").value.trim();
    dollarRate = dollarRate.replace(/,/g, ''); // Remove commas
    const url = `./index2.html?dollarRate=${encodeURIComponent(dollarRate)}`;
    if (dollarRate !== "") {
        window.open(url, "_blank");
    }
}


function formatInput(input) {
    // Remove any existing commas and non-numeric characters
    let inputValue = input.value.replace(/,/g, '').replace(/\D/g, '');

    // Format the number with commas
    inputValue = Number(inputValue).toLocaleString();

    // Update the input field with the formatted value
    input.value = inputValue;
}



// Code for index2.html ---------------------------------------------------------------------------------

function formatNumber(value) {
    // Remove any existing commas and non-numeric characters
    let commaValue = value.toLocaleString().replace(/,/g, '').replace(/\D/g, '');

    commaValue = Number(value).toLocaleString();

    return commaValue;
}

function initFunction() {

    const urlParams = new URLSearchParams(window.location.search);
    const dollar = Number(urlParams.get('dollarRate'));

    dollar_rate = dollarCustomRound(dollar * (1 + profitRate));

    document.getElementById("first_dollar_rate").value = formatNumber(dollar_rate);
}

function dollarCustomRound(number) {

    if ((number % 100) < 50) {
      return Math.ceil(number / 50) * 50;
    } else if ((number % 100) > 50) {
      return Math.ceil(number / 100) * 100;
    } else {
        return number;
    }
}


function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
}

function calculateCost() {


    const priceElement = document.getElementById("price");
    const priceString = priceElement.value.replace(/\,/g,''); // Remove commas
    const price = parseFloat(priceString);


    const typeElement1 = document.getElementById("tax");
    const typeElement2 = document.getElementById("notax");
    const type = typeElement1.checked ? typeElement1.value : typeElement2.value;


    const taxElement = document.getElementById("taxRate");
    const taxString = taxElement.value.replace(/\,/g,''); // Remove commas
    const tax = parseFloat(taxString);

    const taxDiv = document.getElementById("taxDiv");

    if (type == "tax")
    {
        taxDiv.style.display = 'block';
        taxDiv.classList.add('calcdiv');
    } else
    {
        taxDiv.style.display = 'none';
    }

    if (isNaN(price) || (!typeElement1.checked && !typeElement2.checked) || (typeElement1.checked && isNaN(tax))) {
        return;
    }
    else {
         // Perform the math processes using number1, number2, and myValue
         console.log(type);
         console.log(tax);
        const cost = (type === "tax" ? price * (1 + tax * 0.01) * dollar_rate : price * dollar_rate);
        console.log(cost);

        // Send the data to the server
        document.getElementById("result").value = formatNumber(cost);
    }
}

function reset() {
    document.getElementById("result").value = "";
}
