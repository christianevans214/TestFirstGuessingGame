/*Things to do: Design the buttons and input form a bit more if you have time. Make it so that when you click enter, it submits the answer. WHOLE THING needs to be refactored! Looks not the best!*/

$(document).ready(function() {
  $(".link").click(function() {
    $(".box").addClass("grow");
    $('.link').addClass("playbtngone")
    $('.gameboard').addClass("appear");
    Game();
  });

  function Game() {
    var guesses = 5;
    var guessArr = [];
    var numberToGuess = Math.ceil(Math.random() * 100);
    $('#Output').html("Number of guesses: " + guesses);

    //submit button
    $('#submitbtn').click(function() {
      var num = $('input[name=guess]').val();
      if (num == numberToGuess) {
        $('#message').html("You win!");
        return finalMessageAppear();
      } else {
        var check = numCheck(num, guessArr);
        if (guesses > 1) {
          if (check === "validGuess") {
            $("#Guesses").append("<li>" + answer(num, numberToGuess, guesses, guessArr) + "</li>");
            guessArr.push(num);
            guesses = guesses - 1;
            $('#Output').html("Number of guesses: " + guesses);
          } else if (check === "alreadyGuessed") {
            $("#errMessage").html("You've already guessed that.");
            $(".errorMessage").fadeIn().delay(1000).fadeOut('slow');

          } else if (check === "invalidGuess") {
            $("#errMessage").html("Please input a number between 1 & 100.")
            $(".errorMessage").fadeIn().delay(1000).fadeOut('slow');
          }
        } else {
          $('#message').html("You Lose.")
          finalMessageAppear();
        }
      }
      $('input').val("");
    });
    //reset button
    $(document).on('click', '#reset', function() {
      resetFun();
    });
    //hint button
    $(document).on('click', '#hint', function() {
        $('input').val("");
        $('#Guesses').empty();
        $('#message').html("The correct answer is " + numberToGuess + ".");
        finalMessageAppear();

      })
      // play again button
    $(document).on('click', '#playAgain', function() {
      resetFun();
      finalMessageAppear();

    });

    //The things that make this game tick.
    //function to reset the boardgame
    var resetFun = function() {
      $('input').val("");
      guesses = 5;
      numberToGuess = Math.ceil(Math.random() * 100);
      guessArr = [];
      $('#Guesses').empty();
      $('#Output').html("Number of guesses: " + guesses);
      return;
    };
    //function to provide a hot/cold answer
    var answer = function(number, guessNum, guess, numArr) {
      var hotCold = "";
      var diffNewNum = Math.abs(number - guessNum);
      if (guess === 5) {
        if (diffNewNum > 60) hotCold = "ice cold";
        else if (diffNewNum > 40) hotCold = "cold";
        else if (diffNewNum > 20) hotCold = "cool";
        else if (diffNewNum > 10) hotCold = "warm";
        else if (diffNewNum > 5) hotCold = "hot";
        else if (diffNewNum > 0) hotCold = "very hot";
      } else {
        var diffPrevNum = Math.abs(numArr[numArr.length - 1] - guessNum);
        if (diffNewNum < diffPrevNum) hotCold = "hotter";
        else if (diffNewNum > diffPrevNum) hotCold = "colder";
        else if (diffNewNum == diffPrevNum) hotCold = "just as hot"
      }
      if (number - guessNum > 0) return number + " is " + hotCold + ", guess lower.";
      else if (number - guessNum < 0) return number + " is " + hotCold + ", guess higher.";
    };
    //function to check if number is integer and also not previously guessed
    var numCheck = function(num, numArr) {
      var count = 0
      for (var i in numArr) {
        if (numArr[i] == num) return "alreadyGuessed";
      }
      if (num <= 100 && num > 0 && num % 1 === 0) return "validGuess";
      else return "invalidGuess";
    };

  };

  var finalMessageAppear = function() {
    $('.gameboard').toggleClass('disappear');
    $(".finalMessage").toggleClass('appear');
  };

});
