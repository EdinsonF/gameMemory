(document.addEventListener('DOMContentLoaded', async () => {
  let usuarios = [];
  let usuarioLog;

  let btnRegistrar = document.querySelector("#registrar");

    const registrarUsuario = (e) => {
      e.preventDefault();
      const usuario = document.querySelector("#usuario");
      let resultado = document.querySelector(".usuario");
      resultado.innerHTML = "";

      if(usuario.value !== ""){
          usuarioLog = usuario.value;
          let div = document.createElement('div');
          div.innerText = `${usuario.value}` ;
          
          resultado.appendChild(div);
          btnRegistrar.setAttribute('disabled', true);
          usuario.value = "";
          mostrarCartas();
      }

    }
      btnRegistrar.addEventListener('click', registrarUsuario);
 
      const resolv = await fetch('../images/images.json');
      const imagen =  await resolv.json();

      const images = [...imagen, ...imagen];

      images.sort( () => Math.random() - 0.5);

  


  const contenedor = document.querySelector(".contenedor");

      const crearCarta =  () => {

        for (let i = 0; i < images.length; i++) {
          let div = document.createElement('div');
              div.setAttribute('class', 'carta');
              

          let divCara = document.createElement('div');
              divCara.setAttribute('class', 'cara');
          let img1 = document.createElement('img');
              img1.setAttribute('src', '../images/tapa.gif');
              img1.setAttribute('data-id', i);
              img1.setAttribute('height', "123px");
              img1.setAttribute('width', "123px");

              divCara.appendChild(img1);
              

          let divDetras = document.createElement('div');
              divDetras.setAttribute('class', 'detras');
                               
          let img2 = document.createElement('img');
              img2.setAttribute('src', images[i].img);
              img2.setAttribute('data-id', i);
              img2.setAttribute('name', images[i].name);
              img2.setAttribute('height', "123px");
              img2.setAttribute('width', "123px");

              divDetras.appendChild(img2);

              div.appendChild(divCara);
              div.appendChild(divDetras);

              contenedor.appendChild(div);


        } 
      }

      const mostrarCartas = () => {

        let todas = document.querySelectorAll('.carta');

        setTimeout(() =>{
          for (let j = 0; j < todas.length; j++) {
              
            todas[j].setAttribute('class', 'carta cartaEfecto');
           
        }
        },100);

        setTimeout(() =>{
          for (let k = 0; k < todas.length; k++) {
                
            todas[k].setAttribute('class', 'carta');
           
        }
        },3000);

        habilitarEvento();
      }


      let encontradas = [];
      let comparar = [];
      let res;
      
      const voltearCarta = async (e) => {
        if(encontradas.length !== 20){
            IniciarCronometro();
        }
        
        let element = e.target;
        
        const divCarta = element.parentElement.parentElement;
      
          divCarta.setAttribute('class', 'carta cartaEfecto');
          
        const idCarta = element.getAttribute('data-id');


        if(comparar.length === 0 ){
          
          comparar[0] =  {
            nombre : images[idCarta].name,
            id: idCarta,
            div: divCarta
          }
              
        }else if(comparar.length === 1 ){
        
          comparar[1] =  {
            nombre : images[idCarta].name,
            id: idCarta,
            div: divCarta
          }

          comparar[0].div.removeEventListener('click',voltearCarta);
          divCarta.removeEventListener('click',voltearCarta);


        }else if(comparar.length === 2 ){

          comparar[2] =  {
            nombre : images[idCarta].name,
            id: idCarta,
            div: divCarta
          }

        }

        //VERIFICAR CUANTAS CARTAS SE HAN VOLTEADOS

        const res = await validarVolteadas();


        if(res){
          await compararCartas();
        }else{
          establecerAnteriores();
        }
          /* console.log(res);          

          if(res === false){
            comparar[0].div.removeAttribute('class', 'cartaEfecto');
            comparar[0].div.setAttribute('class', 'carta');

            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');
            comparar[1].div.addEventListener('click', voltearCarta);

            if(comparar[0].nombre === comparar[2].nombre){
              comparar = [];
            }else{
              comparar = [];
              
              comparar[0] =  {
                nombre : images[idCarta].name,
                id: idCarta,
                div: divCarta
              }
              
            } */

         
        }

        const establecerAnteriores = () => {
          let muestra = comparar[2];

          if(comparar[0].nombre === comparar[1].nombre){
            console.log(" coinsiden");

            guardarCoinsidencia();

            comparar[0] = muestra;
          }else{
              restaurarCartas();
              comparar[0] = muestra;

          }

        }



        const validarVolteadas = () => {

          let res = new Promise((resolve, reject) => {
            
            setTimeout(function(){
              
               if(comparar.length === 3){
                resolve(false)

               }else if(comparar.length === 2){
                resolve(true)

               }
              
            }, 250);
          });


          return res;

        }


      const compararCartas = (e)  => {

        let res = new Promise((resolve, reject) => {

          setTimeout(() => {

            if(comparar.length === 2){

              deshabilitarEvento();
    
                if(comparar[0].id === comparar[1].id){
                    
                    restaurarCartas();
                    
                  }else if(comparar[0].nombre === comparar[1].nombre){
                    console.log(" coinsiden");
                    
                    guardarCoinsidencia();

                  }else{
                    console.log("no coinsiden");
    
                    setTimeout(restaurarCartas, 200);
          
                  }
            }

          },300);
        });

        
  
      }


     const deshabilitarEvento = () => {

      const event = document.querySelectorAll('.carta');
      
      for(let i =0; i<event.length; i++){

        event[i].removeEventListener('click', voltearCarta);
      }

     }

     const habilitarEvento = () => {

      const event = document.querySelectorAll('.carta');
      
      for(let i =0; i<event.length; i++){

        if(!event[i].classList.contains('encontrada')){

              event[i].addEventListener('click', voltearCarta);

        }

        
      }

     }


      const restaurarCartas = () => {

        if(comparar.length === 2){

          if(comparar[0].id === comparar[1].id){
            
            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');      
  
          }else{
  
            comparar[0].div.removeAttribute('class', 'cartaEfecto');
            comparar[0].div.setAttribute('class', 'carta');
            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');
  
          }

          habilitarEvento();


        }else if(comparar.length ===3){
            comparar[0].div.removeAttribute('class', 'cartaEfecto');
            comparar[0].div.setAttribute('class', 'carta');
            comparar[0].div.addEventListener('click', voltearCarta);

            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');
            comparar[1].div.addEventListener('click', voltearCarta);

        }

        comparar = [];

        
      }



        

      const guardarCoinsidencia = () => {

//guardar el div en otro arreglo para evitar q le asigne el arreglo a ese.

        comparar[0].div.removeEventListener('click', voltearCarta);
        comparar[0].div.setAttribute('class', 'carta cartaEfecto encontrada');
        comparar[1].div.removeEventListener('click', voltearCarta);
        comparar[1].div.setAttribute('class', 'carta cartaEfecto encontrada');


        encontradas.push(comparar[0] , comparar[1]);
        console.log(encontradas);

        comparar=[];

        habilitarEvento();
        if(encontradas.length === 20){
        let result = detenerCronometro();
          
          console.log("Felicitaciones, tu resultado es de :", result);
        }
        
      }


  crearCarta();  
  
}))




