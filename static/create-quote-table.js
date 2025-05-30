
const rows = localStorage.getItem('rows');
const tableData = JSON.parse(localStorage.getItem('tableData'));



function totalColumnData() {
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
    console.log(total.toFixed(2));
    console.log(totalColumn);
    return [totalColumn, total.toFixed(2)];
}

function fillQuote() {   
    subTotal = fillTable();
    fillSummary(subTotal);
    // Fill the quote info
    fillQuoteInfo();
}
function fillTable() {
    const columns = 3; 
    const totalData = totalColumnData();
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


function fillSummary(subTotal){
    document.getElementById('subtotal').textContent = subTotal;
    iva = document.getElementById('iva').textContent = subTotal * 0.16; // Assuming a 16% IVA
    total = document.getElementById('total').textContent = parseFloat(subTotal) + iva; // Total = Subtotal + IVA
}


const clientCompanyName = document.getElementById('client-company-name');
const clientNameField = document.getElementById('client-name');
const noteField = document.getElementById('note-field');

function fillQuoteInfo() {
    const clientCompanyName = localStorage.getItem('clientCompanyName');
    const clientNameField = localStorage.getItem('clientNameField');
    const noteField = localStorage.getItem('noteField');

    document.getElementById('client-company-name').textContent = clientCompanyName;
    document.getElementById('client-name').textContent = clientNameField;
    document.getElementById('notes').textContent = noteField;
}



