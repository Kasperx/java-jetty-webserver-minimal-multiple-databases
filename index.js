
  $(document).ready(function (){
    $.ajax({                                      
      url: "?format=json"
	    +"&withheader=true"
//	    +"&withheader=false"
	    +"",              
      type: "post",
      dataType: 'html',
      //success: finished //Change to this
   });
});

  
  function insertDataTest()
  {
    let table = $('#table');
    table.append('<tr id="tableinput">'
    +'<td>'
    +'<input placeholder="Input name">'
    +'</td>'
    +'<td>'
    +'<input placeholder="Input action">'
    +'</td>'
    +'<td>'
    +'<input placeholder="Input action name">'
    +'</td>'
    +'<td>'
    +'<input type="button" id="btn_send" class="btn btn-success" onclick="javascript:sendDataToSystem()" value="send"></input>'
    +'</td>'
    );
    table.remove('#tableinput');
  }

  function login()
  {
    //Get the modal
    var modal = document.getElementById('login');
    var modal_login = document.getElementById('login_btn');
    const user = document.getElementById("uname").value;
    const pw = document.getElementById("psw").value;
    const remember = document.getElementById("remember").value;
    modal.style.display = "none";
    if(user != "" && pw != "" )
    {
      var url = "localhost:4000/?";
      const data = {'get':'admin', 'user':user, 'pw':pw, 'remember':remember};
          var params = '?'+encodeQueryData(data);
          params = encodeQueryData(data);
      /*
      var http = new XMLHttpRequest();
      http.open("GET", url+params, true);
      http.onreadystatechange = function()
      {
          if(http.readyState == 4 && http.status == 200) {
              alert(http.responseText);
          }
      }
      http.send(null);
      */
      //var params = "somevariable=somevalue&anothervariable=anothervalue";
      const fullurl = url+params;
      console.log(fullurl);
      let http = new XMLHttpRequest();
      //http.open('POST', fullurl, true);
      http.open('GET', fullurl, true);
      http.send(params);
      http.onload = function() {
        if (http.status != 200) { // analyze HTTP status of the response
          alert("Error "+http.status+ http.statusText);
        } else { // show the result
          alert("Done, got "+http.response.length+" bytes");
        }
      };
      http.onreadystatechange = function()
      {
          if(this.readyState == 4 && this.status == 200) {
              alert(this.responseText);
          }
      }
    }
  }

  function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
    {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
      return ret.join('&');
  }

  function getData()
  {
    $.ajax({
      url: "?get=data&format=json",
      context: document.body
    }).done(function(data) {
      // Manage header
      $('#h1').empty();
      $('#h1').append('<h1 style="font-size:50px;"><marquee>User view</marquee></h1></p>');
      $('body').removeClass("container-fluid");
      $('body').addClass("container");
      //////////////////////////////////////////////////////
      // Manage table for data input
      //////////////////////////////////////////////////////
      // create table with data
      let table = $('#table');
      table.remove();
      // table = $('<table>');
      table = $('<table>');
      table.addClass("table");
      table.addClass("table-striped");
      table.addClass("table-hover");
      table.attr('id', 'table');
      // table.addClass("thead-dark");
      let tabledata = '';
      for(let i=0; i<data.length; i++){
		if(i==0){
	      table.append('<thead class="thead-dark">'
	        +'<tr>'
	        +'<th>'+data[i].header_firstName+'</th>'
	        +'<th>'+data[i].header_lastName+'</th>'
	        +'<th></th>'
	        +'</tr>'
	        +'</thead>'
	      );
	      table.append('<tr>');
      		table.append('<tbody>');
	      /*
	        tabledata += '<tr>';
	        tabledata += '<td>'+data[i].header_firstName+'</td>';
	        tabledata += '<td>'+data[i].header_lastName+'</td>';
	        tabledata += '</tr>';*/
		} else {
	        tabledata += '<tr>';
	        tabledata += '<td>'+data[i].firstName+'</td>';
	        tabledata += '<td>'+data[i].lastName+'</td>';
	        tabledata += '</tr>';
        }
      }
      table.append(tabledata);
      table.append('</tbody>');
      table.append('</table>');
      $('body').append('<p></p>');
      $('body').append(table);
    });
  }
  function getAllData()
  {
    $.ajax({
      url: "?get=admin&format=json&user=admin&pw=secret",
      context: document.body
    }).done(function(data) {
      // Manage header
      $('#h1').empty();
      $('#h1').append('<h1 style="font-size:50px;"><marquee>User view</marquee></h1></p>');
      //////////////////////////////////////////////////////
      // Manage table for data input
      //////////////////////////////////////////////////////
      // create table with data
      $('body').removeClass("container");
      $('body').addClass("container-fluid");
      let table = $('#table');
      table.remove();
      // table = $('<table>');
      table = $('<table>');
      table.addClass("table");
      table.addClass("table-striped");
      table.addClass("table-hover");
      table.attr('id', 'table');
	    let tabledata = '</tr>';
	    for(let i=0; i<data.length; i++){
		if(i==0){
	      table.append('<thead class="thead-dark">'
	        +'<tr>'
	        +'<th>'+data[i].header_firstName+'</th>'
	        +'<th>'+data[i].header_lastName+'</th>'
	        +'<th>'+data[i].header_isAdmin+'</th>'
	        +'<th>'+data[i].header_password+'</th>'
	        +'<th></th>'
	        +'</tr>'
	        +'</thead>'
	      );
	      table.append('<tr>');
	  		table.append('<tbody>');
	      /*
	        tabledata += '<tr>';
	        tabledata += '<td>'+data[i].header_firstName+'</td>';
	        tabledata += '<td>'+data[i].header_lastName+'</td>';
	        tabledata += '</tr>';*/
		} else {
	        tabledata += '<tr>';
	        tabledata += '<td>'+data[i].firstName+'</td>';
	        tabledata += '<td>'+data[i].lastName+'</td>';
	        tabledata += '<td>'+data[i].isAdmin+'</td>';
	        tabledata += '<td>'+data[i].password+'</td>';
	        if(data[i].isAdmin){
        	tabledata += '<td>Yes</td>';
		} else {
        	tabledata += '<td>No</td>';
		}
	        tabledata += '</tr>';
	    }
      }
      table.append(tabledata);
      table.append('<td></td>');
      table.append('<td><input style="max-width:100%;" placeholder="Input first name" id="input_position"></input></td>');
      table.append('<td><input style="max-width:100%;" placeholder="Input last name" id="input_name"></input></td>');
      table.append('<td><input style="max-width:100%;" placeholder="Input password" id="input_action"></input></td>');
      table.append(
        '<td>'
        +'<input type="button" id="btn_send" class="btn btn-success" onclick="javascript:sendDataToSystem()" value="send"></input>'
        +'</td>'
      );

      table.append('</tbody>');
      table.append('</table>');
      $('body').append('<p></p>');
      $('body').append(table);
    });
  }
  function getWeather()
  {
    $.ajax({
      url: "?get=weather&format=json",
      context: document.body
    }).done(function(data) {
      });
  }
  function insertData()
  {
    $.ajax({
      url: "?get=insert&format=json",
      context: document.body
    }).done(function(data) {
      alert("Inserted new data.");
    }).fail(function ( jqXHR, textStatus, errorThrown ) {
      // console.log(jqXHR);
      // console.log(textStatus);
      // console.log(errorThrown);
      alert('Failed');
    });;
  }
  function sendDataToSystem()
  {
    // let input_position_value = $('#input_position').val();
    let input_name_position_value = $('#input_position').val();
    let input_name_value = $('#input_name').val();
    let input_action_value = $('#input_action').val();
    let input_action_name_value = $('#input_action_name').val();
    if(input_name_position_value && input_name_value == "" && input_action_value == "" && input_action_name_value == "")
    {}
    else {
      $.ajax({
        url: "?get=add_user"
        +"&format=json"
        +"&position="+input_name_position_value
        +"&name="+input_name_value
        +"&action="+input_action_value
        +"&action_name="+input_action_name_value,
        context: document.body
      }).done(function(data) {
        alert("Inserted "
        // +input_position_value+" "
        +input_name_position_value+" ",
        +input_name_value+" ",
        +input_action_value+" ",
        +input_action_name_value,
        +"' to system.");
        // call new data after insert
      //   $.ajax({
      //     url: "?get=data",
      //     context: document.body
      //   }).done(function() {
          
      //   });
      // }).done(function() {
      //   alert('OK');
        getData();
      }).fail(function ( jqXHR, textStatus, errorThrown ) {
        // console.log(jqXHR);
        console.log(textStatus);
        // console.log(errorThrown);
        alert('Failed');
      });
      // insertDataTest();
    }
}
$(function() {
  $('#table').on('editable-save.bs.table', function(e, field, row, oldValue){
      console.log("1 "+ field);
      console.log("2 "+ row[field]);
      console.log("3 "+ row.lot);
      console.log("4 "+ oldValue);
  });    
});
