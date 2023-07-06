// dependencies
const addDateSuffix = date => { // function to format a timestamp, accepts the timestamp and an object with a single key/value pair, format: 'long' or 'short'
    let dateStr = date.toString(); // convert the date to a string
    // get last char of date string
    const lastChar = dateStr.charAt(dateStr.length - 1); // use date.charAt() to grab the last character in the string
    // if last char of date string is 1, return the date string with 'st' appended
    if (lastChar === '1' && dateStr !== '11') { // if the last character in the date string is a 1 and the date string is not 11, return the date string with 'st' appended
        dateStr = `${dateStr}st`; // return the date string with 'st' appended
    } else if (lastChar === '2' && dateStr !== '12') { // if the last character in the date string is a 2 and the date string is not 12, return the date string with 'nd' appended
        dateStr = `${dateStr}nd`; // return the date string with 'nd' appended
    } else if (lastChar === '3' && dateStr !== '13') { // if the last character in the date string is a 3 and the date string is not 13, return the date string with 'rd' appended
        dateStr = `${dateStr}rd`; // return the date string with 'rd' appended
    } else { // otherwise, return the date string with 'th' appended
        dateStr = `${dateStr}th`; // return the date string with 'th' appended
    }
    // return the formatted date string
    return dateStr; // return the date string
}

// function to format a timestamp, accepts the timestamp and an object with a single key/value pair, format: 'long' or 'short'
module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => { // export the function, accepting a timestamp and an object with two properties, monthLength and dateSuffix
    let months; // declare a months variable
    if (monthLength === 'short') { // if the monthLength property is 'short', use the following array of month abbreviations
        months = { // declare the months variable as an object
            0: 'Jan', 
            1: 'Feb', 
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else { // if the monthLength property is 'long', use the following array of full month names
        months = { // declare the months variable as an object
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }
    const dateObj = new Date(timestamp); // create a new Date object, passing in the timestamp
    const formattedMonth = months[dateObj.getMonth()]; // get the month using the getMonth() method on the Date object
    let dayOfMonth; // declare a dayOfMonth variable
    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate()); // use the addDateSuffix() function to add the date suffix
    }
    else {
        dayOfMonth = dateObj.getDate(); // otherwise, return the date string without the suffix
    }
    const year = dateObj.getFullYear(); // get the year using the getFullYear() method on the Date object
    let hour; 
    // check for 24-hr time
    if (dateObj.getHours > 12) { 
        hour = Math.floor(dateObj.getHours() / 2); // if the time is after noon, subtract 12 from the hours
    }
    else {
        hour = dateObj.getHours(); // otherwise, return the hours
    }
    // if hour is 0 (12:00am), change it to 12
    if (hour === 0) { // if the hour is 0, change it to 12
        hour = 12; // change the hour to 12
    }
    const minutes = dateObj.getMinutes(); // get the minutes using the getMinutes() method on the Date object
    let periodOfDay; // declare a periodOfDay variable
    // set a.m. or p.m. based on the hour
    if (dateObj.getHours() >= 12) { // if the hour is greater than or equal to 12, set the periodOfDay variable to 'p.m.'
        periodOfDay = 'p.m.'; // set the periodOfDay variable to 'p.m.'
    } else { // otherwise, set the periodOfDay variable to 'a.m.'
        periodOfDay = 'a.m.'; // set the periodOfDay variable to 'a.m.'
    }
    // put a space between the hour and the minutes
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`; 
    // return formatted timestamp
    return formattedTimeStamp; 
};
