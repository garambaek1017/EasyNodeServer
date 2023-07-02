var result = 0;

console.time('duration_sum');
for(var i = 1; i<= 1000; i++)
{
    result += i;
}

console.timeEnd('duration_sum');

console.log("1부터 100까지 다 더한 결과물 : %d", result);

console.log("현재 실행한 파일의 이름 : %s",__filename);

console.log("현재 실행한 퍼알의 패스 : %s",__dirname);

var Person = {name:"아이즈원", member:"12"};
console.dir(Person);



