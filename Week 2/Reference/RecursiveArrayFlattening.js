const nestedData = [2, [7, 8]];

/**
 * @param {Array} arr
 * @param {number} depth
 */
function customFlat(arr, depth = 1) {
  // Your recursive implementation here

  let result=[];

  for (let item of arr){

    if(Array.isArray(item) && depth>0){

      result.push(...customFlat(item,depth-1));

    }else{
      result.push(item)
    }

  }
  return result;
}

console.log(customFlat(nestedData, 1)); 
console.log(customFlat(nestedData, 2)); 
console.log(customFlat(nestedData, Infinity)); 