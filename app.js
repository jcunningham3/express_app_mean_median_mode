const express = require('express');
const ExpressError = require('./expressError')
const app = express();

app.use(express.json())

//GET - FIND THE MEAN
app.get('/mean', (req, res, next) => {
  try {
    // if there are no nums in a comma seperated list
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    //convert the string of numbers into an array of integers
    let nums = req.query.nums;

    // make sure we weed out any non numbers
    let initial_array = [];
    let a = [];

    nums = nums.split(',');
    for(let i in nums){
      initial_array[i] = parseInt(nums[i]);
      initial_array.sort();
    }
    for(let i in initial_array){
      initial_array[i] = initial_array[i].toString()
      if(initial_array[i] != 'NaN'){
        a.push(parseInt(initial_array[i]))
      }
    }

    // find_the_mean method
    function find_the_mean(arr){
      let total = 0;
      for(let i in arr){
        total += arr[i];
      }
      let count = arr.length;
      let average = total / count;
      return average;
    }

    //find the mean of the query
    let avg = find_the_mean(a)
    return res.json({mean: avg})
  }
  catch (e) {
    next(e)
  }
})

//GET - FIND THE MEDIAN
app.get('/median', (req, res, next) => {
  try {
    // if there are no nums in a comma seperated list
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    //convert the string of numbers into an array of integers
    let nums = req.query.nums;

    // make sure we weed out any non numbers
    let initial_array = [];
    let a = [];
    nums = nums.split(',');
    for(let i in nums){
      initial_array[i] = parseInt(nums[i]);
      initial_array.sort();
    }
    for(let i in initial_array){
      initial_array[i] = initial_array[i].toString()
      if(initial_array[i] != 'NaN'){
        a.push(parseInt(initial_array[i]))
      }
    }

    // find_the_median method
    function find_the_median(arr1) {
        var concat = arr1;
        concat = concat.sort(
            function (a, b) { return a - b });

        console.log(concat);
        var length = concat.length;

        if (length % 2 == 1) {

            // If length is odd
            console.log(concat[(length / 2) - .5])
            return concat[(length / 2) - .5]

        }
        else {
            console.log((concat[length / 2]
                + concat[(length / 2) - 1]) / 2);

            return (concat[length / 2]
                + concat[(length / 2) - 1]) / 2;
        }
    }


    let the_median = find_the_median(a)

    return res.json({median: the_median})
  }
  catch (e) {
    next(e)
  }
})


//GET - FIND THE MODE
app.get('/mode', (req, res, next) => {
  try {
    // if there are no nums in a comma seperated list
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    //convert the string of numbers into an array of integers
    let nums = req.query.nums;

    // make sure we weed out any non numbers
    let initial_array = [];
    let a = [];
    nums = nums.split(',');
    for(let i in nums){
      initial_array[i] = parseInt(nums[i]);
      initial_array.sort();
    }
    for(let i in initial_array){
      initial_array[i] = initial_array[i].toString()
      if(initial_array[i] != 'NaN'){
        a.push(parseInt(initial_array[i]))
      }
    }

    // find_the_mode method
    function find_the_mode(numbers) {
      // as result can be bimodal or multi-modal,
      // the returned result is provided as an array
      // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
      var modes = [], count = [], i, number, maxIndex = 0;

      for (i = 0; i < numbers.length; i += 1) {
          number = numbers[i];
          count[number] = (count[number] || 0) + 1;
          if (count[number] > maxIndex) {
              maxIndex = count[number];
          }
      }

      for (i in count){
        if (count.hasOwnProperty(i)) {
          if (count[i] === maxIndex) {
              modes.push(Number(i));
          }
        }
        return modes;
      }
    }

    // find the mode of array a
    let the_mode = find_the_mode(a)
    return res.json({mode: the_mode})
  }
  catch (e) {
    next(e)
  }
})





/*
  ERROR HANDLING ---------------------------------------------------------------
*/

// DEFAULT 404 ERROR
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  // set defaults
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert users
  return res.status(status).json({
    error: {message, status}
  })
})

//  SERVER LISTENER
app.listen(3000, function(){
  console.log("Server running on port 3000")
})
