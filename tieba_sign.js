//贴吧app 签到助手 脚本
delay = 1000

function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

var w = floaty.window(
    <vertical bg="#77ff0000">
        <text id="text">贴吧自动签到脚本</text>
        <button id="start" text="运行"/>
        <button id="stop" text="停止"/>
        <button id="close_" text="关闭"/>
    </vertical>
);

var thread;

w.start.click(function(){
    //通过getText()获取输入的内容
    thread = threads.start(function(){
        toast("贴吧自动签到开始");
        start();
    });
});

w.stop.click(function(){
    thread.interrupt();
    toast("停止签到");
});

w.close_.click(function(){
    toast("程序退出");
    exit();
});

setInterval(()=>{}, 1000);

function start(){
    flag = true
    names = []
    while(flag){
        name_collection=id("name").find()
        for(var i=0;i<name_collection.size();i++){
            if(!isInArray(names,name_collection.get(i).text())){
                names.push(name_collection.get(i).text());
                name_collection.get(i).parent().parent().click();
                sleep(delay);
                sign = id("tv_sign").findOne();
                if(sign.text() == "签到"){
                    sign.click();
                    sleep(delay);
                }
                id("navigationBarGoBack").findOne().click();
                sleep(delay);
                name_collection=id("name").find();
             }
         }
         if(!id("footer_text").find().empty()) flag = false;
         id("listview").findOne().scrollDown();
         toastLog(flag)
    }
    toast(names);
}