window.onload = function(){

    var canvasWidth = 900;
    var canvasHeight = 600;
    var canvas;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var greenApple;
    var widthinBlock = canvasWidth/blockSize;
    var heightinBlock = canvasHeight/blockSize;

    init();

    function init(){
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas); //permet d'attacher l'element à notre page HTML
    
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        greenApple = new Apple([getRandomInt(widthinBlock - 1), getRandomInt(heightinBlock -1 )]);
        refreshCanvas();
        
    }

    function refreshCanvas(){

        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath(); //ne pas oublier cette ligne
        snakee.advance();
        if(snakee.checkCollision()){
            //GameOver
        }else{
            if(snakee.checkCollisionApple(greenApple.position)){
                snakee.ateToApple = true;
                greenApple.position = [getRandomInt(widthinBlock -1 ), getRandomInt(heightinBlock-1)]
            }
            snakee.draw();
            greenApple.draw();
            setTimeout(refreshCanvas, delay); //appel de la fonction toutes les 1000 ms
        }
        
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;

        ctx.fillRect(x,y,blockSize, blockSize);
    }


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#008000";
            drawBlock(ctx, this.position);
            ctx.restore();
        }
    }

    function Snake(body, direction){

        this.body = body;
        this.direction = direction;
        this.ateToApple = false;

        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        }

        this.advance = function(){
            var nextPosition = this.body[0].slice(); //copier l'element
            
            //analyse direction
            switch(this.direction){
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                default:
                    throw("InvalidDirection");

            }
            this.body.unshift(nextPosition); //Rajoute la nouvelle position à la première place

            if (snakee.ateToApple)
            {
                this.ateToApple = false;
            } else{
                this.body.pop(); //supprime le dernier élement si le serpent n'a pas mangé de pomme
            }
            
        }

        this.setDirection = function(newDirection)
        {
            var allowedDirection;
            switch(this.direction)
            {
                case "right":
                case "left":
                    allowedDirection = ["up", "down"];
                    break;
                case "up":
                case "down":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw("InvalidDirection");
            }

            //regarder si la valeur fait partie du tableau des directions autorisées
            if(allowedDirection.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        }

        this.checkCollision = function(){

            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var restOfBody = this.body.slice(1);

            var snakeX = head[0];
            var snakeY = head[1];

            var minX = 0;
            var minY = 0;
            var maxX = widthinBlock - 1;
            var maxY = heightinBlock - 1;
            
            var wallCollisionX = snakeX < minX || snakeX > maxX;
            var wallCollisionY = snakeY < minY || snakeY > maxY;

            if(wallCollisionX || wallCollisionY)
            {
                wallCollision = true;
            }

            for(var i = 0; i < restOfBody.length; i++){

                if(snakeX === restOfBody[i][0] && snakeY === restOfBody[i][1]){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        }

        this.checkCollisionApple = function(ApplePos){
            
            var collisionApple = false;
            var appleX = ApplePos[0];
            var appleY = ApplePos[1];
            var head = this.body[0];
            var snakeX = head[0];
            var snakeY = head[1];

            if(snakeX === appleX && snakeY === appleY){
                collisionApple = true;
            }

            return collisionApple;


        }

    }

    document.onkeydown = function handleKeyDown(e){

        var key = e.key;
        var newPosition;

        switch (key){
            case "ArrowLeft": //gauche
                newPosition = "left";
            break;
            case "ArrowUp": // haut
                newPosition = "up";
            break;
            case "ArrowRight": //droite
                newPosition = "right";
            break;
            case "ArrowDown": //bas
                newPosition = "down";
            break;
        }
        snakee.setDirection(newPosition);
    }
    
}