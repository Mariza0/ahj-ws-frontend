export default class PlayGround {
  
    moveGoblin() {
  
      const goblin = document.querySelector('.playground-img');
  
      const collectionElements = document.querySelectorAll('.playground-item');
  
      let positionRandom = Math.floor(Math.random() * collectionElements.length);
     
      for (let i = 0; i<=collectionElements.length-1; i++) {
  
          if(collectionElements[i].firstElementChild) {
  
            if (i === positionRandom) {
  
              while (i === positionRandom) {
                positionRandom = Math.floor(Math.random() * collectionElements.length);
              }
            }
            
            collectionElements[i].firstElementChild.remove();
  
          }
        }
    
      collectionElements[positionRandom].append(goblin);
  }
  }