var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat.push(products.filter(function(pizza){
          if (pizza.ingredients.indexOf("mushrooms")== -1 && pizza.containsNuts == false) return pizza;
      }));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    // was I supposed to do something more here?
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(3, 1000).reduce(function(acum, x){
      if (x % 3 === 0 || x % 5 === 0) {
        acum += x;
      }
      return acum
    });  
    // sum was off by 1 number if I started the range from 1. Why is that?
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    ingredientCount = _.chain(products).map(function(product){
      return product.ingredients;
    }).flatten().reduce(function(counter, ingredient){
        counter[ingredient]= counter[ingredient] ? counter[ingredient] + 1 : 1;
        return counter;
    }, {}).value();
      

    /* chain() together map(), flatten() and reduce() */
   //expect(ingredientCount).toBe();
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  //helper function
function isPrime(num){
  if (num < 2) return false;
  if (num ==2 ) return true;
   
  return _.range(2, (Math.sqrt(num)+1)).every(function(x){return num % x != 0});

}

  it("should find the largest prime factor of a composite number", function () {
  //Hopefully I understood the question correctly https://projecteuler.net/problem=3
      function primeFactor(num){
        return _.range(2, (num/2)).filter(function(x){return isPrime(x) && num % x === 0}).pop();
      }

      expect(29).toBe(primeFactor(13195));
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function largestPalindrome(){
      var largest= 0;
      for (var i = 999;i>0;i--){
        for (var y = 999;y>0;y--){
          if (String(y*i) === String(y*i).split('').reverse().join('') && y*i > largest) {
            largest = y*i;
          }  
        }
      }
      return largest;
    }

    expect(906609).toBe(largestPalindrome())
  });


  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
        //I'm pretty sure I am overcomplicating this problem
        //1) List 1-20 as a product of primes
            //•this could work recursively, by factoring a number and then recursively calling it down to it's lowest prime factor
        //2) find the highest exponents of each prime factor
            //• I would need to log how many times that lowest factor needs to be multiplied by itself and then compare the number 
        //3) multiply them together

    //this recursive function took me forever to figure out, I'm still not quite sure why my earlier solutions returned such strange things
    function recursivePrimes(num, arr, orig){
      for (var i = 2; i <= num; i++){
        if (num % i === 0 && (typeof arr === 'undefined' || arr.reduce(function(acum, x){return acum *= x}) !== orig )){
          if (isPrime(i)) {
            if (typeof arr === 'undefined') {
              arr = [];
              var orig = num;
            }
            arr.push(i);
          }
          recursivePrimes(num / i, arr, orig)
        }
      }
      return arr.reduce(function(counter, num){
        counter[num]= counter[num] ? counter[num] + 1 : 1;
        return counter;
      }, {});
    }


    function divisible(range){
      var multiples = {};
      nums = _.range(2,range + 1);

      var products = nums.map(function(num){
        return recursivePrimes(num);
      });

      for (var i = 0; i < products.length; i++){
        for (var key in products[i]){
          if (key in multiples){
            if (Math.pow(+key, products[i][key]) > multiples[key]){
              multiples[key] = Math.pow(+key, products[i][key])    
            }  
          }else{
            multiples[key] = Math.pow(+key, products[i][key])
          }
        }
      } 
      return _.reduce(multiples, function(acum, x){return acum *= x });

    }


    expect(232792560).toBe(divisible(20));

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
    function squares(length){
      var sumofsq= 0
      var squareofs = 0;
      for (var i=1;i <= length; i++){
        sumofsq += i*i
      }
      for (var i=1;i <= length; i++){
        squareofs += i;
      }
      squareofs *= squareofs
      return squareofs- sumofsq;
    }

    expect(2640).toBe(squares(10))
  });


  it("should find the 10001st prime", function () {

    function primer(rank){
      var primes = [2];
      for (var i = 3; primes.length < rank; i++){
        if (isPrime(i)){
          primes.push(i);
        }
      }
      //console.log(primes)
      return primes.pop();
    }


    expect(104743).toBe(primer(10001))
  });
});


