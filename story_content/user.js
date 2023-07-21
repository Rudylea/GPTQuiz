function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5b9tEjtgmrV":
        Script1();
        break;
      case "6c8o0y4p8Im":
        Script2();
        break;
      case "5qQu7YgOYjn":
        Script3();
        break;
      case "6OecuJE1jxR":
        Script4();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
const choixQuiz = player.GetVar("choixDeTheme");
const nomDuJoueur = player.GetVar("nomDeJoueur");
const req_writeup = 
"je veux que tu crées 1 question de quiz sur le thème :" + choixQuiz + "dans le cadre des missions des secrétaires assistantes en entreprise.\\nTu dois fournir les éléments suivants pour la question de quiz :\\n1) L'énoncé de la question.\\n2) La réponse correcte.\\n3) choix de réponse incorrecte n°1.\\n4) choix de réponse incorrecte n°2.\\n5) choix de réponse incorrecte n°3.\\n6) Un feedback positif adressé à " + nomDuJoueur + " en le tutoyant si la bonne réponse a été choisie.\\n7) Un feedback bienveillant et constructif adressé à " + nomDuJoueur + " en le tutoyant si la mauvaise réponse a été choisie.\\nIl est très important que ta réponse soit donnée en une seule chaîne de caractères\\n<suggestion>Il est primordial que ta réponse comporte seulement 7 éléments, ni plus ni moins, énoncés de la question inclu. </suggestion>\\n Tu ne dois en aucun cas sauter de lignes.\\nUtilise le symbole | pour séparer les 7 éléments qui composent ta réponse.\\nIl ne faut pas que tu ajoutes de paragraphes à ta réponse.\\nN'ajoute pas de titres, sous-titres ou d’introduction aux 7 éléments composant ta réponse.\\nTu dois absolument suivre ces instructions à la lettre pour les deux questions.\\nLimite ta réponse à 300 tokens.\\nVoici la structure que ta réponse doit suivre :\\nénoncé de la question affiché sans introduction et sans les instructions.|La réponse correcte|la réponse incorrecte n°1|la réponse incorrecte n°2|la réponse incorrecte n°3|Feedback positif adressé à " + nomDuJoueur + " en le tutoyant si la bonne réponse a été choisie.|Feedback constructif et bienveillant adressé à " + nomDuJoueur + " en le tutoyant si une mauvaise réponse a été choisie.";

var messages = []

var system_message = {role: "system", content: "Tu t'appelles Christine Lourman tu es la tutrice des secrétaires assistantes stagiaires chez ABLogistique. Tu crées des quiz spécialisés et exigeants sur les missions laborales des secrétaires assistantes."};
var choix_quiz = {role: "user", content: `${req_writeup}` };

messages.push(system_message);
messages.push(choix_quiz);

async function openai_req() {
  fetch('http://127.0.0.1:5000/letschat', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ messages })
    })

   .then(res => res.json())
   .then(data => {
    console.log(data.data.choices[0].message.content);
    const expressionReguliere = /en\stant\sque\schatbot/gi;
    const expressionReguliere2 = /en\stant\sque\sintelligence\sartificielle/gi;
    
    var gpt_content = data.data.choices[0].message.content;
    gpt_content = gpt_content.trim();
    
    if(expressionReguliere.test(gpt_content) || expressionReguliere2.test(gpt_content)){
    player.SetVar("validation", "ERROR");
    }
    
    player.SetVar("gptQuiz",gpt_content);
  })
  .catch (error=>{
    console.error('Error fetching data:', error);
    player.SetVar("validation", "ERROR");
  })
};

openai_req();

}

function Script2()
{
  var sl = GetPlayer();
var response_text = sl.GetVar("gptQuiz");

response_text = response_text.replace(/^\n\n/,'');
response_text = response_text.replace(/\n\n/g,'|');
response_text = response_text.replace(/\n/g,'|');

const q1Array = response_text.split("|");
console.log(q1Array);

sl.SetVar("Q1Question", q1Array[0]);
sl.SetVar("Q1reponseA", q1Array[1]);
sl.SetVar("Q1reponseB", q1Array[2]);
sl.SetVar("Q1reponseC", q1Array[3]);
sl.SetVar("Q1reponseD", q1Array[4]);
sl.SetVar("Q1CorrectFeedback", q1Array[5]);
sl.SetVar("Q1IncorrectFeedback", q1Array[6]);


}

