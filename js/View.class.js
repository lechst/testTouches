View = function() {

    this.init = function(){

        this.mainLayout();
        this.draw();

    };

    this.mainLayout = function(){

        $('body').empty().append('<div id="mainDiv"><div id="touchBox"><canvas></canvas><div id="targetBox"></div></div><div id="messageBox"></div></div>');
        this.mainCtnr = document.getElementById('mainDiv');
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = $('canvas').width();
        this.mainCanvas.height = $('canvas').height();
        this.mainCtx = this.mainCanvas.getContext('2d');

    };

    this.i = 0;

    this.draw = function(){

        var x = this.mainCanvas.width;
        var y = this.mainCanvas.height;
        var a = this.i/100;
        var r = Math.min(x/4,y/4)*this.i/100;
        var w = 20*this.i/100;

        this.mainCtx.clearRect(0,0,x,y);

        this.mainCtx.strokeStyle = 'rgba(255,0,0,'+a+')';
        this.mainCtx.lineWidth = w;
        this.mainCtx.beginPath();
        this.mainCtx.arc(x/2,y/2,r,0,2*Math.PI);
        this.mainCtx.stroke();

        this.i++;

        var that = this;

        if(this.i<100){
            setTimeout(function(){that.draw();},10);
        }

        if(this.i>=100){
            this.i=0;
        }

    };

    this.resizeLayout = function(h,w) {
        this.init();
    };

    this.init();

};
