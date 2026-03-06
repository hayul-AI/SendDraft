window.SENDDRAFT_FORM_PRESETS = {
  purchase_issue: [
    { key: "recipient", label: "Recipient (Store/Person)", type: "text", placeholder: "Customer Support" },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Wireless Headphones" },
    { key: "reference", label: "Order / Reference #", type: "text", placeholder: "ORD-123" },
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026" },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "49.99" },
    { key: "reason", label: "Issue / Reason", type: "textarea", placeholder: "Item damaged / not received" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  invoice_payment: [
    { key: "recipient", label: "Recipient (Client/Co.)", type: "text", placeholder: "Example Client" },
    { key: "reference", label: "Invoice #", type: "text", placeholder: "INV-2026-001" },
    { key: "date", label: "Due date", type: "text", placeholder: "Mar 10, 2026" },
    { key: "amount", label: "Amount due", type: "amount", placeholder: "1000" },
    { key: "reason", label: "Note (Optional)", type: "textarea", placeholder: "Context or bank details" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  invoice_request: [
    { key: "recipient", label: "Recipient (Vendor/Co.)", type: "text", placeholder: "Billing Dept" },
    { key: "item", label: "Service / Product", type: "text", placeholder: "Subscription" },
    { key: "reference", label: "Order / Ref #", type: "text", placeholder: "Order #123" },
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026" },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "99" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Include tax details if needed" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  billing_dispute: [
    { key: "recipient", label: "Recipient (Company/Dept)", type: "text", placeholder: "Example Service" },
    { key: "reference", label: "Charge / Invoice Ref", type: "text", placeholder: "INV-12345" },
    { key: "date", label: "Charge date", type: "text", placeholder: "Mar 1, 2026" },
    { key: "amount", label: "Incorrect amount", type: "amount", placeholder: "49.99" },
    { key: "reason", label: "Dispute details", type: "textarea", placeholder: "Duplicate charge / wrong plan" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  account_action: [
    { key: "recipient", label: "Recipient (Company)", type: "text", placeholder: "Support Team" },
    { key: "reference", label: "Account ID / Login", type: "text", placeholder: "user@email.com" },
    { key: "date", label: "Effective date", type: "text", placeholder: "Next month" },
    { key: "amount", label: "Plan / Tier", type: "text", placeholder: "Pro Plan" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Cancel my subscription..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  support_ticket: [
    { key: "recipient", label: "Recipient (Support)", type: "text", placeholder: "Help Desk" },
    { key: "item", label: "Product / App", type: "text", placeholder: "Example SaaS" },
    { key: "reference", label: "Ticket / Account #", type: "text", placeholder: "Ref #123" },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today" },
    { key: "amount", label: "Version / Setup", type: "text", placeholder: "iOS / Chrome" },
    { key: "reason", label: "Issue description", type: "textarea", placeholder: "Short summary of the problem" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  meeting: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "Topic", type: "text", placeholder: "Project sync" },
    { key: "date", label: "Proposed time", type: "text", placeholder: "Tue 2pm" },
    { key: "amount", label: "Duration", type: "text", placeholder: "e.g. 1 hour 30 mins" },
    { key: "reason", label: "Agenda / Goal", type: "textarea", placeholder: "Cover X and decide on Y" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  follow_up: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith" },
    { key: "topic", label: "Original topic", type: "text", placeholder: "Project Proposal" },
    { key: "date", label: "Previous message date", type: "text", placeholder: "last Tuesday" },
    { key: "reason", label: "Follow-up context", type: "textarea", placeholder: "Just checking in to see if you had a chance to look at it." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  work_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith" },
    { key: "reference", label: "Topic / Reference", type: "text", placeholder: "Website Redesign" },
    { key: "date", label: "Due date / Deadline", type: "text", placeholder: "by Friday" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Steps needed or specific help required" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  work_standard: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "topic", label: "Topic / Subject", type: "text", placeholder: "Project update" },
    { key: "date", label: "Date / Time", type: "text", placeholder: "Today" },
    { key: "reason", label: "Details / Message", type: "textarea", placeholder: "Provide the core of your message here." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  hr_recruiting: [
    { key: "recipient", label: "Recipient (Candidate)", type: "text", placeholder: "Jordan Smith" },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer" },
    { key: "date", label: "Start / Offer date", type: "text", placeholder: "Mar 15, 2026" },
    { key: "amount", label: "Salary Package", type: "amount", placeholder: "90000" },
    { key: "reason", label: "Details / Actions", type: "textarea", placeholder: "Please confirm by Friday" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex (HR)" }
  ],
  bug_report: [
    { key: "recipient", label: "Recipient (Dev Team)", type: "text", placeholder: "Example App" },
    { key: "item", label: "Module / Feature", type: "text", placeholder: "Login Page" },
    { key: "reference", label: "Environment", type: "text", placeholder: "Chrome / macOS" },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today" },
    { key: "reason", label: "Issue details", type: "textarea", placeholder: "Steps to reproduce" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  bank_request: [
    { key: "recipient", label: "Recipient (Bank)", type: "text", placeholder: "Example Bank" },
    { key: "reference", label: "Account / ID Ref", type: "text", placeholder: "Acc ending in 1234" },
    { key: "date", label: "Transaction date", type: "text", placeholder: "Mar 1, 2026" },
    { key: "amount", label: "Amount", type: "amount", placeholder: "49.99" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Dispute charge / update info" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  hr_pto: [
    { key: "recipient", label: "Recipient (Manager)", type: "text", placeholder: "Jordan Smith" },
    { key: "reason", label: "Reason for leave", type: "text", placeholder: "vacation / personal / medical" },
    { key: "date", label: "Dates (Start - End)", type: "text", placeholder: "Mar 1 - Mar 5" },
    { key: "reference", label: "Coverage / Contact", type: "text", placeholder: "Alex will handle urgents" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  hr_standard: [
    { key: "recipient", label: "Recipient / Employee", type: "text", placeholder: "Jordan Smith" },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer" },
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 15, 2026" },
    { key: "reason", label: "Context / Next steps", type: "textarea", placeholder: "Feedback or request details" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  bank_basic: [
    { key: "recipient", label: "Bank / Department", type: "text", placeholder: "Example Bank" },
    { key: "reference", label: "Account # (last 4)", type: "text", placeholder: "...5678" },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Closure / update / inquiry" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  account_basic: [
    { key: "recipient", label: "Company / Service", type: "text", placeholder: "Example Service" },
    { key: "reference", label: "Account ID (optional)", type: "text", placeholder: "alex@email.com" },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Next month" },
    { key: "reason", label: "Details", type: "textarea", placeholder: "Cancel / Update / Inquiry" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  purchase_basic: [
    { key: "recipient", label: "Company / Store", type: "text", placeholder: "Example Store" },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Example Item" },
    { key: "reference", label: "Order #", type: "text", placeholder: "ORD-123" },
    { key: "date", label: "Relevant date", type: "text", placeholder: "Mar 1, 2026" },
    { key: "reason", label: "Details", type: "textarea", placeholder: "Question or inquiry" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  status_update: [
    { key: "recipient", label: "Recipient / Team", type: "text", placeholder: "Product Team" },
    { key: "reference", label: "Project / Task", type: "text", placeholder: "Website Launch" },
    { key: "date", label: "Date / Milestone", type: "text", placeholder: "Today" },
    { key: "amount", label: "Progress Detail", type: "text", placeholder: "80% complete" },
    { key: "reason", label: "Update details", type: "textarea", placeholder: "What is done, roadblocks, next steps" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  boundary: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "Situation context", type: "text", placeholder: "working after hours" },
    { key: "date", label: "When (optional)", type: "text", placeholder: "from now on" },
    { key: "reason", label: "Message / Boundary", type: "textarea", placeholder: "I won't be checking emails after 6pm." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  scope_change: [
    { key: "recipient", label: "Client name", type: "text", placeholder: "Example Co." },
    { key: "reference", label: "Project name", type: "text", placeholder: "Landing Page" },
    { key: "date", label: "Timeline impact", type: "text", placeholder: "+2 days" },
    { key: "amount", label: "Cost impact", type: "text", placeholder: "+$200" },
    { key: "reason", label: "Change details", type: "textarea", placeholder: "Why scope changed" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  relationship_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "Topic / Matter", type: "text", placeholder: "our last talk" },
    { key: "date", label: "Proposed time", type: "text", placeholder: "sometime this weekend" },
    { key: "reason", label: "Message / Reason", type: "textarea", placeholder: "I'd like to discuss something important with you." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  thanks: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "For what", type: "text", placeholder: "your feedback" },
    { key: "date", label: "When (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Message", type: "textarea", placeholder: "Deeply appreciate your support..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  condolence: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "Name of the deceased", type: "text", placeholder: "their father / name" },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Personal message", type: "textarea", placeholder: "Sharing a memory or offering help..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  apology: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "reference", label: "Topic / Mistake", type: "text", placeholder: "the late reply" },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today" },
    { key: "reason", label: "Message", type: "textarea", placeholder: "Sincere apologies for the situation..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  notice_request: [
    { key: "recipient", label: "Recipient (Entity)", type: "text", placeholder: "Management Dept" },
    { key: "reference", label: "Document / Topic", type: "text", placeholder: "Employment Contract" },
    { key: "date", label: "Effective date", type: "text", placeholder: "by next Monday" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Formal notice or request context." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ],
  general_notice: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan" },
    { key: "topic", label: "Notice Topic", type: "text", placeholder: "Upcoming Departure" },
    { key: "date", label: "Date / Effective", type: "text", placeholder: "Next month" },
    { key: "reason", label: "Notice details", type: "textarea", placeholder: "I am writing to formally notify you that..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  housing_request: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management" },
    { key: "item", label: "Area / Item", type: "text", placeholder: "Kitchen sink" },
    { key: "date", label: "When noticed/needed", type: "text", placeholder: "Yesterday" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Describe the repair or request..." },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  housing_notice: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management" },
    { key: "reference", label: "Unit # / Address", type: "text", placeholder: "Unit 101" },
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 31, 2026" },
    { key: "reason", label: "Notice details", type: "textarea", placeholder: "Move out notice / lease termination details" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex" }
  ],
  complaint_escalation: [
    { key: "recipient", label: "Recipient (Dept/Mgr)", type: "text", placeholder: "Support Manager" },
    { key: "reference", label: "Reference / Ticket #", type: "text", placeholder: "TKT-5678" },
    { key: "date", label: "Previous contact date", type: "text", placeholder: "Feb 20" },
    { key: "reason", label: "Complaint details", type: "textarea", placeholder: "Explain why previous resolution was insufficient" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim" }
  ]
};
