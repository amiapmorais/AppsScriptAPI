function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('responses')
  const responses = sheet.getSheetValues(2, 2, sheet.getLastRow()-1, 1).reduce((a, b) => { return a.concat(b) })
  
  return ContentService.createTextOutput(JSON.stringify(responses)).setMimeType(ContentService.MimeType.JAVASCRIPT)
}

function doPost(e) {
  
  const formID  = e.parameters.formID[0];
  
  if (formID === '202793588857071') {
    
    let userID = e.parameters.user_id[0]
    
    if (!userID) {
      
      const usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('users')
      userID = usersSheet.getLastRow()+1
      
      const firstName = e.parameters['oieu4[]'][0]
      const lastName = e.parameters['oieu4[]'][1]
        
      usersSheet.appendRow([userID, firstName, lastName, Date.now()])
    }
    
    const responsesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('responses')
    responsesSheet.appendRow([Date.now(),
                              e.parameters.olhandopara[0], 
                              e.parameters['eja2[]'][0], 
                              e.parameters.descrevadetalhadamente[0],
                              userID])
  }
  
   return HtmlService.createHtmlOutput('<html> Obrigado </html>')
}
