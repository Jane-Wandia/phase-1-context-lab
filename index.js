/* Your Code Here */
function createEmployeeRecord(array) {
	return {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
}
function createEmployeeRecords(array) {
	return array.map((employee) => createEmployeeRecord(employee));
}
function createTimeInEvent(employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	employee.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour, 10),
		date,
	});
	return employee;
}
function createTimeOutEvent(employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour, 10),
		date,
	});
	return employee;
}
function hoursWorkedOnDate(employee, date) {
	let timeIn = employee.timeInEvents.find((event) => event.date === date);
	let timeOut = employee.timeOutEvents.find((event) => event.date === date);
	return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
	return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}
function allWagesFor(employee,date) {
	let dates = employee.timeInEvents.map((event) => event.date);
	return dates.reduce(
		(total, date) => total + wagesEarnedOnDate(employee, date),
		0
	);
}y
function findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find((employee) => employee.firstName === firstName);
}
function calculatePayroll(array) {
	return array.reduce((total, employee) => total + allWagesFor(employee), 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

