View = function() {

    this.init = function(){

        this.mainLayout();

    };

    this.mainLayout = function(){

        this.mainBody = document.body;
        this.mainBody.innerHTML = '<div id="mainDiv"><div id="touchBox"><canvas></canvas><div id="targetBox"></div></div><div id="messageBox"><div id="messageTouchBox"><div id="messageTouchesBox"><p class="title">touches:</p><div class="info"></div></div><div id="messageTargetBox"><p class="title">target:</p><div class="info"></div></div><div id="messageChangedBox"><p class="title">changed:</p><div class="info"></div></div></div></div></div>';
        this.mainCtnr = document.getElementById('mainDiv');
        this.mainCanvas = this.mainCtnr.getElementsByTagName('canvas')[0];
        this.mainCanvas.width = this.mainCanvas.offsetWidth;
        this.mainCanvas.height = this.mainCanvas.offsetHeight;
        this.mainCtx = this.mainCanvas.getContext('2d');
        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);
        this.mainTouchBox = document.getElementById('touchBox');
        this.mainMessageTouches = document.getElementsByClassName('info')[0];
        this.mainMessageTarget = document.getElementsByClassName('info')[1];
        this.mainMessageChanged = document.getElementsByClassName('info')[2];

    };

    this.rings = [];

    this.colors = [];

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

    this.drawAllRings = function(){

        this.mainCtx.clearRect(0,0,this.mainCanvas.width,this.mainCanvas.height);

        var that = this;
        var stepsStart = 20;
        var stepsMove = 30;
        var stepsEnd = 50;

        for (var rId in this.rings)
        {
            this.drawRing(this.rings[rId]);
            if(this.rings[rId].type=='start'){
                this.rings[rId].alpha = this.rings[rId].alpha + 1/stepsStart;
                this.rings[rId].width = this.rings[rId].width + 5/stepsStart;
                this.rings[rId].r = this.rings[rId].r + 20/stepsStart;
                if(this.rings[rId].r > 20){
                    this.intervalOff(this.rings[rId].id);
                    this.rings.splice(rId,1);
                }
            }
            else if(this.rings[rId].type=='move'){
                this.rings[rId].alpha = this.rings[rId].alpha - 1/stepsMove;
                if(this.rings[rId].alpha < 1/stepsMove){
                    this.intervalOff(this.rings[rId].id);
                    this.rings.splice(rId,1);
                }
            }
            else if(this.rings[rId].type=='end'){
                this.rings[rId].alpha = this.rings[rId].alpha - 1/stepsEnd;
                this.rings[rId].width = this.rings[rId].width - 5/stepsEnd;
                this.rings[rId].r = this.rings[rId].r - 20/stepsEnd;
                if(this.rings[rId].r < 1){
                    this.intervalOff(this.rings[rId].id);
                    this.rings.splice(rId,1);
                }
            }
        }

    };

    this.resizeLayout = function(h,w) {
        this.rings = [];
        this.interval = [];
        this.init();
    };

    this.screenToCanvas = function(x,y){
        var newx = x - 12;
        var newy = y - 12;
        return [newx,newy];
    };

    this.generateColor = function(){
        var h = Math.floor(Math.random()*360);
        var s = 100;
        var l = 50;
        var color = 'hsl('+h+','+s+'%,'+l+'%)';
        return color;
    };

    this.startRing = function(id,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.generateColor();
        this.rings.push({id: id, type: 'start', color: col, x: newx, y: newy, r: 0, width: 0, alpha: 0});
        this.colors[id] = col;
        this.intervalOn(id);
    };

    this.moveRing = function(id,prevId,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.colors[prevId];
        this.rings.push({id: id, type: 'move', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.intervalOn(id);
    };

    this.endRing = function(id,prevId,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.colors[prevId];
        this.rings.push({id: id, type: 'end', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.intervalOn(id);
    };

    this.clearMessage = function(type){
        if(type=='touches'){
            this.mainMessageTouches.innerHTML = '';
        }
        else if(type=='target'){
            this.mainMessageTarget.innerHTML = '';
        }
        else if(type=='changed'){
            this.mainMessageChanged.innerHTML = '';
        }
    };

    this.addMessage = function(type,col,x,y){
        if(type=='touches'){
            this.mainMessageTouches.innerHTML = this.mainMessageTouches.innerHTML + '<p class="infoP" style="color:'+col+';">('+x+','+y+')</p>';
        }
        else if(type=='target'){
            this.mainMessageTarget.innerHTML = this.mainMessageTarget.innerHTML + '<p class="infoP" style="color:'+col+';">('+x+','+y+')</p>';
        }
        else if(type=='changed'){
            this.mainMessageChanged.innerHTML = this.mainMessageChanged.innerHTML + '<p class="infoP" style="color:'+col+';">('+x+','+y+')</p>';
        }
    };

    this.init();

};






























