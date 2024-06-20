module?.exports &&= Math

###*
 * @return wheter a Number x, has the same sign as another Number, y.
 * @example
 * Math.samesign(1,2)
 * //-> true
 * Math.samesign(-3, 4)
 * //-> false
 * @test
 * Math.samesign(5, 6)
 * //-> false
 * Math.samesign(-7, -8)
 * //-> true
 ###
Math.samesign = (x, y) -> (x >= 0) != (y < 0)

###*
 * @return {Number} a copy of Number x with the same sign of Number y.
 * @example
 * Math.copysign(1, -2)
 * //-> -1
 * @test
 * Math.copysign(-3, 4)
 * //-> 3
 * Math.copysign(5, 6)
 * //-> 5
 * Math.copysign(-7, -8)
 * //-> -7
 ###
Math.copysign = (x, y) -> if Math.samesign x, y then x else -x

###*
 * @return {Number} sum of two Numbers.
 * @example
 * Math.add(1, 2)
 * //-> 3
 * @test
 * Math.add('three', 4)
 * //-> NaN
 ###
Math.add = (a, b) -> (+a) + (+b)

###*
 * @return {Number} sum of an Array of Numbers.
 * @example
 * Math.sum([1, 2, 3])
 * //-> 6
 ###
Math.sum = (nums) -> nums.reduce Math.add

###*
 * @return {Number} product of two Numbers.
 * @example
 * Math.(2, 3)
 * //-> 6
 ###
Math.mul = (a, b) -> a * b

###*
 * @return {Number} product of an Array of Numbers.
 * @example
 * Math.prod(2, 3, 4)
 * //-> 24
 ###
Math.prod = (nums) -> nums.reduce Math.mul

###*
 * @return {Number} factorial of a Number.
 * @example
 * Math.factorial(4)
 * //-> 24
 * @test
 * Math.factorial(3)
 * //-> 6
 * Math.factorial(2)
 * //-> 2
 * Math.factorial(1)
 * //-> 1
 * Math.factorial(0)
 * //-> 1
 * Math.factorial(-1)
 * //-> Infinity
 ###
Math.factorial = (n) ->
    if n < 0 then Infinity
    else if n == 0 then 1
    else Math.prod.apply null, [1..n]

###*
 * Greatest Common Multipler
 * @return {Number} greatest common multipler of two Numbers.
 * @example
 * Math.gcd(493, 289)
 * //-> 17
 * @test
 * Math.gcd(493, -289)
 * //-> 17
 ###
Math.gcd = (a, b) -> [a, b] = [b, a % b] while b; a

###*
 * Least Common Multiplier
 * @return {Number} least common multiplier of two numbers.
 * @example
 * Math.lcm(4, 12)
 * //-> 12
 * @test
 * Math.lcm(6, 7)
 * //-> 42
 ###
Math.lcm = (a, b) -> a / Math.gcd(a, b) * b
