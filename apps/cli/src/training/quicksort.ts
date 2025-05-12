function quickSort(arr: number[]) {
  quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper(arr: number[], start: number, end: number) {
  var left = start;
  var right = end;
  var pivotIdx = Math.floor((start + end) / 2);
  var pivot = arr[pivotIdx];

  do {
    while (arr[left] < pivot) {
      left++;
    }
    while (pivot < arr[right]) {
      right--;
    }

    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  } while (left <= right);

  if (left < end) {
    quickSortHelper(arr, left, end);
  }

  if (start < right) {
    quickSortHelper(arr, start, right);
  }
}

function swap(arr: number[], s: number, d: number) {
  let temp = arr[s];
  arr[s] = arr[d];
  arr[d] = temp;
}

const arr = [5, 4, 3, 2, 1];
quickSort(arr);
console.log(arr);
