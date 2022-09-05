/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map(a => createEmployeeRecord(a));
}

function createTimeInEvent(dateStamp) {
    let newEvent = {
        type: 'TimeIn',
        date: dateStamp.substr(0, 10),
        hour: parseInt(dateStamp.substr(11, 14), 10)
    }
    this.timeInEvents.push(newEvent);
    return this;
}

function createTimeOutEvent(dateStamp) {
    let newEvent = {
        type: 'TimeOut',
        date: dateStamp.substr(0, 10),
        hour: parseInt(dateStamp.substr(11, 14), 10)
    }
    this.timeOutEvents.push(newEvent);
    return this;
}

function hoursWorkedOnDate(dateStamp) {
    let filterTimeIn = this.timeInEvents.filter(event => event.date === dateStamp);
    let filterTimeOut = this.timeOutEvents.filter(event => event.date === dateStamp);
    return (filterTimeOut[0].hour - filterTimeIn[0].hour)/100;
}

//console.log(hoursWorkedOnDate.call(updatedBpRecord, '2014-02-28'));

function wagesEarnedOnDate(dateStamp) {
    return this.payPerHour * (hoursWorkedOnDate.call(this, dateStamp));
}

//console.log(wagesEarnedOnDate.call(updatedBpRecord, '2014-02-28'));

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
    //console.log(eligibleDates);

    const payable = eligibleDates.reduce(function (memo, d) {
        //console.log(memo);
        //console.log(d);
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//console.log(allWagesFor.call(updatedBpRecord));

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]
let emps = createEmployeeRecords(src)
let loki = findEmployeeByFirstName(emps, "Loki")

function findEmployeeByFirstName(collection, firstNameString) {
    let result = collection.filter(e => e.firstName === firstNameString);
    return result[0];
}

//console.log(loki);

function calculatePayroll(employees) {
    let allWages = employees.map(e => allWagesFor.call(e));
    //console.log(allWages);
    let reducer = (previousValue, currentValue) => previousValue + currentValue;
    return allWages.reduce(reducer);
}