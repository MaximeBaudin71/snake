window.onload = function(){

    var canvasWidth = 900;
    var canvasHeight = 600;
    var canvas;
    var blockSize = 30;
    var ctx;
    var delay = 1000;
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
        snakee = new Snake([[6,4], [5,4], [4,4]]);
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

    

    function Snake(body){

        this.body = body;

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
            nextPosition[0] += 1; //Avancer le X du serpent 
            this.body.unshift(nextPosition); //Rajoute la nouvelle position à la première place
            this.body.pop(); //supprime le dernier élement
        }
    }
    
}