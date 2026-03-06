window.SENDDRAFT_FORM_PRESETS = {
  purchase_issue: [
    { key: "recipient", label: "Recipient (Store/Person)", type: "text", placeholder: "Customer Support", required: true },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Wireless Headphones", required: true },
    { key: "reference", label: "Order / Reference #", type: "text", placeholder: "ORD-123" },
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "49.99" },
    { key: "reason", label: "Issue / Reason", type: "textarea", placeholder: "Item damaged / not received", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  invoice_payment: [
    { key: "recipient", label: "Recipient (Client/Co.)", type: "text", placeholder: "Example Client", required: true },
    { key: "reference", label: "Invoice #", type: "text", placeholder: "INV-2026-001", required: true },
    { key: "date", label: "Due date", type: "text", placeholder: "Mar 10, 2026", required: true },
    { key: "amount", label: "Amount due", type: "amount", placeholder: "1000", required: true },
    { key: "reason", label: "Note (Optional)", type: "textarea", placeholder: "Context or bank details" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  invoice_request: [
    { key: "recipient", label: "Recipient (Vendor/Co.)", type: "text", placeholder: "Billing Dept", required: true },
    { key: "item", label: "Service / Product", type: "text", placeholder: "Subscription", required: true },
    { key: "reference", label: "Order / Ref #", type: "text", placeholder: "Order #123" },
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "99" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Include tax details if needed", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  billing_dispute: [
    { key: "recipient", label: "Recipient (Company/Dept)", type: "text", placeholder: "Example Service", required: true },
    { key: "reference", label: "Charge / Invoice Ref", type: "text", placeholder: "INV-12345", required: true },
    { key: "date", label: "Charge date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "amount", label: "Incorrect amount", type: "amount", placeholder: "49.99", required: true },
    { key: "reason", label: "Dispute details", type: "textarea", placeholder: "Duplicate charge / wrong plan", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  account_action: [
    { key: "recipient", label: "Recipient (Company)", type: "text", placeholder: "Support Team", required: true },
    { key: "reference", label: "Account ID / Login", type: "text", placeholder: "user@email.com", required: true },
    { key: "date", label: "Effective date", type: "text", placeholder: "Next month", required: true },
    { key: "amount", label: "Plan / Tier", type: "text", placeholder: "Pro Plan" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Cancel my subscription...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  support_ticket: [
    { key: "recipient", label: "Recipient (Support)", type: "text", placeholder: "Help Desk", required: true },
    { key: "item", label: "Product / App", type: "text", placeholder: "Example SaaS", required: true },
    { key: "reference", label: "Ticket / Account #", type: "text", placeholder: "Ref #123", required: true },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true },
    { key: "amount", label: "Version / Setup", type: "text", placeholder: "iOS / Chrome" },
    { key: "reason", label: "Issue description", type: "textarea", placeholder: "Short summary of the problem", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  meeting: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Topic", type: "text", placeholder: "Project sync", required: true },
    { key: "date", label: "Proposed time", type: "text", placeholder: "Tue 2pm", required: true },
    { key: "amount", label: "Duration", type: "text", placeholder: "e.g. 1 hour 30 mins" },
    { key: "reason", label: "Agenda / Goal", type: "textarea", placeholder: "Cover X and decide on Y", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  follow_up: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "topic", label: "Original topic", type: "text", placeholder: "Project Proposal", required: true },
    { key: "date", label: "Previous message date", type: "text", placeholder: "last Tuesday", required: true },
    { key: "reason", label: "Follow-up context", type: "textarea", placeholder: "Just checking in to see if you had a chance to look at it.", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  work_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Topic / Reference", type: "text", placeholder: "Website Redesign", required: true },
    { key: "date", label: "Due date / Deadline", type: "text", placeholder: "by Friday", required: true },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Steps needed or specific help required", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  work_standard: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "topic", label: "Topic / Subject", type: "text", placeholder: "Project update", required: true },
    { key: "date", label: "Date / Time", type: "text", placeholder: "Today", required: true },
    { key: "reason", label: "Details / Message", type: "textarea", placeholder: "Provide the core of your message here.", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  hr_recruiting: [
    { key: "recipient", label: "Recipient (Candidate)", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer", required: true },
    { key: "date", label: "Start / Offer date", type: "text", placeholder: "Mar 15, 2026", required: true },
    { key: "amount", label: "Salary Package", type: "amount", placeholder: "90000" },
    { key: "reason", label: "Details / Actions", type: "textarea", placeholder: "Please confirm by Friday", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex (HR)", required: true }
  ],
  bug_report: [
    { key: "recipient", label: "Recipient (Dev Team)", type: "text", placeholder: "Example App", required: true },
    { key: "item", label: "Module / Feature", type: "text", placeholder: "Login Page", required: true },
    { key: "reference", label: "Environment", type: "text", placeholder: "Chrome / macOS", required: true },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true },
    { key: "reason", label: "Issue details", type: "textarea", placeholder: "Steps to reproduce", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  bank_request: [
    { key: "recipient", label: "Recipient (Bank)", type: "text", placeholder: "Example Bank", required: true },
    { key: "reference", label: "Account / ID Ref", type: "text", placeholder: "Acc ending in 1234", required: true },
    { key: "date", label: "Transaction date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "amount", label: "Amount", type: "amount", placeholder: "49.99" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Dispute charge / update info", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  hr_pto: [
    { key: "recipient", label: "Recipient (Manager)", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reason", label: "Reason for leave", type: "text", placeholder: "vacation / personal / medical", required: true },
    { key: "date", label: "Dates (Start - End)", type: "text", placeholder: "Mar 1 - Mar 5", required: true },
    { key: "reference", label: "Coverage / Contact", type: "text", placeholder: "Alex will handle urgents" },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  hr_standard: [
    { key: "recipient", label: "Recipient / Employee", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer", required: true },
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 15, 2026", required: true },
    { key: "reason", label: "Context / Next steps", type: "textarea", placeholder: "Feedback or request details", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  bank_basic: [
    { key: "recipient", label: "Bank / Department", type: "text", placeholder: "Example Bank", required: true },
    { key: "reference", label: "Account # (last 4)", type: "text", placeholder: "...5678", required: true },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Closure / update / inquiry", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  account_basic: [
    { key: "recipient", label: "Company / Service", type: "text", placeholder: "Example Service", required: true },
    { key: "reference", label: "Account ID (optional)", type: "text", placeholder: "alex@email.com" },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Next month" },
    { key: "reason", label: "Details", type: "textarea", placeholder: "Cancel / Update / Inquiry", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  purchase_basic: [
    { key: "recipient", label: "Company / Store", type: "text", placeholder: "Example Store", required: true },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Example Item", required: true },
    { key: "reference", label: "Order #", type: "text", placeholder: "ORD-123" },
    { key: "date", label: "Relevant date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "reason", label: "Details", type: "textarea", placeholder: "Question or inquiry", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  status_update: [
    { key: "recipient", label: "Recipient / Team", type: "text", placeholder: "Product Team", required: true },
    { key: "reference", label: "Project / Task", type: "text", placeholder: "Website Launch", required: true },
    { key: "date", label: "Date / Milestone", type: "text", placeholder: "Today", required: true },
    { key: "amount", label: "Progress Detail", type: "text", placeholder: "80% complete" },
    { key: "reason", label: "Update details", type: "textarea", placeholder: "What is done, roadblocks, next steps", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  boundary: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Situation context", type: "text", placeholder: "working after hours", required: true },
    { key: "date", label: "When (optional)", type: "text", placeholder: "from now on" },
    { key: "reason", label: "Message / Boundary", type: "textarea", placeholder: "I won't be checking emails after 6pm.", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  scope_change: [
    { key: "recipient", label: "Client name", type: "text", placeholder: "Example Co.", required: true },
    { key: "reference", label: "Project name", type: "text", placeholder: "Landing Page", required: true },
    { key: "date", label: "Timeline impact", type: "text", placeholder: "+2 days", required: true },
    { key: "amount", label: "Cost impact", type: "text", placeholder: "+$200", required: true },
    { key: "reason", label: "Change details", type: "textarea", placeholder: "Why scope changed", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  relationship_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Topic / Matter", type: "text", placeholder: "our last talk", required: true },
    { key: "date", label: "Proposed time", type: "text", placeholder: "sometime this weekend", required: true },
    { key: "reason", label: "Message / Reason", type: "textarea", placeholder: "I'd like to discuss something important with you.", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  thanks: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "For what", type: "text", placeholder: "your feedback", required: true },
    { key: "date", label: "When (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Message", type: "textarea", placeholder: "Deeply appreciate your support...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  condolence: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Name of the deceased", type: "text", placeholder: "their father / name", required: true },
    { key: "date", label: "Date (optional)", type: "text", placeholder: "Today" },
    { key: "reason", label: "Personal message", type: "textarea", placeholder: "Sharing a memory or offering help...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  apology: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Topic / Mistake", type: "text", placeholder: "the late reply", required: true },
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true },
    { key: "reason", label: "Message", type: "textarea", placeholder: "Sincere apologies for the situation...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  notice_request: [
    { key: "recipient", label: "Recipient (Entity)", type: "text", placeholder: "Management Dept", required: true },
    { key: "reference", label: "Document / Topic", type: "text", placeholder: "Employment Contract", required: true },
    { key: "date", label: "Effective date", type: "text", placeholder: "by next Monday", required: true },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Formal notice or request context.", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ],
  general_notice: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "topic", label: "Notice Topic", type: "text", placeholder: "Upcoming Departure", required: true },
    { key: "date", label: "Date / Effective", type: "text", placeholder: "Next month", required: true },
    { key: "reason", label: "Notice details", type: "textarea", placeholder: "I am writing to formally notify you that...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  housing_request: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management", required: true },
    { key: "item", label: "Area / Item", type: "text", placeholder: "Kitchen sink", required: true },
    { key: "date", label: "When noticed/needed", type: "text", placeholder: "Yesterday", required: true },
    { key: "reason", label: "Request details", type: "textarea", placeholder: "Describe the repair or request...", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  housing_notice: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management", required: true },
    { key: "reference", label: "Unit # / Address", type: "text", placeholder: "Unit 101", required: true },
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 31, 2026", required: true },
    { key: "reason", label: "Notice details", type: "textarea", placeholder: "Move out notice / lease termination details", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex", required: true }
  ],
  complaint_escalation: [
    { key: "recipient", label: "Recipient (Dept/Mgr)", type: "text", placeholder: "Support Manager", required: true },
    { key: "reference", label: "Reference / Ticket #", type: "text", placeholder: "TKT-5678", required: true },
    { key: "date", label: "Previous contact date", type: "text", placeholder: "Feb 20", required: true },
    { key: "reason", label: "Complaint details", type: "textarea", placeholder: "Explain why previous resolution was insufficient", required: true },
    { key: "name", label: "Your name (Sender)", type: "text", placeholder: "Alex Kim", required: true }
  ]
};
