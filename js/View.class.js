View = function() {

    this.init = function(){

        this.colors = [];
        this.mainLayout();
        this.touchBox = new TouchBox();
        this.messageBox = new MessageBox();

    };

    this.mainLayout = function(){

        this.mainBody = document.body;
        this.mainBody.innerHTML = '<div id="mainDiv"><div id="touchBox"><canvas></canvas><div id="targetBox"></div></div><div id="messageBox"><div id="messageTouchBox"><div id="messageTouchesBox"><p class="title">touches:</p><div class="info"></div></div><div id="messageTargetBox"><p class="title">target:</p><div class="info"></div></div><div id="messageChangedBox"><p class="title">changed:</p><div class="info"></div></div></div></div></div>';

    };

    this.resizeLayout = function(h,w) {
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
        this.touchBox.rings.push({id: id, type: 'start', color: col, x: newx, y: newy, r: 0, width: 0, alpha: 0});
        this.colors[id] = col;
        this.touchBox.intervalOn(id);
    };

    this.moveRing = function(id,prevId,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.colors[prevId];
        this.touchBox.rings.push({id: id, type: 'move', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.touchBox.intervalOn(id);
    };

    this.endRing = function(id,prevId,x,y){
        var newx = this.screenToCanvas(x,y)[0];
        var newy = this.screenToCanvas(x,y)[1];
        var col = this.colors[prevId];
        this.touchBox.rings.push({id: id, type: 'end', color: col, x: newx, y: newy, r: 20, width: 5, alpha: 1});
        this.touchBox.intervalOn(id);
    };

    this.init();

};






























