/**
 * G8G MEDIA — Live Google Sheets Automated Sync Webhook
 *
 * HOW TO CONNECT YOUR GOOGLE SHEET IN 2 MINUTES:
 * 1. Open Google Sheets (create a new sheet named "G8G Media Client Inquiries").
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any default code and paste this entire script.
 * 4. Click "Deploy" > "New deployment".
 * 5. Under "Select type" (gear icon), select "Web app".
 * 6. Set Description: "G8G Inquiries Sync".
 * 7. Set "Execute as": "Me (your email)".
 * 8. Set "Who has access": "Anyone" (crucial for webhooks).
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 10. Add to your .env.local file:
 *     GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
 *
 * Every inquiry submitted on the website will now instantly append a row to your Google Sheet!
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Reference ID",
        "Submission Date (UTC)",
        "Submission Date (Local)",
        "Client Name",
        "Work Email",
        "Company",
        "Website",
        "Service Requested",
        "Budget Tier",
        "Timeline",
        "Preferred Contact Method",
        "Region",
        "Project Context",
        "Project Overview",
        "Status"
      ]);
      const headerRange = sheet.getRange(1, 1, 1, 15);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#111111");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Append new inquiry
    sheet.appendRow([
      data["Reference ID"] || "",
      data["Submission Date (UTC)"] || "",
      data["Submission Date (Local)"] || "",
      data["Client Name"] || "",
      data["Work Email"] || "",
      data["Company"] || "",
      data["Website"] || "",
      data["Service Requested"] || "",
      data["Budget Tier"] || "",
      data["Timeline"] || "",
      data["Preferred Contact Method"] || "",
      data["Region"] || "",
      data["Project Context"] || "",
      data["Project Overview"] || "",
      data["Status"] || "NEW / UNREAD"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
