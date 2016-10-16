// This is a JavaScript file
//Global var
var nowQID="";
var nowQtext="";
var nextQID=1;
var yesOrNo="Y";
var resultAnswer="";
var CertificateID=0;
var answers=[];
var pcost=0;
var pname="";
var datetime="";
var db = window.openDatabase("Database", "1.0", "Questions", 200000);
//var question={};

//DB関連 https://docs.monaca.io/ja/sampleapp/tips/storage/
function createDB(){
    db.transaction(createTabels, errorCB, successCB);
} 
function createTabels(tx){
    tx.executeSql('DROP TABLE IF EXISTS Questions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Certificate (id unique, datetime, productName, productCost, Judgement)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CertificateDetails (CertificateId , questionNo, answer)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Questions (id unique, questionText, nextQuestionIdYes ,nextQuestionIdNo, resultAnswer)');
    //Questionsマスタデータ登録
    //1
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (1, "自己投資（書籍購入/ワークショップ参加）ですか？", 2,8,"")');
      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (2, "１回だけの出費ですか？",3,6,"")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (3, "自分の意志でなく、付き合いでの出費ですか？","",4,"購入ＮＧです。自分の意志でなく無駄な出費です。")');
　　      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (4, "生涯可処分所得（生涯賃金）の何％か考えましたか？",5,"","購入ＮＧです。購入額の妥当性を検討しましょう。")');
　　        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (5, "いつまでに、どうするか、目的は明確ですか？",999,"","購入ＮＧです。目的を明確にしましょう。")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (6, "総額が、生涯可処分所得（生涯賃金）の何％か考えましたか？",7,"","購入ＮＧです。購入額の妥当性を検討しましょう。")');
　　      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (7, "いつまでに、どうするか、目的は明確ですか？",999,"","購入ＮＧです。目的を明確にしましょう。")');
    //2
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (8, "冠婚葬祭、または誰かへのプレゼントですか？", 9, 11,"")');
      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (9, "予算内ですか？", "", 10,"購入ＮＧです。予算に収めましょう。")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (10, "プレゼントの名目で自分の購買欲を満たしていませんか？", "" ,999, "購入ＮＧです。購買欲をコントロールしましょう。")');

    //3
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (11, "生活必需品ですか？", 12, 20,"")');
      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (12, "ストックが家にあるか確認しましたか？", 13, 15,"")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (13, "必要な量ですか？消費期限以内で使い切れますか？", 14, "","購入ＮＧです。必要な量を購入しましょう。")');
          tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (14, "類似商品での比較検討は行いましたか？", 999, "","購入ＮＧです。比較検討を行いましょう。")');
      tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (15, "今すぐ必要ですか？", 16, 19,"")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (16, "消費期限以内で使い切れますか？", 17, "","購入ＮＧです。使い切れる量を購入しましょう。")');
          tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (17, "以前、同じ商品を破棄したことはありますか？", "",18,"購入ＮＧです。再度、購入量を検討しましょう。")');
            tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (18, "類似商品での比較検討は行いましたか？", 999, "","購入ＮＧです。比較検討を行いましょう。")');
        tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (19, "いつか使用すると考えての購入ですか？", "", "","購入ＮＧです。今すぐ必要か、ストックかが曖昧です。")');
    //4
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (20, "今すぐ必要ですか？", 21, 21,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (21, "付き合いでの購入ですか？", "", 22,"購入ＮＧです。付き合いで無駄遣いはやめましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (22, "２年以上使いますか？", 23, 23,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (23, "１カ月にい１回は利用しますか？", 24, 24,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (24, "利用期間と利用頻度が金額に見合っているか検証済みですか？", 25, "","購入ＮＧです。金額が利用期間と頻度に合っているか検討しましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (25, "予算オーバーですか？", 26, 27,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (26, "予算オーバー分は３カ月の生活費でリカバリ可能ですか？", 27, "","購入ＮＧです。予算内での購入を検討しましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (27, "類似商品での比較検討は行いましたか？", 28, 28,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (28, "中古品／未使用品の購入は検討しましたか？", 29, 29,"")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (29, "利用する上での必須機能を熟慮してますか？", 30, "","購入ＮＧです。必須機能を整理し、類似商品や中古/未使用品と比較しましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (30, "セールでの衝動買いですか？", "", 31,"購入ＮＧです。本当に必要か再度検討しましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (31, "限定品での衝動買いですか？", "", 32,"購入ＮＧです。本当に必要か再度検討しましょう。")');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuestionIdYes, nextQuestionIdNo, resultAnswer) VALUES (32, "捨てる時のことを考慮しましたか？", "", "","購入ＮＧです。本当に必要か、浪費でないか、再度検討しましょう。")');  
}

//----------SQL for Questions-----------------------------------------------------------
//次の質問情報をテーブルから取得し、グローバル変数へ設定。
function getNowQuestion(){
    db.transaction(getNowQuestionQuery, errorCB, successCB);    
}
function getNowQuestionQuery(tx) {
    //質問を取得
    tx.executeSql('SELECT * FROM Questions WHERE id == ?', [nowQID], 
    function(tx,res){
        if(res.rows.length===0){
            //質問が存在しない。Questionsマスタデータ不正。
            console.log("getQuestion return zero question. Questions's Table date fails.");
        }else if(res.rows.length>1){
            //質問が複数は存在しない。Questionsマスタデータ不正。
            console.log("getQuestion return more than one question. Questions's Table date fails.");
        }else{
            //グローバル変数へ設定
            nowQtext=res.rows.item(0).questionText;
            showQuestion();
        }
    }, errorCB);
}

function getNextQuestion(){
    //現在の質問の回答から、次の質問番号を取得
    var getNextQID = function(){
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                db.transaction(
                    function(tx){
                        tx.executeSql('SELECT * FROM Questions WHERE id == ?', [nowQID], 
                            function(tx,res){
                                if(res.rows.length===0){
                                    //質問が存在しない。Questionsマスタデータ不正。
                                    console.log("getQuestion return zero question. Questions's Table date fails.");
                                }else if(res.rows.length>1){
                                    //質問が複数は存在しない。Questionsマスタデータ不正。
                                    console.log("getQuestion return more than one question. Questions's Table date fails.");
                                }else{
                                    //グローバル変数へ設定
                                    if(yesOrNo==='Y'){
                                        nextQID=res.rows.item(0).nextQuestionIdYes;
                                        resultAnswer=res.rows.item(0).resultAnswer;
                                    }else{
                                        nextQID=res.rows.item(0).nextQuestionIdNo;
                                        resultAnswer=res.rows.item(0).resultAnswer;
                                    }
                                }
                            } 
                        ,errorCB);
                    }, 
                    errorCB,
                    successCB
                );
                resolve();
            }, 10);
        });
    };

    var setNextQID = function(tx){
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                db.transaction(
                    function(tx){
                        //取得した質問番号から、質問文を取得
                        if(nextQID===999){
                            //質問完了。診断結果を表示。
                            resultAnswer="購入ＯＫです。";
                            console.log(resultAnswer)
                            showCertificate();
                        }
                        if(nextQID===""){
                            //質問完了。診断結果を表示。
                            showCertificate();
                        }else{
                            tx.executeSql('SELECT * FROM Questions WHERE id == ?', [nextQID], 
                            function(tx,res){
                                if(res.rows.length===0){
                                    //質問が存在しない。Questionsマスタデータ不正。
                                    console.log("getQuestion return zero question. Questions's Table date fails.");
                                }else if(res.rows.length>1){
                                    //質問が複数は存在しない。Questionsマスタデータ不正。
                                    console.log("getQuestion return more than one question. Questions's Table date fails.");
                                }else{
                        //console.log("getQuestionQuery-berore------------------------");
                        //console.log("nowQID"+nowQID);
                        //console.log("nowQtext"+nowQtext);
                        //console.log("yesOrNo :"+yesOrNo)
                        //console.log("nextID: "+nextQID);
                        //console.log("-------------------------");
                                    //グローバル変数へ設定
                                    nowQID=res.rows.item(0).id;
                                    nowQtext=res.rows.item(0).questionText;
                        //console.log("getQuestionQuery-after------------------------");
                        //console.log("nowQID"+nowQID);
                        //console.log("nowQtext"+nowQtext);
                        //console.log("yesOrNo :"+yesOrNo)
                        //console.log("nextID: "+nextQID);
                        //console.log("-------------------------");
                                    showQuestion();
                                }
                            }, 
                            errorCB);
                        }
                    }, 
                    errorCB,
                    successCB
                );
                resolve();
            }, 10);
    });
    };
    getNextQID().then(setNextQID);
}
//--------------------------------------------------------------------------------------
//----------SQL for Certificate-----------------------------------------------------------
//Certificateへの登録に使用するgetCertificateIDを取得する
function getCertificateID(){
    db.transaction(getCertificateIDQuery, errorCB, successCB);
}
function getCertificateIDQuery(tx){
    //件数確認
    tx.executeSql('SELECT id FROM Certificate', [], 
    function(tx,res){
        if(res.rows.length===0){
            //データが存在しない場合、1を指定
            CertificateID=1;
        }else{
            //データがある場合、最大値を取得
            tx.executeSql('SELECT MAX(id) AS currentId FROM Certificate', [],
            function(tx,res2){
                console.log('SELECT MAX(id) FROM Certificate'+res2.rows.item(0).currentId)
                CertificateID=parseInt(res2.rows.item(0).currentId) + 1;
            }, errorCB);
        }
        console.log("CertificateID:"+CertificateID);
    }, errorCB);
}
//Certificateへデータを登録する
function registCertificate(judge_YorN){
    judgement=judge_YorN;
    getCertificateID();
    db.transaction(registCertificateQuery, errorCB, successCB);
    showBackHome();
}
function registCertificateQuery(tx){
    console.log("registCertificateQuery:"+CertificateID+":"+datetime+":"+pname+":"+pcost+":"+judgement);
    tx.executeSql('INSERT INTO Certificate (id, datetime, productName, productCost, Judgement) VALUES (?,?,?,?,?)',
    [CertificateID,datetime,pname,pcost,judgement],successCB, errorCB);
}
//--------------------------------------------------------------------------------------
//----------SQL for Common-----------------------------------------------------------
//Callback function when the transaction is failed.
function errorCB(err) {
    console.log("Error occured while executing SQL: "+err.code);
}

