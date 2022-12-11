
  function verificaPassword(pass1, pass2) {
    if (pass1 == pass2) {
      return true;
    } else {
      return false;
    }

  }

  function ridireziona(){
    location.href = "/farmacia.html";
  }

  function inviaDati() {
    let pass1=(document.getElementById("signup-password").value);
    let pass2=(document.getElementById("signup-password-confirm").value)

    

    if (verificaPassword(pass1, pass2)) {
      fetch('https://pirole-default-rtdb.europe-west1.firebasedatabase.app/Utenti.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: (document.getElementById("signup-email").value),
          nickname: (document.getElementById("signup-password").value),
          password: pass1
        })
      }).then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Le password non coincidono');
    }
    
  }

  
  let elencoEmail = new Array();
  let elencoPassword = new Array();
  let count = 0;

  
      fetch('https://pirole-default-rtdb.europe-west1.firebasedatabase.app/Utenti.json', {
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
            //Thread.sleep(3000);
            elencoEmail[count] = element.email;
            elencoPassword[count] = element.password;
            count+=1;
            
          });
          console.log(JSON.stringify(response));
        })
   
   function login(){
    let email = (document.getElementById("login-email").value);
    let password = (document.getElementById("login-password").value);

    var istrue = false;
    
    for (i = 0; i < elencoEmail.length; i++) {
      if(elencoEmail[i]==email){
        istrue = true;
      }
    } 

    if(istrue){
      location.href = "farmacia.html";
      }
    
   }