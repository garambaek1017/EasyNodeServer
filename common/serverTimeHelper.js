'use strict';

const DAYTIME_SEC = 86_400;

/*
 * 현재 시간 string으로 가져옴 (yyyy-MM-dd hh:mm:ss:sss);
 */
function getNowTime(dateTime) {

    let d = dateTime;

    if (d === undefined || d == null) {
        d = new Date();
    }

    return toString(d);
}

/*
 현재 시간을 unixTime으로 가져옴, 아니면 입력받은 매개변수를 unixtime으로 변환
 */
function getUnixTime(now) {

    let d = now;

    if (d === undefined || d == null)
        d = new Date();

    return Math.floor(d / 1000);
}

/*
 유닉스 시간 -> dateTime으로 변경해주는 함수
 */
function getUnixTimeToDateTime(unixTime) {
    let dateTime = new Date(unixTime * 1000);
    return toString(dateTime);
}

function toLogDate(){

    let dateTime = new Date();

    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = dateTime.getDate();

    return `${year}${month}${day}`;
}

function toString(dateTime) {

    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = dateTime.getDate();
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let seconds = dateTime.getSeconds();
    let milSec = dateTime.getMilliseconds();

    if (month < 10)
        month = `0${month}`;
    if (day < 10)
        day = `0${day}`;
    if (minutes < 10)
        minutes = `0${minutes}`;
    if (seconds < 10)
        seconds = `0${seconds}`;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milSec}`;
}

module.exports = {
    getNowTime,  // 현재 시간 string 포멧으로 전달
    getUnixTime, // 현재 시간 혹은 입력 받은 시간을 unixtime으로 전달
    getUnixTimeToDateTime, // unix 시간을 datetime으로 변경

    toLogDate,
    DAYTIME_SEC,            // 하루 -> 초
};