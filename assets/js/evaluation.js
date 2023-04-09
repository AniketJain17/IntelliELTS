async function generateText(prompt) {
  const url = 'https://api.openai.com/v1/completions';

  const data = `{
    "model": "text-davinci-003",
    "prompt": "${prompt.replace(/\n/g, '\\n')}",
    "temperature": 0.2,
    "max_tokens": 1000,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  }`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: data,
  });

  const scoreRegex = /([0-9])/;
  const json = await response.json();
  const match = json.choices[0].text.match(scoreRegex);

  if (match) {
    const score = parseFloat(match[1]);
    if (score < 4.0) {
      return "3.5";
    } else if (score < 5.0) {
      return "4.0";
    } else if (score < 5.5) {
      return "4.5";
    } else if (score < 6.0) {
      return "5.0";
    } else if (score < 6.5) {
      return "5.5";
    } else if (score < 7.0) {
      return "6.0";
    } else if (score < 7.5) {
      return "6.5";
    } else if (score < 8.0) {
      return "7.0";
    } else if (score < 8.5) {
      return "7.5";
    } else {
      return "8.0 or higher";
    }
  } else {
    return "Score not found in generated text";
  }
}

async function getIeltsScore() {
  const essay=document.getElementById('answer').value;
  console.log(essay);
  var prompt= "Evaluate the following essay basis IELTS, and give an IELTS score :" + essay;
    console.log(prompt);
  console.log(prompt);
  var score = await generateText(prompt);
  return score;
}

async function IELTS() {
  var score1 = await getIeltsScore();
  document.getElementById("scoreDiv").textContent = score1;
}

// give numeric score for Coherence & Cohesion
async function getCoherenceCohesionScore() {
  const essay=document.getElementById('answer').value;
  var prompt= "Evaluate the following essay basis IELTS, and give numeric score for Coherence & Cohesion : "+ essay;
    console.log(prompt);
  var score = await generateText(prompt);
  return score;
}
async function CoherenceCohesion() {
  var score1 = "Coherence and Cohesion :"+ await getCoherenceCohesionScore() + "/10";
  document.getElementById("CoherenceCohesion").textContent = score1;
}


// give numeric score for Ideas
async function getideasScore() {
  const essay=document.getElementById('answer').value;
  var prompt= "Evaluate the following essay basis IELTS, and give numeric score for ideas : "+essay;
    console.log(prompt);
  var score = await generateText(prompt);
  return score;
}
async function ideas() {
  var score1 = "Ideas Score :"+ await getCoherenceCohesionScore() + "/10";
  document.getElementById("IdeasScore").textContent = score1;
}


// give numeric score for Grammatical Range & Accuracy
async function getGrammaticalAccuracyScore() {
  const essay=document.getElementById('answer').value;
  var prompt= "Evaluate the following essay basis IELTS, and give numeric score for Grammatical Range & Accuracy : "+essay;
    console.log(prompt);
  var score = await generateText(prompt);
  return score;
}
async function GrammaticalAccuracy() {
  var score1 = "Grammatical Range : "+ await getGrammaticalAccuracyScore() + "/10";
  document.getElementById("GrammaticalRangeAccuracy").textContent = score1;
}


// give numeric score for Lexical Resource
async function getLexicalResource() {
  const essay=document.getElementById('answer').value;
  var prompt= "Evaluate the following essay basis IELTS, and give numeric score for Lexical Resource : "+essay;
    console.log(prompt);
  var score = await generateText(prompt);
  return score;
}
async function LexicalResource() {
  var score1 = "Lexical Resource : "+ await getLexicalResource() + "/10";
  document.getElementById("LexicalResource").textContent = score1;
}


const AnalyseTheEssay = document.getElementById("AnalyseTheEssay");
AnalyseTheEssay.addEventListener("click", async function(){
  await IELTS();
  await CoherenceCohesion();
  await ideas();
  await LexicalResource();
  await GrammaticalAccuracy();
});










