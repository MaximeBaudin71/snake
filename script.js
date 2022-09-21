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
        refreshCanvas();
        
    }

    function refreshCanvas(){
        xCord += 3;
        yCord += 3;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.beginPath(); //ne pas oublier cette ligne
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCord,yCord,100,50);
        setTimeout(refreshCanvas, delay); //appel de la fonction toutes les 1000 ms
    }

    function Snake(body){

        this.body = body;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
        }
    }
    
}