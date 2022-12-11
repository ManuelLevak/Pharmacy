
let num = 0;
fetch('https://pirole-default-rtdb.europe-west1.firebasedatabase.app/Pharmacy.json', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    return response.json();
  })
  .then(response => {


    Object.keys(response).forEach(function (key) {

      let element = response[key];
      document.getElementById('farmaci_table').innerHTML += "<tr><td>" + element.id +
        "</td><td>" + element.nome +
        "</td><td>" + element.quantita +
        "</td><td>" + element.minimo +
        "</td><td> <input class='inputTabella'; id=\'acquista" + element.nome + "\' type=\"text\"></td>" +
        "</td><td><button class='bottoneTabella'; onclick=\"aggiungi(" + "\'acquista" + element.nome + "\'," + element.quantita + ",\'" + Object.keys(response)[num] + "\' )\">rifornisci</button>" +
        "</td><td> <input class='inputTabella'; id=\'preleva" + element.nome + "\' type=\"text\"></td>" +
        "<td><button class='bottoneTabella'; onclick=\"togli(" + "\'preleva" + element.nome + "\'," + element.quantita + ",\'" + Object.keys(response)[num] + "\' )\">preleva</button>" +
        "</td></tr>";
      num += 1;
    });

    console.log(JSON.stringify(response));
  })

BASE_URL = 'https://pirole-default-rtdb.europe-west1.firebasedatabase.app/Pharmacy/'
function aggiungi(acq, number, key) {
  fetch(BASE_URL + key + '.json', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantita: (parseInt(document.getElementById(acq).value)) + number
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function togli(pre, number, key) {
  fetch(BASE_URL + key + '.json', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantita: verifica(pre,number)
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



function verifica(pre,number){
  if(number>=(parseInt(document.getElementById(pre).value))){
    return number - (parseInt(document.getElementById(pre).value))
  }else{
    alert("Non puoi inserire un valore maggiore alla quantità!")
  }
}