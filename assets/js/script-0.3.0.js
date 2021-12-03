const version = "0.3.0 Beta"

document.querySelector('#root').innerHTML = `
<div class="header">
<img src="./assets/img/logo_stagon.png" alt="Logo da stagon" width="50">
<h1>Stagon Crypto</h1>
<strong>v${version}</strong>
</div>
<div class="container">
<label for="code">Digite o código de autenticação:</label>
<input type="number" id="code" max="9999" min="0" autocomplete="off" placeholder="xxxx">
<div class="count_characters">
  <span class="characters_now">0</span>/4
</div>
<label for="field">Digite o texto:</label>
<textarea cols="12" id="field" maxlength="5000" autocomplete="off" placeholder="Seu texto vai aqui"
  wrap="hard"></textarea>
<div class="count_characters">
  <span class="characters_now">0</span>/5000
</div>
<fieldset>
  <legend>Criptografia para:</legend>
  <input type="radio" name="levelCrypto" id="forPassword" value="forPassword" checked>
  <label for="forPassword">Senha</label>
  <input type="radio" name="levelCrypto" id="complete" value="complete">
  <label for="complete">Texto</label>
  <input type="radio" name="levelCrypto" id="emojis" value="emojis">
  <label for="emojis">Diversão</label>
</fieldset>
<button id="generate">Encriptografar</button>
</div>
<div class="container">
<label for="field">Veja a saída ou coloque o código para descriptografar</label>
<input type="text" id="field_exit" autocomplete="off" placeholder="Aqui onde irá sair seu texto criptografado!">
<div><button id="validate">Descriptografar</button>
  <button id="copy">Copiar</button>
</div>
<p id="exit"></p>
</div>`

function emojiUnicode(emoji) {
  var comp;
  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  }
  comp = (
    (emoji.charCodeAt(0) - 0xD800) * 0x400
    + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
  );
  if (comp < 0) {
    comp = emoji.charCodeAt(0);
  }
  return comp.toString("16").toUpperCase();
};

function getIndexVetorSelected(c, selectedVetor, sizeTerm) {
  const code = c
    .reduce(function (total, num) {
      if (num != 0) {
        return total * num * sizeTerm * c.length;
      } else if (total != 0) {
        return total * sizeTerm * c.length;
      } else {
        return sizeTerm * c.length;
      }
    })
    .toString()
    .split("");

  let selectVetor = selectedVetor;
  if (selectVetor < code.length - 1) {
    selectVetor++;
  } else {
    selectVetor = 0;
  }
  return parseInt(code[selectVetor]);
}

function getVetorReference(levelCrypto) {
  if (levelCrypto === "forPassword") {
    return ["A", "a", "B", "b", "C", "Ç", "c", "ç", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "'", '"', "!", "@", "#", "$", "%", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "]", "}", "^", "~", ":", ";", "/", "?", "<", ",", ">", ".", "|", "\\"];
  } else {
    return ["A", "a", "B", "b", "C", "Ç", "c", "ç", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "'", '"', "!", "@", "#", "$", "%", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "]", "}", "^", "~", ":", ";", "/", "?", "<", ",", ">", ".", "|", "\\", "Â", "Ã", "Á", "À", "â", "ã", "á", "à", "Ê", "É", "ê", "é", "Í", "í", "Ñ", "ñ", "Ô", "Õ", "Ó", "ô", "õ", "ó", "Ú", "Ù", "ú", "ù", "`", "´", "ª", "°",];
  }
}

