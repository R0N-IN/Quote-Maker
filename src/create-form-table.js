let tableData =[]

const table = document.getElementById("form-table");
const columns = 3;
const clientNameField = document.getElementById("name-field");
const noteField = document.getElementById("note-field");
const clientCompanyName = document.getElementById("company-field");
let rows = 1;

function createTable(){    
    // Clear existing table data
    while(table.firstChild) {
        table.removeChild(table.firstChild);
    }
    
    let headers = ["Descripcion", "Cantidad", "Precio Unitario"];

    // Create thead and header row
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");

    for (let header of headers) {
        let th = document.createElement("th"); 
        let headerText = document.createElement("span");
        headerText.setAttribute("class", "header-text");
        headerText.textContent = header;
        th.appendChild(headerText);
        headerRow.appendChild(th);
    }

    // Append the header row to the thead, and thead to the table
    thead.appendChild(headerRow);
    table.appendChild(thead);
    tbody = document.createElement("tbody");
    table.appendChild(tbody);

    // Call your function to add a row (if needed)
    addRow();
}

function addRow(){
    let rowData = [];
    let row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
        let cell = document.createElement("td");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("class", "editable-cell");
        cell.addEventListener("input", updateCell);
        rowData.push("");
        row.appendChild(cell);
    }
    tbody.appendChild(row);
    tableData.push(rowData);
    rows++;
}

function updateCell(event) {
    let rowIndex = event.target.parentNode.rowIndex - 1;
    let columnIndex = event.target.cellIndex;
    let value = event.target.textContent.trim();
    updateData(rowIndex, columnIndex, value);
}

function updateData(row, col, value) {
    tableData[row][col] = value;
}

function saveAndGo() {
    localStorage.clear();
    localStorage.setItem("tableData", JSON.stringify(tableData));
    localStorage.setItem("rows", rows - 1);
    localStorage.setItem("clientNameField", clientNameField.value);
    localStorage.setItem("noteField", noteField.value);
    localStorage.setItem("clientCompanyName", clientCompanyName.value);
    window.open("/static/quote.html", "_blank"); 
}

function displayData() {
    console.log(tableData);
    console.log(table);
}
