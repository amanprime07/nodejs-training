function bruteForce(str1: string, str2: string): number {
  return bruteForceHelper(str1, 0, str2, 0);
}

function bruteForceHelper(
  str1: string,
  i: number,
  str2: string,
  j: number
): number {
  if (i >= str1.length || j >= str2.length) {
    return 0;
  }

  if (str1.charAt(i) === str2.charAt(j)) {
    const r = bruteForceHelper(str1, i + 1, str2, j + 1);
    return 1 + r;
  }

  return Math.max(
    bruteForceHelper(str1, i + 1, str2, j),
    bruteForceHelper(str1, i, str2, j + 1)
  );
}

const memo = new Map<string, number>();
function topDownDp(str1: string, str2: string): number {
  return topDownDpHelper(str1, 0, str2, 0);
}

function topDownDpHelper(
  str1: string,
  i: number,
  str2: string,
  j: number
): number {
  let key = `${i}_${j}`;
  if (memo.has(key)) {
    return memo.get(key) ?? 0;
  }

  if (i >= str1.length || j >= str2.length) {
    return 0;
  }

  if (str1.charAt(i) === str2.charAt(j)) {
    const v = 1 + topDownDpHelper(str1, i + 1, str2, j + 1);
    memo.set(key, v);
    return v;
  }

  const v = Math.max(
    topDownDpHelper(str1, i + 1, str2, j),
    topDownDpHelper(str1, i, str2, j + 1)
  );
  memo.set(key, v);
  return v;
}

function bottomUpDp(str1: string, str2: string): number {
  const dp: number[][] = new Array();
  for (let i = 0; i <= str1.length; i++) {
    dp.push(Array(str2.length + 1).fill(0));
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[str1.length][str2.length];
}

const t1: string = "abcdefghijkl";
const t2: string = "acekl";

let start = performance.now();
let res = bruteForce(t1, t2);
let end = performance.now();
console.log(res);
console.log(`Execution time: ${(end - start).toFixed(3)} ms`);

memo.clear();
start = performance.now();
res = topDownDp(t1, t2);
end = performance.now();
console.log(res);
console.log(`Execution time: ${(end - start).toFixed(3)} ms`);

start = performance.now();
res = bottomUpDp(t1, t2);
end = performance.now();

console.log(res);
console.log(`Execution time: ${(end - start).toFixed(3)} ms`);

