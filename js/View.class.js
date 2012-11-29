View = function() {

    this.init = function(){

        this.mainLayout();
        this.drawAllRings();

    };

    this.mainLayout = function(){

        $('body').empty().append('<div id="mainDiv"><div id="touchBox"><canvas></canvas><div id="targetBox"></div></div><div id="messageBox"></div></div>');
        this.mainCtnr = document.getElementById('mainDiv');
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = $('canvas').width();
        this.mainCanvas.height = $('canvas').height();
        this.mainCtx = this.mainCanvas.getContext('2d');

    };

    this.rings = [];

    this.drawRing = function(ring){

        var x = ring.x;
        var y = ring.y;
        var a = ring.alpha;
        var r = ring.r;
        var w = ring.width;

        this.mainCtx.globalAlpha = a;
        this.mainCtx.strokeStyle = ring.color;
        this.mainCtx.lineWidth = w;
        this.mainCtx.beginPath();
        this.mainCtx.arc(x,y,r,0,2*Math.PI);
        this.mainCtx.stroke();

    };

    this.timeoutOn = true;

    this.drawAllRings = function(){

        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);

        var that = this;

        for (var rId in this.rings)
        {
            this.drawRing(this.rings[rId]);
            if(this.rings[rId].type=='start'){
                this.rings[rId].alpha = 1.0075 * this.rings[rId].alpha;
                this.rings[rId].width = 1.005 * this.rings[rId].width;
                this.rings[rId].r = 1.01 * this.rings[rId].r;
                if(this.rings[rId].r > 20){
                    this.rings[rId].type='steady';
                    this.rings[rId].alpha = 1;
                    this.rings[rId].width = 5;
                    this.rings[rId].r = 20;
                    this.timeoutOn = false;
                } else {
                    this.timeoutOn = true;
                }
            }
        }

        if(this.timeoutOn){
            setTimeout(function(){that.drawAllRings();},1);
        }

    };

    this.resizeLayout = function(h,w) {
        this.timeoutOn = true;
        this.init();
    };

    this.screenToCanvas = function(x,y){
        var newx = x - 12;
        var newy = y - 12;
        return [newx,newy];
    };

    this.generateColor = function(){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        var color = 'rgb('+r+','+g+','+b+')';
        return color;
    }

    this.addRing = function(id,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.generateColor();
        this.rings.push({id: id, type: 'start', color: col, x: newx, y: newy, r: 1, width: 1, alpha: 0.1});
        this.timeoutOn = true;
        this.drawAllRings();
    };

    this.init();

};






























