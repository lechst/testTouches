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
        $('#touchBox')[0].addEventListener('click',this.clickEvent());
    };

    this.bindTouchEvents = function() {
        $('#touchBox')[0].addEventListener('touchstart',this.touchStart(),false);
        $('#touchBox')[0].addEventListener('touchmove',this.touchMove(),false);
        $('#touchBox')[0].addEventListener('touchend',this.touchEnd(),false);
        //$('body')[0].addEventListener('touchcancel',this.touchCancel(),false);
    };

    this.bindGestureEvents = function() {
        $('#touchBox')[0].addEventListener('gesturestart',this.gestureStart(),false);
        $('#touchBox')[0].addEventListener('gesturechange',this.gestureChange(),false);
        $('#touchBox')[0].addEventListener('gestureend',this.gestureEnd(),false);
    };

    this.getMessageParameters = function(e) {
        this.view.clearMessage('touches');
        for(var i=0; i < e.touches.length; i++){
            var x = e.touches[i].pageX;
            var y = e.touches[i].pageY;
            var id = this.fingerId[e.touches[i].identifier];
            var col = this.view.colors[id];
            this.view.addMessage('touches',col,x,y);
        }

        this.view.clearMessage('target');
        for(var i=0; i < e.targetTouches.length; i++){
            var x = e.targetTouches[i].pageX;
            var y = e.targetTouches[i].pageY;
            var id = this.fingerId[e.targetTouches[i].identifier];
            var col = this.view.colors[id];
            this.view.addMessage('target',col,x,y);
        }

        this.view.clearMessage('changed');
        for(var i=0; i < e.changedTouches.length; i++){
            var x = e.changedTouches[i].pageX;
            var y = e.changedTouches[i].pageY;
            var id = this.fingerId[e.changedTouches[i].identifier];
            var col = this.view.colors[id];
            this.view.addMessage('changed',col,x,y);
        }
    };

    this.touchStart = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            for(var i=0; i < e.changedTouches.length; i++){
                var x = e.changedTouches[i].pageX;
                var y = e.changedTouches[i].pageY;
                var id = that.eventId;
                that.eventId++;
                that.view.startRing(id,x,y);
                that.fingerId[e.changedTouches[i].identifier] = id;
            }

            that.getMessageParameters(e);
        }
    };

    this.touchMove = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            for(var i=0; i < e.changedTouches.length; i++){
                var x = e.changedTouches[i].pageX;
                var y = e.changedTouches[i].pageY;
                var id = that.eventId;
                var prevId = that.fingerId[e.changedTouches[i].identifier];
                that.eventId++;
                that.view.moveRing(id,prevId,x,y);
            }

            that.getMessageParameters(e);
        }
    };

    this.touchEnd = function(){
        var that = this;
        return function(e){
            e.preventDefault();

            for(var i=0; i < e.changedTouches.length; i++){
                var x = e.changedTouches[i].pageX;
                var y = e.changedTouches[i].pageY;
                var id = that.eventId;
                var prevId = that.fingerId[e.changedTouches[i].identifier];
                that.eventId++;
                that.view.endRing(id,prevId,x,y);
            }

            that.getMessageParameters(e);
        }
    };

    this.touchCancel = function(){
        var that = this;
        return function(e){
            e.preventDefault();
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
