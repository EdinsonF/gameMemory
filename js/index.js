(document.addEventListener('DOMContentLoaded', async () => {

      const resolv = await fetch('../images/images.json');
      const imagen =  await resolv.json();

      const images = [...imagen, ...imagen];

      images.sort( () => Math.random() - 0.5);

      console.log(images);


  const contenedor = document.querySelector(".contenedor");

      const crearCarta =  () => {

        for (let i = 0; i < images.length; i++) {
          let div = document.createElement('div');
              div.setAttribute('class', 'carta');
              

          let divCara = document.createElement('div');
              divCara.setAttribute('class', 'cara');
          let img1 = document.createElement('img');
              img1.setAttribute('src', '../images/fondo.png');
              img1.setAttribute('data-id', i);
              img1.setAttribute('height', "200px");
              img1.setAttribute('width', "200px");

              divCara.appendChild(img1);
              

          let divDetras = document.createElement('div');
              divDetras.setAttribute('class', 'detras');
                               
          let img2 = document.createElement('img');
              img2.setAttribute('src', images[i].img);
              img2.setAttribute('data-id', i);
              img2.setAttribute('name', images[i].name);
              img2.setAttribute('height', "200px");
              img2.setAttribute('width', "200px");

              divDetras.appendChild(img2);

              div.appendChild(divCara);
              div.appendChild(divDetras);


              div.addEventListener('click', voltearCarta);

              contenedor.appendChild(div);

        }
      }

    let comparar = [];


      const voltearCarta = (e) => {
        
        let element = e.target;
        
        const divCarta = element.parentElement.parentElement;
      
          divCarta.setAttribute('class', 'carta cartaEfecto');
          
        const idCarta = element.getAttribute('data-id');

        if(comparar.length === 0 ){
          
          comparar[0] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }
          
          

        }else if(comparar.length === 1 ){
        
          comparar[1] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }

          compararCartas(e);

        }else if(comparar.length === 2 ){


          comparar[0] =  {
            nombre : images[idCarta].name,
            id: idCarta
          }

         
         
        }

        console.log(comparar);

      }


      const compararCartas = (e)  => {

        let element = e.target.parentElement.parentElement;

        if(comparar.length === 2){

            if(comparar[0].id === comparar[1].id){
                
                restaurarCartas();
                
              }else if(comparar[0].nombre === comparar[1].nombre){
                console.log("las cartas coinsiden");
                
                guardarCoinsidencia();
          
              }else{
                console.log("no son iuales");

                setTimeout(restaurarCartas, 1000);
      
              }
        }
          
  
        

        
  
      }


      const restaurarCartas = () => {

        if(comparar[0].id === comparar[1].id){
          const element = document.getElementsByName(comparar[0].nombre);
          const carta1 = element[0].parentElement.parentElement;
          
          carta1.removeAttribute('class', 'cartaEfecto');
          carta1.setAttribute('class', 'carta');

        }else{

          const element = document.querySelectorAll('.cartaEfecto');
                  
          element[0].removeAttribute('class', 'cartaEfecto');
          element[0].setAttribute('class', 'carta');

          element[1].removeAttribute('class', 'cartaEfecto');
          element[1].setAttribute('class', 'carta');
        }

        comparar = [];
        
      }


      

      const guardarCoinsidencia = () => {

        const card= document.getElementsByName(comparar[0].nombre);

        card[0].removeEventListener('click', voltearCarta);
        card[1].removeEventListener('click', voltearCarta);

        comparar = [];
        
      }

      const resetearSeleccion = () => {
console.log(comparar);
        const cards = document.querySelectorAll('.cartaEfecto');
console.log(cards);
        cards[0].removeAttribute('class', 'cartaEfecto');
        cards[1].removeAttribute('class', 'cartaEfecto');
       comparar = [];

  
     }


      crearCarta();
  
  
}))