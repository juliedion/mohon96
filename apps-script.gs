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
  } else if (action === 'comment') {
    result = handleComment(params);
  } else if (action === 'getcomments') {
    result = handleGetComments();
  } else if (action === 'profile') {
    result = handleProfileUpdate(params);
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
  var firstName = params.firstName || '';
  var lastName  = params.lastName  || '';
  var email     = params.email     || '';
  var notify    = params.notify === 'true';

  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    sheet.appendRow([firstName, lastName, email, new Date()]);

    if (notify && email) {
      var name = (firstName + ' ' + lastName).trim();
      var ts   = Utilities.formatDate(new Date(), 'America/New_York', 'M/d/yyyy h:mm a');
      var subj = 'Classmate Email Submitted — ' + name;
      var body = 'An email address was submitted on mohon96.com\n\n' +
        'Classmate: ' + name + '\n' +
        'Email:     ' + email + '\n' +
        'Time:      ' + ts + '\n\n' +
        'This was submitted by a visitor — please verify before using.';
      GmailApp.sendEmail(COMMITTEE_EMAIL, subj, body);
      GmailApp.sendEmail('juliedion1@gmail.com', subj, body);
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

// ── CLASS WALL COMMENTS ───────────────────────────────
function handleComment(params) {
  var name    = (params.name    || '').trim();
  var message = (params.message || '').trim();
  if (!name || !message) return { success: false, error: 'Missing fields' };
  try {
    var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
    var sheet = ss.getSheetByName('Comments');
    if (!sheet) {
      sheet = ss.insertSheet('Comments');
      sheet.appendRow(['Timestamp', 'Name', 'Message']);
    }
    var ts = Utilities.formatDate(new Date(), 'America/New_York', 'M/d/yyyy h:mm a');
    sheet.appendRow([ts, name, message]);
    return { success: true };
  } catch(err) {
    return { success: false, error: err.toString() };
  }
}

function handleGetComments() {
  try {
    var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
    var sheet = ss.getSheetByName('Comments');
    if (!sheet) return { comments: [] };
    var data = sheet.getDataRange().getValues();
    var out  = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][2]) {
        out.push({ ts: String(data[i][0]), name: String(data[i][1]), message: String(data[i][2]) });
      }
    }
    out.reverse(); // newest first
    return { comments: out };
  } catch(err) {
    return { comments: [] };
  }
}

// ── PROFILE UPDATE ────────────────────────────────────
function handleProfileUpdate(params) {
  var name = params.name || '';
  var id   = params.id   || '';
  try {
    var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
    var sheet = ss.getSheetByName('Profiles');
    if (!sheet) {
      sheet = ss.insertSheet('Profiles');
      sheet.appendRow(['Timestamp','ID','Name','Nickname','Current Last','Spouse','Children','Career','Memory']);
    }
    var ts = Utilities.formatDate(new Date(), 'America/New_York', 'M/d/yyyy h:mm a');
    sheet.appendRow([ts, id, name,
      params.nickname || '', params.currentLast || '', params.spouse || '',
      params.children || '', params.career || '', params.memory || '']);
    return { success: true };
  } catch(err) {
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