function Script3()
{
  var player = GetPlayer();
const choixQuiz = player.GetVar("choixDeTheme");
const nomDuJoueur = player.GetVar("nomDeJoueur");
const req_writeup = 
"je veux que tu crées 1 question de quiz sur le thème :" + choixQuiz + "dans le cadre des missions des secrétaires assistantes en entreprise.\\nTu dois fournir les éléments suivants pour la question de quiz :\\n1) L'énoncé de la question.\\n2) La réponse correcte.\\n3) choix de réponse incorrecte n°1.\\n4) choix de réponse incorrecte n°2.\\n5) choix de réponse incorrecte n°3.\\n6) Un feedback positif si la bonne réponse a été choisie.\\n7) Un feedback bienveillant et constructif si la mauvaise réponse a été choisie.\\nIl est très important que ta réponse soit donnée en une seule chaîne de caractères\\n<suggestion>Il est primordial que ta réponse comporte seulement 7 éléments, ni plus ni moins, énoncés de la question inclu. </suggestion>\\n Tu ne dois en aucun cas sauter de lignes.\\nUtilise le symbole | pour séparer les 7 éléments qui composent ta réponse.\\nIl ne faut pas que tu ajoutes de paragraphes à ta réponse.\\nN'ajoute pas de titres, sous-titres ou d’introduction aux 7 éléments composant ta réponse.\\nTu dois absolument suivre ces instructions à la lettre pour les deux questions.\\nLimite ta réponse à 300 tokens.\\nVoici la structure que ta réponse doit suivre :\\nénoncé de la question affiché sans introduction et sans les instructions.|La réponse correcte|la réponse incorrecte n°1|la réponse incorrecte n°2|la réponse incorrecte n°3|Feedback positif si la bonne réponse a été choisie.|Feedback constructif et bienveillant si une mauvaise réponse a été choisie.";

var messages = []

var system_message = {role: "system", content: "Tu t'appelles Christine Lourman tu es la tutrice des secrétaires assistantes stagiaires chez ABLogistique. Tu crées des quiz spécialisés et exigeants sur les missions laborales des secrétaires assistantes."};
var choix_quiz = {role: "user", content: `${req_writeup}` };

messages.push(system_message);
messages.push(choix_quiz);

async function openai_req() {
  fetch('http://127.0.0.1:5000/letschat', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ messages })
    })

   .then(res => res.json())
   .then(data => {
    console.log(data.data.choices[0].message.content);
    const expressionReguliere = /en\stant\sque\schatbot/gi;
    const expressionReguliere2 = /en\stant\sque\sintelligence\sartificielle/gi;
    
    var gpt_content = data.data.choices[0].message.content;
    gpt_content = gpt_content.trim();
    
    if(expressionReguliere.test(gpt_content) || expressionReguliere2.test(gpt_content)){
    player.SetVar("validation", "ERROR");
    }
    
    player.SetVar("gptQuiz",gpt_content);
  })
  .catch (error=>{
    console.error('Error fetching data:', error);
    player.SetVar("validation", "ERROR");
  })
};

openai_req();

}

function Script4()
{
  var sl = GetPlayer();
var response_text = sl.GetVar("gptQuiz");

response_text = response_text.replace(/^\n\n/,'');
response_text = response_text.replace(/\n\n/g,'|');
response_text = response_text.replace(/\n/g,'|');

const q1Array = response_text.split("|");
console.log(q1Array);

sl.SetVar("Q1Question", q1Array[0]);
sl.SetVar("Q1reponseA", q1Array[1]);
sl.SetVar("Q1reponseB", q1Array[2]);
sl.SetVar("Q1reponseC", q1Array[3]);
sl.SetVar("Q1reponseD", q1Array[4]);
sl.SetVar("Q1CorrectFeedback", q1Array[5]);
sl.SetVar("Q1IncorrectFeedback", q1Array[6]);


}

