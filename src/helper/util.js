const excelEpoc = new Date(1900, 0, 0).getTime();
const crypto = require('crypto');
const fs = require("fs");
const msDay = 86400000;
const uuid = require("uuidv4");
const { StatusCodes } = require('http-status-codes');
const { constant: { emailTemplatePaths } } = require("../constants")
const axios = require('axios');

exports.ERROR = StatusCodes;

exports.getCurrentTimestamp = () => new Date().toISOString();

exports.getRandomString = () => uuid.fromString(crypto.randomBytes(20).toString("hex"));

exports.getRandomOtp = () => {
    const buffer = crypto.randomBytes(2);
    const otp = buffer.readUInt16BE(0);
    return (otp % 9000) + 1000;
};
exports.getOTPExpTime = () => new Date().getTime() + 5 * 60000;

exports.sortDataBasedOnTimestamp = function (j, data) {
    let orderedData = data;
    function getSortedData(i) {
        if (i < data.Items.length) {
            let today = new Date(data.Items[i].created_ts);
            let y = today.getFullYear();
            let m = today.getMonth() + 1;
            let newM = m < 12 ? '0' + m : m;
            let d = today.getDate();
            let newD = d < 10 ? '0' + d : d;
            let h = today.getHours();
            let newH = h < 10 ? '0' + h : h;
            let mt = today.getMinutes();
            let newMt = mt < 10 ? '0' + mt : mt;
            let sec = today.getSeconds();
            let newSec = sec < 10 ? '0' + sec : sec;
            let ts = y + "" + newM + "" + newD + "" + newH + "" + newMt + "" + newSec;
            let timeerds = parseInt(ts);
            data.Items[i].order_id = timeerds;
            i++;
            getSortedData(i);
        } else {
            data.Items.sort(function (a, b) {
                return b.order_id - a.order_id;
            });
            return orderedData;
        }
    }
    getSortedData(j);
    return orderedData;
}

exports.strToLowercase = (str) => str.toLowerCase();

exports.isNullOrEmpty = (str) => !str;

exports.isEmptyObject = (val) => this.isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

exports.isEmptyArray = (val) => val && !val.length;

exports.removeDuplicates = (arr) => [...new Set(arr)];

exports.removeDuplicateFromArrayOfJSON = async (arr) => {
    let tempArr = [];
    arr = await arr.filter((item) => !tempArr.includes(item.name) && tempArr.push(item.name) && item)
    return arr;
}

exports.reverse = (arr) => [...arr].reverse();

exports.extractValue = (arr, prop) => this.removeDuplicates(arr.map(item => item[prop]));

exports.parseStr = (str, replaceStr = "") => this.isNullOrEmpty(str) ? replaceStr : str;

exports.hasText = (str) => !!(str && str.trim() !== "");

exports.hasNoText = (str) => !(str && str.trim() !== "");

// Ex: sortArrayOfObjects(array, "id", "ascending"); direction => 'ascending' | 'descending' | 'none'
exports.sortArrayOfObjects = (arr, keyToSort, direction) => {
    if (direction === 'none') return arr;

    const compare = (objectA, objectB) => {
        const valueA = objectA[keyToSort]
        const valueB = objectB[keyToSort]

        if (valueA === valueB) return 0;

        if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1
        } else {
            return direction === 'ascending' ? -1 : 1
        }
    }

    return arr.slice().sort(compare)
}

exports.sortByDate = (arr, keyToSort) => arr.sort((a, b) => new Date(b[keyToSort]) - new Date(a[keyToSort]))

