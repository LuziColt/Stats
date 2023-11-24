google.charts.load('current', {packages: ['table']});
google.charts.setOnLoadCallback(init);

function init ()
{
drawsyncTable
drawdeleteTable}

let statsLoesch = [];
let statsSync = [];

function parse(fileInput) {
  var files = fileInput.files;
  for (const file of files) {
    var reader = new FileReader();
    reader.onerror = function () {
      console.log(reader.error);
    };

    if (file.name.includes("loeschStat")) {
      reader.onload = function (e) {
        var rawText = e.target.result;
        statsLoesch.push(JSON.parse(rawText));
      };
    } else if (file.name.includes("syncStat")) {
      reader.onload = function (e) {
        var rawText = e.target.result;
        statsSync.push(JSON.parse(rawText));
      };
    }
    reader.readAsText(file);
  }
  console.log("Parse fertig");
}


function refreshpage() {

  location.reload();

}


function drawsyncTable() {
  var data = new google.visualization.DataTable();

  data.addColumn('string', 'Timestamp' );
  data.addColumn('string', 'DurationFirstRecipient');
  data.addColumn('string', 'DurationSecondRecipient');
  data.addColumn('string', 'ProcessedFirstRecipient');
  data.addColumn('string', 'ProcessedSecondRecipient');
  data.addColumn('string', 'ErrorFirstRecipient');
  data.addColumn('string', 'ErrorSecondRecipient');
  data.addColumn('string', 'Insert');
  data.addColumn('string', 'Update');
  data.addColumn('string', 'Delete');

  for( let i=0; i <= statsSync.length - 1  ; i++ ) {
    var arrayInput = [[statsSync[i].timestamp.toString(),
      statsSync[i].durationInSec.Empfaenger1.toString(),
      statsSync[i].durationInSec.Empfaenger2.toString(),
      statsSync[i].verarbeitet.Empfaenger1.toString(),
      statsSync[i].verarbeitet.Empfaenger2.toString(),
      statsSync[i].fehler.Empfaenger1.toString(),
      statsSync[i].fehler.Empfaenger2.toString(),
      statsSync[i].eventAnzahl.INSERT.toString(),
      statsSync[i].eventAnzahl.UPDATE.toString(),
      statsSync[i].eventAnzahl.DELETE.toString()
    ]];
    data.addRows(arrayInput);
  }
  return data;
}


function createsynctable()
{
  var data= drawsyncTable();
  var table = new google.visualization.Table(document.getElementById('table_div'));
  var selectedOption = document.getElementById("selectedentry").value;
  table.draw(data, {showRowNumber: true, width: '100%', height: '100%', pageSize : selectedOption});
}

function drawdeleteTable() {
  var datalösch = new google.visualization.DataTable();

  datalösch.addColumn('string', 'RunStart');
  datalösch.addColumn('string', 'Checked');
  datalösch.addColumn('string', 'Deletes');
  datalösch.addColumn('string', 'Non-Deletes');

  for( let j = 0; j <= statsLoesch.length - 1 ; j++ ) {
    var LöschInput = [[statsLoesch[j].laufstart.toString(),
        statsLoesch[j].geprueft.toString(),
        statsLoesch[j].deletes.toString(),
        statsLoesch[j]['non-deletes'].toString()
    ]];
    datalösch.addRows(LöschInput);
  }
  return datalösch;
}

function createdeletetable()
{
 var datalösch = drawdeleteTable();
  var deletetable = new google.visualization.Table(document.getElementById('table_delete'));
  var selectedOption = document.getElementById("selectedentry").value;
  deletetable.draw(datalösch, {showRowNumber: true, width: '100%', height: '100%', pageSize : selectedOption});

}
