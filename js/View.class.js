View = function() {

    this.init = function(){

        var h = window.innerHeight;
        var w = window.innerWidth;
        this.window.resize(h,w);
        this.mainLayout();

    };

    this.mainLayout = function(){

        var x = this.window.size()[0];
        var y = this.window.size()[1];

        $('body').empty().append('<div id="mainDiv"></div>');
        $('#mainDiv').append(x+' '+y);

    };

    this.window = { height: 0,
                    width: 0,
                    resize: function(h,w){
                        this.height = h;
                        this.width = w;
                    },
                    size: function(){
                        return [this.height, this.width];
                    }
    };

    this.resizeLayout = function(h,w) {
        this.window.resize(h,w);
        this.mainLayout();
    };

    this.init();

};
