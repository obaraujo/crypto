const version = "0.1.3 Beta"

document.querySelector('#root').innerHTML = `
<div class="header">
<img src="./assets/img/logo_stagon.png" alt="Logo da stagon" width="50">
<h1>Stagon Crypto</h1>
<strong>v${version}</strong>
</div>
<div class="container">
<label for="code">Digite o código de autenticação:</label>
<input type="number" id="code" autocomplete="off" placeholder="xxxxxx">

<label for="field">Digite o texto:</label>
<textarea type="text" id="field" autocomplete="off" placeholder="seu texto vai aqui" wrap="hard"></textarea>
<button id="generate">Gerar</button>
</div>
<div class="container">
<label for="field">Veja a saída ou coloque o código para validar</label>
<input type="text" id="field_exit" autocomplete="off" placeholder="Aqui onde irá sair seu texto criptografado!">
<div><button id="validate">Validar</button>
  <button id="copy">Copiar</button>
</div>
</div>`
function CountingVogais(term) {
  const vogais = ["A", "E", "I", "O", "U"];
  let numVogais = 0;
  const arrayTerm = term.split("");
  for (letra in arrayTerm)
    vogais.includes(arrayTerm[letra].toUpperCase()) && numVogais++;
  return numVogais;
}
function getArray(c, index, a) {
  const code = c
    .reduce(function (total, num) {
      return 0 != num ? total * num : total + num;
    })
    .toString()
    .split("");
  let arraySelected = a;
  return index < code.length
    ? parseInt(code[index])
    : (arraySelected < code.length - 1
      ? arraySelected++
      : (console.log(arraySelected), (arraySelected = 0)),
      parseInt(code[arraySelected]));
}
const arrayCaracters = ["A", "Â", "Ã", "Á", "À", "a", "â", "ã", "á", "à", "B", "b", "C", "Ç", "c", "ç", "D", "d", "E", "Ê", "É", "e", "ê", "é", "F", "f", "G", "g", "H", "h", "I", "Í", "i", "í", "J", "j", "K", "k", "L", "l", "M", "m", "N", "Ñ", "n", "ñ", "O", "Ô", "Õ", "Ó", "o", "ô", "õ", "ó", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "Ú", "Ù", "u", "ú", "ù", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "'", '"', "!", "@", "#", "$", "%", "&", "*", "(", ")", "_", "-", "+", "=", "`", "{", "}", "[", "]", "^", "~", ":", ";", "/", "?", "<", ">", ",", ".", "|", "\\", "ª", "º", " ",]
const arrayCaractersInvert1 = ["W", "M", "P", ":", "2", "é", "ú", "]", "Ú", "q", "_", "Q", "Ã", "3", "E", "h", "j", "Õ", "I", "0", ",", "4", "F", "n", "r", "b", "ª", "v", "º", "H", ";", "c", ")", "f", "S", "ô", "5", "d", "â", "Ô", "ç", "Z", "(", "À", "-", "#", "'", "Á", ">", "p", "<", "Y", "&", "|", "}", "8", "õ", "@", "?", "`", "Ñ", "à", "m", "Ç", "k", ".", "B", "[", "á", "ã", "T", "$", "C", "z", "%", "=", "Í", "N", "+", "w", "É", "s", "ù", "o", "A", "~", "Ù", "K", "V", "u", "\\", "l", "{", "ó", "i", "L", '"', "y", "ñ", "g", "Ê", "^", "6", "ê", "*", "U", "t", "Â", "X", "e", "x", "R", "1", "J", "D", "Ó", "í", "O", "a", "!", "9", "G", "7", "/", " "]
const arrayCaractersInvert2 = ["i", "f", "5", "I", ")", "x", "F", "^", "A", "E", "w", "_", "Á", "À", "C", "a", "0", "o", "*", "+", "Ã", "N", "}", "l", "2", "ª", "[", "b", "Y", "ó", "Õ", "]", "v", "{", ">", "ê", "Â", "Ù", "X", "S", "ç", "Ñ", "3", "$", "é", "d", "â", "-", "e", "6", "9", "#", "ô", "P", "q", "V", "í", "s", "ù", "(", "7", "u", "/", "D", "M", "H", "K", "W", "?", "h", "ú", "=", "É", "\\", ".", "<", "m", "Ó", "c", "~", ";", "'", "!", "R", "Ê", "B", "Ô", "j", "ñ", "t", "Í", "õ", "k", "|", "O", "U", "%", "8", "Ç", "Q", "Ú", "º", "&", ":", "á", "z", "Z", "p", "L", "4", "y", "r", "`", "ã", "T", "@", "n", '"', "J", "G", "g", "1", "à", ",", " "]
const arrayCaractersInvert3 = ["I", "8", "3", "ª", "Í", "í", "O", "[", "#", "o", "À", "@", ",", "^", "5", "%", "ê", "ú", "D", "é", "Q", "6", "ç", ":", "x", "G", "ù", '"', "(", "º", "q", "2", ">", "W", "g", "n", "N", "h", "P", "á", "ñ", "=", "ã", "i", "s", "Ù", "Ã", "v", "{", "k", "d", "B", "Ê", ";", "T", "l", "X", "/", "!", "Ó", ".", "U", "c", "e", "j", "t", "M", "Ú", "Y", "Ô", "}", "m", "?", "$", "õ", "à", "É", "9", "_", "â", "ó", "w", "<", "Ñ", "~", "b", "\\", "+", "H", "p", "y", "a", "R", "4", "f", "0", "`", "S", "r", "|", "F", "A", "K", "]", "J", ")", "Á", "&", "L", "C", "Õ", "Ç", "1", "Z", "z", "V", "Â", "u", "'", "E", "*", "7", "-", "ô", " "]
const arrayCaractersInvert4 = ["*", "X", "[", "C", "|", "m", "}", "P", "À", "i", "s", "B", "$", "u", "E", "`", "v", "c", "H", "_", "R", "Z", "í", "3", "k", "W", "A", "Ô", ":", "M", "J", "t", "f", "#", "Ó", "ê", "y", "Õ", "D", "Ñ", "^", "0", "K", "à", ">", "N", "&", "I", "(", "8", " ", "j", "b", "õ", "5", "~", "Á", "a", "+", '"', "Q", "/", ")", "â", "ô", "6", "=", ",", "ç", "G", "?", "l", "9", "d", "É", "ú", ".", "O", "Ê", "Ù", "4", "ù", "<", "x", "e", "L", "á", "Ú", "U", "º", "ª", "'", "ó", "ã", "7", "h", "n", "g", "Í", ";", "@", "T", "S", "q", "V", "ñ", "Ã", "w", "Ç", "z", "-", "p", "1", "Â", "é", "Y", "o", "F", "\\", "%", "r", "2", "!", "]", "{"]
const arrayCaractersInvert5 = ["}", ")", "6", "j", "ç", "d", "y", "á", "í", "k", "P", "u", "1", "3", "n", "t", "#", "&", "ê", "!", "W", "ù", "Â", "f", "a", "Ó", "l", "A", "|", "À", "V", "Ù", "R", "0", "[", "%", "+", "É", "Ã", "ó", "õ", "ª", "~", ",", "Ú", "E", "G", "z", "?", "{", "`", "Í", "e", "º", "b", " ", "c", "M", "i", "p", "D", "ñ", "H", "9", "]", "N", ">", ":", "à", "Ê", "x", "=", "J", "O", "â", "$", "s", "Ô", "/", "g", "Y", "<", "Ç", "Õ", "4", "X", "q", "U", ";", "7", "K", "ô", "é", "m", "Z", "L", "r", "C", "-", "v", "B", "@", "5", "_", "I", "*", "8", "S", "Ñ", "h", "Q", "^", "Á", "T", "ã", "2", "\\", "w", "ú", ".", "F", "(", "o", '"', "'"]
const arrayCaractersInvert6 = ["M", "h", "4", "8", "_", "ª", "A", "l", "U", "#", "N", "Á", "$", "'", "-", "+", "m", "ù", "À", "2", "1", "V", "w", "`", "3", "g", "º", "Ñ", "y", "F", "ã", "n", "[", "%", "Ê", "=", "R", "5", "à", "p", "e", "/", "<", "O", "Q", "q", "ô", "ê", "I", "T", "E", ")", "s", "Ù", "6", "K", "{", "í", "|", ".", "õ", "r", '"', "ú", "t", "Õ", "Ç", "ó", "ç", "Ã", "u", "z", "!", "Â", "b", "G", "X", "@", "f", "H", "Y", "&", "É", " ", "Ô", "j", "S", "c", "a", "*", "(", "D", "7", "é", "v", ">", ",", "L", "J", "Z", "W", "~", ":", "d", "\\", "0", "}", "C", "â", "Ú", "Í", "P", "Ó", "^", "i", ";", "á", "k", "9", "o", "?", "ñ", "]", "x", "B"]
const arrayCaractersInvert7 = ["h", "Ç", "|", "Ù", "D", "c", "P", "É", "7", "l", "d", "#", "4", "?", "*", "2", "f", "i", ")", "j", "A", "]", "U", "@", "E", "ñ", "ú", "º", "V", "H", "w", "p", "ç", "!", "5", "é", ":", "+", "%", "m", "q", "í", "Ú", "b", "t", "R", "T", "y", " ", "C", "â", "3", "F", "M", "8", "$", "J", "O", "Ñ", "\\", "á", "Â", ">", "9", "`", "u", "Í", "~", "Õ", "Y", "Á", "&", "1", "(", "/", "G", "N", "B", "6", "a", "'", "g", "Ó", "0", "ê", ";", "K", ".", "ã", "<", "À", "I", "s", "z", "n", "Q", "L", "x", "v", "-", "^", "e", "o", "W", ",", "ô", "Z", "Ô", "õ", "Ê", '"', "[", "X", "=", "Ã", "ù", "à", "S", "{", "r", "k", "_", "ª", "ó", "}"]
const arrayCaractersInvert8 = ["_", "`", "?", "\\", "b", "ñ", "t", "[", "%", "(", '"', ")", "H", "'", "k", "3", "J", "+", "1", "F", "8", "ê", "Ê", "/", "7", "T", "U", "i", "*", ".", "^", "N", "Z", "&", "5", "$", "q", "á", "ã", "I", "X", "õ", "ô", "S", "#", "4", "j", "Á", " ", ":", "Ù", ",", "c", "M", "À", "u", "ç", "K", "Í", "Ç", "s", "}", "D", "0", "9", "f", "Q", "à", "@", ">", "-", "V", "a", "Ñ", "g", "Ú", "~", "ª", "P", "d", "L", "6", "G", "B", "l", "2", "r", "É", "R", "v", "y", "ú", "<", "|", ";", "E", "z", "w", "h", "é", "C", "A", "]", "O", "m", "ù", "ó", "=", "Â", "º", "!", "{", "Õ", "Ã", "e", "â", "Y", "W", "n", "Ô", "x", "p", "í", "o", "Ó"]
const arrayCaractersInvert9 = ["Ó", '"', "i", "B", "k", "G", "=", "Ê", "{", "<", "ç", "4", "á", ",", "r", "`", "j", "l", "C", "2", "M", "#", "Ù", "Ú", "Ç", "E", "!", "ù", "º", "Ñ", "]", "@", "'", ";", "à", "í", "/", "9", "Ô", "ª", "J", "e", "Ã", "s", "8", "L", "X", "[", "R", "T", "c", "é", "v", "+", "n", "o", "Â", "w", "%", " ", ":", "u", "~", "À", "m", ".", "g", "(", "*", "U", "ã", "0", "1", "5", "W", "6", "S", "z", "Õ", "&", "ó", "V", "Z", "}", "t", "h", "D", "Í", "a", "ê", ">", "_", "ô", "K", "â", "P", "?", "I", "O", "7", "ú", "d", "q", "x", "f", "\\", "b", "Q", "N", "ñ", "p", "F", "A", "-", ")", "H", "|", "Y", "^", "y", "Á", "$", "É", "3", "õ"];

