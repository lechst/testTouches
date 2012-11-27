View = function() {

    this.init = function(){

        this.mainLayout();

    };

    this.mainLayout = function(){

        $('body').empty().append('<div id="mainDiv"><div id="touchBox"><canvas></canvas><div id="targetBox"></div></div><div id="messageBox"></div></div>');

    };

    this.resizeLayout = function(h,w) {
        //this.mainLayout();
    };

    this.init();

};
