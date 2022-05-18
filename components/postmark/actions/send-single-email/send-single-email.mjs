// legacy_hash_id: a_8KiGrJ
import postmark from "../../postmark.app.mjs";

let objSharedProps = {};
postmark.methods.listSharedProps().forEach((propName) => {
  objSharedProps[propName] = {
    propDefinition: [
      postmark,
      propName,
    ],
  };
});

export default {
  key: "postmark-send-single-email",
  name: "Send Single Email",
  description: "Send a single email with Postmark [(See docs here)](https://postmarkapp.com/developer/api/email-api#send-a-single-email)",
  version: "0.2.0",
  type: "action",
  props: {
    postmark,
    subject: {
      type: "string",
      label: "Subject",
      description: "Email subject.",
    },
    html_body: {
      type: "string",
      label: "HTML Body",
      description:
        "HTML email message. **Required** if no `TextBody` is specified.",
      optional: true,
    },
    text_body: {
      type: "string",
      label: "Text Body",
      description:
        "Plain text email message. **Required** if no `HtmlBody` is specified.",
      optional: true,
    },
    ...objSharedProps,
  },
  async run({ $ }) {
    return this.postmark.sharedActionRequest($, this, "email", {
      Subject: this.subject,
      HtmlBody: this.html_body,
      TextBody: this.text_body,
    });
  },
};
