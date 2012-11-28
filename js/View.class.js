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

    this.rings = [{type: 'end', color: 'red', x: 500, y: 250, r: 50, width: 20, alpha: 1},{type: 'end', color: 'red', x: 250, y: 100, r: 30, width: 20, alpha: 1}];

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
        this.mainCtx.arc(x/2,y/2,r,0,2*Math.PI);
        this.mainCtx.stroke();

    };

    this.t = true;

    this.drawAllRings = function(){

        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);

        var that = this;

        for (var rId in this.rings)
        {
            this.drawRing(this.rings[rId]);
            this.rings[rId].alpha = 0.99 * this.rings[rId].alpha;
            this.rings[rId].width = 0.99 * this.rings[rId].width;
            this.rings[rId].r = 0.99 * this.rings[rId].r;
            if(this.rings[rId].alpha < 0.1 || this.rings[rId].width < 1 || this.rings[rId].r < 1){
                this.t = false;
            }
        }

        if(this.t){
            setTimeout(function(){that.drawAllRings();},10);
        }

    };

    this.resizeLayout = function(h,w) {
        this.rings = [{type: 'end', color: 'red', x: 500, y: 250, r: 50, width: 20, alpha: 1},{type: 'end', color: 'red', x: 250, y: 100, r: 30, width: 20, alpha: 1}];
        this.t = true;
        this.init();
    };

    this.init();

};
