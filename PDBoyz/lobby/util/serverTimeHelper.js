require('date-utils');

//$$ 현재 시간
function getTimeStr(dateTime) {

    let d = dateTime;

    if (d === undefined || d == null) {
        d = new Date();
    }
    return d.toFormat('YYYY-MM-DD HH24:MI:SS');
}

//$$ 밀리세컨드 타임 표시
function getMilliSecTimeStr(dateTime) {

    let d = dateTime;

    if (d === undefined || d == null) {
        d = new Date();
    }

    return d.toFormat('YYYY-MM-DD HH24:MI:SS.') + d.getMilliseconds().toString();
}

//$$ unixTime 리턴
function getUnixTime(now) {

    let d = now;

    if (d === undefined || d == null)
        d = new Date();

    return Math.floor(d / 1000);
}

function getUnixTimeGetTime(now){
    let d = now;

    if (d === undefined || d == null)
        d = new Date();

    return Math.floor(d.getTime() / 1000);
}


//$$ 시간 차이 계산
function getTimeGap(start, end) {

    if (start === undefined)
        throw new Error('start time is undifined');
    if (end === undefined)
        throw new Error('end time is undifined');

    return end - start;
}

function getTimeForFilename(dateTime)
{
    let d = dateTime;

    if (d === undefined || d == null) {
        d = new Date();
    }

    return d.toFormat('YYYY-MM-DD');
}

module.exports = {
    getTimeStr,
    getMilliSecTimeStr,
    getUnixTime,
    getUnixTimeGetTime,
    getTimeGap,
    getTimeForFilename,
};