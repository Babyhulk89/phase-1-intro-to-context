// createEmployeeRecord
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // createEmployeeRecords
  function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
  }
  
  // createTimeInEvent
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // createTimeOutEvent
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // hoursWorkedOnDate
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100; // Assuming time is represented in 24-hour format
  }
  
  // wagesEarnedOnDate
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // allWagesFor
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // calculatePayroll
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  // Example usage:
  const employee1 = createEmployeeRecord(["John", "Doe", "Developer", 20]);
  const employee2 = createEmployeeRecord(["Jane", "Doe", "Designer", 25]);
  
  const employees = [employee1, employee2];
  
  // Punch in and out for employees
  createTimeInEvent(employee1, "2023-12-09 0900");
  createTimeOutEvent(employee1, "2023-12-09 1700");
  
  createTimeInEvent(employee2, "2023-12-09 1000");
  createTimeOutEvent(employee2, "2023-12-09 1800");
  
  // Calculate payroll
  const totalPayroll = calculatePayroll(employees);
  console.log("Total Payroll:", totalPayroll);
  