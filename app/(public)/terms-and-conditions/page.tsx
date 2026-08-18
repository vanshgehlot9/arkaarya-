"use client";
import React from 'react';
import { LegalLayout } from '@/components/LegalLayout';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      id: "master-terms",
      title: "Master Terms & Conditions",
      content: (
        <>
          <h3 className="text-xl font-bold text-[#00264A] mb-3">Purpose and Scope</h3>
          <p className="mb-4">These Master Terms & Conditions (“Terms”) establish the general commercial, operational and contractual framework under which ArkaArya Pvt Ltd (“ArkaArya”, “Company”, “we”, “us” or “our”) may provide products, services, technology, consulting, collection, purchase/sale of materials, recycling coordination, renewable-energy services, software, SaaS, workforce solutions and related offerings.</p>
          <p className="mb-4">These Terms apply together with a quotation, proposal, purchase order, work order, statement of work (“SOW”), service agreement, subscription order, pickup request, listing/order confirmation or other written or electronic commercial document (“Order Document”). If an Order Document expressly conflicts with these Terms, the Order Document controls for that transaction.</p>
          
          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Business Verticals</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>ArkaArya Green</strong> — Sustainability & Circular Economy: e-waste management, collection, IT asset disposition, recycling coordination, resource recovery, waste solutions and sustainable/bio products where offered.</li>
            <li><strong>ArkaArya Renew</strong> — Renewable Energy: solar, renewable-energy projects, EPC/implementation support, energy solutions, EV/clean-energy infrastructure and consulting where offered.</li>
            <li><strong>ArkaArya Quantum</strong> — Technology & Digital Solutions: IT consulting, software development, SaaS, cloud, AI/automation, digital transformation and enterprise technology solutions.</li>
            <li><strong>Workforce / Staffing Solutions</strong> — recruitment, manpower supply, staffing, workforce management and related services where separately offered and documented.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Accounts, Registration and Authority</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Users must provide complete, accurate and current registration, tax, business and contact information.</li>
            <li>Users are responsible for safeguarding credentials and activity under their account, subject to applicable law.</li>
            <li>Organizational users warrant that they are authorized to bind the relevant organization.</li>
            <li>ArkaArya may verify identity, GST/tax details, licences, authorizations and compliance information.</li>
            <li>ArkaArya may suspend or terminate access for suspected fraud, unlawful conduct, safety/regulatory risk or material breach.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Website / Platform Licence and Acceptable Use</h3>
          <p className="mb-4">ArkaArya grants a limited, revocable, non-exclusive and non-transferable right to use its website/platform for lawful business purposes. Users must not copy, scrape, reproduce, reverse engineer, frame, mirror, resell or commercially exploit the platform or its databases without written permission.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>No fraudulent, deceptive, unlawful, abusive, defamatory, infringing or malicious activity.</li>
            <li>No malware, unauthorized access, credential theft, automated abuse, data mining or interference with security.</li>
            <li>No impersonation or submission of content violating privacy, IP rights or confidentiality.</li>
            <li>No unauthorized use of ArkaArya's name, logo, domain, visual identity or proprietary content.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Marketplace Role and Contract Structure</h3>
          <p className="mb-4">ArkaArya may act as (a) principal buyer/seller, (b) service provider, (c) marketplace facilitator, (d) procurement agent, or (e) coordinator using an Authorized Partner. The applicable Order Document or listing determines the role.</p>
          <p>Where ArkaArya is only a facilitator, the underlying sale/service contract may be directly between buyer and seller/service provider. ArkaArya does not assume obligations expressly allocated to the underlying counterparty unless it has separately contracted to do so. Where ArkaArya is principal, the applicable sale/order terms apply directly between ArkaArya and the counterparty.</p>
        </>
      )
    },
    {
      id: "commercial-terms",
      title: "Listings, Orders & Commercial Terms",
      content: (
        <>
          <h3 className="text-xl font-bold text-[#00264A] mb-3">Listings, Offers and Content</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Sellers must ensure descriptions, quantities, grades, condition, photographs, certifications, prices, taxes and availability are accurate.</li>
            <li>ArkaArya may reject, edit, suspend or remove listings that are inaccurate, unsafe, unlawful, infringing or non-compliant.</li>
            <li>Users retain ownership of lawful content but grant ArkaArya a non-exclusive licence to host, reproduce, display, format and process content as reasonably necessary to operate and secure the platform and complete transactions.</li>
            <li>ArkaArya may operate notice-and-takedown procedures for credible infringement or objectionable-content complaints.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Commercial Terms and Contract Formation</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Quotes/proposals are valid only for the stated period; otherwise they may be revised or withdrawn before acceptance.</li>
            <li>A transaction becomes binding when the Order Document is accepted, an accepted PO is issued, an applicable advance is paid, a digital acceptance is recorded, a pickup/order is confirmed under the workflow, or the parties otherwise confirm in writing.</li>
            <li>Electronic acceptance, digital signatures and electronic records may be used where legally valid.</li>
            <li>Prices exclude GST and other taxes, duties, transport, loading/unloading, testing, certification and third-party charges unless expressly included.</li>
            <li>Marketplace availability and delivery estimates are indicative unless expressly guaranteed.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Pricing, Inspection, Weighment and Adjustments</h3>
          <p className="mb-4">Where price depends on weight, grade, model, condition, composition, recovery value or market-linked commodity prices, final pricing follows the agreed inspection and measurement process.</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>For e-waste/recyclables, ArkaArya may inspect, segregate, weigh, sample and classify Materials before final acceptance or settlement.</li>
            <li>Commodity-linked rates may change because of metal prices, recovery yield, contamination, hazardous content, logistics, processing or regulatory requirements.</li>
            <li>Materially incorrect descriptions may result in price revision, rejection, segregation at additional cost or a revised Order Document.</li>
            <li>Final settlement controls unless disputed in writing within 3 business days, unless the Order Document states otherwise.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Taxes and Payment</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each party is responsible for taxes allocated to it by law and the Order Document.</li>
            <li>Customers must provide accurate GSTIN/PAN and other tax information where applicable.</li>
            <li>Payment terms are stated in the Order Document; if not stated, B2B invoices are payable within 15 days.</li>
            <li>ArkaArya may require advance, milestone payment, security deposit or prepayment.</li>
            <li>Late payment may attract the lesser of 1.5% per month or the maximum legally permissible, unless the Order Document states otherwise.</li>
            <li>Refunds/cancellations apply only where the applicable policy or Order Document permits them.</li>
          </ul>
        </>
      )
    },
    {
      id: "schedule-a",
      title: "Schedule A — ArkaArya Green",
      content: (
        <>
          <p className="font-medium text-[#00264A] mb-4">Applies to e-waste collection/purchase, IT asset disposition, pickup, refurbishment, dismantling/recycling coordination, resource recovery, sustainable products and related circular-economy services.</p>
          
          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Regulatory Compliance</h3>
          <p className="mb-4">Regulated activities will be performed only to the extent legally permitted and, where required, through appropriately authorized/licensed entities. The E-Waste (Management) Rules, 2022 apply to covered activities, while waste batteries are governed separately under the Battery Waste Management Rules, 2022. Requirements and amendments applicable on the transaction date must be followed. ArkaArya does not represent that it holds a statutory authorization unless expressly stated.</p>
          
          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Pickup and Collection</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Pickup requests are subject to service-area availability, eligibility, quantity, access, safety and logistics feasibility.</li>
            <li>Pickup confirmation is not final acceptance, final weight or final price.</li>
            <li>Customer must provide safe access, loading arrangements and an authorized representative where required.</li>
            <li>ArkaArya may postpone or decline unsafe, illegal or undisclosed-risk pickups.</li>
          </ul>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Title, Ownership and Risk</h3>
          <p className="mb-4">The Customer warrants lawful ownership and authority to transfer Materials. Title and risk transfer at the point stated in the Order Document; if none is stated, title to accepted Materials transfers upon final weighment/acceptance, subject to payment terms.</p>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Data-Bearing Devices and Data Destruction</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Customers must identify data-bearing devices and specify whether wiping, logical erasure, media shredding or certificates of destruction are required.</li>
            <li>The method, standard, evidence and retention period will be stated in the Order Document or destruction report.</li>
            <li>Unless data-erasure services are expressly ordered, Customer remains responsible for backup, migration and secure deletion.</li>
            <li>After lawful transfer and agreed destruction, equipment may be refurbished, resold, dismantled or recycled as permitted by law and the Order Document.</li>
          </ul>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Batteries, Hazardous and Prohibited Materials</h3>
          <p className="mb-4">Customers must disclose damaged, leaking, swollen or thermally compromised batteries and known hazardous components before pickup.</p>
          <p className="mb-4">Radioactive material, medical/biological waste, explosives, stolen goods and other prohibited materials must not be supplied unless expressly lawful and accepted under a dedicated written arrangement. ArkaArya may reject, isolate or arrange specialized handling and recover contractually permitted additional costs.</p>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">E-Waste Purchase Settlement</h3>
          <p>Settlement may be based on gross/net weight, category, grade, condition, recovery model or another agreed basis. Contamination, non-e-waste material, hazardous material, missing components or misclassification may result in adjustment, rejection or additional processing charges.</p>
        </>
      )
    },
    {
      id: "schedule-b",
      title: "Schedule B — ArkaArya Renew",
      content: (
        <>
          <p className="font-medium text-[#00264A] mb-4">Applies to solar and renewable-energy consulting, project development, EPC/implementation support, energy solutions, EV/clean-energy infrastructure and related services.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Customer must provide accurate site drawings, sanctioned load, electricity bills, structural information, access, shadowing constraints, grid information and other required data.</li>
            <li>Generation, savings, feasibility and ROI estimates depend on site conditions, weather, equipment, grid availability and approvals and are not guarantees unless expressly contracted.</li>
            <li>Unless expressly included, statutory permissions, utility approvals, net-metering/open-access approvals and similar third-party approvals are outside scope.</li>
            <li>Manufacturer warranties apply according to manufacturer terms; ArkaArya workmanship warranty must be stated in the Order Document.</li>
          </ul>
        </>
      )
    },
    {
      id: "schedule-c",
      title: "Schedule C — ArkaArya Quantum",
      content: (
        <>
          <p className="font-medium text-[#00264A] mb-4">Applies to IT consulting, software development, SaaS, cloud, AI/automation, enterprise technology and digital transformation.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Only features, integrations, environments, deliverables and service levels expressly described in the SOW are included.</li>
            <li>Changes to requirements, APIs, infrastructure, data volumes or compliance requirements may require change control and additional fees.</li>
            <li>ArkaArya retains pre-existing tools, libraries, frameworks, templates, reusable components, know-how and generic methodologies unless otherwise agreed.</li>
            <li>Customer-specific deliverables are owned/licensed as stated in the SOW after payment; third-party software remains subject to its licence terms.</li>
            <li>AI-assisted outputs may require human review and are not warranted error-free, unique or suitable for high-risk decisions without validation.</li>
            <li>Support and SLA commitments apply only where stated in a signed SLA/SOW.</li>
          </ul>
        </>
      )
    },
    {
      id: "schedule-d",
      title: "Schedule D — Workforce / Staffing Solutions",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Parties will comply with applicable labour, wage, social-security, employment, workplace-safety and related laws.</li>
            <li>Engagement model, statutory contributions, replacement terms, background verification, deployment, supervision, attendance and payroll responsibilities will be stated in the staffing agreement.</li>
            <li>Customer must provide a safe workplace and comply with applicable workplace obligations.</li>
          </ul>
        </>
      )
    },
    {
      id: "schedule-e",
      title: "Schedule E — Digital Marketplace",
      content: (
        <>
          <h3 className="text-lg font-bold text-[#00264A] mb-2">Business Use</h3>
          <p className="mb-4">Unless otherwise stated, marketplace purchasing/selling is intended for business, institutional or commercial use. Users must have legal capacity and authority to transact.</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="bg-white p-6 rounded-xl border border-[#E3E8E4]">
              <h4 className="font-bold text-[#00264A] mb-3">Buyer Responsibilities</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-[#5E6672]">
                <li>Review listing details, specifications, quantity, condition, taxes, delivery terms and seller information before ordering.</li>
                <li>Provide accurate billing, delivery and tax details and comply with applicable safety, storage and usage requirements.</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E3E8E4]">
              <h4 className="font-bold text-[#00264A] mb-3">Seller Responsibilities</h4>
              <ul className="list-disc pl-4 space-y-2 text-sm text-[#5E6672]">
                <li>Responsible for legality, title, quality, quantity, condition, certifications, licences and accuracy of listings.</li>
                <li>Must not list stolen, counterfeit, prohibited, unlawfully sourced, unsafe or misrepresented goods/materials.</li>
                <li>Regulated waste/e-waste sellers must comply with applicable environmental requirements and provide required documentation.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Facilitator Disclaimer</h3>
          <p className="mb-4">Where ArkaArya acts only as marketplace facilitator, third-party listings are provided by the relevant seller and ArkaArya does not independently warrant every third-party representation, title, legality or performance. ArkaArya may apply verification, suspension, inspection, takedown and compliance controls. This disclaimer does not apply to transactions where ArkaArya is the principal buyer or seller.</p>

          <h3 className="text-lg font-bold text-[#00264A] mt-6 mb-2">Availability and Delivery</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Availability and dispatch estimates are indicative unless expressly guaranteed.</li>
            <li>Delivery may be performed by the seller, ArkaArya or a logistics provider as stated in the transaction.</li>
            <li>Title and risk transfer according to the applicable sale/order terms, not merely because an order was placed.</li>
          </ul>
        </>
      )
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property, Content and Takedown",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>ArkaArya owns or licenses its name, logos, trademarks, domain names, website content, platform software, designs, databases and proprietary materials.</li>
            <li>Users must not copy, extract, scrape, reverse engineer, publish or commercially exploit substantial platform/database content without permission.</li>
            <li>A content submitter warrants it has rights to submit the content and that it is accurate and lawful.</li>
            <li>ArkaArya may remove or restrict content following a credible infringement, illegality, safety or regulatory complaint.</li>
            <li>Good-faith notices should identify claimant, contact details, affected content, alleged right, supporting information and a declaration of accuracy.</li>
          </ul>
        </>
      )
    },
    {
      id: "data-privacy",
      title: "Privacy, Personal Data and Electronic Communications",
      content: (
        <>
          <p className="mb-4">ArkaArya may collect and process contact details, account information, location, pickup information, business records, transaction information and technical data necessary to provide services and operate the platform. Processing is subject to ArkaArya's Privacy Policy and applicable Indian data-protection law.</p>
          <p className="mb-4">Where applicable, the parties will comply with the Digital Personal Data Protection Act, 2023 and applicable rules/notifications. Users should not submit unnecessary personal data through public forms, WhatsApp or other open channels.</p>
          <p>Electronic communications, records, digital acceptance and electronic contracts may be used where legally valid.</p>
        </>
      )
    },
    {
      id: "warranties-disclaimers",
      title: "Warranties and Disclaimers",
      content: (
        <>
          <p className="mb-4">ArkaArya will perform contracted services with reasonable skill and care.</p>
          <p className="mb-4">Except for express warranties in an Order Document, products/services are provided subject to applicable law and without implied warranties to the fullest extent permitted by law.</p>
          <p className="mb-4">ArkaArya does not guarantee uninterrupted operation of third-party networks, utilities, cloud platforms, government portals, marketplaces, payment systems or logistics providers.</p>
          <p>Marketplace content, third-party listings, commodity-linked prices and estimated delivery dates may change and may contain errors; users should exercise reasonable commercial diligence.</p>
        </>
      )
    },
    {
      id: "liability-indemnity",
      title: "Liability & Indemnity",
      content: (
        <>
          <h3 className="text-xl font-bold text-[#00264A] mb-3">Limitation of Liability</h3>
          <p className="mb-4">To the maximum extent permitted by law, ArkaArya's aggregate liability arising from an Order Document will not exceed fees actually paid to ArkaArya under that Order Document during the 12 months preceding the event giving rise to the claim, unless a different cap is expressly agreed.</p>
          <p className="mb-4">Neither party will be liable for indirect, incidental, special, consequential or loss-of-profit damages except where prohibited by law. The liability cap/exclusions do not apply to fraud, wilful misconduct, breach of confidentiality, IP infringement or liabilities that cannot lawfully be limited.</p>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Indemnity</h3>
          <p>Each party will indemnify the other against third-party claims arising from its unlawful acts, gross negligence, wilful misconduct or material breach of express representations. Customer/Seller indemnity may additionally cover lack of title, unlawful transfer, stolen/prohibited materials, undisclosed hazardous contents, infringement or unauthorized personal data supplied by that party.</p>
        </>
      )
    },
    {
      id: "general",
      title: "General Provisions",
      content: (
        <>
          <h3 className="text-xl font-bold text-[#00264A] mb-3">Force Majeure</h3>
          <p className="mb-4">Neither party is liable for delay/failure caused by events beyond reasonable control, including natural disasters, fire, flood, epidemic, war, civil unrest, government action, strikes, utility/grid failure, major cyber incidents, transport disruption or critical third-party infrastructure failure.</p>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Suspension and Termination</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Either party may terminate an Order Document for material breach not cured within the stated cure period or, if none is stated, within 15 days after written notice.</li>
            <li>ArkaArya may immediately suspend access/performance where continued operation creates legal, safety, security or regulatory risk.</li>
            <li>On termination, Customer must pay undisputed fees for work performed, accepted goods/materials, approved expenses and committed third-party costs.</li>
            <li>Payment, confidentiality, IP, privacy, liability, indemnity and dispute provisions intended to survive will continue.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Compliance and Anti-Bribery</h3>
          <p className="mb-4">The parties will comply with applicable environmental, labour, tax, anti-bribery, anti-corruption, sanctions, safety, data-protection and other laws. Neither party will offer or accept an improper payment or benefit in connection with the Services.</p>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Dispute Resolution and Governing Law</h3>
          <p className="mb-4">These Terms are governed by Indian law. Parties will first attempt good-faith senior-management resolution. If unresolved, the dispute may be referred to arbitration under the Arbitration and Conciliation Act, 1996, with seat and venue at Hyderabad, Telangana, unless the Order Document states otherwise. Courts at Hyderabad will have jurisdiction for interim/enforcement relief and matters not subject to arbitration, subject to applicable law.</p>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Notices</h3>
          <p className="mb-4">Notices may be delivered by email, registered post/courier or another written method specified in the Order Document. Parties must keep contact details current. ArkaArya may publish operational notices and policy updates electronically.</p>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Amendments, Waiver, Severability and Assignment</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>ArkaArya may update these Terms, policies and platform rules from time to time, subject to applicable law. The version applicable to a transaction will be identified or made available through the Order Document or platform workflow.</li>
            <li>No waiver is effective unless in writing.</li>
            <li>If a provision is invalid/unenforceable, the remaining provisions remain effective.</li>
            <li>Customer/Seller may not assign an Order Document without ArkaArya's prior written consent except where legally permitted as part of a merger or substantially-all-assets transfer.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#00264A] mt-8 mb-3">Order of Precedence</h3>
          <p className="mb-4">Unless an Order Document expressly states otherwise: (1) signed agreement/SOW/order-specific terms; (2) applicable product/service schedule; (3) marketplace policy/listing-specific terms; (4) these Master Terms; (5) general website content. Mandatory law prevails over conflicting contractual language.</p>
        </>
      )
    },
    {
      id: "acceptance",
      title: "Acceptance & Signatory",
      content: (
        <>
          <p className="mb-6">By signing an Order Document, issuing an accepted purchase order, accepting a quotation, placing an order, submitting a pickup request, using the Services after receiving these Terms, or otherwise expressly accepting applicable terms, the relevant party acknowledges and agrees to these Terms to the extent legally applicable.</p>
          
          <div className="bg-white p-6 rounded-xl border border-[#E3E8E4] w-fit">
            <h4 className="text-sm font-bold text-[#00264A] uppercase tracking-wider mb-4 border-b border-[#E3E8E4] pb-2">For ArkaArya Pvt Ltd</h4>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-[#5E6672] font-medium">Designation</span>
                <span className="font-semibold text-[#00264A]">Managing Director</span>
              </div>
              <div className="grid grid-cols-[120px_1fr]">
                <span className="text-[#5E6672] font-medium">Date</span>
                <span className="font-semibold text-[#00264A]">14 August 2026</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E3E8E4] flex items-center justify-center">
              <div className="w-32 h-16 border-2 border-[#E3E8E4] border-dashed rounded-lg flex items-center justify-center text-xs text-[#5E6672] font-medium">
                Authorized Signatory / Seal
              </div>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <LegalLayout 
      title="Terms & Conditions"
      description="Master commercial terms for ArkaArya's digital marketplace, e-waste, renewable energy, and technology solutions."
      metadata={{
        effectiveDate: "14 August 2026",
        lastUpdated: "14 August 2026",
        version: "1.0"
      }}
      sections={sections}
    >
      <div className="mb-12">
        <div className="bg-[#EBF5DC] rounded-xl p-6 border border-[#629A13]/20 mb-8 inline-block">
          <p className="text-[#629A13] font-bold text-sm tracking-wider uppercase mb-1">Applicable Scope</p>
          <p className="text-[#00264A] font-semibold">MARKETPLACE-ALIGNED | B2B SERVICES • PRODUCTS • DIGITAL PLATFORM • E-WASTE • RENEWABLE • TECHNOLOGY</p>
        </div>
        <p className="text-xl leading-relaxed text-[#00264A] font-medium mb-6">
          This document establishes the Master Terms & Conditions that govern your use of ArkaArya's services and platforms across all our business verticals.
        </p>
      </div>
    </LegalLayout>
  );
}
