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
    else if (action === 'getprofiles')   result = getProfiles();
    else if (action === 'getrsvps')      result = getRsvps();
    else if (action === 'sendtickets')   result = sendTickets(p);
    else                                 result = { ok: false, error: 'Unknown action: ' + action };
  } catch(err) {
    result = { ok: false, error: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RSVP (records as Pending Payment; no tickets sent until paid) ────
function handleRsvp(p) {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = getOrCreateSheet(ss, 'RSVPs', [
    'Timestamp','Confirmation','Name','Email','Qty','Total','Payment','Attendees','Guest Email','Status'
  ]);

  var notAttending = (p.conf === 'NOT_ATTENDING' || p.qty === '0');
  var qty   = notAttending ? 0 : parseInt(p.qty) || 1;
  var total = notAttending ? '$0.00' : '$' + (qty * 25).toFixed(2);
  var status = notAttending ? 'Not Attending' : 'Pending Payment';

  sheet.appendRow([
    new Date(),
    p.conf       || '',
    p.name       || '',
    p.email      || '',
    qty,
    total,
    p.payMethod  || '',
    p.attendees  || '',
    p.guestEmail || '',
    status
  ]);

  // Email attendee: reservation held, payment required
  if (!notAttending && p.email) {
    var firstName = (p.name || '').split(' ')[0];
    var payLine = p.payMethod === 'venmo'
      ? 'Venmo @Suz-Lu — send $' + (qty * 25).toFixed(2) + ' with memo: ' + (p.conf || '')
      : p.payMethod === 'zelle'
      ? 'Zelle — use the QR code on the website and send $' + (qty * 25).toFixed(2) + ' with memo: ' + (p.conf || '')
      : 'PayPal — use the QR code on the website and send $' + (qty * 25).toFixed(2) + ' with note: ' + (p.conf || '');
    var reservationBody = 'Hi ' + firstName + ',\n\n'
      + 'Your spot at the Mohonasen Class of \'96 30-Year Reunion is RESERVED!\n\n'
      + 'To complete your registration, please send payment:\n'
      + payLine + '\n\n'
      + '─────────────────────────\n'
      + 'Confirmation: ' + (p.conf || '') + '\n'
      + 'Name: '         + (p.name || '') + '\n'
      + 'Tickets: '      + qty + ' × $25 = ' + total + '\n'
      + (p.attendees ? 'Attending: ' + p.attendees + '\n' : '')
      + '─────────────────────────\n\n'
      + 'Once we confirm your payment, we\'ll email your tickets within 24 hours.\n\n'
      + '📅 Friday, July 31, 2026  ·  7:00 PM\n'
      + '📍 Katie O\'Byrnes Irish Pub — Schenectady, NY\n\n'
      + 'Questions? mohonclass96@gmail.com | mohon96.com\n\n'
      + 'Go Warriors! 🧡🖤\n'
      + 'Mohonasen Class of \'96 Reunion Committee';
    try { MailApp.sendEmail(p.email, 'Spot Reserved — Mohonasen Class of \'96 Reunion · ' + (p.conf || ''), reservationBody); } catch(e) {}
    if (p.guestEmail) {
      try { MailApp.sendEmail(p.guestEmail, 'Spot Reserved — Mohonasen Class of \'96 Reunion · ' + (p.conf || ''), reservationBody); } catch(e) {}
    }
  }

  // Notify committee — includes link to send tickets once payment confirmed
  if (!notAttending) {
    var sendTicketsUrl = 'https://script.google.com/macros/s/AKfycbxR8bTSDcEiS8xhRkjYsyte77vjqFSuT6tLyL0vYimEWEjRveG-jm6BmD75RCX9vLIr/exec'
      + '?action=sendtickets&conf=' + encodeURIComponent(p.conf || '')
      + '&secret=' + encodeURIComponent(NOTIFY_EMAIL);
    var subject = '💳 Payment Pending — ' + (p.name || '') + ' (' + (p.conf || '') + ')';
    var body    = 'New reservation received — awaiting payment.\n\n'
                + 'Name: '      + (p.name      || '') + '\n'
                + 'Email: '     + (p.email     || '') + '\n'
                + 'Tickets: '   + qty                  + '\n'
                + 'Total: '     + total                 + '\n'
                + 'Payment: '   + (p.payMethod || '') + '\n'
                + 'Attendees: ' + (p.attendees  || '') + '\n'
                + 'Conf: '      + (p.conf       || '') + '\n\n'
                + 'Once payment is received, click to send tickets:\n'
                + sendTicketsUrl;
    try { MailApp.sendEmail(NOTIFY_EMAIL + ',' + COMMITTEE_EMAIL, subject, body); } catch(e) {}
  }

  return { ok: true };
}

// ── SEND TICKETS (called by organizer after verifying payment) ────────
function sendTickets(p) {
  // Basic auth check
  if ((p.secret || '') !== NOTIFY_EMAIL) return { ok: false, error: 'Unauthorized' };

  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = ss.getSheetByName('RSVPs');
  if (!sheet) return { ok: false, error: 'RSVPs sheet not found' };

  var rows = sheet.getDataRange().getValues();
  var conf = (p.conf || '').trim();
  var rowIndex = -1;
  for (var i = 1; i < rows.length; i++) {
    if ((rows[i][1] || '').trim() === conf) { rowIndex = i; break; }
  }
  if (rowIndex === -1) return { ok: false, error: 'Confirmation not found: ' + conf };

  var row       = rows[rowIndex];
  var name      = row[2] || '';
  var email     = row[3] || '';
  var qty       = parseInt(row[4]) || 1;
  var total     = row[5] || ('$' + (qty * 25).toFixed(2));
  var payMethod = row[6] || '';
  var attendees = row[7] || name;
  var guestEmail= row[8] || '';
  var status    = (row[9] || '').toString();

  if (status === 'Going') return { ok: false, error: 'Tickets already sent for ' + conf };

  // Update status to Going (paid)
  sheet.getRange(rowIndex + 1, 10).setValue('Going');

  // Build ticket email
  var firstName = name.split(' ')[0];
  var ticketBody = 'Hi ' + firstName + ',\n\n'
    + 'Great news — your payment has been confirmed! Here are your tickets:\n\n'
    + '─────────────────────────\n'
    + '🎟 CONFIRMATION: ' + conf + '\n'
    + 'Name: '    + name  + '\n'
    + 'Tickets: ' + qty + ' × $25 = ' + total + '\n'
    + (attendees ? 'Attending: ' + attendees + '\n' : '')
    + '─────────────────────────\n\n'
    + '📅 Friday, July 31, 2026  ·  7:00 PM\n'
    + '📍 Katie O\'Byrnes Irish Pub\n'
    + '   121 Wall Street, Schenectady, NY 12305\n\n'
    + 'Heavy appetizers included. Please bring your confirmation number to the event.\n\n'
    + 'Questions? mohonclass96@gmail.com | mohon96.com\n\n'
    + 'See you July 31! Go Warriors! 🧡🖤\n'
    + 'Mohonasen Class of \'96 Reunion Committee';

  try { MailApp.sendEmail(email, '🎟 Your Tickets — Mohonasen Class of \'96 Reunion · ' + conf, ticketBody); } catch(e) {}
  if (guestEmail) {
    try { MailApp.sendEmail(guestEmail, '🎟 Your Tickets — Mohonasen Class of \'96 Reunion · ' + conf, ticketBody); } catch(e) {}
  }

  return { ok: true, message: 'Tickets sent to ' + email };
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

// ── GET ALL PROFILES ─────────────────────────────────────────
function getProfiles() {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = ss.getSheetByName('Profiles');
  if (!sheet) return { profiles: {} };
  var rows = sheet.getDataRange().getValues();
  var profiles = {};
  // headers: Timestamp, ID, Name, Current Last, Nickname, Spouse, Children, Career, Memory
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var id = parseInt(row[1]);
    if (!id) continue;
    profiles[id] = {
      currentLast: row[3] || '',
      nickname:    row[4] || '',
      spouse:      row[5] || '',
      children:    row[6] || '',
      career:      row[7] || '',
      memory:      row[8] || '',
      updated:     row[0] ? new Date(row[0]).toISOString() : ''
    };
  }
  return { profiles: profiles };
}

// ── GET ALL RSVPs ─────────────────────────────────────────────
function getRsvps() {
  var ss    = SpreadsheetApp.openById(RSVP_SHEET_ID);
  var sheet = ss.getSheetByName('RSVPs');
  if (!sheet) return { rsvps: {} };
  var rows = sheet.getDataRange().getValues();
  var rsvps = {};
  // headers: Timestamp, Confirmation, Name, Email, Qty, Total, Payment, Attendees, Guest Email, Status
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var name   = row[2] || '';
    var status = (row[9] || '').toLowerCase() === 'going' ? 'going' : 'notgoing';
    var qty    = parseInt(row[4]) || 0;
    var conf   = row[1] || '';
    var pay    = row[6] || '';
    if (!name) continue;
    rsvps[name.toLowerCase().trim()] = { status: status, qty: qty, conf: conf, payMethod: pay, name: name };
  }
  return { rsvps: rsvps };
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
