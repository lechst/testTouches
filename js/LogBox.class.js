LogBox = function(){

    var newThis = this;

    this.init = function(){

        this.mainMessageBox = document.getElementById('messageBox');
        this.mainTouchBox = document.getElementById('touchBox');
        this.mainLogBox = document.getElementById('messageLogBox');
        this.mainLogBox.innerHTML = '<p class="logInstr">Touch here to show the log-box.</p>';
        this.mainLogInstr = document.getElementsByClassName('logInstr')[0];
        this.mainMessageBox.height = this.mainMessageBox.offsetHeight;
        this.mainLogBox.height = this.mainLogBox.offsetHeight;
        this.mainLogBox.initialHeight = this.mainLogBox.offsetHeight;
        this.mainLogBox.finalHeight = this.mainMessageBox.offsetHeight + this.mainTouchBox.offsetHeight + 5;

    };

    this.intervalShowOn = function(){
        this.intervalShow = setInterval(function(){newThis.showLogBox();},1);
    };
    this.intervalShowOff = function(){
        clearInterval(this.intervalShow);
    };

    this.showLogBox = function(){

        this.mainLogBox.height += 5;
        this.mainLogBox.style.height = this.mainLogBox.height + 'px';

        if(this.mainLogBox.height >= this.mainLogBox.finalHeight){
            this.mainLogInstr.innerHTML = 'Touch here to hide the log-box.';
            this.intervalShowOff();
        }

    };

    this.intervalHideOn = function(){
        this.intervalHide = setInterval(function(){newThis.hideLogBox();},1);
    };
    this.intervalHideOff = function(){
        clearInterval(this.intervalHide);
    };

    this.hideLogBox = function(){

        this.mainLogBox.height -= 5;
        this.mainLogBox.style.height = this.mainLogBox.height + 'px';

        if(this.mainLogBox.height <= this.mainLogBox.initialHeight){
            this.mainLogInstr.innerHTML = 'Touch here to show the log-box.';
            this.intervalHideOff();
        }

    };

    this.init();

};
