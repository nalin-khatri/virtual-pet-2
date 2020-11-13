class Milk{
    constructor(){
        this.foodStock = 0;
        this.lastFed = 0;

        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    deductFood(){ 
        if(this.foodStock>0){ 
            this.foodStock -= 1; 
        } 
    }

    updateFoodStock(foodStock){ 
        database.ref('/').update({
            Food: foodStock
        });

        image(this.image,550,250,50,50);
    } 

    display(){
        var x=80,y=100; 

        imageMode("CENTER");
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                } 

                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}

