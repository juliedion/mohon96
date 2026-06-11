// ============================================================
//  Mohonasen Class of '96 — Reunion Apps Script
//  Deploy as: Execute as ME, Who has access: ANYONE
// ============================================================

var RSVP_SHEET_ID      = '1oPdmik5afzKErBWW-VqHlbRQG8FYUb6loVDi4C_4r-E';
var NOTIFY_EMAIL       = 'juliedion1@gmail.com';
var COMMITTEE_EMAIL    = 'mohonclass96@gmail.com';

// ── Entry point ─────────────────────────────────────────────
function doGet(e) {
  var p = e.parameter || {};
  var action = p.action || '';
  var result;

  try {
    if      (action === 'rsvp')          result = handleRsvp(p);
    else if (action === 'save')          result = handleEmailSave(p);
    else if (action === 'profile')       result = handleProfile(p);
    else if (action === 'contactinfo')   result = handleContactInfo(p);
    else if (action === 'reportfallen')  result = handleReportFallen(p);
    else if (action === 'comment')       result = handleComment(p);
    else if (action === 'getcomments')   result = getComments();
    else                                 result = { ok: false, error: 'Unknown action: ' + action };
  } catch(err) {
    result = { ok: false, error: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RSVP ────────────────────────────────────────────────────
function handleRsvp(p) {
  var ss   = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'RSVPs', [
    'Timestamp','Confirmation','Name','Email','Qty','Total','Payment','Attendees','Guest Email','Status'
  ]);

  var notAttending = (p.conf === 'NOT_ATTENDING' || p.qty === '0');
  var qty   = notAttending ? 0 : parseInt(p.qty) || 1;
  var total = notAttending ? '$0.00' : '$' + (qty * 30).toFixed(2);

  sheet.appendRow([
    new Date(),
    p.conf      || '',
    p.name      || '',
    p.email     || '',
    qty,
    total,
    p.payMethod || '',
    p.attendees || '',
    p.guestEmail|| '',
    notAttending ? 'Not Attending' : 'Going'
  ]);

  // Email purchaser confirmation
  if (!notAttending && p.email) {
    var payNote = p.payMethod === 'venmo'  ? 'Payment: Venmo @Suz-Lu — please send $' + (qty * 30).toFixed(2) + ' with your confirmation code in the memo.'
               : p.payMethod === 'zelle'  ? 'Payment: Zelle — please send $' + (qty * 30).toFixed(2) + ' with your confirmation code in the memo (use the QR code you scanned).'
               : p.payMethod === 'paypal' ? 'Payment: PayPal — please send $' + (qty * 30).toFixed(2) + ' with your confirmation code in the memo (use the QR code you scanned).'
               : 'Payment: Cash at the door.';
    var confirmBody = 'Hi ' + (p.name || '') + ',\n\n'
      + 'Your RSVP for the Mohonasen Class of \'96 30-Year Reunion is confirmed!\n\n'
      + '📅 Friday, July 31, 2026  ·  7:00 PM\n'
      + '📍 Katie O\'Byrnes Irish Pub — Schenectady, NY\n\n'
      + '─────────────────────────\n'
      + 'Confirmation: ' + (p.conf || '') + '\n'
      + 'Tickets: '      + qty + '\n'
      + 'Total: '        + total + '\n'
      + payNote + '\n'
      + (p.attendees ? 'Attendees: ' + p.attendees + '\n' : '')
      + '─────────────────────────\n\n'
      + 'Questions? Reply to this email or contact mohonclass96@gmail.com\n\n'
      + 'Go Warriors! 🧡🖤\n'
      + 'Mohonasen Class of \'96 Reunion Committee';
    try { MailApp.sendEmail(p.email, 'RSVP Confirmed — Mohonasen Class of \'96 · ' + (p.conf || ''), confirmBody); } catch(e) {}
    if (p.guestEmail) {
      try { MailApp.sendEmail(p.guestEmail, 'RSVP Confirmed — Mohonasen Class of \'96 · ' + (p.conf || ''), confirmBody); } catch(e) {}
    }
  }

  // Notify committee
  if (!notAttending) {
    var subject = 'New RSVP — ' + (p.name || '') + ' (' + (p.conf || '') + ')';
    var body    = 'Name: '      + (p.name      || '') + '\n'
                + 'Email: '     + (p.email     || '') + '\n'
                + 'Tickets: '   + qty                  + '\n'
                + 'Total: '     + total                 + '\n'
                + 'Payment: '   + (p.payMethod || '') + '\n'
                + 'Attendees: ' + (p.attendees  || '') + '\n'
                + 'Conf: '      + (p.conf       || '');
    try { MailApp.sendEmail(NOTIFY_EMAIL + ',' + COMMITTEE_EMAIL, subject, body); } catch(e) {}
  }

  return { ok: true };
}

// ── EMAIL SAVE (classmate submits their email) ───────────────
function handleEmailSave(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'Emails', ['Timestamp','First','Last','Email']);
  sheet.appendRow([new Date(), p.firstName || '', p.lastName || '', p.email || '']);

  if (p.notify === 'true') {
    try {
      MailApp.sendEmail(
        NOTIFY_EMAIL + ',' + COMMITTEE_EMAIL,
        'Classmate Email Submitted — ' + (p.firstName || '') + ' ' + (p.lastName || ''),
        'Email: ' + (p.email || '') + '\nName: ' + (p.firstName || '') + ' ' + (p.lastName || '')
      );
    } catch(e) {}
  }

  return { ok: true };
}

// ── PROFILE ──────────────────────────────────────────────────
function handleProfile(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'Profiles', [
    'Timestamp','ID','Name','Current Last','Nickname','Spouse','Children','Career','Memory'
  ]);
  sheet.appendRow([
    new Date(),
    p.id          || '',
    p.name        || '',
    p.currentLast || '',
    p.nickname    || '',
    p.spouse      || '',
    p.children    || '',
    p.career      || '',
    p.memory      || ''
  ]);
  return { ok: true };
}

