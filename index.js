function createEmployeeRecord(arr){
  const obj = {
  firstName: arr[0],
  familyName: arr[1],
  title: arr[2],
  payPerHour: arr[3],
  timeInEvents: [],
  timeOutEvents: [],
  }
  return obj
};

function createEmployeeRecords(arrOfArrs){ 
  let employeeRecords = arrOfArrs.map( el => createEmployeeRecord(el));
  return employeeRecords
};

function createTimeInEvent (employeeRecord, date){
  let obj= {};
  obj.type = "TimeIn";
  obj.hour = +(date.slice(11));
  obj.date = date.substring(0,10);
  employeeRecord.timeInEvents.push(obj);
  return employeeRecord
};

function createTimeOutEvent (employeeRecord, date){
  let obj= {};
  obj.type = "TimeOut";
  obj.hour = +(date.slice(11));
  obj.date = date.substring(0,10);
  employeeRecord.timeOutEvents.push(obj);
  return employeeRecord
};

function hoursWorkedOnDate (employeeRecord, date){
  const timeIn = employeeRecord.timeInEvents.find(e=>e.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(e=>e.date === date);  return (timeOut.hour - timeIn.hour)*.01
};

function wagesEarnedOnDate (employeeRecord, date) {
    return (hoursWorkedOnDate(employeeRecord, date) * (employeeRecord.payPerHour))
};

function allWagesFor(employeeRecord){
  const allWages = employeeRecord.timeInEvents.map(e=>wagesEarnedOnDate(employeeRecord, e.date));
  return allWages.reduce((accumulator, wage)=> accumulator + wage);
};

function calculatePayroll (arrOfEmployeeRecords){
  const total = arrOfEmployeeRecords.map(e=>allWagesFor(e));
  const sumAll = total.reduce((accumulator, employeeTotal) => accumulator + employeeTotal);
  return sumAll
};

function calculatePayroll(arrayOfEmployeeRecords){
  const totalForEachEmployee = arrayOfEmployeeRecords.map(e=>allWagesFor(e));
  return totalForEachEmployee.reduce((accumulator, e)=> accumulator + e)
};