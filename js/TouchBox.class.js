TouchBox = function(){

    var newThis = this;

    this.ringObj = { rings: [],
        animParam: { startRadius: 0, startWidth: 0, startAlpha: 0, startSteps: 20, moveRadius: 20, moveWidth: 5, moveAlpha: 1, moveSteps: 30, endRadius: 20, endWidth: 5, endAlpha: 1, endSteps: 50 },
        drawRing: function(ring){

            var x = ring.x;
            var y = ring.y;
            var a = ring.alpha;
            var r = ring.r;
            var w = ring.width;

            newThis.mainCtx.globalAlpha = a;
            newThis.mainCtx.strokeStyle = ring.color;
            newThis.mainCtx.lineWidth = w;
            newThis.mainCtx.beginPath();
            newThis.mainCtx.arc(x,y,r,0,2*Math.PI);
            newThis.mainCtx.stroke();

        },
        changeRing: function(type,col,id,x,y){
            var newx = newThis.screenToCanvas(x,y)[0];
            var newy = newThis.screenToCanvas(x,y)[1];

            var r = this.animParam[type+'Radius'];
            var w = this.animParam[type+'Width'];
            var a = this.animParam[type+'Alpha'];

            this.rings.push({id: id, type: type, color: col, x: newx, y: newy, r: r, width: w, alpha: a});
            newThis.intervalOn(id);
        },
        drawAllRings: function(){
            newThis.mainCtx.clearRect(0,0,newThis.mainCanvas.width,newThis.mainCanvas.height);

            var stepsStart = this.animParam.startSteps;
            var stepsMove = this.animParam.moveSteps;
            var stepsEnd = this.animParam.endSteps;
            var maxRadius = this.animParam.moveRadius;
            var maxWidth = this.animParam.moveWidth;
            var maxAlpha = this.animParam.moveAlpha;

            for (var rId in this.rings)
            {
                this.drawRing(this.rings[rId]);
                if(this.rings[rId].type=='start'){
                    this.rings[rId].alpha = this.rings[rId].alpha + maxAlpha/stepsStart;
                    this.rings[rId].width = this.rings[rId].width + maxWidth/stepsStart;
                    this.rings[rId].r = this.rings[rId].r + maxRadius/stepsStart;
                    if(this.rings[rId].r > maxRadius){
                        newThis.intervalOff(this.rings[rId].id);
                        this.rings.splice(rId,1);
                    }
                }
                else if(this.rings[rId].type=='move'){
                    this.rings[rId].alpha = this.rings[rId].alpha - maxAlpha/stepsMove;
                    if(this.rings[rId].alpha < maxAlpha/stepsMove){
                        newThis.intervalOff(this.rings[rId].id);
                        this.rings.splice(rId,1);
                    }
                }
                else if(this.rings[rId].type=='end'){
                    this.rings[rId].alpha = this.rings[rId].alpha - maxAlpha/stepsEnd;
                    this.rings[rId].width = this.rings[rId].width - maxWidth/stepsEnd;
                    this.rings[rId].r = this.rings[rId].r - maxRadius/stepsEnd;
                    if(this.rings[rId].r < 1){
                        newThis.intervalOff(this.rings[rId].id);
                        this.rings.splice(rId,1);
                    }
                }
            }
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
        this.interval[i] = setInterval(function(){newThis.ringObj.drawAllRings();},1);
    };
    this.intervalOff = function(i){
        clearInterval(this.interval[i]);
    };

    this.screenToCanvas = function(x,y){
        var newx = x - 12;
        var newy = y - 12;
        return [newx,newy];
    };

    this.init();

};
