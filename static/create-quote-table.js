
const tableData = JSON.parse(localStorage.getItem('tableData'));
const rows = localStorage.getItem('rows');
const columns = 4;

function fillTable() {    
    const table = document.getElementById('quote-table');
    tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('data-static', 'true');
            cell.setAttribute('class', 'text');
            cell.textContent = tableData[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}