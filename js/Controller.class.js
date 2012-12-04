Controller = function(){

    this.view = new View();

    this.eventId = 0;
    this.fingerId = [];

    this.init = function(){

        this.device = this.checkDevice();

        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            this.bindTouchEvents();
            //this.bindGestureEvents();
            //this.bindMouseEvents();
        } else {
            this.bindMouseEvents();
        }

        this.bindResizeEvents();

    };

    this.mainTouchBox = document.getElementById('touchBox');

    this.bindMouseEvents = function() {
        this.mainTouchBox.addEventListener('click',this.clickEvent());
    };

    this.bindTouchEvents = function() {
        this.mainTouchBox.addEventListener('touchstart',this.touchStart(),false);
        this.mainTouchBox.addEventListener('touchmove',this.touchMove(),false);
        this.mainTouchBox.addEventListener('touchend',this.touchEnd(),false);
    };

    this.bindGestureEvents = function() {
        this.mainTouchBox.addEventListener('gesturestart',this.gestureStart(),false);
        this.mainTouchBox.addEventListener('gesturechange',this.gestureChange(),false);
        this.mainTouchBox.addEventListener('gestureend',this.gestureEnd(),false);
    };

    this.getMessageParametersOfCertainType = function(touchArray,type){
        this.view.messageBox.clearMessage(type);
        for(var i=0; i < touchArray.length; i++){
            var x = touchArray[i].pageX;
            var y = touchArray[i].pageY;
            var id = this.fingerId[touchArray[i].identifier];
            var col = this.view.getColor(id);
            this.view.messageBox.addMessage(type,col,x,y);
        }
    };

    this.getMessageParameters = function(e) {

        this.getMessageParametersOfCertainType(e.touches,'Touches');
        this.getMessageParametersOfCertainType(e.targetTouches,'Target');
        this.getMessageParametersOfCertainType(e.changedTouches,'Changed');

    };

    this.touchEventLoops = function(e,type){
        e.preventDefault();
        for(var i=0; i < e.changedTouches.length; i++){
            var x = e.changedTouches[i].pageX;
            var y = e.changedTouches[i].pageY;
            var id = this.eventId;
            this.eventId++;
            if(type=='start'){
                var col = this.view.generateColor();
                this.view.setColor(col,id);
                this.view.touchBox.startRing(col,id,x,y);
                this.fingerId[e.changedTouches[i].identifier] = id;
            }
            else if(type=='move'){
                var prevId = this.fingerId[e.changedTouches[i].identifier];
                var col = this.view.getColor(prevId);
                this.view.touchBox.moveRing(col,id,x,y);
            }
            else if(type=='end'){
                var prevId = this.fingerId[e.changedTouches[i].identifier];
                var col = this.view.getColor(prevId);
                this.view.touchBox.endRing(col,id,x,y);
            }
        }
        this.getMessageParameters(e);
    };

    this.touchStart = function(){
        var that = this;
        return function(e){
            that.touchEventLoops(e,'start');
        }
    };

    this.touchMove = function(){
        var that = this;
        return function(e){
            that.touchEventLoops(e,'move');
        }
    };

    this.touchEnd = function(){
        var that = this;
        return function(e){
            that.touchEventLoops(e,'end');
        }
    };

    this.gestureStart = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.gestureChange = function(){
        var that = this;
        return function(e){
            e.preventDefault();

        }
    };

    this.gestureEnd = function(){
        var that = this;
        return function(e){
            e.preventDefault();
        }
    };

    this.clickEvent = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            var x = e.pageX;
            var y = e.pageY;
            var id = that.eventId;
            that.eventId++;

            that.fingerId[e.identifier] = id;

            var col = that.view.generateColor();
            that.view.setColor(col,id);
            that.view.touchBox.startRing(col,id,x,y);

            that.view.messageBox.clearMessage('Touches');
            that.view.messageBox.addMessage('Touches',col,x,y);

            that.view.messageBox.clearMessage('Target');
            that.view.messageBox.addMessage('Target',col,x,y);

            that.view.messageBox.clearMessage('Changed');
            that.view.messageBox.addMessage('Changed',col,x,y);

        }
    };

    this.checkDevice = function(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/iPhone/),
            ipod: ua.match(/iPod/),
            ipad: ua.match(/iPad/),
            blackberry: ua.match(/BlackBerry/),
            android: ua.match(/Android/),
            chrome: ua.match(/Chrome/),
            firefox: ua.match(/Firefox/)
        };
        return checker;
    };

    this.bindResizeEvents = function() {
        if(this.device.iphone||this.device.ipad||this.device.ipod) {
            window.addEventListener('orientationchange', this.checkWindowSize(), false);
        } else {
            window.addEventListener('resize', this.checkWindowSize(), false);
        }
    };

    this.checkWindowSize = function(){

        var that = this;

        return function(e){
            e.preventDefault();
            if(that.device.iphone||that.device.ipad||that.device.ipod) {
                window.removeEventListener('orientationchange',arguments.callee,false);
            } else {
                window.removeEventListener('resize',arguments.callee,false);
            }
            that.eventId = 0;
            that.fingerId = [];
            var h = window.innerHeight;
            var w = window.innerWidth;
            that.view.resizeLayout(h,w);
            that.mainTouchBox = document.getElementById('touchBox');
            that.init();
        }

    };

    this.init();

};
