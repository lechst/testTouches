MessageBox = function(){

    this.init = function(){
        this.mainCtnr = document.getElementById('mainDiv');
        this.mainMessageTouches = document.getElementsByClassName('info')[0];
        this.mainMessageTarget = document.getElementsByClassName('info')[1];
        this.mainMessageChanged = document.getElementsByClassName('info')[2];
    };

    this.clearMessage = function(type){
        this['mainMessage'+type].innerHTML = '';
    };

    this.singleMessage = function(col,x,y){
        return '<p class="infoP" style="color:'+col+';">('+x+','+y+')</p>';
    };

    this.addMessage = function(type,col,x,y){
        this['mainMessage'+type].innerHTML = this['mainMessage'+type].innerHTML + this.singleMessage(col,x,y);
    };

    this.init();

};
