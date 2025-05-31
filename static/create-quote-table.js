
const rows = parseInt(localStorage.getItem('rows'));
const tableData = JSON.parse(localStorage.getItem('tableData'));
const clientNameField = localStorage.getItem('clientNameField');
const noteField = localStorage.getItem('noteField');
const ivaCheckbox = localStorage.getItem('include-iva');
const IVA_RATE= 0.16; // 16% IVA rate
let clientCompanyName = localStorage.getItem('clientCompanyName');



function getTotalColumnData() {
    let total = 0;
    let totalColumn = []
    //Calculate total for each row 
    for (let i = 0; i < rows; i++) {
        const price = parseFloat(tableData[i][2]) || 0;
        const quantity = parseFloat(tableData[i][1]) || 0;
        totalColumn.push(price * quantity); 
        // Add to final total
        total += price * quantity;
    }
    return [totalColumn, total.toFixed(2)];
}

function fillQuote() {
    fillQuoteDetails();   
    const subTotal = fillTable();
    fillSummary(subTotal);
    // Fill the quote info
    fillRecipientDetails();
}

function fillTable() {
    const columns = 3; 
    const totalData = getTotalColumnData();
    const totalColumn = totalData[0];
    const subTotal = totalData[1];

    const table = document.getElementById('quote-table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        row.setAttribute('data-static', 'true');
        row.setAttribute('class', 'text');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('data-static', 'true');
            cell.setAttribute('class', 'text');
            cell.textContent = tableData[i][j];
            row.appendChild(cell);
        }
        // Add a cell for the total price
        const totalCell = document.createElement('td');
        totalCell.setAttribute('data-static', 'true');
        totalCell.setAttribute('class', 'text');
        totalCell.textContent = totalColumn[i];
        row.appendChild(totalCell);
        tbody.appendChild(row);
    }
    return subTotal
}

function fillSummary(subTotal) { 
    document.getElementById('subtotal').textContent = subTotal;
    let iva = 0;

    if (ivaCheckbox === 'true') {
        document.getElementById('iva-rate').textContent = 'IVA (16%): $';
        iva = subTotal * IVA_RATE // 16% IVA
    }else {
        document.getElementById('iva-rate').textContent = 'IVA (0%): $';
    }
    document.getElementById('iva').textContent = iva.toFixed(2);
    document.getElementById('total').textContent = (parseFloat(subTotal) + iva).toFixed(2);
}


function fillRecipientDetails() {
    if (clientCompanyName === null || clientCompanyName === undefined || clientCompanyName === '') {
        clientCompanyName = '';
    }
    document.getElementById('client-company-name').textContent = clientCompanyName;
    document.getElementById('client-name').textContent = clientNameField;
    document.getElementById('notes').textContent = noteField;
}

function dayOfTheYear(date) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}
function minuteOfTheDay(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function createClientID() {
    const len = clientCompanyName.length;
    const firstThird = clientCompanyName.slice(0, len / 3).toUpperCase();
    const lastThird = clientCompanyName.slice(len - len / 3).toUpperCase();

    return firstThird + 'XXXX' + lastThird;
}

function fillQuoteDetails() {
    const today = new Date()
    document.getElementById('quote-number').textContent = "CT" + dayOfTheYear(today) + minuteOfTheDay(today);
    document.getElementById('date').textContent = today.toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });
    if( clientCompanyName === null || clientCompanyName === undefined || clientCompanyName === '') {
        document.getElementById('id-client').textContent = 'XXXXXXX';
    }else {
        document.getElementById('id-client').textContent = createClientID();
    }
}