// Callback function when the transaction is success.
function successCB() {
    console.log("Success executing SQL");
}
//--------------------------------------------------------------------------------------

//******************reception******************
function addCost(money){
    var cost = $("#productCost").val();
    if(cost==="0"){
        if(money==="00"){
            money="0";
        }
        cost="";
    }
    var total = cost + money;
    $("#productCost").val(total);
};

function clearCost(){
    $("#productCost").val(0);
};
//*********************************************

function setFirstQuestion(){
    nowQID=1;
    answers=[];
    resultAnswer="";
    pcost = $("#productCost").val();
    pname = $("#productName").val();
    getCertificateID();
    getDatetime();
    getNowQuestion();
    //console.log("setFirst-------------------------");
    //console.log("nowQID"+nowQID);
    //console.log("nowQtext"+nowQtext);
    //console.log("yesOrNo :"+yesOrNo)
    //console.log("nextID: "+nextQID);
    //console.log("-------------------------");
};

function getDatetime(){
    // Dateオブジェクトを作成
    var dateObj = new Date() ;
    // 日時の各情報を取得
    var year = dateObj.getFullYear() ;    // 年
    var month = dateObj.getMonth() + 1 ;    // 月
    var date = dateObj.getDate() ;	// 日
    var hour = dateObj.getHours() ;	// 時
    var minute = dateObj.getMinutes() ;	// 分
    var second = dateObj.getSeconds() ;	// 秒
    
    // 表示用に組み立てる ( → 2016/7/2 15:57:1 )
    datetime = year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
}

