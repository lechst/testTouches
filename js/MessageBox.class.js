MessageBox = function(){

    this.init = function(){
        this.mainCtnr = document.getElementById('mainDiv');
        this.mainMessageTouches = document.getElementsByClassName('info')[0];
        this.mainMessageTarget = document.getElementsByClassName('info')[1];
        this.mainMessageChanged = document.getElementsByClassName('info')[2];
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
