

### [compose-tiny](https://github.com/hipstersmoothie/compose-tiny)

一个非常小巧且快速的组合函数。

```code
/**
 * fn 是一个高阶函数，用于从右到左依次执行一组函数（即函数组合，compose）。
 * 它接收任意数量的函数作为参数，并返回一个新的函数。
 * 当调用返回的函数时，传入的参数会依次经过这些函数处理，最终返回结果。
 *
 * 示例：
 *   const add = x => x + 1;
 *   const mul = x => x * 2;
 *   const composed = fn(mul, add); // 先 add 再 mul
 *   console.log(composed(3)); // 输出 8，因为 (3 + 1) * 2 = 8
 */
const fn =
	(...c) => // 接收一组函数 c，作为待组合的函数列表
	(...a) => { // 返回一个新函数，接收初始参数 a
		let i = c.length - 1; // 从最后一个函数开始执行（从右到左）
		a = c[i](...a); // 先用初始参数 a 调用最后一个函数
		while (i--) a = c[i](a); // 依次向前调用每个函数，传入上一个函数的返回值
		return a; // 返回最终结果
	};

```