function next(judgement){
    setAnswer(judgement);
    yesOrNo=judgement;
    getNextQuestion();
}

//質問を更新
function showQuestion(){
    $("#QuestionText").html(nowQtext);
}
//診断結果表示画面へ
function showCertificate(){
    $("#QuestionText").css({'visibility':'hidden'});
    $("#question_title").html("診断は完了です。");
    $("#button_yes_or_on").css({'visibility':'hidden'});
    $("#button_show_certificate").css({'visibility':'visible'});
    $("#QuestionText").hide();
    $("#button_yes_or_on").hide();
    $("#button_show_certificate").show();
}
//登録完了画面へ
function showBackHome(){
    $("#certificateTitle").html("ホーム画面へ戻ってください。");
    $("#certificateText").css({'visibility':'hidden'});
    $("#certificateList").css({'visibility':'hidden'});
    $("#certificateJudgement").css({'visibility':'hidden'});
    $("#certificateListBack").css({'visibility':'visible'});
    $("#certificateText").hide();
    $("#certificateList").hide();
    $("#certificateJudgement").hide();
    $("#certificateListBack").show();
}

function setAnswer(yesOrNo){
    console.log(yesOrNo);
    answers.push( { qid: nowQID, qtxt: nowQtext ,ans: yesOrNo } );
};