exports.getExtType = function (file_type) {
    let file_ext;
    switch (file_type) {
        case 'image/jpeg':
            file_ext = '.jpg';
            break;
        case 'text/plain':
            file_ext = '.txt';
            break;
        case 'text/html':
            file_ext = '.html';
            break;
        case 'text/css':
            file_ext = '.css';
            break;
        case 'image/png':
            file_ext = '.png';
            break;
        case 'application/pdf':
            file_ext = '.pdf';
            break;
        case 'application/json':
            file_ext = '.json';
            break;
        case 'application/octet-stream':
            file_ext = '.docx';
            break;
        case 'application/msword':
            file_ext = '.doc';
            break;
        case 'application/vnd.ms-excel':
            file_ext = '.xls';
            break;
        case 'application/vnd.ms-powerpoint':
            file_ext = '.ppt';
            break;

        case "application/zip":
            file_ext = ".zip";
            break;

        case "application/x-zip-compressed":
            file_ext = ".zip";
            break;

        case "multipart/x-zip":
            file_ext = ".zip"
            break;

        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            file_ext = '.xls';
            break;
    }
    return file_ext;
}

exports.getMimeType = function (file_ext) {
    let file_mime;
    switch (file_ext) {
        case '.jpg':
            file_mime = 'image/jpeg';
            break;
        case '.jpeg':
            file_mime = 'image/jpeg';
            break;
        case '.txt':
            file_mime = 'text/plain';
            break;
        case '.html':
            file_mime = 'text/html';
            break;
        case '.css':
            file_mime = 'text/css';
            break;
        case '.png':
            file_mime = 'image/png';
            break;
        case '.pdf':
            file_mime = 'application/pdf';
            break;
        case '.json':
            file_mime = 'application/json';
            break;
        case '.docx':
            file_mime = 'application/octet-stream';
            break;
        case '.doc':
            file_mime = 'application/msword';
            break;
        case '.xls':
            file_mime = 'application/vnd.ms-excel';
            break;
        case '.xlsx':
            file_mime = 'application/vnd.ms-excel';
            break;
        case '.ppt':
            file_mime = 'application/vnd.ms-powerpoint';
            break;

        case '.zip':
            file_mime = 'application/zip';
            break;
    }
    return file_mime;
}

exports.excelDateToJavascriptDate = (excelDate) => new Date(excelEpoc + excelDate * msDay);

exports.convertNumberToAlphabet = (number) => (number + 9).toString(36).toUpperCase();

exports.timeDifference = function (date1, date2) {
    let difference = date1.getTime() - date2.getTime();
    return Math.floor(difference / 1000 / 60 / 60 / 24);
}

exports.range = function (start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};

exports.getDateAndTime = function () {
    let ts = new Date().toISOString();
    let date = ts.split("T")[0];
    let time = ts.split("T")[1].replace("Z", "+00");

    return `${date} ${time}`
}

exports.getDate = function () {
    let ts = new Date().toISOString();
    let date = ts.split("T")[0];
    return `${date}`
}

exports.queryString = (params) => JSON.stringify(params);

exports.getTimeDifferenceInMinutes = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = Math.abs(date1 - date2);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    return differenceInMinutes;
}

exports.getTimeDifferenceInSeconds = (timeStamp, differenceTimeStamp) => {
    const timestamp1 = timeStamp;
    const timestamp2 = differenceTimeStamp;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const differenceInMilliseconds = date1 - date2;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / (1000));

    return differenceInSeconds;
}

exports.generateRandomString = (length = 6, characters = process.env.RANDOM_STRING) => {
    const randomBytes = crypto.randomBytes(length);
    const indices = randomBytes.map(b => b % characters.length);
    const result = indices.map(i => characters[i]).join('');
    return result;
}

exports.getTimestampWithMinutesBuffer = (bufferTime) => {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + bufferTime * 60000);
    // 20 minutes * 60 seconds * 1000 milliseconds

    const futureTimestamp = futureTime.toISOString();
    return futureTimestamp;
}

exports.getIsoString = (time) => new Date(time).toISOString();

exports.fortmatData = (data) => JSON.stringify(data, null, 2);

exports.readFile = async filePath => await fs.promises.readFile(filePath, 'utf8');

exports.formatResponse = (result) => ({ status: StatusCodes.OK, body: JSON.stringify(result) });

exports.formatErrorResponse = (status = 500, errorMessage) => ({ status: status, body: errorMessage });