// ── CONTACT INFO (about a missing classmate) ─────────────────
function handleContactInfo(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'Contact Tips', ['Timestamp','Classmate ID','Name','Info Submitted']);
  sheet.appendRow([new Date(), p.id || '', p.name || '', p.info || '']);

  try {
    MailApp.sendEmail(
      NOTIFY_EMAIL + ',' + COMMITTEE_EMAIL,
      'Contact Info Tip — ' + (p.name || ''),
      'Someone submitted contact info for ' + (p.name || '') + ':\n\n' + (p.info || '')
    );
  } catch(e) {}

  return { ok: true };
}

// ── REPORT FALLEN ────────────────────────────────────────────
function handleReportFallen(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'Fallen Reports', ['Timestamp','ID','Name','Reporter','Obit URL','Details']);
  sheet.appendRow([new Date(), p.id || '', p.name || '', p.reporter || '', p.obit || '', p.details || '']);

  try {
    MailApp.sendEmail(
      NOTIFY_EMAIL + ',' + COMMITTEE_EMAIL,
      'Fallen Warrior Report — ' + (p.name || ''),
      'Reported by: ' + (p.reporter || '') + '\nObit: ' + (p.obit || '') + '\nDetails: ' + (p.details || '')
    );
  } catch(e) {}

  return { ok: true };
}

// ── CLASS WALL ───────────────────────────────────────────────
function handleComment(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'Wall', ['Timestamp','Name','Message']);
  sheet.appendRow([new Date(), p.name || '', p.message || '']);
  return { ok: true };
}

function getComments() {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = ss.getSheetByName('Wall');
  if (!sheet) return { comments: [] };
  var rows  = sheet.getDataRange().getValues();
  var comments = [];
  for (var i = rows.length - 1; i >= 1; i--) {
    var row = rows[i];
    if (!row[1] && !row[2]) continue;
    comments.push({
      ts:      formatDate(row[0]),
      name:    row[1] || '',
      message: row[2] || ''
    });
    if (comments.length >= 50) break;
  }
  return { comments: comments };
}

// ── Helpers ──────────────────────────────────────────────────
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight('bold')
         .setBackground('#F47B20')
         .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function formatDate(d) {
  if (!d) return '';
  try {
    return Utilities.formatDate(new Date(d), Session.getScriptTimeZone(), 'MMM d, yyyy h:mm a');
  } catch(e) { return String(d); }
}
