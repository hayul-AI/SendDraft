window.SENDDRAFT_FORM_PRESETS = {
  purchase_issue: [
    { key: "recipient", label: "Recipient (Store/Person)", type: "text", placeholder: "Customer Support", required: true },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Wireless Headphones", required: true },
    { key: "reason", label: "Issue Type", type: "select", required: true, options: [
      { label: "Defective or damaged item", value: "the item I received is defective or damaged" },
      { label: "Incorrect item received", value: "I received the wrong item" },
      { label: "Missing parts or accessories", value: "there are parts missing from the package" },
      { label: "Shipping delay", value: "my order is significantly delayed" },
      { label: "Duplicate charge", value: "I was charged twice for this purchase" }
    ]},
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "reference", label: "Order / Reference #", type: "text", placeholder: "ORD-123", required: true },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "49.99" },
    { key: "details", label: "Additional context (Optional)", type: "text", placeholder: "e.g. box was crushed" }
  ],
  invoice_payment: [
    { key: "recipient", label: "Recipient (Client/Co.)", type: "text", placeholder: "Example Client", required: true },
    { key: "reference", label: "Invoice #", type: "text", placeholder: "INV-2026-001", required: true },
    { key: "amount", label: "Amount due", type: "amount", placeholder: "1000", required: true },
    { key: "date", label: "Due date", type: "text", placeholder: "Mar 10, 2026", required: true },
    { key: "reason", label: "Payment Status", type: "select", options: [
      { label: "Payment already sent", value: "I have already processed the payment for this invoice." },
      { label: "Will pay by due date", value: "I will ensure payment is completed by the specified due date." },
      { label: "Requesting a short extension", value: "I would like to request a brief extension on the payment deadline." }
    ]}
  ],
  invoice_request: [
    { key: "recipient", label: "Recipient (Vendor/Co.)", type: "text", placeholder: "Billing Dept", required: true },
    { key: "item", label: "Service / Product", type: "text", placeholder: "Subscription", required: true },
    { key: "date", label: "Purchase date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "reference", label: "Order / Ref #", type: "text", placeholder: "Order #123" },
    { key: "amount", label: "Amount paid", type: "amount", placeholder: "99" },
    { key: "reason", label: "Request Reason", type: "select", options: [
      { label: "Standard receipt for accounting", value: "for my standard accounting records" },
      { label: "Tax deduction documentation", value: "for tax documentation purposes" },
      { label: "Expense reimbursement", value: "to process my expense reimbursement" }
    ]}
  ],
  billing_dispute: [
    { key: "recipient", label: "Recipient (Company/Dept)", type: "text", placeholder: "Example Service", required: true },
    { key: "reference", label: "Charge / Invoice Ref", type: "text", placeholder: "INV-12345", required: true },
    { key: "reason", label: "Dispute Type", type: "select", required: true, options: [
      { label: "Duplicate charge", value: "I found a duplicate charge for the same service" },
      { label: "Incorrect amount", value: "the amount charged does not match my records" },
      { label: "Charged after cancellation", value: "I was charged after I had already cancelled my subscription" },
      { label: "Unrecognized fee", value: "I do not recognize this specific fee on my statement" }
    ]},
    { key: "amount", label: "Disputed amount", type: "amount", placeholder: "49.99", required: true },
    { key: "date", label: "Charge date", type: "text", placeholder: "Mar 1, 2026", required: true }
  ],
  account_action: [
    { key: "recipient", label: "Recipient (Company)", type: "text", placeholder: "Support Team", required: true },
    { key: "reference", label: "Account ID / Login", type: "text", placeholder: "user@email.com", required: true },
    { key: "reason", label: "Action Required", type: "select", required: true, options: [
      { label: "Cancel subscription", value: "I would like to cancel my current subscription" },
      { label: "Downgrade plan", value: "I wish to downgrade my account to a lower tier" },
      { label: "Update email address", value: "I need to update the primary email on my account" },
      { label: "Delete all data", value: "I am requesting the permanent deletion of my account and data" }
    ]},
    { key: "date", label: "Effective date", type: "text", placeholder: "Immediately", required: true },
    { key: "amount", label: "Current Plan", type: "text", placeholder: "Pro Plan" }
  ],
  support_ticket: [
    { key: "recipient", label: "Recipient (Support)", type: "text", placeholder: "Help Desk", required: true },
    { key: "item", label: "Product / App", type: "text", placeholder: "Example SaaS", required: true },
    { key: "reason", label: "Technical Issue", type: "select", required: true, options: [
      { label: "Login / Access issue", value: "I am unable to log in to my account" },
      { label: "Feature not working", value: "a specific feature is not responding as expected" },
      { label: "Slow performance", value: "the application is running significantly slower than usual" },
      { label: "Error message displayed", value: "I am receiving an error message during standard use" }
    ]},
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true },
    { key: "reference", label: "Ticket / Account #", type: "text", placeholder: "Ref #123", required: true },
    { key: "amount", label: "Device / OS", type: "text", placeholder: "iOS / Chrome" }
  ],
  meeting: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Meeting Topic", type: "text", placeholder: "Project sync", required: true },
    { key: "date", label: "Proposed time", type: "text", placeholder: "Tue 2pm", required: true },
    { key: "reason", label: "Meeting Purpose", type: "select", required: true, options: [
      { label: "Discuss project updates", value: "to discuss the latest updates on our project" },
      { label: "Resolve a technical blocker", value: "to find a solution for a current technical blocker" },
      { label: "Review a proposal", value: "to review and provide feedback on the new proposal" },
      { label: "Onboarding / Training", value: "for a quick onboarding and training session" }
    ]},
    { key: "amount", label: "Duration", type: "text", placeholder: "30 mins" }
  ],
  follow_up: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "topic", label: "Original topic", type: "text", placeholder: "Project Proposal", required: true },
    { key: "reason", label: "Follow-up Reason", type: "select", required: true, options: [
      { label: "Checking for feedback", value: "I'm just following up to see if you had a chance to review my last message" },
      { label: "Awaiting approval", value: "I am checking in on the status of the approval we discussed" },
      { label: "Gentle reminder", value: "I'm sending a quick reminder regarding our previous conversation" }
    ]},
    { key: "date", label: "Last contact date", type: "text", placeholder: "last Tuesday", required: true }
  ],
  work_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Project / Task", type: "text", placeholder: "Website Redesign", required: true },
    { key: "reason", label: "What is needed?", type: "select", required: true, options: [
      { label: "Requesting assistance", value: "I would appreciate your assistance with this task" },
      { label: "Need a quick review", value: "could you please take a quick look at this for me?" },
      { label: "Requires urgent action", value: "this matter requires your urgent attention and action" },
      { label: "Data/Info request", value: "I am looking for some specific information related to this" }
    ]},
    { key: "date", label: "Due date / Deadline", type: "text", placeholder: "by Friday", required: true }
  ],
  work_standard: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "topic", label: "Topic / Subject", type: "text", placeholder: "Project update", required: true },
    { key: "reason", label: "Core Message", type: "select", required: true, options: [
      { label: "Providing an update", value: "I wanted to provide you with a brief update on my progress" },
      { label: "Sharing a resource", value: "I am sharing a relevant resource that I believe will be helpful" },
      { label: "Confirming completion", value: "I'm writing to confirm that I have completed the assigned task" }
    ]},
    { key: "date", label: "Date / Time", type: "text", placeholder: "Today", required: true }
  ],
  hr_recruiting: [
    { key: "recipient", label: "Candidate name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer", required: true },
    { key: "reason", label: "Application Status", type: "select", required: true, options: [
      { label: "Invite to interview", value: "we would like to invite you for an interview" },
      { label: "Extend job offer", value: "we are pleased to extend a formal job offer to you" },
      { label: "Application update", value: "we wanted to provide you with an update on your application" }
    ]},
    { key: "date", label: "Schedule date", type: "text", placeholder: "Mar 15, 2026", required: true },
    { key: "amount", label: "Salary/Package", type: "text", placeholder: "Competitive" }
  ],
  bug_report: [
    { key: "recipient", label: "Product / Team", type: "text", placeholder: "Example App", required: true },
    { key: "item", label: "Module / Feature", type: "text", placeholder: "Login Page", required: true },
    { key: "reason", label: "Bug Severity", type: "select", required: true, options: [
      { label: "Critical - App crashes", value: "this is a critical issue causing the application to crash" },
      { label: "Major - Feature broken", value: "a major feature is currently not functioning as intended" },
      { label: "Minor - Visual glitch", value: "I've noticed a minor visual glitch that needs attention" }
    ]},
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true },
    { key: "reference", label: "Environment", type: "text", placeholder: "Chrome / macOS" }
  ],
  bank_request: [
    { key: "recipient", label: "Bank / Institution", type: "text", placeholder: "Example Bank", required: true },
    { key: "reference", label: "Account Ref (Last 4)", type: "text", placeholder: "...1234", required: true },
    { key: "reason", label: "Request Type", type: "select", required: true, options: [
      { label: "Dispute a transaction", value: "I am writing to dispute a specific transaction on my account" },
      { label: "Update personal info", value: "I need to update my personal information on file" },
      { label: "Order new card", value: "I would like to request a replacement for my current card" }
    ]},
    { key: "date", label: "Date", type: "text", placeholder: "Today", required: true },
    { key: "amount", label: "Amount", type: "amount", placeholder: "0.00" }
  ],
  hr_pto: [
    { key: "recipient", label: "Manager name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reason", label: "Type of Leave", type: "select", required: true, options: [
      { label: "Vacation", value: "vacation" },
      { label: "Personal leave", value: "personal leave" },
      { label: "Sick / Medical", value: "medical leave" }
    ]},
    { key: "date", label: "Dates (Start - End)", type: "text", placeholder: "Mar 1 - Mar 5", required: true },
    { key: "reference", label: "Coverage plan", type: "text", placeholder: "Alex will handle urgents" }
  ],
  hr_standard: [
    { key: "recipient", label: "Employee name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reason", label: "Communication Type", type: "select", required: true, options: [
      { label: "Performance feedback", value: "I wanted to share some performance feedback with you" },
      { label: "Policy reminder", value: "this is a friendly reminder regarding our company policy" },
      { label: "Training notice", value: "we are scheduling a mandatory training session" }
    ]},
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 15, 2026", required: true },
    { key: "reference", label: "Role / Position", type: "text", placeholder: "Senior Designer" }
  ],
  bank_basic: [
    { key: "recipient", label: "Bank / Dept", type: "text", placeholder: "Example Bank", required: true },
    { key: "reference", label: "Account # (Last 4)", type: "text", placeholder: "...5678", required: true },
    { key: "reason", label: "Inquiry / Request", type: "select", required: true, options: [
      { label: "Account balance check", value: "I am requesting a formal statement of my current balance" },
      { label: "Close account", value: "I would like to initiate the process of closing this account" },
      { label: "General inquiry", value: "I have a general question regarding my account services" }
    ]},
    { key: "date", label: "Date", type: "text", placeholder: "Today", required: true }
  ],
  account_basic: [
    { key: "recipient", label: "Company / Service", type: "text", placeholder: "Example Service", required: true },
    { key: "reason", label: "Action Type", type: "select", required: true, options: [
      { label: "Cancel service", value: "I am requesting to cancel my service effective immediately" },
      { label: "Update billing", value: "I need to update my billing information" },
      { label: "Account status check", value: "I am inquiring about the current status of my account" }
    ]},
    { key: "reference", label: "Account ID", type: "text", placeholder: "alex@email.com", required: true },
    { key: "date", label: "Relevant date", type: "text", placeholder: "Next month", required: true }
  ],
  purchase_basic: [
    { key: "recipient", label: "Company / Store", type: "text", placeholder: "Example Store", required: true },
    { key: "item", label: "Product / Service", type: "text", placeholder: "Example Item", required: true },
    { key: "reason", label: "Message Type", type: "select", required: true, options: [
      { label: "Order status check", value: "I am writing to check the current status of my order" },
      { label: "Shipping update request", value: "could you please provide an update on the shipping status?" },
      { label: "General product inquiry", value: "I have a question regarding the specifications of this item" }
    ]},
    { key: "reference", label: "Order # (Optional)", type: "text", placeholder: "ORD-123" }
  ],
  status_update: [
    { key: "recipient", label: "Recipient / Team", type: "text", placeholder: "Product Team", required: true },
    { key: "reference", label: "Project / Task", type: "text", placeholder: "Website Launch", required: true },
    { key: "reason", label: "Current Status", type: "select", required: true, options: [
      { label: "On track", value: "I'm pleased to report that the project is currently on track" },
      { label: "Slight delay", value: "we are experiencing a slight delay due to unforeseen roadblocks" },
      { label: "Blocker identified", value: "we have identified a major blocker that requires attention" },
      { label: "Milestone reached", value: "I am happy to announce that we have reached a major milestone" }
    ]},
    { key: "date", label: "Update date", type: "text", placeholder: "Today", required: true },
    { key: "amount", label: "Progress %", type: "text", placeholder: "80%" }
  ],
  boundary: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reason", label: "Boundary Type", type: "select", required: true, options: [
      { label: "After-hours communication", value: "I will not be available for work-related messages after 6 PM" },
      { label: "Focus time", value: "I am setting specific focus hours to improve my productivity" },
      { label: "Personal time off", value: "I will be offline and unreachable during my scheduled time off" }
    ]},
    { key: "reference", label: "Context (Optional)", type: "text", placeholder: "Work-life balance" }
  ],
  scope_change: [
    { key: "recipient", label: "Client name", type: "text", placeholder: "Example Co.", required: true },
    { key: "reference", label: "Project name", type: "text", placeholder: "Landing Page", required: true },
    { key: "reason", label: "Nature of Change", type: "select", required: true, options: [
      { label: "New requirements added", value: "due to additional requirements being added to the project" },
      { label: "Technical complexity", value: "because of unexpected technical complexity we encountered" },
      { label: "Timeline adjustment", value: "as a result of the necessary timeline adjustments" }
    ]},
    { key: "date", label: "Timeline impact", type: "text", placeholder: "+2 days", required: true },
    { key: "amount", label: "Cost impact", type: "text", placeholder: "+$200" }
  ],
  relationship_request: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reason", label: "Topic of Talk", type: "select", required: true, options: [
      { label: "Discuss our last talk", value: "I would like to clarify a few things from our last conversation" },
      { label: "Check-in", value: "I just wanted to check in and see how you're doing" },
      { label: "Plan a meeting", value: "I'd like to find some time for us to catch up properly" }
    ]},
    { key: "date", label: "Proposed time", type: "text", placeholder: "this weekend", required: true },
    { key: "reference", label: "Context (Optional)", type: "text", placeholder: "Our future plans" }
  ],
  thanks: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Reason for thanks", type: "text", placeholder: "your support", required: true },
    { key: "reason", label: "Impact", type: "select", required: true, options: [
      { label: "Really helped me out", value: "your assistance really helped me get through a difficult task" },
      { label: "Greatly appreciated", value: "I wanted you to know how much I appreciate your kind gesture" },
      { label: "Valuable contribution", value: "your contribution was extremely valuable to the team's success" }
    ]},
    { key: "date", label: "Date", type: "text", placeholder: "Today", required: true }
  ],
  condolence: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "Name of the deceased", type: "text", placeholder: "their father / name", required: true },
    { key: "reason", label: "Offer of Support", type: "select", required: true, options: [
      { label: "Offering practical help", value: "please let me know if there's anything I can do to help with chores or errands" },
      { label: "Sharing a warm memory", value: "I will always remember them for their kindness and warmth" },
      { label: "Sending strength", value: "I am sending you and your family strength and love during this time" }
    ]},
    { key: "date", label: "Date", type: "text", placeholder: "Today", required: true }
  ],
  apology: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "reference", label: "The Mistake", type: "text", placeholder: "the late reply", required: true },
    { key: "reason", label: "Apology Tone", type: "select", required: true, options: [
      { label: "Sincere regret", value: "I truly regret any inconvenience this may have caused you" },
      { label: "Taking responsibility", value: "I take full responsibility for the oversight and will ensure it doesn't happen again" },
      { label: "Brief explanation", value: "I've had some unexpected things come up, but I'm back on track now" }
    ]},
    { key: "date", label: "When it happened", type: "text", placeholder: "Today", required: true }
  ],
  notice_request: [
    { key: "recipient", label: "Recipient (Entity)", type: "text", placeholder: "Management Dept", required: true },
    { key: "reference", label: "Document / Topic", type: "text", placeholder: "Employment Contract", required: true },
    { key: "reason", label: "Request Purpose", type: "select", required: true, options: [
      { label: "For my records", value: "I would like a copy of this document for my personal records" },
      { label: "Verification purposes", value: "I need this for verification purposes related to an external matter" },
      { label: "Information update", value: "I am looking to update certain details within the document" }
    ]},
    { key: "date", label: "Effective date", type: "text", placeholder: "by next Monday", required: true }
  ],
  general_notice: [
    { key: "recipient", label: "Recipient name", type: "text", placeholder: "Jordan", required: true },
    { key: "topic", label: "Notice Topic", type: "text", placeholder: "Upcoming Departure", required: true },
    { key: "reason", label: "Notice Context", type: "select", required: true, options: [
      { label: "Formal notification", value: "I am writing to provide you with formal notice regarding this matter" },
      { label: "Change in status", value: "please be advised of this upcoming change in my current status" },
      { label: "Upcoming event", value: "I am notifying you of an important upcoming event or deadline" }
    ]},
    { key: "date", label: "Effective date", type: "text", placeholder: "Next month", required: true }
  ],
  housing_request: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management", required: true },
    { key: "item", label: "Area / Item", type: "text", placeholder: "Kitchen sink", required: true },
    { key: "reason", label: "Urgency", type: "select", required: true, options: [
      { label: "Urgent - Active leak/danger", value: "this is an urgent matter that requires immediate attention" },
      { label: "Standard - Needs repair", value: "I am requesting a standard repair for this item at your earliest convenience" },
      { label: "Routine maintenance", value: "this is a request for routine maintenance as previously discussed" }
    ]},
    { key: "date", label: "When noticed", type: "text", placeholder: "Yesterday", required: true }
  ],
  housing_notice: [
    { key: "recipient", label: "Recipient (Landlord/Mgr)", type: "text", placeholder: "Property Management", required: true },
    { key: "reference", label: "Unit # / Address", type: "text", placeholder: "Unit 101", required: true },
    { key: "reason", label: "Notice Type", type: "select", required: true, options: [
      { label: "Move out notice", value: "I am providing my formal notice to vacate the premises" },
      { label: "Lease renewal inquiry", value: "I am interested in discussing the renewal of my current lease" },
      { label: "Request to sublease", value: "I am writing to request permission to sublease my unit" }
    ]},
    { key: "date", label: "Effective date", type: "text", placeholder: "Mar 31, 2026", required: true }
  ],
  complaint_escalation: [
    { key: "recipient", label: "Recipient (Dept/Mgr)", type: "text", placeholder: "Support Manager", required: true },
    { key: "reference", label: "Reference / Ticket #", type: "text", placeholder: "TKT-5678", required: true },
    { key: "reason", label: "Reason for Escalation", type: "select", required: true, options: [
      { label: "No response received", value: "I have not received any response to my previous inquiries" },
      { label: "Resolution unsatisfactory", value: "the previous resolution provided was not satisfactory" },
      { label: "Unprofessional service", value: "I am escalating this due to unprofessional service I received" }
    ]},
    { key: "date", label: "Last contact date", type: "text", placeholder: "Feb 20", required: true }
  ],
  education_request: [
    { key: "recipient", label: "Teacher / Professor name", type: "text", placeholder: "Professor Smith", required: true },
    { key: "reference", label: "Course / Subject", type: "text", placeholder: "Economics 101", required: true },
    { key: "reason", label: "Reason / Context", type: "select", required: true, options: [
      { label: "Personal illness", value: "I am dealing with a personal health issue" },
      { label: "Family emergency", value: "a sudden family emergency has occurred" },
      { label: "Technical issue", value: "I am experiencing unexpected technical difficulties" },
      { label: "Schedule conflict", value: "I have an unavoidable scheduling conflict" }
    ]},
    { key: "date", label: "Date / Deadline", type: "text", placeholder: "Today", required: true }
  ],
  sales_outreach: [
    { key: "recipient", label: "Prospect name", type: "text", placeholder: "Jordan Smith", required: true },
    { key: "reference", label: "Company / Product", type: "text", placeholder: "Example Corp", required: true },
    { key: "reason", label: "Goal of outreach", type: "select", required: true, options: [
      { label: "Schedule a demo", value: "I'd like to schedule a brief demo of our platform" },
      { label: "Discuss partnership", value: "I am interested in exploring a potential partnership" },
      { label: "Follow up on inquiry", value: "I'm following up on your recent inquiry regarding our services" },
      { label: "Introduce new feature", value: "I wanted to introduce you to a new feature we've just launched" }
    ]},
    { key: "date", label: "Proposed time", type: "text", placeholder: "Next Tuesday at 2pm", required: true }
  ],
  travel_claim: [
    { key: "recipient", label: "Airline / Provider", type: "text", placeholder: "Example Airlines", required: true },
    { key: "reference", label: "Booking / Flight #", type: "text", placeholder: "FL-12345", required: true },
    { key: "date", label: "Travel date", type: "text", placeholder: "Mar 1, 2026", required: true },
    { key: "reason", label: "Issue description", type: "select", required: true, options: [
      { label: "Flight delay", value: "my flight was significantly delayed" },
      { label: "Cancelled flight", value: "my flight was cancelled at the last minute" },
      { label: "Lost baggage", value: "my checked baggage has not arrived" },
      { label: "Overbooking", value: "I was denied boarding due to an overbooked flight" }
    ]}
  ]
};