// Ex: var arr = [1, 2, 3]; var match = [2, 4]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [4, 5]; => returns false.
exports.hasMatch = (arr, match) => arr.some(a => match.some(m => a === m));

// Ex: var arr = [1, 2, 3]; var match = [2, 3]; => returns true.
// Ex: var arr = [1, 2, 3]; var match = [3, 5]; => returns false.
exports.hasEveryMatch = (arr, match) => arr.some(a => match.some(m => a === m)); // TODO  

exports.formatDateWithShortMonthAndDay = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric' });

exports.formatDateWithShortMonthDayAndYear = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' });

exports.formatDateWithShortDayMonthAndYear = (timeStamp) => new Date(timeStamp).toLocaleString('en-us', { day: 'short', month: 'numeric', year: 'numeric' });

exports.getMonthNames = (isShort = true) => {
    let currentDate = new Date();
    return Array.from(new Array(12), (_, monthIdx) => {
        currentDate.setMonth(monthIdx);
        return currentDate.toLocaleString("en-US", { month: isShort ? "short" : "long" })
    });
}

exports.countElement = (marking, year) => {
    let arr = [], regex = new RegExp(year)
    marking.forEach(marking => {
        marking.category.forEach(category => {
            category.description.forEach(description => {
                arr.push(description.markings.find(m => regex.test(m)) ? description.markings.find(m => regex.test(m)) : '');
            });
        });
    });
    const elementCount = {};
    for (const element of arr) {
        if (elementCount[element]) {
            elementCount[element]++;
        } else {
            elementCount[element] = 1;
        }
    }
    return elementCount;
}

exports.getBase64ImageFromURL = async (url) => {

    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    const base64Data = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64');
    return base64Data;
}
exports.formatTimestamptoDateMonthYear = (cosmosTimestampSeconds) => {
    const cosmosTimestampMilliseconds = cosmosTimestampSeconds * 1000;
    const date = new Date(cosmosTimestampMilliseconds);
    const isoString = date.toISOString();
    let day = JSON.stringify(date.getDate(isoString));
    let month = JSON.stringify(date.getMonth(isoString));
    let year = JSON.stringify(date.getFullYear(isoString));
    day = day.length < 2 ? '0' + day : day;
    month = month.length < 2 ? '0' + month : month;
    return `${day}.${month}.${year}`
};

exports.getQuery = (object) => `SELECT * FROM c WHERE c.${Object.keys(object)[0]} = '${Object.values(object)[0]}'`;

exports.getANDQuery = (object) => `SELECT * FROM c WHERE (c.senderId = '${object.senderId}' AND c.receiverId = '${object.receiverId}') OR (c.senderId = '${object.receiverId}' AND c.receiverId = '${object.senderId}')`;

exports.getORQuery = (id) => `SELECT * FROM c WHERE (c.senderId = '${id}' OR c.receiverId = '${id}')`;

