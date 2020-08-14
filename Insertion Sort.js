/* 
Insertion Sort
*/


//arr of number randomly postion
const arr =[0,5,3,2,5,1,1,3,9,4,10]

//// small value at a[-1] =-infinit
arr[-1]=-999

for(let i=1;i<arr.length;i++){
  let temp = arr[i]
  let prev=i-1
  while(arr[prev]>=temp){
    arr[prev+1]=arr[prev]
    prev--
  }
  arr[prev+1]=temp 
}

console.log(arr)


// Time Complexity: O(n^2)
