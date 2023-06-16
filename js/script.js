const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    dropList = document.querySelectorAll("form select"),
    exchangeIcon = document.querySelector(".icon"),
    getButton = document.querySelector("form button"),
    apiKey= 'cd9527d4994a23788583fdc1';


for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", (e) => {
        loadFlag(e.target);
    })
}

loadFlag=(element)=>{
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

exchangeIcon.addEventListener("click",()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(toCurrency);
    loadFlag(fromCurrency);
    getExchangeRate();

})

getExchangeRate=()=>{
    let amountVal = amount.value;
    if (amountVal==""||amountVal=="0") {
        amount.value="1";
        amountVal =1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ 
        exchangeRateTxt.innerText = "Something went wrong";
    });
}

getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
    amount.value="1";
})