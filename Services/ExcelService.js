const xl = require("excel4node");

exports.sendExcelFile = (data, cols, res, filename) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Sheet 1");
  cols.forEach((colName, i) => {
    ws.cell(1, i + 1).string(colName);
  });
  data.forEach((row, rowNo) => {
    row.forEach((value, colNo) => {
      console.log(value);
      ws.cell(rowNo + 2, colNo + 1).string(value ? value.toString() : "");
    });
  });
  wb.write(filename + ".xlsx", res);
};
