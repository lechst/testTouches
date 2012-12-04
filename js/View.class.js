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

    this.generateColor = function(){
        var h = Math.floor(Math.random()*360);
        var s = 100;
        var l = 50;
        var color = 'hsl('+h+','+s+'%,'+l+'%)';
        return color;
    };

    this.getColor = function(id){
        return this.colors[id];
    };

    this.setColor = function(col,id){
        this.colors[id] = col;
    };

    this.init();

};






























