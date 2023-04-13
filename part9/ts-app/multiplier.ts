interface MultiplyValues {
  value1: number;
  value2: number;
}

//The parseArguments function takes an array of strings as an argument and returns an object that conforms to the MultiplyValues
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}


//parseArguments function is called with process.argv (an array containing command-line arguments) 
//to the parseArguments function that excpects an array of strings as an argument
try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}