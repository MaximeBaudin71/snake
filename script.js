window.onload = function(){

    var canvasWidth = 900;
    var canvasHeight = 600;
    var canvas;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var xCord = 0;
    var yCord = 0;
    var snakee;

    init();

    function init(){
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas); //permet d'attacher l'element à notre page HTML
    
        ctx = canvas.getContext("2d");
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        refreshCanvas();
        
    }

    function refreshCanvas(){

        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath(); //ne pas oublier cette ligne
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay); //appel de la fonction toutes les 1000 ms
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;

        ctx.fillRect(x,y,blockSize, blockSize);
    }

    

    function Snake(body, direction){

        this.body = body;
        this.direction = direction;

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
            this.body.pop(); //supprime le dernier élement
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