function getCharacters(selectVetor, levelCrypto) {
  const characters = {
    "forPassword": [
      ["!", "a", "B", "e", "D", "o", "1", "F", "N", ":", ";", ">", "z", "[", "{", "$", "V", "X", "M", "f", "<", ")", "y", "_", "+", "d", "c", "@", '"', ".", "%", "ç", "2", "6", "Z", "G", "L", "T", "C", "Ç", "R", "r", "}", "n", " ", "~", "Y", "P", "\\", "H", "5", "w", "s", "/", "9", "&", "h", "(", "4", ",", "J", "'", "q", "u", "8", "g", "b", "K", "O", "E", "k", "Q", "^", "j", "A", "]", "U", "l", "p", "-", "I", "|", "#", "*", "3", "=", "v", "W", "i", "m", "x", "t", "S", "7", "0", "?"],
      [";", "Y", "%", "i", "l", "V", "X", "B", "r", "@", "\\", "|", "+", "G", "g", "k", "~", "O", "o", "y", "D", "J", "a", ",", "S", ".", "<", "^", "/", "{", "(", "j", "ç", "2", "Z", ">", "R", "m", "9", "]", "_", "&", "C", "3", "*", "n", "e", "t", "Ç", "w", "8", "L", "?", "6", "P", "!", "s", "#", "K", "d", "x", "A", "-", "'", "M", "T", "7", "0", "v", "b", "E", "[", "}", "f", "4", "z", "Q", '"', ")", "c", "q", "I", "=", " ", "1", "F", "$", "H", "N", ":", "5", "h", "p", "W", "u", "U"],
      ["q", "f", "=", "Q", "'", ";", "a", ">", "o", "H", "$", "r", "-", "]", "@", "w", "ç", "*", "_", "Ç", "d", "|", "V", "G", "Z", "M", "e", "[", "L", "6", "}", "E", "p", "%", "B", "7", "J", "I", "D", "j", "A", "Y", "n", "5", ",", "k", "C", "0", "P", "U", "2", "9", "3", "W", "T", "c", "^", "/", '"', "h", "#", "&", "g", "{", "!", "b", "<", "i", "8", "F", "?", "l", "v", "1", "y", "x", "(", ".", "s", "\\", "R", "m", ":", " ", "t", "u", "4", "O", ")", "X", "K", "~", "S", "+", "z", "N"],
      ["e", "ç", "G", '"', "\\", "k", "h", "7", "Q", "b", "Z", "u", "2", "q", "!", "v", "S", "z", "H", "C", "{", "?", "Ç", "F", "x", "a", "~", "W", "-", "K", "4", "d", "r", "3", "J", "]", ":", "@", "&", "U", "5", "1", "A", ";", "[", "D", "c", "}", "'", ")", ".", "_", "0", "|", "T", "$", "I", "8", "o", "=", "(", ">", "9", "i", "p", "y", "O", "R", "6", "f", "M", "s", "j", "L", "Y", "B", "#", "X", "<", "%", "N", "P", "w", "+", ",", "*", "/", "E", "m", "l", "^", "n", "g", "V", "t", " "],
      ["u", "3", "v", "F", "\\", ".", "i", "-", "s", "I", "e", "4", "1", "^", "H", "G", "O", "A", "E", "~", '"', "'", "U", "}", "x", "l", "Y", "y", "h", "r", "t", ",", "L", "_", "T", ";", "M", "5", "p", "K", "?", "f", "%", "w", "N", "b", "z", "j", "(", "6", " ", "a", "*", "k", "Z", "C", "8", "&", "@", "]", "0", ")", "S", "$", "9", "!", "D", "7", "m", "P", "Ç", ":", "[", ">", "V", "+", "Q", "g", "R", "ç", "X", "q", "c", "#", "<", "o", "B", "2", "|", "d", "/", "W", "J", "{", "=", "n"],
      ["?", "+", "n", "L", "e", "4", ",", "s", "y", "6", "S", "O", "z", "g", "F", "*", "V", "H", "j", ";", "Y", "R", ":", "<", "}", "3", "U", "/", "l", "I", "p", "f", "v", "B", '"', "b", "Ç", "h", "P", "1", "D", "^", "$", "=", "A", "9", "(", "C", "t", "E", "8", "q", "|", "{", "_", "ç", "7", "G", "Z", ".", "X", "c", "@", "'", "N", "[", "Q", "m", "M", " ", "!", "u", "0", "d", "&", "o", "i", "W", "-", "a", "2", ">", "J", "x", ")", "]", "K", "~", "r", "T", "#", "\\", "k", "w", "%", "5"],
      ["K", "J", "q", "<", "E", "e", ",", "=", "|", " ", "[", ">", ";", "4", '"', "m", "\\", "h", "~", "P", "V", "M", "&", "(", "$", "R", "w", "r", "}", "/", "k", "#", ")", "B", "+", "o", "-", "Ç", "2", "^", "s", "i", ":", "d", "?", "x", "'", "a", "*", "X", "W", "S", "j", "{", "I", "F", "Z", "%", "y", "n", "U", "Q", "z", "0", "f", "b", "l", "v", ".", "5", "A", "9", "1", "D", "8", "G", "ç", "6", "L", "7", "!", "]", "g", "O", "t", "H", "T", "_", "c", "@", "Y", "C", "u", "N", "3", "p"],
      ["J", ")", "c", "M", "j", "&", "n", "b", "#", ">", "}", "~", "V", "4", "d", "]", "Z", "e", ";", "G", "U", "v", "5", "?", "Ç", "X", "ç", "k", "(", "Y", "W", "o", "s", "O", " ", "C", "E", "h", "N", "q", "^", "0", "P", "r", "1", "3", "!", ".", "@", "|", "6", "a", "9", "%", "f", "L", "i", ",", "x", "8", "<", "*", "p", "B", "$", "=", "_", "z", "T", "7", "m", "H", "K", "/", "y", "2", "S", "I", "w", "+", "g", "{", "A", "'", "t", ":", "R", "[", "D", "u", "Q", '"', "l", "-", "\\", "F"],
      ["_", "ç", "X", "g", "U", "-", "F", "{", "Y", "^", "&", ".", "E", "t", "Z", "a", "=", "k", "O", "/", "3", "I", "@", "9", "?", "[", "*", "R", "C", "Ç", "!", "}", "~", " ", "y", ";", "P", "M", "%", "W", "w", "7", "2", "q", "'", "c", "z", "n", "x", "K", "r", "0", "h", "\\", '"', "u", "i", "|", "b", "v", "<", "]", "m", "V", "L", ",", "$", "J", "S", "H", "D", ":", "Q", "f", "N", "B", "j", "6", "T", ">", "o", "+", "G", "l", "8", "5", "e", "(", "p", "4", "d", ")", "s", "A", "#", "1"],
      ["G", "o", "Ç", "^", "X", "-", "h", "#", "|", "8", "V", "[", "U", "k", "1", "9", ",", "~", "u", "ç", "p", "I", "a", "c", "\\", ">", "L", "B", "O", "7", "+", "f", "J", "b", "y", "z", "t", "?", "'", "/", "r", "g", "W", "]", ")", "s", "e", "{", "@", "j", " ", "2", "!", "0", ":", "M", "S", "T", "$", "(", "*", "w", "K", "H", "F", "&", "d", "_", "q", "v", "P", "5", "n", ".", "Y", "=", "C", "Q", "}", '"', "i", "Z", "4", "E", "m", "l", "<", "x", "6", "R", "N", "A", "3", "D", "%", ";"]
    ],
    "emojis": [
      ["1F649", "1F601", "1F68F", "1F685", "1F3B1", "1F628", "1F3C4", "1F683", "1F697", "1F6AA", "1F60A", "1F63B", "1F616", "1F684", "1F629", "1F6B6", "1F6C0", "1F630", "1F605", "1F3B3", "1F3BF", "1F60C", "1F6AC", "1F638", "1F606", "1F691", "1F61A", "1F3BB", "1F3B7", "1F3E2", "1F680", "1F64F", "1F62A", "1F6A4", "1F6A9", "1F3B2", "1F3C8", "1F3C1", "1F3B8", "1F3E3", "1F695", "1F6BD", "1F625", "1F602", "1F6AB", "1F3BA", "1F620", "1F689", "1F692", "1F614", "1F60B", "1F63C", "1F3E7", "1F603", "1F633", "1F6BA", "1F63E", "1F6A2", "1F3B0", "1F6A5", "1F699", "1F687", "1F3C3", "1F609", "1F3B6", "1F6A8", "1F3E0", "1F3CA", "1F63A", "1F3E8", "1F63F", "1F645", "1F693", "1F631", "1F3E5", "1F646", "1F3E1", "1F612", "1F3BE", "1F64E", "1F6BE", "1F624", "1F618", "1F647", "1F61E", "1F61D", "1F3E6", "1F639", "1F637", "1F3C0", "1F622", "1F6B2", "1F648", "1F6BB", "1F3B4", "1F640", "1F621", "1F6A7", "1F64C", "1F62B", "1F635", "1F62D", "1F6AD", "1F60F", "1F604", "1F3BC", "1F69A", "1F3E9", "1F3BD", "1F64A", "1F613", "1F632", "1F68C", "1F3B5", "1F6BC", "1F6B9", "1F64B", "1F3EA", "1F623", "1F61C", "1F3C6", "1F3B9", "1F3C2", "1F63D", "1F64D", "1F60D"],
      ["1F3E1", "1F3B3", "1F3B7", "1F616", "1F6AC", "1F3C0", "1F64D", "1F637", "1F3BE", "1F618", "1F3C1", "1F69A", "1F697", "1F6AA", "1F3BD", "1F602", "1F3B2", "1F633", "1F6AB", "1F3B0", "1F609", "1F603", "1F691", "1F614", "1F3E9", "1F632", "1F3B4", "1F680", "1F64B", "1F63D", "1F62D", "1F645", "1F693", "1F601", "1F61A", "1F63C", "1F6A4", "1F60C", "1F3E6", "1F635", "1F606", "1F3EA", "1F63E", "1F3E3", "1F639", "1F3CA", "1F62A", "1F6A8", "1F63F", "1F6BD", "1F63A", "1F621", "1F628", "1F3C2", "1F683", "1F3E5", "1F3B6", "1F640", "1F648", "1F60A", "1F64E", "1F689", "1F6BB", "1F684", "1F6B9", "1F60B", "1F3B8", "1F60D", "1F613", "1F6B2", "1F6AD", "1F3BA", "1F3BB", "1F604", "1F3C6", "1F6B6", "1F6A9", "1F64C", "1F605", "1F62B", "1F64F", "1F3BC", "1F687", "1F3C4", "1F3E7", "1F3E2", "1F61C", "1F60F", "1F646", "1F6A5", "1F61E", "1F3B9", "1F623", "1F3E8", "1F612", "1F3E0", "1F68C", "1F61D", "1F6BE", "1F625", "1F631", "1F63B", "1F3C8", "1F3B5", "1F647", "1F649", "1F622", "1F692", "1F6A7", "1F6C0", "1F64A", "1F620", "1F6A2", "1F6BC", "1F3C3", "1F638", "1F630", "1F6BA", "1F685", "1F3B1", "1F3BF", "1F695", "1F699", "1F624", "1F629", "1F68F"],
      ["1F191", "1F201", "1F311", "1F33C", "1F362", "1F22F", "1F235", "1F351", "1F309", "1F306", "1F355", "1F313", "1F30A", "1F232", "1F314", "1F233", "1F301", "1F1EE", "1F35D", "1F34F", "1F36D", "1F335", "1F33D", "1F36A", "1F36C", "1F33E", "1F1EF", "1F334", "1F359", "1F35F", "1F33F", "1F372", "1F345", "1F371", "1F170", "1F194", "1F337", "1F315", "1F373", "1F302", "1F349", "1F192", "1F364", "1F234", "1F238", "1F35C", "1F237", "1F171", "1F356", "1F343", "1F0CF", "1F17E", "1F331", "1F358", "1F366", "1F251", "1F36E", "1F33A", "1F1F0", "1F363", "1F300", "1F17F", "1F35B", "1F34D", "1F195", "1F319", "1F199", "1F34C", "1F198", "1F346", "1F1EC", "1F353", "1F1EA", "1F33B", "1F35A", "1F193", "1F1E8", "1F340", "1F339", "1F308", "1F305", "1F36B", "1F250", "1F354", "1F344", "1F342", "1F370", "1F21A", "1F236", "1F19A", "1F367", "1F347", "1F348", "1F361", "1F18E", "1F196", "1F1EB", "1F338", "1F1E9", "1F341", "1F635", "1F365", "1F368", "1F320", "1F31F", "1F34E", "1F330", "1F1FA", "1F35E", "1F1F7", "1F30F", "1F23A", "1F36F", "1F304", "1F303", "1F31B", "1F30C", "1F360", "1F357", "1F307", "1F239", "1F369", "1F30B", "1F352", "1F34A", "1F197"],
      ["1F1F7", "1F346", "1F1E8", "1F19A", "1F35A", "1F1EB", "1F359", "1F191", "1F197", "1F303", "1F1FA", "1F337", "1F366", "1F342", "1F34F", "1F354", "1F23A", "1F1EE", "1F198", "1F1EF", "1F306", "1F199", "1F339", "1F340", "1F1F0", "1F360", "1F308", "1F34D", "1F35F", "1F334", "1F355", "1F304", "1F36A", "1F343", "1F33F", "1F33D", "1F370", "1F365", "1F250", "1F30F", "1F362", "1F196", "1F34E", "1F311", "1F372", "1F251", "1F300", "1F170", "1F331", "1F31B", "1F349", "1F351", "1F335", "1F368", "1F33A", "1F22F", "1F233", "1F239", "1F33B", "1F21A", "1F30B", "1F357", "1F309", "1F307", "1F34C", "1F344", "1F237", "1F36E", "1F18E", "1F1EC", "1F356", "1F635", "1F338", "1F238", "1F371", "1F36D", "1F0CF", "1F171", "1F353", "1F17E", "1F33C", "1F35C", "1F320", "1F369", "1F373", "1F319", "1F313", "1F347", "1F35D", "1F364", "1F34A", "1F352", "1F361", "1F367", "1F36F", "1F301", "1F35E", "1F345", "1F33E", "1F305", "1F302", "1F36B", "1F194", "1F348", "1F30C", "1F17F", "1F31F", "1F341", "1F315", "1F195", "1F235", "1F330", "1F35B", "1F30A", "1F358", "1F1EA", "1F201", "1F193", "1F232", "1F234", "1F36C", "1F363", "1F314", "1F236", "1F1E9", "1F192"],
      ["1F36F", "1F35A", "1F1EB", "1F1E8", "1F300", "1F363", "1F369", "1F351", "1F19A", "1F35E", "1F199", "1F356", "1F302", "1F307", "1F238", "1F31B", "1F308", "1F193", "1F346", "1F338", "1F30A", "1F192", "1F34C", "1F303", "1F34F", "1F360", "1F30C", "1F36D", "1F23A", "1F197", "1F372", "1F334", "1F35D", "1F0CF", "1F364", "1F17E", "1F357", "1F347", "1F342", "1F305", "1F34D", "1F365", "1F1F0", "1F35F", "1F371", "1F196", "1F170", "1F250", "1F315", "1F36B", "1F362", "1F358", "1F330", "1F367", "1F36A", "1F331", "1F233", "1F30F", "1F36E", "1F311", "1F320", "1F31F", "1F237", "1F1E9", "1F306", "1F251", "1F198", "1F236", "1F339", "1F195", "1F355", "1F34E", "1F352", "1F201", "1F319", "1F635", "1F366", "1F1EA", "1F1EF", "1F232", "1F370", "1F314", "1F191", "1F343", "1F34A", "1F1F7", "1F33D", "1F33A", "1F301", "1F35B", "1F354", "1F21A", "1F1FA", "1F33F", "1F234", "1F304", "1F1EE", "1F340", "1F345", "1F35C", "1F353", "1F359", "1F171", "1F1EC", "1F341", "1F348", "1F368", "1F361", "1F309", "1F313", "1F30B", "1F337", "1F335", "1F235", "1F194", "1F239", "1F22F", "1F33E", "1F33B", "1F349", "1F18E", "1F33C", "1F17F", "1F373", "1F36C", "1F344"],
      ["1F3A9", "1F382", "1F3EC", "1F376", "1F389", "1F377", "1F42D", "1F41F", "1F421", "1F3A0", "1F392", "1F3E3", "1F3A1", "1F3E5", "1F3E1", "1F393", "1F38C", "1F3EA", "1F3B3", "1F3A2", "1F438", "1F41A", "1F424", "1F38E", "1F435", "1F3AC", "1F3B2", "1F3C8", "1F3EE", "1F386", "1F3BD", "1F3B4", "1F425", "1F43B", "1F3B8", "1F3C6", "1F40C", "1F3C3", "1F414", "1F43A", "1F38B", "1F385", "1F3BF", "1F430", "1F3A5", "1F412", "1F3B0", "1F42F", "1F3BA", "1F374", "1F3EF", "1F41D", "1F38A", "1F426", "1F390", "1F3A3", "1F387", "1F3C4", "1F3B9", "1F3B1", "1F388", "1F381", "1F38F", "1F379", "1F38D", "1F3BE", "1F3B6", "1F3AE", "1F3BB", "1F437", "1F422", "1F3BC", "1F420", "1F3A6", "1F3C2", "1F423", "1F436", "1F3E7", "1F3C1", "1F37B", "1F3B7", "1F3AD", "1F3E8", "1F429", "1F37A", "1F433", "1F3A4", "1F378", "1F42E", "1F3B5", "1F40E", "1F3F0", "1F434", "1F431", "1F3AF", "1F3CA", "1F3AB", "1F42C", "1F42B", "1F3E9", "1F411", "1F3E2", "1F391", "1F427", "1F375", "1F380", "1F41B", "1F3A8", "1F3E6", "1F384", "1F3ED", "1F3C0", "1F432", "1F40D", "1F428", "1F3AA", "1F439", "1F3EB", "1F417", "1F41C", "1F41E", "1F383", "1F418", "1F3A7", "1F419", "1F3E0"],
      ["1F3B4", "1F3B1", "1F379", "1F3B9", "1F38F", "1F423", "1F38E", "1F43B", "1F433", "1F429", "1F3A5", "1F41D", "1F40D", "1F430", "1F3B7", "1F382", "1F42D", "1F3E3", "1F38B", "1F3A8", "1F389", "1F38C", "1F427", "1F3BA", "1F43A", "1F3B0", "1F386", "1F375", "1F438", "1F3EB", "1F3A2", "1F3E6", "1F3A6", "1F377", "1F437", "1F391", "1F40E", "1F37B", "1F3A7", "1F3BC", "1F3C1", "1F422", "1F383", "1F40C", "1F420", "1F3BE", "1F3EC", "1F3AD", "1F3AB", "1F3E8", "1F374", "1F425", "1F3E7", "1F411", "1F426", "1F434", "1F42C", "1F42F", "1F3BF", "1F432", "1F3F0", "1F3EA", "1F37A", "1F390", "1F3BD", "1F381", "1F3EE", "1F419", "1F41E", "1F414", "1F424", "1F436", "1F431", "1F378", "1F3A1", "1F3E1", "1F3B6", "1F3C2", "1F38A", "1F3CA", "1F384", "1F385", "1F3B5", "1F3B3", "1F3B8", "1F3BB", "1F3AE", "1F387", "1F42B", "1F3AC", "1F439", "1F3A0", "1F38D", "1F41A", "1F428", "1F3EF", "1F41F", "1F421", "1F42E", "1F393", "1F3E9", "1F3C8", "1F388", "1F3AA", "1F3ED", "1F435", "1F3AF", "1F3E5", "1F417", "1F41B", "1F41C", "1F3E2", "1F3B2", "1F3A4", "1F3C3", "1F3C4", "1F3C0", "1F412", "1F380", "1F418", "1F3A9", "1F3C6", "1F3E0", "1F392", "1F376", "1F3A3"],
      ["1F3AF", "1F3BE", "1F3E1", "1F436", "1F434", "1F422", "1F3A3", "1F37B", "1F411", "1F3C2", "1F430", "1F3A8", "1F38C", "1F38E", "1F42D", "1F3F0", "1F3E8", "1F381", "1F3E7", "1F43A", "1F42C", "1F417", "1F3B5", "1F376", "1F40E", "1F3B3", "1F433", "1F3C8", "1F3BD", "1F432", "1F3EF", "1F374", "1F428", "1F3B9", "1F384", "1F41D", "1F386", "1F3E9", "1F3EE", "1F3B0", "1F378", "1F385", "1F38D", "1F3AC", "1F37A", "1F40C", "1F41B", "1F3E2", "1F3BC", "1F382", "1F3AE", "1F3CA", "1F3A2", "1F425", "1F424", "1F38B", "1F3AB", "1F439", "1F420", "1F3B2", "1F438", "1F377", "1F388", "1F38A", "1F42E", "1F426", "1F41A", "1F3A1", "1F3EC", "1F3AA", "1F3A4", "1F392", "1F42B", "1F41F", "1F3BF", "1F3C1", "1F3C3", "1F3A9", "1F437", "1F423", "1F379", "1F3C0", "1F419", "1F3A5", "1F3E3", "1F3AD", "1F3C4", "1F3A6", "1F390", "1F3E0", "1F414", "1F41C", "1F3C6", "1F3B8", "1F375", "1F383", "1F393", "1F431", "1F421", "1F3A0", "1F418", "1F412", "1F3A7", "1F3B7", "1F3B4", "1F3E5", "1F391", "1F41E", "1F3E6", "1F3ED", "1F3B6", "1F3EA", "1F387", "1F435", "1F40D", "1F43B", "1F389", "1F3EB", "1F42F", "1F429", "1F38F", "1F3BB", "1F427", "1F3BA", "1F3B1", "1F380"],
      ["1F4BF", "1F499", "1F498", "1F49C", "1F487", "1F48B", "1F48E", "1F45A", "1F48A", "1F4AC", "1F4B9", "1F47D", "1F44A", "1F4B3", "1F484", "1F475", "1F458", "1F449", "1F493", "1F451", "1F49F", "1F4BB", "1F47C", "1F495", "1F43E", "1F47A", "1F452", "1F4B0", "1F4A0", "1F444", "1F478", "1F4C0", "1F462", "1F450", "1F4BE", "1F483", "1F46E", "1F47B", "1F456", "1F479", "1F48D", "1F442", "1F4A7", "1F482", "1F476", "1F440", "1F49B", "1F455", "1F44F", "1F447", "1F47E", "1F460", "1F457", "1F45B", "1F4A5", "1F463", "1F496", "1F43D", "1F4A2", "1F4A8", "1F45F", "1F4AB", "1F467", "1F44D", "1F481", "1F48C", "1F472", "1F454", "1F46F", "1F49E", "1F471", "1F459", "1F453", "1F4AF", "1F468", "1F473", "1F489", "1F466", "1F4A4", "1F443", "1F488", "1F49D", "1F44E", "1F494", "1F490", "1F470", "1F4B1", "1F4B5", "1F47F", "1F4BC", "1F4B2", "1F46B", "1F4BA", "1F45D", "1F497", "1F43C", "1F446", "1F491", "1F492", "1F4C1", "1F4BD", "1F45C", "1F4A1", "1F4B8", "1F44C", "1F485", "1F4AA", "1F49A", "1F44B", "1F477", "1F4A6", "1F480", "1F486", "1F45E", "1F4A9", "1F48F", "1F445", "1F448", "1F4A3", "1F4B4", "1F474", "1F469", "1F461", "1F4AE", "1F46A", "1F464"],
      ["1F468", "1F4A4", "1F43C", "1F47A", "1F458", "1F4B3", "1F470", "1F4B0", "1F492", "1F459", "1F453", "1F486", "1F4AA", "1F467", "1F463", "1F460", "1F461", "1F457", "1F4B9", "1F4BF", "1F4A7", "1F456", "1F47D", "1F49D", "1F43E", "1F4C1", "1F46B", "1F4AE", "1F47F", "1F4B2", "1F45B", "1F497", "1F4B5", "1F443", "1F4A2", "1F4A0", "1F45C", "1F446", "1F4A5", "1F488", "1F4BD", "1F4BC", "1F483", "1F44E", "1F480", "1F442", "1F49B", "1F4AB", "1F49F", "1F4A1", "1F471", "1F4BB", "1F4B4", "1F451", "1F484", "1F45A", "1F4C0", "1F46A", "1F44D", "1F44C", "1F479", "1F475", "1F48E", "1F478", "1F454", "1F450", "1F496", "1F476", "1F477", "1F472", "1F490", "1F48F", "1F464", "1F47C", "1F43D", "1F4BE", "1F499", "1F4A3", "1F449", "1F489", "1F494", "1F48B", "1F44B", "1F448", "1F45D", "1F4AC", "1F48D", "1F47E", "1F498", "1F4A9", "1F49E", "1F444", "1F485", "1F47B", "1F462", "1F452", "1F49C", "1F469", "1F4B8", "1F4A6", "1F455", "1F466", "1F491", "1F445", "1F447", "1F4B1", "1F493", "1F474", "1F487", "1F46F", "1F440", "1F481", "1F495", "1F45E", "1F44F", "1F4AF", "1F44A", "1F4A8", "1F46E", "1F48A", "1F49A", "1F4BA", "1F48C", "1F45F", "1F473", "1F482"]
    ],
    "complete": [
      ["ê", " ", "0", "Ã", "+", "Á", "7", "'", "|", "R", "$", "J", "é", "*", "!", "}", "P", "ã", "6", "n", "M", "ù", "Ú", "N", "/", "À", ")", "í", "w", "H", "_", "Í", "É", "o", "x", "9", "õ", "5", "Ç", "à", "ó", "m", "&", "Â", "K", "ª", "T", "Õ", "ñ", "1", "3", "f", "{", "C", "Q", "d", "ç", ".", ">", "g", '"', "`", "b", "Ê", "´", "r", ":", "%", "°", ";", "8", "j", "Ñ", "t", "Y", "l", "#", "ô", "â", "u", "~", "s", "y", "p", "]", "ú", "W", "^", ",", "2", "a", "Ó", "e", "S", "?", "B", "i", "D", "Z", "[", "V", "(", "@", "k", "X", "á", "v", "=", "q", "\\", "-", "z", "c", "h", "U", "<", "4", "A", "Ô", "F", "L", "O", "I", "G", "E", "Ù"],
      ["W", "M", "P", ":", "2", "é", "ú", "]", "Ú", "q", "_", "Q", "Ã", "3", "E", "h", "j", "Õ", "I", "0", ",", "4", "F", "n", "r", "b", "ª", "v", "º", "H", ";", "c", ")", "f", "S", "ô", "5", "d", "â", "Ô", "ç", "Z", "(", "À", "-", "#", "'", "Á", ">", "p", "<", "Y", "&", "|", "}", "8", "õ", "@", "?", "`", "Ñ", "à", "m", "Ç", "k", ".", "B", "[", "á", "ã", "T", "$", "C", "z", "%", "=", "Í", "N", "+", "w", "É", "s", "ù", "o", "A", "~", "Ù", "K", "V", "u", "\\", "l", "{", "ó", "i", "L", '"', "y", "ñ", "g", "Ê", "^", "6", "ê", "*", " ", "´", "U", "t", "Â", "X", "e", "x", "R", "1", "J", "D", "Ó", "í", "O", "a", "!", "9", "G", "7", "/"],
      ["i", "f", "5", "I", ")", "x", "F", "^", "A", "E", "w", "_", "Á", "À", "C", "a", "0", "o", "*", "+", "Ã", "N", "}", "l", "2", "ª", "[", "b", "Y", "ó", "Õ", "]", "v", "{", ">", "ê", "Â", "Ù", "X", "S", "ç", "Ñ", "3", "$", "é", "d", "â", "-", "e", "6", "9", "#", "ô", "P", "q", "V", "í", "s", "ù", "(", "7", "u", "/", "D", "M", "H", "K", "W", "?", "h", "ú", "=", "É", "\\", ".", "<", "m", "Ó", "c", "~", ";", "'", "!", "R", "Ê", "B", "Ô", "j", "ñ", "t", "Í", "õ", "k", "|", "O", "U", "%", "8", "Ç", "´", " ", "Q", "Ú", "º", "&", ":", "á", "z", "Z", "p", "L", "4", "y", "r", "`", "ã", "T", "@", "n", '"', "J", "G", "g", "1", "à", ","],
      ["I", "8", "3", "ª", "Í", "í", "O", "[", "#", "o", "À", "@", ",", "^", "5", "%", "ê", "ú", "D", "é", "Q", "6", "ç", ":", "x", "G", "ù", '"', "(", "º", "q", "2", ">", "W", "g", "n", "N", "h", "P", "á", "ñ", "=", "ã", "i", "s", "Ù", "Ã", "v", "{", "k", "d", "B", "Ê", ";", "T", "l", "X", "/", "!", "Ó", ".", "U", "c", "e", "j", "t", "M", "Ú", "Y", "Ô", "}", "m", "?", "$", "õ", "à", "É", "9", "_", "â", "ó", "w", "<", "Ñ", "~", "b", "\\", "+", "H", "p", "y", "a", "R", "4", "f", "0", "`", "S", "r", "|", "F", "A", "K", "]", "J", ")", "Á", "&", "L", "´", "C", "Õ", " ", "Ç", "1", "Z", "z", "V", "Â", "u", "'", "E", "*", "7", "-", "ô"],
      ["*", "X", "[", "C", "|", "m", "}", "P", "À", "i", "s", "B", "$", "u", "E", "`", "v", "c", "H", "_", "R", "Z", "í", "3", "k", "W", "A", "Ô", ":", "M", "J", "t", "f", "#", "Ó", "ê", "y", "Õ", "D", "Ñ", "^", "0", "K", "à", ">", "N", "&", "I", "(", "8", " ", "j", "b", "õ", "5", "~", "Á", "a", "+", '"', "Q", "/", ")", "â", "ô", "6", "=", ",", "ç", "G", "?", "l", "9", "d", "É", "ú", ".", "O", "Ê", "Ù", "4", "ù", "<", "x", "e", "L", "á", "Ú", "U", "º", "ª", "'", "ó", "ã", "7", "h", "n", "g", "Í", ";", "@", "T", "´", "S", "q", "V", "ñ", "Ã", "w", "Ç", "z", "-", "p", "1", "Â", "é", "Y", "o", "F", "\\", "%", "r", "2", "!", "]", "{"],
      ["}", ")", "6", "j", "ç", "d", "y", "á", "í", "k", "P", "u", "1", "3", "n", "t", "#", "&", "ê", "!", "W", "ù", "Â", "f", "a", "Ó", "l", "A", "|", "À", "V", "Ù", "R", "0", "[", "%", "+", "É", "Ã", "ó", "õ", "ª", "~", ",", "Ú", "E", "G", "z", "?", "{", "`", "Í", "e", "º", "b", " ", "c", "M", "i", "p", "D", "ñ", "H", "9", "]", "N", ">", ":", "à", "Ê", "x", "=", "J", "O", "â", "$", "s", "Ô", "/", "g", "Y", "<", "Ç", "Õ", "4", "X", "q", "U", ";", "´", "7", "K", "ô", "é", "m", "Z", "L", "r", "C", "-", "v", "B", "@", "5", "_", "I", "*", "8", "S", "Ñ", "h", "Q", "^", "Á", "T", "ã", "2", "\\", "w", "ú", ".", "F", "(", "o", '"', "'"],
      ["M", "h", "4", "8", "_", "ª", "A", "l", "U", "#", "N", "Á", "$", "'", "-", "+", "m", "ù", "À", "2", "1", "V", "w", "`", "3", "g", "º", "Ñ", "y", "F", "ã", "n", "[", "%", "Ê", "=", "R", "5", "à", "p", "e", "/", "<", "O", "Q", "q", "ô", "ê", "I", "T", "E", ")", "s", "Ù", "6", "K", "{", "í", "|", ".", "õ", "r", '"', "ú", "t", "Õ", "Ç", "ó", "ç", "Ã", "u", "z", "!", "Â", "b", "G", "X", "@", "f", "H", "Y", "&", "É", " ", "Ô", "j", "S", "c", "a", "*", "(", "D", "7", "é", "v", ">", ",", "L", "J", "Z", "W", "~", ":", "d", "\\", "0", "}", "C", "â", "Ú", "Í", "P", "Ó", "´", "^", "i", ";", "á", "k", "9", "o", "?", "ñ", "]", "x", "B"],
      ["h", "Ç", "|", "Ù", "D", "c", "P", "É", "7", "l", "d", "#", "4", "?", "*", "2", "f", "i", ")", "j", "A", "]", "U", "@", "E", "ñ", "ú", "º", "V", "H", "w", "p", "ç", "!", "5", "é", ":", "+", "%", "m", "q", "í", "Ú", "b", "t", "R", "T", "y", " ", "C", "â", "3", "F", "M", "8", "$", "J", "O", "Ñ", "\\", "á", "Â", ">", "9", "`", "u", "Í", "~", "Õ", "Y", "Á", "&", "1", "(", "/", "G", "´", "N", "B", "6", "a", "'", "g", "Ó", "0", "ê", ";", "K", ".", "ã", "<", "À", "I", "s", "z", "n", "Q", "L", "x", "v", "-", "^", "e", "o", "W", ",", "ô", "Z", "Ô", "õ", "Ê", '"', "[", "X", "=", "Ã", "ù", "à", "S", "{", "r", "k", "_", "ª", "ó", "}"],
      ["_", "`", "?", "\\", "b", "ñ", "t", "[", "%", "(", '"', ")", "H", "'", "k", "3", "J", "+", "1", "F", "8", "ê", "Ê", "/", "7", "T", "U", "i", "*", ".", "^", "N", "Z", "&", "5", "$", "q", "á", "ã", "I", "X", "õ", "ô", "S", "#", "4", "j", "Á", " ", ":", "Ù", ",", "c", "M", "À", "u", "ç", "K", "Í", "Ç", "s", "}", "D", "0", "9", "f", "Q", "à", "@", ">", "-", "V", "a", "Ñ", "g", "Ú", "~", "ª", "P", "d", "L", "6", "G", "B", "l", "2", "r", "É", "R", "v", "y", "ú", "<", "|", ";", "E", "z", "w", "h", "é", "C", "A", "]", "O", "m", "ù", "ó", "=", "Â", "º", "!", "{", "Õ", "Ã", "e", "â", "Y", "W", "n", "Ô", "x", "´", "p", "í", "o", "Ó"],
      ["Ó", '"', "i", "B", "k", "G", "=", "Ê", "{", "<", "ç", "4", "á", ",", "r", "`", "j", "l", "C", "2", "M", "#", "Ù", "Ú", "Ç", "E", "!", "ù", "º", "Ñ", "]", "@", "'", ";", "à", "í", "/", "9", "Ô", "ª", "J", "e", "Ã", "s", "8", "L", "´", "X", "[", "R", "T", "c", "é", "v", "+", "n", "o", "Â", "w", "%", " ", ":", "u", "~", "À", "m", ".", "g", "(", "*", "U", "ã", "0", "1", "5", "W", "6", "S", "z", "Õ", "&", "ó", "V", "Z", "}", "t", "h", "D", "Í", "a", "ê", ">", "_", "ô", "K", "â", "P", "?", "I", "O", "7", "ú", "d", "q", "x", "f", "\\", "b", "Q", "N", "ñ", "p", "F", "A", "-", ")", "H", "|", "Y", "^", "y", "Á", "$", "É", "3", "õ"]
    ]
  };

  if (selectVetor == 0) {
    return characters[levelCrypto][0];
  } else if (selectVetor == 1) {
    return characters[levelCrypto][1];
  } else if (selectVetor == 2) {
    return characters[levelCrypto][2];
  } else if (selectVetor == 3) {
    return characters[levelCrypto][3];
  } else if (selectVetor == 4) {
    return characters[levelCrypto][4];
  } else if (selectVetor == 5) {
    return characters[levelCrypto][5];
  } else if (selectVetor == 6) {
    return characters[levelCrypto][6];
  } else if (selectVetor == 7) {
    return characters[levelCrypto][7];
  } else if (selectVetor == 8) {
    return characters[levelCrypto][8];
  } else if (selectVetor == 9) {
    return characters[levelCrypto][9];
  }
}

