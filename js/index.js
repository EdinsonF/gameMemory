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
      let res;
      
      const voltearCarta = async (e) => {
        
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

          divCarta.removeEventListener('click',voltearCarta);
          console.log(divCarta);

          res = compararCartas(e);

        }else if(comparar.length === 2 ){

          comparar[2] =  {
            nombre : images[idCarta].name,
            id: idCarta,
            div: divCarta
          }
          console.log(res);          

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
              
            }

          }


         
        }




        console.log(comparar);

      }



      const compararCartas = (e)  => {

     

        if(comparar.length === 2){
          console.log("entro");

            if(comparar[0].id === comparar[1].id){
                
                restaurarCartas();
                
              }else if(comparar[0].nombre === comparar[1].nombre){
                console.log("las cartas coinsiden");
                
                guardarCoinsidencia();

                return true;
          
              }else{
                console.log("no son iuales");

                setTimeout(restaurarCartas, 1000);

                return false; 
      
              }
        }
          
  
        

        
  
      }


      const restaurarCartas = () => {

        if(comparar.length === 2){

          if(comparar[0].id === comparar[1].id){
            
            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');
            comparar[1].div.addEventListener('click', voltearCarta);

  
          }else{
  
            
                    
            comparar[0].div.removeAttribute('class', 'cartaEfecto');
            comparar[0].div.setAttribute('class', 'carta');
  
            comparar[1].div.removeAttribute('class', 'cartaEfecto');
            comparar[1].div.setAttribute('class', 'carta');
            comparar[1].div.addEventListener('click', voltearCarta);
  
          }
  
          if(comparar.length === 2){
            comparar = [];
          }
          
          

        }

        
      }



        let encontradas = [];

      const guardarCoinsidencia = () => {


        comparar[0].div.removeEventListener('click', voltearCarta);
        comparar[1].div.removeEventListener('click', voltearCarta);

        encontradas.push({comparar});
        console.log(encontradas);

        comparar=[];

        if(encontradas.length === 10){
          alert("Felicitaciones");
        }
        
      }


      crearCarta();
  
  
}))