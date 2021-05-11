(document.addEventListener('DOMContentLoaded', async () => {

      const resolv = await fetch('../images/images.json');
      const images =  await resolv.json();

      images.sort( () => Math.random() - 0.5);

      console.log(images);

      let cartaOne = {
        nombre: "",
        id: 0
      }
      
      let cartaTwo = {
        nombre: "",
        id: 0
      }
      
      let clic = 0;


      



  const contenedor = document.querySelector(".contenedor");

      const crearCarta =  () => {

        for (let i = 0; i < images.length; i++) {
            
          let carta = document.createElement('img');
              carta.setAttribute('src', '../images/fondo.png');
              carta.setAttribute('data-id', i);
              carta.setAttribute('height', "200px");
              carta.setAttribute('width', "200px");
              carta.addEventListener('click', voltearCarta);

              contenedor.appendChild(carta);
          
        }
      }

    let comparar = [];


      const voltearCarta = (e) => {
        let element = e.target;
        


        const idCarta = element.getAttribute('data-id');

        if(comparar.length === 0 ){

          comparar[0] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }

          element.setAttribute('src', images[idCarta].img);
          element.setAttribute('name', images[idCarta].name);

          element.setAttribute('height', "200px");
          element.setAttribute('width', "200px");


        }else if(comparar.length === 1 ){
        
          comparar[1] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }

          //llamar funcion para quitar evento
          element.setAttribute('src', images[idCarta].img);
          element.setAttribute('name', images[idCarta].name);

          element.setAttribute('height', "200px");
          element.setAttribute('width', "200px");

          compararCartas(e);

        }else
         if (comparar.length === 2 ){


resetearSeleccion();
          comparar[0] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }

          element.setAttribute('src', images[idCarta].img);
          element.setAttribute('name', images[idCarta].name);

          element.setAttribute('height', "200px");
          element.setAttribute('width', "200px");
         
        }

        console.log(comparar);

      }


      const compararCartas = (e)  => {

        let element = e.target;

        if(comparar.length === 2){

            if(comparar[0].id === comparar[1].id){
                console.log("seleccionaste la misma carta");
                element.setAttribute('src', '../images/fondo.png');
                resetearSeleccion();
              }else if(comparar[0].nombre === comparar[1].nombre){
                console.log("las cartas coinsiden");
                
                guardarCoinsidencia();
          
              }else{
                setTimeout(restaurarCartas, 1000);
      
              }
        }
          
  
        

        
  
      }


      const restaurarCartas = () => {

        const cards = document.querySelectorAll('img');

        if(comparar.length === 2){

        cards[comparar[0].id].setAttribute('src', '../images/fondo.png');
        cards[comparar[1].id].setAttribute('src', '../images/fondo.png');
        
        resetearSeleccion();
        }
      }


      

      const guardarCoinsidencia = () => {

        const card = document.getElementsByName(cartaOne.nombre); 

        card[0].removeEventListener('click', voltearCarta);
        card[1].removeEventListener('click', voltearCarta);


       /*  const id1 = card[0].getAttribute('data-id');
        const id2 = card[1].getAttribute('data-id'); */
        resetearSeleccion();
        
      }

      const resetearSeleccion = () => {

        const cards = document.querySelectorAll('img');

        cards[comparar[0].id].setAttribute('src', '../images/fondo.png');
        cards[comparar[1].id].setAttribute('src', '../images/fondo.png');
       comparar = [];

  
     }







      crearCarta();
  

     /*  const  quitarEventos = () => {
        const etiquetas = document.querySelectorAll('img');

        for (let i = 0; i < etiquetas.length; i++) {
          
          etiquetas[i].removeEventListener('click', voltearCarta);
          
        }

      } */

      /* const  agregarEventos = () => {
        const etiquetas = document.querySelectorAll('img');

        for (let i = 0; i < etiquetas.length; i++) {
          
          etiquetas[i].addEventListener('click', voltearCarta);
          
        }

      }

      agregarEventos(); */

    
 



  
}))