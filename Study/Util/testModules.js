const { child } = require("winston");
const logHelper = require("./logHelper").getInstance();

function MotherA() {

  logHelper.debug('start MotherA');

  let usn = 1;
  let name = "garam";

  let childResult = true;

  childB(usn, name, function (_result) {
    if (_result == true) {
      usn = 2;
      name = "summer";

      logHelper.debug(`result is false, ${usn}, ${name}`);

      childResult = _result;
      return;
    }

    logHelper.debug(`child name : ${name}, usn : ${usn}`);
  });

  if (childResult) {
    logHelper.debug("i dont wannt this line..");
    logHelper.debug("this is mother A finish line");
  }
}

async function childB(__usn, __name, callback) {
  // 비동기 코드라 이게 5초후에 실행됨
  setTimeout(function () {
    logHelper.debug(`child B usn :${__usn}, name ${__name}`);
    callback(true);
  }, 5000);
}


function MotherB(){

  console.debug("mother B start line");       // 1번 출력 

    (async () => {
        try {
          const data = await fetchData(); // 가상의 비동기 데이터 가져오기 함수
          logHelper.debug("데이터를 성공적으로 가져왔습니다:", data);  // 4번 출력 
        } catch (error) {
          console.debug("데이터를 가져오는 동안 오류가 발생했습니다:", error);
        }
      })();

    console.debug("mother B finish line"); // 2번 출력
}



async function fetchData() {
  // 가상의 비동기 작업을 시뮬레이션하기 위한 setTimeout 사용
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random();
      logHelper.debug(`${randomValue}`);
      if (randomValue < 0.1) {
        logHelper.debug('데이터 전송 시작 '); // 3번 출력 
        resolve(randomValue);
      } else {
        reject(new Error("데이터를 가져오는 중에 오류 발생"));
      }
    }, 5000);
  });
}


function asyncFunction1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Async Function 1');
      resolve('Result 1');
    }, 1000);
  });
}

function asyncFunction2(result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Async Function 2');
      // 두 번째 비동기 함수에서 에러 발생
      reject(new Error('Error in Async Function 2'));
    }, 1000);
  });
}

function asyncFunction3(result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Async Function 3');
      resolve(result + ' Result 3');
    }, 1000);
  });
}

// 콜백 헬을 피하기 위한 async await promise 기술 
async function MotherC() {
  try {
    const result1 = await asyncFunction1();
    const result2 = await asyncFunction2(result1); // 두 번째 비동기 함수에서 에러 발생
    const result3 = await asyncFunction3(result2);

    console.log('Final Result:', result3);
  } catch (error) {
    console.error('Error:', error.message); // 에러 메시지 출력
  }
}

module.exports = {
  MotherA,
  MotherB,
  MotherC
};
