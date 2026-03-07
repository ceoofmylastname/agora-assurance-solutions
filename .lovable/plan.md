

## Plan: TCPA/A2P SMS Compliance Updates

Based on the compliance review screenshots, the site needs updates in three areas: the opt-in form, the Privacy Policy, and the Terms & Conditions.

### What needs to change

**1. Contact Form (`src/components/ModernContactForm.tsx`)** -- Update SMS consent to have TWO separate checkboxes per A2P compliance:
- **Transactional consent checkbox** (non-mandatory): "I consent to receive transactional messages from Agora Assurance Solutions at the phone number provided. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out."
- **Marketing consent checkbox** (non-mandatory, optional): "I consent to receive marketing and promotional messages from Agora Assurance Solutions at the phone number provided. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out."
- Neither checkbox can be required to submit the form (per compliance rules: "Checkboxes can't be mandatory")
- Add links to Privacy Policy and Terms of Service below the form
- Update the zod schema: change `smsConsent` to `smsTransactionalConsent` and add `smsMarketingConsent`, both as optional booleans

**2. Privacy Policy (`src/pages/PrivacyPolicy.tsx`)** -- Add two new sections and update Table of Contents:
- **"SMS Opt-In & Communications"** section covering: what SMS messages are sent, message frequency disclosure, how to opt out (STOP), how to get help (HELP), message & data rates
- **"Mobile Information Sharing"** section: explicitly state that SMS consent is not shared with third parties (except SMS service providers used to deliver messages)

**3. Terms & Conditions (`src/pages/TermsConditions.tsx`)** -- Add new sections and update Table of Contents:
- **"SMS Communications & Text Messaging"** section covering:
  - Description of SMS use cases (appointment reminders, policy updates, quotes, marketing with consent)
  - Opt-out instructions (reply STOP)
  - Customer support contact (reply HELP or call)
  - Message & data rate disclosure
  - Carrier liability disclaimer (carriers not liable for delayed/undelivered messages)
  - Age restriction (must be 18+ to use services)
  - Link to Privacy Policy

### Technical details

- Form schema changes: `smsConsent: z.boolean()` becomes `smsTransactionalConsent: z.boolean().default(false)` and `smsMarketingConsent: z.boolean().default(false)` -- both optional
- The webhook/email submission payload will send both consent values
- Privacy Policy and Terms pages get new sections added in the same card-based style as existing sections
- Table of Contents navs updated to include new section anchors

