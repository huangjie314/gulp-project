$(function () {
    console.log('');
    var $regForm = $('#regist-form');
    var util = {
        Regex: {
            MOBILE: /^1\d{10}$/,
            ISCODE: /^[0-9]{6}$/i,
            ISPWD :  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        },
        changeRegState: function(state){
            var $regBtn = $regForm.find('#register-btn');
            if(state === 'registering') {
                $regBtn.data('state', 'registering').text('注册中...');
            } else {
                $regBtn.data('state', null).text('注册领红包');
            }
        }
    }
    var validateMethods = {
        phone: function () {
            var target = $regForm.find('#phone');
            var val = target.val();
            var msgBox = target.siblings('.msg');
            if ($.trim(val) != "") {
                if (util.Regex.MOBILE.test(val)) {
                    msgBox.html("").removeClass('error-msg');
                    return true;
                } else {
                    msgBox.html("输入手机号码格式不正确").addClass('error-msg');
                    return false;
                }
            } else {
                msgBox.html("手机号码不能为空").addClass('error-msg');
                return false;
            }
        },
        password: function () {
            var target = $regForm.find('#pwd');
            var val = target.val();
            var msgBox = target.siblings('.msg');
            if (val.indexOf(" ") > -1) {
                msgBox.html("密码不允许含有空格").addClass('error-msg');
                return false;
            }
            if ($.trim(val) != "") {
                if (util.Regex.ISPWD.test(val)) {
                    msgBox.html("").removeClass('error-msg');
                    return true;
                } else {
                    msgBox.html("密码格式错误，必须为6-16个字符(包含字母+数字)").addClass('error-msg');
                    return false;
                }
            }
            else {
                msgBox.html("密码不能为空").addClass('error-msg');
                return false;
            }
        },
        imgCode: function () {
            var target = $regForm.find('#imgcode');
            var val = target.val();
            var msgBox = target.siblings('.msg');
            if ($.trim(val) == "") {
                msgBox.html("图形验证码不能为空").addClass('error-msg');
                return false;
            } else {
                msgBox.html('').removeClass('error-msg');
                return true;
            }
        },
        telCode: function () {
            var target = $regForm.find('#identifycode');
            var val = target.val();
            var msgBox = target.siblings('.msg');
            if ($.trim(val) != "") {
                if (util.Regex.ISCODE.test(val)) {
                    msgBox.html("").removeClass('error-msg');
                    return true;
                }  else {
                    msgBox.html("验证码错误,请重新输入").addClass('error-msg');
                    return false;
                }
            } else {
                msgBox.html("请输入验证码").addClass('error-msg');
                return false;
            }
        }
    }
    var registAction = function(e){
        e.preventDefault();
        //注册请求中，防止多次点击导致多次发生请求
        if($(this).data('state') === 'registering') {
            return false;
        }
        $regForm.find('.form-control').each(function(){
            var $this = $(this);
            $this.trigger('blur');
        });
        var errorMsg = $regForm.find('.error-msg');
        if(errorMsg.length > 0) { return ;}

        $.ajax({
            url: '?t='+Math.random()*1000,
            type: 'post',
            data: $regForm.serialize(),
            beforeSend: function(){
                util.changeRegState('registering');
            },
            success: function(res){
                if(res.success){
                    location.href = "";
                } else {
                    util.changeRegState();
                    alert(res.msg || '注册失败，请重新注册！');
                }
            },
            error: function(){
                util.changeRegState();
                alert('注册失败，请重新注册！');
            }
        })

    }

    $regForm.on('blur', 'input.form-control', function(){
        var $this = $(this);
        var flag = $this.data('flag');
        if(flag === 'phone') {
            validateMethods.phone();
        } else if(flag === 'password') {
            validateMethods.password();
        } else if(flag === 'imgcode') {
            validateMethods.imgCode();
        } else if(flag === 'identifycode') {
            validateMethods.telCode();
        }
    });
    $regForm.on('focus', 'input.form-control', function(){
        var msgBox = $(this).siblings('.msg');
        msgBox.html('').removeClass('error-msg');
    });
    $regForm.on('click', '#register-btn', registAction);

    // 弹窗
    $('#packet').on('click', function(){
        $('.newcomer-packet').css('display','block');
    }) 
    $('#jdcard').on('click', function(){
        $('.jdcard-rule').css('display','block');
    }) 
    $('#bbin').on('click',function(){
        $('.newcomer-bbin').css('display','block');
    })
    $('#member').on('click', function(){
        $('.member-rights').css('display','block');
    })
    $('.newcomer-packet').on('click', '.close', function(){
        var $box = $('.newcomer-packet');
        $box.css('display','none');
    })
    $('.jdcard-rule').on('click', '.close', function(){
        var $box = $('.jdcard-rule');
        $box.css('display','none');
    })
    $('.newcomer-bbin').on('click', '.close', function(){
        var $box = $('.newcomer-bbin');
        $box.css('display','none');
    })
    $('.member-rights').on('click', '.close', function(){
        var $box = $('.member-rights');
        $box.css('display','none');
    })
});
