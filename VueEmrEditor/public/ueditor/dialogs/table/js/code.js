//初始化
var code;
//获取选择器
var $canvas = document.getElementById("login_validate");
var $input = document.getElementById("code"); 
//生成code
function createCode(){
    //canvas准备中
    var ctx = $canvas.getContext('2d');
    var width = $canvas.width;
    var height = $canvas.height;
    //清空画布
    ctx.clearRect(0,0,width,height);
    //上背景色
    ctx.fillStyle="#f2f2f2";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle="#3297fd";
    //初始化翻转值
    var flip = 1;
    ctx.font="italic bolder 20px 'Arial'";
    
    //清空code
    code = "";
    //验证码的长度
    var codeLength = 6; 
    //所有候选组成验证码的字符，当然也可以用中文的
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    //在数组中任意选择6个字
    for(var i = 0; i < codeLength; i++){
        //获取数组中随机一个字
        var charNum = Math.round( Math.random() * (codeChars.length-1) );
        //将code累加
        code += codeChars[charNum];
        //描绘canvas
        //翻转正负用于计算rotate
        flip = i%2?-1:1;
        ctx.save();
        ctx.rotate(Math.round(3*Math.random())*flip*Math.PI/180);
        ctx.fillText(codeChars[charNum],(width * (0.1+0.14*i)),22+Math.round(8*Math.random()));
        ctx.restore();
    }
}
//默认执行一次-刷新检验码
createCode();
//点击canvas刷新
$canvas.onclick = createCode;