// ═══════════════════════════════════════════════════════
//  Mohonasen '96 Reunion — Google Apps Script
//  Handles: classmate email collection + RSVP submissions
//
//  DEPLOY INSTRUCTIONS:
//  1. Go to script.google.com → open your existing project
//  2. Replace all code with this file
//  3. Click Deploy → Manage deployments → Edit → New version
//  4. Execute as: Me   |   Who has access: Anyone
//  5. Copy the new Web App URL and update APPS_SCRIPT_URL in app.js
// ═══════════════════════════════════════════════════════

var RSVP_SHEET_ID    = '1oPdmik5afzKErBWW-VqHlbRQG8FYUb6loVDi4C_4r-E';
var COMMITTEE_EMAIL  = 'mohonclass96@gmail.com';

// ── ROUTER ────────────────────────────────────────────
function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};
  var action = params.action || '';
  var result;

  if (action === 'rsvp') {
    result = handleRSVP(params);
  } else if (action === 'save') {
    result = handleSaveEmail(params);
  } else {
    result = handleFetchEmails();
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── FETCH CLASSMATE EMAILS (existing feature) ─────────
function handleFetchEmails() {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data  = sheet.getDataRange().getValues();
    var out   = {};
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      if (r[0] && r[2]) out[r[0] + ' ' + r[1]] = r[2];
    }
    return out;
  } catch (err) {
    return {};
  }
}

// ── SAVE CLASSMATE EMAIL (existing feature) ───────────
function handleSaveEmail(params) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.appendRow([params.firstName || '', params.lastName || '', params.email || '', new Date()]);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

// ── RSVP SUBMISSION ───────────────────────────────────
function handleRSVP(params) {
  var name       = params.name       || '';
  var email      = params.email      || '';
  var qty        = parseInt(params.qty) || 1;
  var attendees  = params.attendees  || '';
  var guestEmail = params.guestEmail || '';
  var payMethod  = params.payMethod  || 'cash';
  var conf       = params.conf       || '';
  var total      = qty * 30;
  var payLabel   = (payMethod === 'venmo') ? 'Venmo' : 'Cash at Door';
  var firstName  = name.split(' ')[0];
  var ts         = Utilities.formatDate(new Date(), 'America/New_York', 'M/d/yyyy h:mm a');

  try {
    // ── Record in RSVP spreadsheet ──
    var rsvpSS    = SpreadsheetApp.openById(RSVP_SHEET_ID);
    var rsvpSheet = rsvpSS.getSheets()[0];

    if (rsvpSheet.getLastRow() === 0) {
      rsvpSheet.appendRow([
        'Timestamp', 'Confirmation', 'Name', 'Email',
        'Tickets', 'Total', 'Attendees', 'Guest Email', 'Payment'
      ]);
    }
    rsvpSheet.appendRow([
      ts, conf, name, email,
      qty, '$' + total, attendees, guestEmail, payLabel
    ]);

    // ── Notify committee ──
    var comSubj = 'New RSVP — ' + name + ' · ' + qty + ' ticket' + (qty > 1 ? 's' : '') + ' · ' + payLabel;
    var comBody =
      'New RSVP submitted on mohon96.com\n\n' +
      'CONFIRMATION: ' + conf + '\n' +
      'Name:         ' + name + '\n' +
      'Email:        ' + email + '\n' +
      'Tickets:      ' + qty + ' × $30 = $' + total + '\n' +
      (attendees  ? 'Attending:    ' + attendees  + '\n' : '') +
      (guestEmail ? 'Guest Email:  ' + guestEmail + '\n' : '') +
      'Payment:      ' + payLabel + '\n' +
      'Submitted:    ' + ts;
    GmailApp.sendEmail(COMMITTEE_EMAIL, comSubj, comBody);

    // ── Confirmation to registrant ──
    var confSubj = 'You\'re all set — MHS Class of \'96 Reunion! (' + conf + ')';
    var payDetails = (payMethod === 'venmo')
      ? 'PAYMENT: Please send $' + total + ' to @Suz-Lu on Venmo.\n' +
        '  venmo.com/u/Suz-Lu\n' +
        '  Include your confirmation code: ' + conf
      : 'PAYMENT: $' + total + ' cash or Venmo at the door.';
    var confBody =
      'Hi ' + firstName + ',\n\n' +
      'Your RSVP for the Mohonasen High School Class of 1996 30-Year Reunion is confirmed!\n\n' +
      '──────────────────────────────────\n' +
      'CONFIRMATION: ' + conf + '\n' +
      'Tickets:      ' + qty + (attendees ? '\nAttending:    ' + attendees : '') + '\n' +
      (guestEmail ? 'Guest Email:  ' + guestEmail + '\n' : '') +
      payDetails + '\n' +
      '──────────────────────────────────\n\n' +
      'EVENT DETAILS:\n' +
      'Friday, July 31, 2026 · 7:00 PM\n' +
      'Katie O\'Byrnes Irish Pub\n' +
      '121 Wall Street, State Street & Erie Blvd\n' +
      'Schenectady, NY 12305\n\n' +
      'Heavy apps & small bites included.\n\n' +
      'Questions? mohonclass96@gmail.com\n' +
      'Website:  mohon96.com\n\n' +
      'See you there! Go Warriors! 🧡🖤\n' +
      'Mohonasen Class of 1996 Reunion Committee';
    GmailApp.sendEmail(email, confSubj, confBody);

    // ── Guest confirmation ──
    if (guestEmail) {
      var guestSubj = 'You\'re Invited — MHS Class of \'96 Reunion!';
      var guestBody =
        'You\'ve been invited to the Mohonasen High School Class of 1996 30-Year Reunion!\n\n' +
        'Registered by: ' + name + '\n' +
        'Confirmation:  ' + conf + '\n\n' +
        'EVENT DETAILS:\n' +
        'Friday, July 31, 2026 · 7:00 PM\n' +
        'Katie O\'Byrnes Irish Pub\n' +
        '121 Wall Street, State Street & Erie Blvd\n' +
        'Schenectady, NY 12305\n\n' +
        'Heavy apps & small bites included · $30/person\n\n' +
        'Questions? mohonclass96@gmail.com | mohon96.com\n\n' +
        'Go Warriors! 🧡🖤\n' +
        'Mohonasen Class of 1996 Reunion Committee';
      GmailApp.sendEmail(guestEmail, guestSubj, guestBody);
    }

    return { success: true, conf: conf };

  } catch (err) {
    return { success: false, error: err.toString() };
  }
}
