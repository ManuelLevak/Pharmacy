
        var numberID = 0;
    
        function recuperaId() {
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
                if (element.id > numberID) {
                  numberID = element.id
                }
    
              });
              numberID += 1;
    
              console.log(JSON.stringify(response));
            })
        }
    
        recuperaId();
    
        function inviaDati() {
          fetch('https://pirole-default-rtdb.europe-west1.firebasedatabase.app/Pharmacy.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: (parseInt(numberID)),
              minimo: (parseInt(document.getElementById("minimo").value)),
              nome: (document.getElementById("nome").value),
              quantita: (parseInt(document.getElementById("quantita").value))
            })
          }).then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
              alert("Nuovo farmaco aggiunto correttamente")
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }