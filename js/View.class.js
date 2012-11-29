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

    this.interval = [];
    this.intervalOn = function(i){
        var that = this;
        this.interval[i] = setInterval(function(){that.drawAllRings();},1);
    };
    this.intervalOff = function(i){
        clearInterval(this.interval[i]);
    };

    this.i = 0;

    this.drawAllRings = function(){

        this.i++;

        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);

        var that = this;
        var stepsStart = 20;
        var stepsMove = 20;
        var stepsEnd = 100;

        for (var rId in this.rings)
        {
            this.drawRing(this.rings[rId]);
            if(this.rings[rId].type=='start'){
                this.rings[rId].alpha = this.rings[rId].alpha + 1/stepsStart;
                this.rings[rId].width = this.rings[rId].width + 5/stepsStart;
                this.rings[rId].r = this.rings[rId].r + 20/stepsStart;
                if(this.rings[rId].r > 20){
                    this.rings[rId].type='steady';
                    this.rings[rId].alpha = 1;
                    this.rings[rId].width = 5;
                    this.rings[rId].r = 20;
                    this.intervalOff(rId);
                }
            }
            else if(this.rings[rId].type=='move'){
                this.rings[rId].alpha = this.rings[rId].alpha - 1/stepsMove;
                if(this.rings[rId].alpha < 0.05){
                    this.rings[rId].type='steady';
                    this.intervalOff(rId);
                }
            }
            else if(this.rings[rId].type=='end'){
                this.rings[rId].alpha = this.rings[rId].alpha - 1/stepsEnd;
                this.rings[rId].width = this.rings[rId].width - 5/stepsEnd;
                this.rings[rId].r = this.rings[rId].r - 20/stepsEnd;
                if(this.rings[rId].r < 1){
                    this.rings[rId].type='steady';
                    this.intervalOff(rId);
                }
            }
        }

        $('#messageBox').empty().append(this.i);

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

    this.startRing = function(id,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.generateColor();
        this.rings.push({id: id, type: 'start', color: col, x: newx, y: newy, r: 0, width: 0, alpha: 0});
        this.intervalOn(id);
    };

    this.moveRing = function(id,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.generateColor();
        this.rings.push({id: id, type: 'move', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.intervalOn(id);
    };

    this.endRing = function(id,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.generateColor();
        this.rings.push({id: id, type: 'end', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.intervalOn(id);
    };

    this.init();

};






























