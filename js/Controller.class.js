Controller = function(){

    this.view = new View();

    this.init = function(){

        this.bindResizeEvents();

    };

    this.bindResizeEvents = function() {
        window.addEventListener('resize', this.checkWindowSize(), false);
        window.addEventListener('orientationchange', this.checkWindowSize(), false);
    };

    this.checkWindowSize = function(){

        var that = this;

        return function(){
            var h = window.innerHeight;
            var w = window.innerWidth;
            that.view.resizeLayout(h,w);
        }

    };

    this.init();

};
