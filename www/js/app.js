// This is a JavaScript file
//Global var
var nowQID="";
var nowQtext="";
var nextQID=1;
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
    tx.executeSql('DROP TABLE Certificate',[]);
    //tx.executeSql('DELETE * FROM Certificate');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Certificate (id unique, datetime, productName, productCost, Judgement)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CertificateDetails (CertificateId , questionNo, answer)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS Questions(id unique, questionText, nextQuextionId)');
    //Questionsマスタデータ登録
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (1, "今すぐ必要ですか？", 2)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (2, "代替品はありますか？", 3)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (3, "レンタルや借用は可能ですか？", 4)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (4, "利用頻度は高いですか？", 5)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (5, "日用品ですか？嗜好品ですか？", 6)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (6, "３年以上利用しますか？", 7)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (7, "同じ機能をもつ商品との比較を行いましたか？", 8)');
    tx.executeSql('INSERT INTO Questions (id, questionText, nextQuextionId) VALUES (8, "衝動買いですか？", "")');
}

//----------SQL for Questions-----------------------------------------------------------
//次の質問情報をテーブルから取得し、グローバル変数へ設定。
function getQuestion(){
    db.transaction(getQuestionQuery, errorCB, successCB);
}
function getQuestionQuery(tx) {
    if(nowQID===""){
        nextQID=1;
    }
    if(nextQID===""){
        //質問完了。診断結果を表示。
        showCertificate();
    }else{
        //質問を取得し、
        tx.executeSql('SELECT * FROM Questions WHERE id == ?', [nextQID], 
        function(tx,res){
            console.log(res.rows.item(0).id);
            if(res.rows.length===0){
                //質問が存在しない。Questionsマスタデータ不正。
                console.log("getQuestion return zero question. Questions's Table date fails.");
            }else if(res.rows.length>1){
                //質問が複数は存在しない。Questionsマスタデータ不正。
                console.log("getQuestion return more than one question. Questions's Table date fails.");
            }else{
                //グローバル変数へ設定
                nowQID=res.rows.item(0).id;
                nowQtext=res.rows.item(0).questionText;
                nextQID=res.rows.item(0).nextQuextionId;
                showQuestion();
            }
        }, errorCB);
    }
}
// chekc for Questions
function queryDB() {
    db.transaction(function(tx){tx.executeSql('SELECT * FROM Questions', [], querySuccess, errorCB);}, errorCB, successCB);
}
function querySuccess(tx, results) {
    var len = results.rows.length;
    window.alert("There are " + len + " rows of records in the database.");
    for (var i=0; i<len; i++){
        document.writeln("row = " + i + " ID = " + results.rows.item(i).id + " Data = " + results.rows.item(i).questionText+"<br/>");
    }        
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
        console.log('SELECT id FROM Certificate: '+res.rows.length);
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
    console.log("judgement:"+judgement);
    getCertificateID();
    console.log("CertificateID:"+CertificateID);
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
    nowQID="";
    nowQtext="";
    nextQID=1;
    answers=[];
    pcost = $("#productCost").val();
    pname = $("#productName").val();
    getCertificateID();
    getDatetime();
    getQuestion();
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

function next(yesOrNo){
    setAnswer(yesOrNo);
    //getNextQuestion();
    getQuestion();
    console.log(nowQID+":"+nowQtext+":"+nextQID);
}

//質問を更新
function showQuestion(){
    console.log(nowQtext);
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