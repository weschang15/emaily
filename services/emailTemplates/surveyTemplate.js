const keys = require("../../config/keys");

module.exports = ({ body }) => {
  return `<html>
    <style>
      body { color:#0b2545; font-family: -apple-system,BlinkMacSystemFont,Arial,Helvetica Neue,Helvetica,sans-serif; line-height: 1.5; font-size: 18px; font-size: 1.8rem; }
      p {
        color: #767b96;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    </style>
    <body>
      <div style="text-align:center;">
        <h3>I'd like to hear your feedback!</h3>
        <p>Please answer the following question: </p>
        <p><strong>${body}</strong></p>
        <table>
          <tbody>
            <tr>
              <td><a href="${keys.redirectDomain}/api/feedback">Yes</a></td>
              <td><a href="${keys.redirectDomain}/api/feedback">No</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  </html>`;
};
