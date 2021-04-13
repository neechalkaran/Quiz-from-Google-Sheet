function doGet(e) {
var Sheetid=e.parameter.id;
var email= e.parameter.email;
var name= e.parameter.name;  
var sheetname= e.parameter.sname;    
var action= e.parameter.action;  
var mark= e.parameter.marks;    
//email=" + EMAIL + "&name=" + NAME + "&sname=" + SNAME +  "&action=insert";
if(action=="insert")
{
  var mySheet = SpreadsheetApp.openById("<Sheet id>").getSheetByName(sheetname);
  var lrow = mySheet.getLastRow()+1;
  mySheet.getRange(lrow, 1).setValue(email);
  mySheet.getRange(lrow, 2).setValue(name);
  
}
else if(action=="updatemark")
{
  var mySheet = SpreadsheetApp.openById("<Sheet id>").getSheetByName(sheetname);
var db = mySheet.getRange(1, 1, mySheet.getLastRow(),mySheet.getLastColumn()).getValues();  
var flag=false;  
for(var i in db)if(db[i][0]==email)
{
  mySheet.getRange(parseInt(i)+1, 3).setValue(mark);
  flag=true;
}
  if(flag==true){result = {"result":"Thank you "+name+", Your Score has been updated."};}
  else{result = {"result": "Sorry "+name+", unable to update."};}
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); 
}  
else if(action=="readdata")
{  
var mySheet = SpreadsheetApp.openById("<Sheet id>").getSheetByName(sheetname);
var db = mySheet.getRange(1, 1, mySheet.getLastRow(),mySheet.getLastColumn()).getValues();  
  var result={"records":[]};  

for(var i =1;i<db.length;i++)
{var temp ={}
  for(var j in db[i])  
{
  temp[db[0][j]]=db[i][j];
}result["records"].push(temp);
} 
return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);  
}

}

