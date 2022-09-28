# Task 1

Write function that will multiply two numbers passed as a strings.

1. The arguments are passed as strings.
2. The numbers may be way very largeAnswer should be returned as a string
3. The returned "number" should not start with zeros e.g. 0123 is invalid

result: https://jsfiddle.net/tshnkv1/c8a6k5sq/77/


# Task 2

Simple, remove all the spaces from the string, then return the resultant string. We assume that passed argument will be always string.
String could be long with new line characters.

Example

removeSpace("Hello World")  // should return HelloWorld

result: https://jsfiddle.net/tshnkv1/9guwbkm4/8/

# Task 3

Complete the method/function so that it converts dash/underscore delimited words into camel casing.
The first word within the output should be capitalized  if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case).

Examples

"the-stealth-warrior" gets converted to "theStealthWarrior"
"The_Stealth_Warrior" gets converted to "TheStealthWarrior"

result: https://jsfiddle.net/tshnkv1/n6b35x4j/77/

# Task 4

For a given nonempty string s find a minimum substring t and the maximum number k, such that the entire string s is equal to t repeated k times.

You need to find the substring that can be repeated k times inside this string.

Assumption:
The input string consists of lowercase latin letters.
Expected return:
Your function should return an array [t, k]


Example:
for string
s = "ababab";

s2= "abababacacacac"  // ["ac", 4]


the answer is array with number how many times substring "ab" occur
["ab", 3]

result: https://jsfiddle.net/tshnkv1/xstj0puq/447/

# Task 5

Create a function strCount (takes an object as argument) that will count all string values inside an object. For example:

strCount({
first: "1",
second: "2",
third: false,
fourth: ["anytime",2,3,4],
fifth: null

})

//returns 3

results:
1. https://jsfiddle.net/tshnkv1/gd3mauvf/45/
2. https://jsfiddle.net/tshnkv1/pg06hc7s/125/


# Task 6

Create page like on the screenshot with pure JS (vanilla JS without frameworks)  and use API
https://randomuser.me/api to get information about user. Fill all the fields by data from API.
Use Promises for fetch data.

If you got some problems with repository access just let me know.

result: inside <a>profile</a> folder

# Task 6

Use only JS Date object to manipulate date.

Task TODO:
-  Calendar should display according to timezone where actually user is
- Calendar should give user possibility to switch between Warsaw and New York - when switch, timezone will be applied to chosen date.
-  Don't use external library


result: inside <a>date</a> folder

