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

    this.bindMouseEvents = function() {
        this.view.mainTouchBox.addEventListener('click',this.clickEvent());
    };

    this.bindTouchEvents = function() {
        this.view.mainTouchBox.addEventListener('touchstart',this.touchStart(),false);
        this.view.mainTouchBox.addEventListener('touchmove',this.touchMove(),false);
        this.view.mainTouchBox.addEventListener('touchend',this.touchEnd(),false);
    };

    this.bindGestureEvents = function() {
        this.view.mainTouchBox.addEventListener('gesturestart',this.gestureStart(),false);
        this.view.mainTouchBox.addEventListener('gesturechange',this.gestureChange(),false);
        this.view.mainTouchBox.addEventListener('gestureend',this.gestureEnd(),false);
    };

    this.getMessageParametersOfCertainType = function(touchArray,type){
        this.view.clearMessage(type);
        for(var i=0; i < touchArray.length; i++){
            var x = touchArray[i].pageX;
            var y = touchArray[i].pageY;
            var id = this.fingerId[touchArray[i].identifier];
            var col = this.view.colors[id];
            this.view.addMessage(type,col,x,y);
        }
    };

    this.getMessageParameters = function(e) {

        this.getMessageParametersOfCertainType(e.touches,'touches');
        this.getMessageParametersOfCertainType(e.targetTouches,'target');
        this.getMessageParametersOfCertainType(e.changedTouches,'changed');

    };

    this.touchEventLoops = function(e,type){
        e.preventDefault();
        for(var i=0; i < e.changedTouches.length; i++){
            var x = e.changedTouches[i].pageX;
            var y = e.changedTouches[i].pageY;
            var id = this.eventId;
            this.eventId++;
            if(type=='start'){
                this.view.startRing(id,x,y);
                this.fingerId[e.changedTouches[i].identifier] = id;
            }
            else if(type=='move'){
                var prevId = this.fingerId[e.changedTouches[i].identifier];
                this.view.moveRing(id,prevId,x,y);
            }
            else if(type=='end'){
                var prevId = this.fingerId[e.changedTouches[i].identifier];
                this.view.endRing(id,prevId,x,y);
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

            that.view.startRing(id,x,y);

            var prevId = that.fingerId[e.identifier];
            var col = that.view.colors[prevId];

            that.view.clearMessage('touches');
            that.view.addMessage('touches',col,x,y);

            that.view.clearMessage('target');
            that.view.addMessage('target',col,x,y);

            that.view.clearMessage('changed');
            that.view.addMessage('changed',col,x,y);

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
            that.init();
        }

    };

    this.init();

};
