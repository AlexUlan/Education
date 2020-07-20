export default class Difference {
  constructor({ officerold, officernew, cardSelector }) {
    this.officerold = document.querySelector(officerold);
    this.officernew = document.querySelector(officernew);
    this.cardSelector = cardSelector;
    this.oldsCard = this.officerold.querySelectorAll(this.cardSelector);
    this.newCard = this.officernew.querySelectorAll(this.cardSelector);
    this.oldCounter = 0;
    this.newCounter = 0;
  }

  hiddenCard(cardsBlock) {
    cardsBlock.querySelectorAll(this.cardSelector).forEach((card, i, arr) => {
      if (!(i == arr.length - 1)) {
        card.style.display = "none";
      }
    });
  }

  showCard(counter,trigerSelector, container, cards){
    let trigger = container.querySelector(trigerSelector);
    trigger.addEventListener("click", ()=>{
      if(counter < cards.length -2){
        cards[counter].style.display = "flex"
        counter++;
      }else{
        cards[cards.length-1].style.display = "none"
        cards[counter].style.display = "flex"
      }
     })
  }

  init() {
    this.hiddenCard(this.officerold);
    this.hiddenCard(this.officernew);
    this.showCard(this.oldCounter, ".card__click", this.officerold, this.oldsCard)
    this.showCard(this.newCounter, ".card__click", this.officernew, this.newCard)
  }
}