app.controller('certificateController',function($scope){
    $scope.result=resultAnswer;
    console.log(resultAnswer)
    $scope.datalist=answers;
});

app.controller('achievementController',function($scope){
    //-------achievement--------------------------------------------------------------------
    var ProductCostJudgementYes=0;
    var ProductCostJudgementNo=0;
    //http://susunshun.hatenablog.com/entry/2016/06/24/140130
    var getProductCostJudgement = function (){
        return new Promise(function(resolve, reject) {
            // タイムアウト値の設定は任意
            setTimeout(function(){
                db.transaction(
                    function(tx){
                        tx.executeSql('SELECT SUM(productCost) AS COUNT_YES FROM Certificate WHERE Judgement == ?'
                        , ['Y']
                        ,function(tx,res){
                            ProductCostJudgementYes=res.rows.item(0).COUNT_YES;
                        }
                        ,errorCB);
                    }, 
                    errorCB,
                    successCB
                );

                db.transaction(
                    function(tx){
                        tx.executeSql('SELECT SUM(productCost) AS COUNT_NO FROM Certificate WHERE Judgement == ?'
                        , ['N']
                        ,function(tx,res){
                            ProductCostJudgementNo=res.rows.item(0).COUNT_NO;
                        }
                        ,errorCB);
                    }, 
                    errorCB,
                    successCB
                );

                resolve();
            },100);
        });
    };

    var setScope = function(){
        return new Promise(function(resolv,reject){
            setTimeout(function(){
                $scope.count_no=ProductCostJudgementNo;
                $scope.count_yes=ProductCostJudgementYes;
                $scope.$apply();
            },100);
        });
    }

    getProductCostJudgement().then(setScope);
});

app.controller('recordController',function($scope){
    var cList=[];
    var getCertificateRecordList = function (){
        return new Promise(function(resolve, reject) {
            // タイムアウト値の設定は任意
            setTimeout(function(){
                db.transaction(
                    function(tx){
                        tx.executeSql('SELECT * FROM Certificate ORDER BY datetime DESC'
                        , []
                        ,function(tx,res){
                            for (var i=0; i<res.rows.length; i++){
                                cList.push(res.rows.item(i));
                            }   
                            console.log('get data '+res.rows.length);
                        }
                        ,errorCB);
                    }, 
                    errorCB,
                    successCB
                );

                resolve();
            },100);
        });
    };

    var setScope = function(){
        return new Promise(function(resolv,reject){
            setTimeout(function(){
                console.log("set scope");
                $scope.datalist=cList;
                $scope.$apply();
            },10);
        });
    }

    getCertificateRecordList().then(setScope);

});

app.controller('settingController',function($scope){
    var cList=[];
    var getQuestionList = function (){
        return new Promise(function(resolve, reject) {
            // タイムアウト値の設定は任意
            setTimeout(function(){
                db.transaction(
                    function(tx){
                        tx.executeSql('SELECT * FROM Questions'
                        , []
                        ,function(tx,res){
                            for (var i=0; i<res.rows.length; i++){
                                cList.push(res.rows.item(i));
                            }   
                        }
                        ,errorCB);
                    }, 
                    errorCB,
                    successCB
                );
                resolve();
            },100);
        });
    };

    var setScope = function(){
        return new Promise(function(resolv,reject){
            setTimeout(function(){
                $scope.datalist=cList;
                $scope.$apply();
            },10);
        });
    }

    getQuestionList().then(setScope);
});
