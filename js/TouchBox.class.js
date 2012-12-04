TouchBox = function(){

    var newThis = this;

    this.ringObj = { rings: [],
        drawRing: function(that,ring){

            var x = ring.x;
            var y = ring.y;
            var a = ring.alpha;
            var r = ring.r;
            var w = ring.width;

            that.mainCtx.globalAlpha = a;
            that.mainCtx.strokeStyle = ring.color;
            that.mainCtx.lineWidth = w;
            that.mainCtx.beginPath();
            that.mainCtx.arc(x,y,r,0,2*Math.PI);
            that.mainCtx.stroke();

        },
        changeRing: function(type,col,id,x,y){
            var newx = newThis.screenToCanvas(x,y)[0];
            var newy = newThis.screenToCanvas(x,y)[1];
            if(type=='start'){
                var r = 0;
                var w = 0;
                var a = 0;
            }
            else if(type=='move'){
                var r = 20;
                var w = 5;
                var a = 1;
            }
            else if(type=='end'){
                var r = 20;
                var w = 5;
                var a = 1;
            }
            this.rings.push({id: id, type: type, color: col, x: newx, y: newy, r: r, width: w, alpha: a});
            newThis.intervalOn(id);
        }
    };

    this.init = function(){

        this.interval = [];
        this.ringObj.rings = [];

        this.mainCtnr = document.getElementById('mainDiv');
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = this.mainCanvas.offsetWidth;
        this.mainCanvas.height = this.mainCanvas.offsetHeight;
        this.mainCtx = this.mainCanvas.getContext('2d');
        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);
        this.mainTouchBox = document.getElementById('touchBox');
    };

    this.intervalOn = function(i){
        var that = this;
        this.interval[i] = setInterval(function(){that.drawAllRings();},1);
    };
    this.intervalOff = function(i){
        clearInterval(this.interval[i]);
    };

    this.drawAllRings = function(){

        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);

        var that = this;
        var stepsStart = 20;
        var stepsMove = 30;
        var stepsEnd = 50;

        for (var rId in this.ringObj.rings)
        {
            this.ringObj.drawRing(this,this.ringObj.rings[rId]);
            if(this.ringObj.rings[rId].type=='start'){
                this.ringObj.rings[rId].alpha = this.ringObj.rings[rId].alpha + 1/stepsStart;
                this.ringObj.rings[rId].width = this.ringObj.rings[rId].width + 5/stepsStart;
                this.ringObj.rings[rId].r = this.ringObj.rings[rId].r + 20/stepsStart;
                if(this.ringObj.rings[rId].r > 20){
                    this.intervalOff(this.ringObj.rings[rId].id);
                    this.ringObj.rings.splice(rId,1);
                }
            }
            else if(this.ringObj.rings[rId].type=='move'){
                this.ringObj.rings[rId].alpha = this.ringObj.rings[rId].alpha - 1/stepsMove;
                if(this.ringObj.rings[rId].alpha < 1/stepsMove){
                    this.intervalOff(this.ringObj.rings[rId].id);
                    this.ringObj.rings.splice(rId,1);
                }
            }
            else if(this.ringObj.rings[rId].type=='end'){
                this.ringObj.rings[rId].alpha = this.ringObj.rings[rId].alpha - 1/stepsEnd;
                this.ringObj.rings[rId].width = this.ringObj.rings[rId].width - 5/stepsEnd;
                this.ringObj.rings[rId].r = this.ringObj.rings[rId].r - 20/stepsEnd;
                if(this.ringObj.rings[rId].r < 1){
                    this.intervalOff(this.ringObj.rings[rId].id);
                    this.ringObj.rings.splice(rId,1);
                }
            }
        }

    };

    this.screenToCanvas = function(x,y){
        var newx = x - 12;
        var newy = y - 12;
        return [newx,newy];
    };

    this.init();

};
