const sheet_id = "1aNOkajYXckSduHTAWXdt3lV-8UnP1tey6c7fqtpvo1A";
const sheet_title = "Form responses 1";
const sheet_range = "A1:K200";
const url = `https://docs.google.com/spreadsheets/d/${sheet_id}/gviz/tq?sheet=${sheet_title}&range=${sheet_range}`;
console.log(url);

// Define a function to fetch data and return a Promise
async function fetchData() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const rep = await res.text();
    const data = JSON.parse(rep.substr(47).slice(0, -2));
    const tableData = [];

    data.table.rows.forEach((row, index) => {
      const rowData = {};
      rowData["SNO"] = index + 1;

      if (row.c) {
        // Check if row.c is not null
        row.c.forEach((cell, index) => {
          if (cell) {
            // Check if cell is not null
            let value = cell.v;
            if (typeof value === "string" && value.startsWith("Date")) {
              value = cell.f;
            }
            const header = data.table.cols[index].label;

            rowData[header] = value;
          } else {
          }
        });
      }
      tableData.push(rowData);
      console.log(rowData);
    });

    return tableData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
//--------------------------------------------------------
function orderedData(array, opt, need) {
  const filterByOpt = [];
  if (opt === "all") {
    array.forEach((row) => {
      // console.log("success", row[need]);
      filterByOpt.push(row);
    });
  } else {
    array.forEach((row) => {
      if (row[need] === opt) {
        // console.log("success", row[need]);
        filterByOpt.push(row);
      }
    });
  }
  return filterByOpt;
}

// Call fetchData and then use the returned data

// You cannot access tableData here directly as it's an asynchronous operation
// console.log(tableData.length); // This will not work here

// If you need to use tableData in another function, you should call that function within the .then() block

export { fetchData, orderedData };
