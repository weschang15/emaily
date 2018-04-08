const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    // initiate sendgrid
    this.sgApi = sendgrid(keys.sendgridKey);
    // set subject of email
    this.subject = subject;
    // the address that the email is sending from
    this.from_email = new helper.Email("no-reply@email.com");
    // properly format all of our email addresses
    this.recipients = this.formatAddresses(recipients);
    // sendgrid will properly format our email content
    this.body = new helper.Content("text/html", content);
    // call sendgrid's native function to set out html email content
    this.addContent(this.body);
    // enable click tracking
    this.enableTracking();
    this.addRecipients();
  }

  /**
   * Formats an array of emails to be properly set within out email via SendGrid
   * @param {array} recipients
   */
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  /**
   * Enable click tracking on links via sendgrid
   */
  enableTracking() {
    const settings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    settings.setClickTracking(clickTracking);
    this.addTrackingSettings(settings);
  }

  /**
   * Add recipients to our email after they've been properly formatted
   */
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => personalize.addTo(recipient));
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