document.querySelector("button#generate").addEventListener("click", () => {
  if ("" == document.querySelector("#code").value)
    document.querySelector("#code").focus(),
      alert("Por favor, insira o código de autenticação!");
  else {
    const term = document.querySelector("#field").value,
      code = document.querySelector("#code").value.split(""),
      lengthOfTerm = term.length,
      countVogais = CountingVogais(term);
    let termFinal = "",
      arraySelected = 0;
    term.split("").forEach((caracter, index) => {
      let positionCaracter = arrayCaracters.indexOf(caracter);
      arraySelected = getArray(code, index, arraySelected);
      let positionCrip = arrayCaracters.length - positionCaracter - 1;
      0 == arraySelected
        ? (termFinal += arrayCaracters[positionCrip])
        : 1 == arraySelected
          ? (termFinal += arrayCaractersInvert1[positionCrip])
          : 2 == arraySelected
            ? (termFinal += arrayCaractersInvert2[positionCrip])
            : 3 == arraySelected
              ? (termFinal += arrayCaractersInvert3[positionCrip])
              : 4 == arraySelected
                ? (termFinal += arrayCaractersInvert4[positionCrip])
                : 5 == arraySelected
                  ? (termFinal += arrayCaractersInvert5[positionCrip])
                  : 6 == arraySelected
                    ? (termFinal += arrayCaractersInvert6[positionCrip])
                    : 7 == arraySelected
                      ? (termFinal += arrayCaractersInvert7[positionCrip])
                      : 8 == arraySelected
                        ? (termFinal += arrayCaractersInvert8[positionCrip])
                        : 9 == arraySelected &&
                        (termFinal += arrayCaractersInvert9[positionCrip]);
    }),
      (document.querySelector("#field_exit").value = termFinal);
  }
}),
  document.querySelector("button#validate").addEventListener("click", () => {
    if ("" == document.querySelector("#code").value)
      document.querySelector("#code").focus(),
        alert("Por favor, insira o código de autenticação!");
    else {
      const arrayTermFinal = document
        .querySelector("#field_exit")
        .value.split(""),
        code = document.querySelector("#code").value.split("");
      let arraySelected = 0,
        termFinal2 = "";
      arrayTermFinal.forEach((caracter, index) => {
        let positionCrip = 0;
        (arraySelected = getArray(code, index, arraySelected)),
          0 == arraySelected
            ? (positionCrip = arrayCaracters.indexOf(caracter))
            : 1 == arraySelected
              ? (positionCrip = arrayCaractersInvert1.indexOf(caracter))
              : 2 == arraySelected
                ? (positionCrip = arrayCaractersInvert2.indexOf(caracter))
                : 3 == arraySelected
                  ? (positionCrip = arrayCaractersInvert3.indexOf(caracter))
                  : 4 == arraySelected
                    ? (positionCrip = arrayCaractersInvert4.indexOf(caracter))
                    : 5 == arraySelected
                      ? (positionCrip = arrayCaractersInvert5.indexOf(caracter))
                      : 6 == arraySelected
                        ? (positionCrip = arrayCaractersInvert6.indexOf(caracter))
                        : 7 == arraySelected
                          ? (positionCrip = arrayCaractersInvert7.indexOf(caracter))
                          : 8 == arraySelected
                            ? (positionCrip = arrayCaractersInvert8.indexOf(caracter))
                            : 9 == arraySelected &&
                            (positionCrip = arrayCaractersInvert9.indexOf(caracter));
        let positionCaracter = arrayCaracters.length - positionCrip - 1;
        termFinal2 += arrayCaracters[positionCaracter];
      }),
        (document.querySelector("#field").value = termFinal2);
    }
  }),
  document.querySelector("button#copy").addEventListener("click", () => {
    document.querySelector("#field_exit").select(),
      document.execCommand("copy"),
      alert("Pronto! Texto copiado :)");
  });