exports.getEmailContent = async (bodyTemplatePath) => {
    let emailTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${emailTemplatePaths.mainTemplate}`)
    let bodyTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${bodyTemplatePath}`)
    return emailTemplateString.replace("[BODY]", bodyTemplateString)
}
exports.getWelcomeContent = async (bodyTemplatePath) => {
    let emailTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${emailTemplatePaths.welcomePath}`)
    let bodyTemplateString = await this.readFile(`${emailTemplatePaths.basePath}${bodyTemplatePath}`)
    return emailTemplateString.replace("[BODY]", bodyTemplateString)
}
exports.getRandomIndex = (array) => {
    const randomBytes = crypto.randomBytes(4); // Use 4 bytes for a 32-bit integer
    const index = randomBytes.readUInt32LE(0) % array.length; // Get random index within array length
    return index;
}

// exports.getRandomArrayElements = (array, numElements) => {

//     const shuffledArray = array.slice();

//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//     }

//     return shuffledArray.slice(0, numElements);
// }


function getRandomIndexforArray(max) {
    const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
    const randomInt = randomBytes.readInt32BE(0); // Convert to 32-bit integer
    return randomInt % max; // Get a random index within the desired range
}
  
exports.getRandomArrayElements = (array, numElements) => {
    const shuffledArray = array.slice();
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = getRandomIndexforArray(i + 1); // Use crypto to generate random index
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray.slice(0, numElements);
};

exports.getLatestEducation = async (education) => {
    // console.log({education});
    let isCurrentlyStudying = education.filter((ed) => ed.currentlyStudying === true);
    if (isCurrentlyStudying.length > 0) {
        let education = isCurrentlyStudying[0];
        // return education.schoolName +  education.studyPeriod.startDate + " " + education.studyPeriod.startYear + " to Till now )" + "\n";
        return education.schoolName + "\n" + education.fieldStudy + '\n' + education.studyPeriod.startDate + " " + education.studyPeriod.startYear + " to Till now" + " - " + education.location;

    } else {
        let latestMonth = -1;
        let latestYear = -1;
        let finalJson = null;
        await education.forEach(json => {
            const startMonthIndex = new Date(`${json.studyPeriod.startDate} 1, ${json.studyPeriod.startYear}`).getMonth();
            const endMonthIndex = new Date(`${json.studyPeriod.endDate} 1, ${json.studyPeriod.endYear}`).getMonth();
            const startYear = parseInt(json.studyPeriod.startYear);
            const endYear = parseInt(json.studyPeriod.endYear);

            // Convert months to numbers (e.g., January -> 0, February -> 1, etc.)
            const startDate = new Date(startYear, startMonthIndex);
            const endDate = new Date(endYear, endMonthIndex);

            if (endDate > startDate) {
                if (endYear > latestYear || (endYear === latestYear && endMonthIndex > latestMonth)) {
                    latestMonth = endMonthIndex;
                    latestYear = endYear;
                    finalJson = json;
                }
            } else {
                if (startYear > latestYear || (startYear === latestYear && startMonthIndex > latestMonth)) {
                    latestMonth = startMonthIndex;
                    latestYear = startYear;
                    finalJson = json;
                }
            }
        });

        // return finalJson.schoolName + "(" +finalJson.studyPeriod.startDate + " " + finalJson.studyPeriod.startYear + " to " + finalJson.studyPeriod.endDate + " " + finalJson.studyPeriod.endYear + ")" + "\n"
        return finalJson.schoolName + "\n" + finalJson.fieldStudy + '\n' + finalJson.studyPeriod.startDate + " " + finalJson.studyPeriod.startYear + " - " + finalJson.studyPeriod.endDate + " " + finalJson.studyPeriod.endYear + " - " + finalJson.location;
    }
}
exports.getExperience = async (experience) => {

    return await experience.map((e) => {

        if (e.isCurrentPositionEnd === true) {
            console.log("isCurrentPositionEnd : ");

            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const currentDate = new Date();
            const currentMonth = months[currentDate.getMonth()];
            const currentYear = currentDate.getFullYear();
            console.log(currentMonth, currentYear);
            return e.jobTitle + `\n` + e.companyName + `(` + e.startMonth + " " + e.startYear + ` to ` + (e.isCurrentlyWorking ? `Till now` : currentMonth + " " + currentYear) + `) - ` + e.location + ", " + '\n'
        } else {
            return e.jobTitle + `\n` + e.companyName + `(` + e.startMonth + " " + e.startYear + ` to ` + (e.isCurrentlyWorking ? `Till now` : e.endMonth + " " + e.endYear) + `) - ` + e.location + ", " + '\n'
        }
    })
}
exports.getExpertise = async (expertise) => {
    let modifiedExpertise = ""
    await expertise.forEach((e) => {
        let industryDetails = e.industries + " (";
        industryDetails = industryDetails + e.subIndustries.join(', ')
        modifiedExpertise = modifiedExpertise + industryDetails + "), " + '\n'
    })
    return modifiedExpertise;
}

exports.formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
}

exports.makeLcWithoutSpace = (text) => {
    return text.toLowerCase().replace(/ /g,'');
}