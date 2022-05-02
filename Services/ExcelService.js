const xl = require("excel4node");
const xlsx = require("xlsx")
exports.sendExcelFile = (data, cols, res, filename) => {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet("Sheet 1");
  cols.forEach((colName, i) => {
    ws.cell(1, i + 1).string(colName);
  });
  data.forEach((row, rowNo) => {
    row.forEach((value, colNo) => {
      ws.cell(rowNo + 2, colNo + 1).string(value ? value.toString() : "");
    });
  });
  wb.write(filename + ".xlsx", res);
};
exports.readExcelFile=(file)=>{
 return new Promise(async(resolve, reject)=>{
  const workbook = await xlsx.readFile(file.filepath);
  resolve(xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]))
 })
}