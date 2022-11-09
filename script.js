const toggler = document.querySelector('#toggler');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
const result_par = document.querySelector('.result_par');
let amount = document.querySelector('#amount')

toggler.onclick = () => {
    document.body.classList.toggle('light_mode')
}

const btnFunc = () => {
    let base = document.querySelector('#select_from').value
    let selectTo = document.querySelector('#select_to').value
    let realAmount = amount.value

    fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const rate = data.rates[selectTo]
            const convert = () => {
                return realAmount * rate
            }
            if (realAmount === '') {
                console.log('Please enter amount');
                result_par.innerText = 'Please Enter Amount'
            }
            else {
                result.innerHTML = `<button class="btn">Convert</button>
                <h6 class="result_par">${realAmount} ${base} is equal to <span class="result_span">${convert().toLocaleString()} ${selectTo}</span></h6> `
            }

        })
}
const func = (e) => {
    if (e.keyCode == 13) {
        btnFunc()
    }
}
btn.addEventListener('click', btnFunc);
amount.addEventListener('keypress', func)

amount.addEventListener("keyup", () => {
    if (!amount.value) {
        result.innerHTML = `<button class="btn">Convert</button>`
    }
});

const changer = (e) => {
    let realAmount = amount.value
    realAmount = e.target.value
    btnFunc()
}

amount.addEventListener('input', changer)

amount.oninput = function () {
    if (this.value.length > 9) {
        this.value = this.value.slice(0,9); 
    }
}