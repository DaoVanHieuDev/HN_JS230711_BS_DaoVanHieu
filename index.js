// bài 1

let arr = [3, 5, 88, 99, 76, 8, 4, 5, 85, 63];
let max = arr[0];

for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
        max = arr[i]
    }
}
console.log(max);

// bài 2

// let str = " this is A tEst ";  // thử cây này thầy nhé
let str = "heLlo riKkei academy"
str = str.trim();
let arrStr = str.split(" ");

for (let i = 0; i < arrStr.length; i++) {
    let newArr = arrStr[i];
    let firstText = newArr.charAt(0).toUpperCase();
    let resultText = newArr.slice(1).toLowerCase();
    arrStr[i] = firstText + resultText;
}

let newStr = arrStr.join(" ");
console.log(newStr);
let newIndex = newStr.length;
console.log(newIndex);

// bài 3

function SearchDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate(); //  sử dụng hàm new Date 

};
console.log(`Số ngày trong tháng là `, SearchDaysInMonth(8, 2023));  


//bài 4

//cách 1
let arrDown1= [3,25,38,49,12];

for(let i=0;i<arrDown1.length;i++){
    for(let j=i;j<arrDown1.length;j++){
        if( arrDown1[i] < arrDown1[j]){
            let change =arrDown1[i];
            arrDown1[i] =arrDown1[j]
            arrDown1[j]=change;
        }
    }
}
console.log(arrDown1);

//cách 2

let arrDown2 = [3, 25, 38, 49, 12];
arrDown2.sort(
    function(a, b) {
        return b - a;
    }
);
console.log(arrDown2) ;

