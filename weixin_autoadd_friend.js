/*
power by auto.js
scripts from lcx1995
weixin_qunaddfriend auto.js scripts
since 2018.10.11

bug
1.添加到通讯录页面过长进入死等待
2.发送界面未知卡死 
*/

function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

toastLog('程序开始!');

var hello_word = "我是群主！"
var delay = 2000
var names = [];
var flag = true //双三层循环 开关锁
var grid;


//com.tencent.mm.chatroom.ui.ChatroomInfoUI 普通成员
//com.tencent.mm.chatroom.ui.SeeRoomMemberUI 全部成员
if(currentActivity()=="com.tencent.mm.chatroom.ui.ChatroomInfoUI"){//普通成员
    while(flag){
        list = id("cwt").find();
        for(var i = 0 ; i < list.size() ; i++){
            iline = list[i]//每一层linearlayout 含有 成员信息
            for(var j = 0 ; j < iline.childCount() ; j++){
                member_ob = iline.child(j)//成员 
                log(member_ob)
                if(member_ob.child(1).childCount()==0){//判断到最后一个结束
                    flag = false;  
                    break;
                }
                name  = member_ob.child(1).child(0).text()
                if(!isInArray(names,name)){//判断是否访问过
                    names.push(name);
                    log(name);
                    //添加好友操作
                    //com.tencent.mm.plugin.profile.ui.ContactInfoUI 添加
                    //com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI 发送添加信息
                    //直接就是好友 直接显示 发消息按键                
                    //com.tencent.mm.plugin.profile.ui.ContactInfoUI 如果点击 添加到通讯录 还是这个页面 有两种情况
                    //1.陌生人设置 不添加好友 需要两次返回操作
                    //2.直接添加成功 需要一次返回操作
                    //3.解决方案 依次执行返回 每次判断 activity is "com.tencent.mm.chatroom.ui.SeeRoomMemberUI" True break
                    //step 1 点击进去
                    member_ob.click()
                    sleep(delay)
                    //step 2 寻找发消息(awc)按键,寻找到直接back(),否则寻找添加到通讯录(awb)按键 点击
                    if(id("awc").find().empty()){//发消息
                        id("awb").findOne().click();//添加到通讯录
                        sleep(delay)
                        if(currentActivity()=="com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
                            //activity 没有改变
                            //1.直接添加 1次back
                            //2.直接拒绝 2次back
                            for(var j = 0 ; j < 2 ; j++){
                                back();
                                sleep(delay)
                                //如果回到群成员 跳出循环
                                if(currentActivity()=="com.tencent.mm.chatroom.ui.ChatroomInfoUI") break;
                            }
                        }else if(currentActivity()=="com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI"){
                            //发送添加消息页面
                            id("dny").findOne().setText(hello_word);
                            sleep(delay)
                            text("发送").findOne().click()
                            sleep(delay)
                            back()
                            sleep(delay)
                        }
                    }else{
                        //显示发送消息按键 直接back
                        back();
                        sleep(delay)
                    }
                    //finally 执行grid更新
                    list = id("cwt").find();
                    iline = list[i]//每一层linearlayout 含有 成员信息
                    sleep(delay)
                }
                if(!flag){//判断开关锁  break
                    break;
                }
            }
            if(!flag){
                break;
            }
        }
        if(flag){
            list.scrollDown();//翻页 元素需要重新获取!!!
            sleep(delay);
        }else{
            break;
        }
    }
}else if(currentActivity()=="com.tencent.mm.chatroom.ui.SeeRoomMemberUI"){//全部成员
    while(flag){
        grid = id("dri").findOne();
        for(var i = 0 ; i < grid.childCount() ; i++){
            if(grid.child(i).childCount()==1){//判断到最后一个结束
                flag = false;  
                break;
            }
            name  = grid.child(i).child(1).text()
            if(!isInArray(names,name)){//判断是否访问过
                names.push(name);
                log(name);
                //添加好友操作
                //com.tencent.mm.plugin.profile.ui.ContactInfoUI 添加
                //com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI 发送添加信息
                //直接就是好友 直接显示 发消息按键                
                //com.tencent.mm.plugin.profile.ui.ContactInfoUI 如果点击 添加到通讯录 还是这个页面 有两种情况
                //1.陌生人设置 不添加好友 需要两次返回操作
                //2.直接添加成功 需要一次返回操作
                //3.解决方案 依次执行返回 每次判断 activity is "com.tencent.mm.chatroom.ui.SeeRoomMemberUI" True break
                //step 1 点击进去
                grid.child(i).click()
                sleep(delay)
                //step 2 寻找发消息(awc)按键,寻找到直接back(),否则寻找添加到通讯录(awb)按键 点击
                if(id("awc").find().empty()){//发消息
                    id("awb").findOne().click();//添加到通讯录
                    sleep(delay)
                    if(currentActivity()=="com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
                        //activity 没有改变
                        //1.直接添加 1次back
                        //2.直接拒绝 2次back
                        for(var j = 0 ; j < 2 ; j++){
                            back();
                            sleep(delay)
                            //如果回到群成员 跳出循环
                            if(currentActivity()=="com.tencent.mm.chatroom.ui.SeeRoomMemberUI") break;
                        }
                    }else if(currentActivity()=="com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI"){
                        //发送添加消息页面
                        id("dny").findOne().setText(hello_word);
                        sleep(delay)
                        text("发送").findOne().click()
                        sleep(delay)
                        back()
                        sleep(delay)
                    }
                }else{
                    //显示发送消息按键 直接back
                    back();
                    sleep(delay)
                }
                //finally 执行grid更新
                grid = id("dri").findOne();
                sleep(delay)
            }
        }

        if(flag){
            grid.scrollDown();//翻页 元素需要重新获取!!!
            sleep(delay);
        }
    }
    log(names)
    toastLog("程序结束!")
}else{
    toastLog("程序出错!请点击全部群成员!并拖到顶部!")
}
