const transactionUL = document.querySelector('#transactions');
const incomeDisplay = document. querySelector('#money-plus');
const expenseDisplay = document. querySelector('#money-minus');
const balanceDisplay = document. querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');
const localStorageTransaction  = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalstorage();
    init();
};

const addTransactionIntoDOM = ({amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+';
    const CSSClass = amount < 0 ? 'minus' : 'plus';
    const amounthWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
    ${name} 
    <span>${operator} R$${amounthWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${id})">x</button>`
    transactionUL.append(li);

    //<li class="minus">
    //    Salário <span>-$400</span><button class="delete-btn">x</button>
    //</li>
}; 

const getExpenses = transactionAmounts => Math.abs(transactionAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const getIncomes = transactionAmounts => transactionAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator  + value, 0)
    .toFixed(2);

const getTotal =  transactionAmounts => transactionAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);

const updateBalanceValues = () => {
    const transactionAmounts = transactions.map(({amount}) => amount);
    const total = getTotal(transactionAmounts);
    const income =  getIncomes(transactionAmounts);
    const expense = getExpenses(transactionAmounts); 

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
    transactionUL.innerHTML = '';

    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
};

init();

const updateLocalstorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

const generatedID = () => Math.round(Math.random() * 1000);

const addTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generatedID(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    });
}

const cleanInputs = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}

const handleFormSubmit = event => { 
    event.preventDefault();
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    
    if (transactionName === '' || transactionAmount === '' ) {
        alert('Os campos "Nome" e "Valor" devem estar preeenchidos!');
        return
    };

 

    addTransactionsArray(transactionName, transactionAmount)
    init();
    updateLocalstorage();
    cleanInputs()
    }

form.addEventListener('submit', handleFormSubmit);
   

