function getConsoleArguments() {
  return process.argv.slice(2);
}

function getArgumentOrExitWithErrorAndIndex(errorString, index) {
  const arguments = getConsoleArguments()
  let arg;
  if (arguments[index]){
    arg = arguments[index];
  } else {
    console.error(errorString);
    process.exit();
  }
  return arg;
}

function getOptionalArgumentWithIndex(index) {
  const arguments = getConsoleArguments();
  return arguments[index];
}

function readFileDataWithUrl(inputUrl){
  let fileData;
  try {
    fileData = fs.readFileSync(inputUrl, 'utf8');
  } catch (error) {
    console.log('errore nella lettura del file\n', error.message);
    process.exit();
  }
  return fileData;
}

function getCharNumber(string) {
  return string.length;
}

function getCharNumberWithoutSpaces(string) {
  return getCharNumber(string.replaceAll(' ', ''));
}

function cleanString(string) {
  const cleanedString = string.replaceAll("'", ' ')
                              .replaceAll('.', '')
                              .replaceAll(',', '')
                              .replaceAll('!', '');
  return cleanedString
}

function createArrayOfWordsFromString(string) {
  const cleanedString = cleanString(string);
  return cleanedString.split(' ');
}

function getWordNumber(string) {
  const wordArray = createArrayOfWordsFromString(string);
  return wordArray.length;
}

function getOccurrenciesWordInString(searchWord, string) {
  let occurence = 0;
  const wordArray = createArrayOfWordsFromString(string);
  for (const word of wordArray) {
    if (word.toLowerCase() === searchWord.toLowerCase()) {
      occurence++;
    }
  }
  return occurence;
}

function createReportString(originalText, searchWord, charNumber, noSpacesCharNumber, wordNumber, occurrenceString) {
  occurrenceString = '';
  if (occurence>=0){
    occurrenceString = 'la parola "' + searchWord + '" appare ' + occurence + (occurence === 1 ? ' volta' : ' volte');
  }
  const newFileData = originalText + 
                    '\n' +
                    '\n' +
                    'numero di caratteri: ' + charNumber + '\n' +
                    'numero di caratteri spazi esclusi: ' + noSpacesCharNumber + '\n' +
                    'numero di parole: ' + wordNumber + '\n' +
                    occurrenceString;
return newFileData;
}

function writeReportInFile(outputUrl, report) {
  try {
    fs.writeFileSync(outputUrl, report);
  } catch (error) {
    console.log('errore nella scrittura del file\n', error.message);
    process.exit();
  }
}


const fs = require('fs');

const inputUrl = getArgumentOrExitWithErrorAndIndex("devi inserire l'input url", 0)
const outputUrl = getArgumentOrExitWithErrorAndIndex("devi inserire l'output url", 1)

let searchWord = getOptionalArgumentWithIndex(2)

let fileData = readFileDataWithUrl(inputUrl);

const charNumber = getCharNumber(fileData);

const noSpacesCharNumber = getCharNumberWithoutSpaces(fileData);

const wordNumber = getWordNumber(fileData);

let occurence = -1;
if (searchWord) {
  occurence = getOccurrenciesWordInString(searchWord, fileData)
}

const report = createReportString(fileData,searchWord,charNumber,noSpacesCharNumber,wordNumber,occurence)

writeReportInFile(outputUrl, report)