function getLengthVetorCharacters(levelCrypto) {
  return getVetorReference(levelCrypto).length;
}

function encrypt(term, c, levelCrypto) {
  const charactersOfTerm = term.split("");
  const code = c.split("");
  let termEncrypted = "";
  let selectVetor = 0;
  /* if (levelCrypto === "forPassword") {
  //   notification('Atenção! Nós vamos tirar a acentuação caso tiver!', 'alert')
  // }*/
  charactersOfTerm.forEach((c, index) => {
    let caracter = c
    selectVetor = getIndexVetorSelected(code, selectVetor, charactersOfTerm.length);
    let positionCaracter;
    if (levelCrypto === "forPassword") {
      caracter = c.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
    if (getVetorReference(levelCrypto).indexOf(caracter) >= 0) {
      positionCaracter = getVetorReference(levelCrypto).indexOf(caracter)
    } else {
      positionCaracter = getVetorReference(levelCrypto).indexOf(" ");
    }
    let positionCharacterCrypt = getLengthVetorCharacters(levelCrypto) - positionCaracter - 1;
    if (getCharacters(selectVetor, levelCrypto)[positionCharacterCrypt] === " " && (index === 0 || index === charactersOfTerm.length - 1)) {
      return false;
    } else {
      termEncrypted += levelCrypto === 'emojis' ? String.fromCodePoint(`0x${getCharacters(selectVetor, levelCrypto)[positionCharacterCrypt]}`) : getCharacters(selectVetor, levelCrypto)[positionCharacterCrypt]
    }
  });

  return termEncrypted;
}

function decrypt(termEncrypted, c, levelCrypto) {
  let charactersOfTermEncrypted = termEncrypted.split('');
  const code = c.split("");
  let selectVetor = 0;
  let termDecrypted = "";
  if (levelCrypto === "emojis") {
    let array = charactersOfTermEncrypted.map(function (v, i, a) {
      if (i % 2 == 0) {
        return v + a[i + 1]
      }
    }).filter(function (v) { return !!v }).map(emojiUnicode)
    charactersOfTermEncrypted = array
  }
  charactersOfTermEncrypted.forEach((caracter, index) => {
    selectVetor = getIndexVetorSelected(code, selectVetor, charactersOfTermEncrypted.length);
    let positionCharacterCrypt = getCharacters(selectVetor, levelCrypto).indexOf(caracter);
    let positionCaracter = getLengthVetorCharacters(levelCrypto) - positionCharacterCrypt - 1;
    termDecrypted += getVetorReference(levelCrypto)[positionCaracter] !== undefined ? getVetorReference(levelCrypto)[positionCaracter] : "";
  });
  return termDecrypted;
}
document.querySelector("button#generate").addEventListener("click", () => {
  if (document.querySelector("#code").value == "" || document.querySelector("#code").value.length < 4) {
    document.querySelector("#code").focus();
    alert("Por favor, insira o código de autenticação completo!");
  } else {
    const term = document.querySelector("#field").value;
    const code = document.querySelector("#code").value;
    const levelCrypto = Array.from(document.querySelectorAll('input[name="levelCrypto"]')).filter(function (element) {
      return element.checked
    })[0].id
    if (!!encrypt(term, code, levelCrypto)) {
      document.querySelector("#field_exit").value = encrypt(term, code, levelCrypto);
    } else {
      alert(
        "Opa! Ocorreu um erro ao criptografar seu texto 😥\nNossa equipe já está trabalhando para resolver, mas por enquanto você pode tentar com outro código 😉"
      );
      document.querySelector("#code").focus();
    }
  }
  document.querySelector("#exit").innerHTML = "";
});

document.querySelector("button#validate").addEventListener("click", () => {
  if (document.querySelector("#code").value == "" || document.querySelector("#code").value.length < 4) {
    document.querySelector("#code").focus();
    alert("Por favor, insira o código de autenticação completo!");
  } else {
    const termEncrypted = document.querySelector("#field_exit").value;
    const code = document.querySelector("#code").value;
    const levelCrypto = Array.from(document.querySelectorAll('input[name="levelCrypto"]')).filter(function (element) {
      return element.checked
    })[0].id
    document.querySelector(
      "#exit"
    ).innerHTML = `<p>Texto descriptografado: </p><mark>${decrypt(
      termEncrypted,
      code, levelCrypto
    )}</mark>`;
  }
});

document.querySelector("button#copy").addEventListener("click", () => {
  document.querySelector("#field_exit").select();
  document.execCommand("copy");
  alert("Pronto! Texto copiado 🤩");
});

document.querySelector("#field").addEventListener("input", function () {
  document.querySelectorAll(".characters_now")[1].innerHTML = this.value.length;
});

document.querySelector("#code").addEventListener("input", function () {
  if (this.value.length > this.getAttribute("placeholder").length) {
    this.value = this.value.slice(0, this.getAttribute("placeholder").length);
  }
  document.querySelectorAll(".characters_now")[0].innerHTML = this.value.length;
});

document
  .querySelector("#field_exit")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("button#validate").click();
    }
  });

document.querySelector("#field_exit").addEventListener("focus", function () {
  this.select();
});

document.querySelector("#code").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (document.querySelector("#field").value !== "") {
      document.querySelector("button#generate").click();
    } else if (document.querySelector("#field_exit").value !== "") {
      document.querySelector("button#validate").click();
    } else {
      if (this.value != "") {
        document.querySelector("#field").focus();
      } else {
        document.querySelector("button#generate").click();
      }
    }
  }
});