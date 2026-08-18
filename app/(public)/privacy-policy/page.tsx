"use client";
import React from 'react';
import { LegalLayout } from '@/components/LegalLayout';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "our-business",
      title: "Our Business and Scope",
      content: (
        <>
          <p>ArkaArya operates across multiple business verticals, including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>ArkaArya Green</strong> — e-waste management, IT Asset Disposition (ITAD), collection, recycling/resource recovery coordination and sustainability solutions.</li>
            <li><strong>ArkaArya Renew</strong> — renewable-energy, solar, clean-energy, EV/energy-infrastructure and related consulting/project services.</li>
            <li><strong>ArkaArya Quantum</strong> — IT consulting, software development, SaaS, cloud, AI/automation and digital transformation.</li>
            <li><strong>Workforce / Staffing Solutions</strong> — recruitment, staffing, manpower supply and workforce-management services.</li>
          </ul>
          <p className="mt-4">Different services may involve different data flows. A service-specific notice, contract or consent request may provide additional information where required.</p>
        </>
      )
    },
    {
      id: "privacy-framework",
      title: "Applicable Privacy Framework",
      content: (
        <>
          <p>ArkaArya processes personal data in accordance with applicable Indian law. The Digital Personal Data Protection Act, 2023 (“DPDP Act”) establishes obligations for Data Fiduciaries and rights for Data Principals, including notice, consent/legitimate-use processing, access, correction/erasure and grievance redressal. The Act's substantive provisions are subject to the commencement dates notified by the Central Government.</p>
          <p className="mt-4">The Digital Personal Data Protection Rules, 2025 were notified by MeitY on 14 November 2025. ArkaArya will implement applicable requirements as and when they come into force and as applicable to its role and processing activities.</p>
        </>
      )
    },
    {
      id: "roles",
      title: "Data Fiduciary / Data Processor Roles",
      content: (
        <>
          <p>For personal data for which ArkaArya determines the purpose and means of processing, ArkaArya may act as a Data Fiduciary. Where ArkaArya processes personal data solely on documented instructions of a customer or other organization, ArkaArya may act as a Data Processor. The applicable contract/DPA will determine the respective responsibilities.</p>
          <p className="mt-4">Where ArkaArya operates a marketplace, ArkaArya may process data as a platform/facilitator and may also process transaction data for its own contractual, compliance, security and business purposes.</p>
        </>
      )
    },
    {
      id: "data-collected",
      title: "Personal Data We May Collect",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identity and contact data:</strong> name, business designation, email address, mobile number, postal/business address and contact preferences.</li>
            <li><strong>Business and KYC/tax data:</strong> company name, GSTIN, PAN where lawfully required, registration details, authorized-representative information and transaction records.</li>
            <li><strong>Pickup/ITAD data:</strong> pickup address, location information, asset lists, device identifiers, serial numbers, photographs, material descriptions, weight/grade information and collection/settlement records.</li>
            <li><strong>Marketplace data:</strong> account details, listings, orders, quotations, invoices, buyer/seller information, communications, reviews and dispute information.</li>
            <li><strong>Technology data:</strong> IP address, browser/device information, operating system, logs, approximate location, cookies and usage events.</li>
            <li><strong>Service/project data:</strong> information needed to deliver renewable-energy, IT consulting, software, SaaS or workforce services.</li>
            <li><strong>Recruitment/workforce data:</strong> candidate profile, employment history, qualifications, contact details, documents and onboarding information, subject to applicable law and the relevant recruitment process.</li>
            <li><strong>Communication data:</strong> enquiries, support requests, feedback, call/message records where lawfully recorded or retained, and correspondence.</li>
          </ul>
          <p className="mt-4 font-medium text-[#00264A]">We seek to collect only information reasonably necessary for the relevant purpose. Do not submit unnecessary sensitive or confidential information through public website forms.</p>
        </>
      )
    },
    {
      id: "how-we-collect",
      title: "How We Collect Data",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Directly from you through website forms, pickup forms, account registration, quotations, orders, email, phone, WhatsApp or other communications.</li>
            <li>From your organization or authorized representatives.</li>
            <li>From sellers, buyers, logistics providers, service providers or project partners involved in a transaction.</li>
            <li>Automatically from devices and browsers when you use our websites/platforms.</li>
            <li>From public or lawful business sources where necessary for legitimate business, compliance or verification purposes.</li>
          </ul>
        </>
      )
    },
    {
      id: "purposes",
      title: "Purposes of Processing",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Responding to enquiries, quotation requests and service requests.</li>
            <li>Creating and administering customer, supplier, marketplace and user accounts.</li>
            <li>Scheduling and fulfilling e-waste pickups, logistics, inspection, weighment, settlement and recycling/ITAD workflows.</li>
            <li>Processing orders, purchases, sales, invoices, payments, refunds and tax documentation.</li>
            <li>Operating and securing our marketplace, websites, apps and digital systems.</li>
            <li>Delivering renewable-energy, IT consulting, software, SaaS and workforce services.</li>
            <li>Performing contracts, SOWs, SLAs and other commercial obligations.</li>
            <li>Verifying identity, business information, authorization, title, licences and regulatory information where necessary.</li>
            <li>Preventing fraud, abuse, cyber incidents, unlawful activity and security threats.</li>
            <li>Communicating service updates, transactional notices and—where permitted—marketing communications.</li>
            <li>Improving products, services, website functionality, user experience and business operations.</li>
            <li>Complying with applicable law, court orders, regulatory requirements, tax obligations and lawful government requests.</li>
            <li>Establishing, exercising or defending legal claims and protecting ArkaArya's rights and property.</li>
          </ul>
          <p className="mt-4">Where consent is required, ArkaArya will request consent for specified purposes and provide a means to withdraw it. Withdrawal will not affect processing already lawfully carried out and may not stop processing that is necessary for another lawful basis or legal obligation.</p>
        </>
      )
    },
    {
      id: "notice-consent",
      title: "Notice, Consent and Lawful Processing",
      content: (
        <>
          <p>Where processing is based on consent, we aim to provide a clear notice describing the personal data and purpose, together with information on how applicable rights and grievances may be exercised. Where the DPDP Act permits processing for a legitimate use or another lawful basis, processing may occur without consent to the extent permitted by law.</p>
          <p className="mt-4">Consent requests will not be bundled unnecessarily with unrelated purposes. Where practicable, users can manage or withdraw consent through the mechanism provided in the relevant service.</p>
        </>
      )
    },
    {
      id: "marketing",
      title: "Marketing and Communications",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Transactional and service communications may be sent where necessary to fulfil a request or contract.</li>
            <li>Marketing communications will be sent subject to applicable law and available consent/opt-out requirements.</li>
            <li>You may opt out of promotional email or similar communications using the unsubscribe mechanism or by contacting us.</li>
            <li>Opting out of marketing does not stop essential service, security, account or transaction communications.</li>
          </ul>
        </>
      )
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      content: (
        <>
          <p>Our websites may use essential cookies, analytics technologies, security technologies and, where applicable, preference or marketing technologies. Essential technologies may be necessary for login, security, forms and core functionality. Where consent is required for non-essential technologies, we will provide an appropriate consent mechanism.</p>
          <p className="mt-4">We may use analytics to understand website traffic, performance and user interactions. A separate Cookie Policy may provide details of categories, providers, purposes and retention.</p>
        </>
      )
    },
    {
      id: "sharing",
      title: "Sharing and Disclosure",
      content: (
        <>
          <p>We do not sell personal data as a commercial commodity. We may disclose or share personal data when reasonably necessary for the purposes described in this Policy, including with:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Service providers and processors for hosting, cloud, CRM, email, communications, analytics, payment, logistics, cybersecurity, IT support and document management.</li>
            <li>Authorized recycling, logistics, refurbishment, dismantling, data-destruction, renewable-energy, technology or staffing partners where necessary to deliver contracted services.</li>
            <li>Professional advisers such as lawyers, auditors, accountants, insurers and consultants, subject to confidentiality obligations.</li>
            <li>Government authorities, regulators, courts, law-enforcement agencies or other persons where disclosure is required or permitted by law.</li>
            <li>A purchaser, investor, lender, successor or transaction adviser in connection with a merger, acquisition, financing, restructuring or transfer of business/assets, subject to appropriate confidentiality and lawful processing.</li>
            <li>Marketplace counterparties where necessary to complete a transaction and where the disclosure is permitted by the applicable terms.</li>
          </ul>
          <p className="mt-4">We seek to limit disclosure to information reasonably necessary for the stated purpose.</p>
        </>
      )
    },
    {
      id: "data-processors",
      title: "Data Processors and Vendor Controls",
      content: (
        <>
          <p>Where third parties process personal data on our behalf, we seek to use appropriate contractual and technical controls, confidentiality obligations, access restrictions and security requirements. Where a customer contract requires a specific processor arrangement or DPA, that contract will govern to the extent of any inconsistency.</p>
        </>
      )
    },
    {
      id: "cross-border",
      title: "Cross-Border Processing and Transfers",
      content: (
        <>
          <p>ArkaArya may use cloud, software, support or other service providers whose infrastructure or personnel may be located outside India. Any cross-border processing will be carried out subject to applicable Indian law, contractual controls and any restrictions or requirements notified by the Government of India.</p>
          <p className="mt-4">Where required, ArkaArya will implement appropriate contractual, organizational and technical measures for international processing.</p>
        </>
      )
    },
    {
      id: "data-security",
      title: "Data Security",
      content: (
        <>
          <p>ArkaArya maintains reasonable technical and organizational safeguards appropriate to the nature of the personal data and processing risks. Depending on the system, measures may include access controls, authentication, encryption where appropriate, logging, backups, endpoint protection, network security, vulnerability management, least-privilege access, vendor controls and security monitoring.</p>
          <p className="mt-4">No internet transmission or storage system can be guaranteed completely secure. Users should protect passwords, avoid sharing credentials and notify ArkaArya promptly if they suspect unauthorized access.</p>
        </>
      )
    },
    {
      id: "data-breach",
      title: "Personal Data Breach",
      content: (
        <>
          <p>If ArkaArya becomes aware of a personal data breach, it will assess and respond in accordance with applicable law, including any required notification to affected Data Principals, the Data Protection Board or other authorities, as applicable. Where ArkaArya acts as a Data Processor, it will follow applicable contractual requirements and notify the relevant Data Fiduciary in accordance with the applicable agreement and law.</p>
        </>
      )
    },
    {
      id: "retention",
      title: "Data Retention",
      content: (
        <>
          <p>We retain personal data only for as long as reasonably necessary for the purpose for which it was collected, contractual and business requirements, legal/regulatory obligations, dispute resolution, audit requirements, security and enforcement.</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Transactional and accounting records may need to be retained for statutory/tax/accounting periods.</li>
            <li>ITAD, e-waste, pickup, settlement and compliance records may be retained for the period required by applicable law, contract or audit requirements.</li>
          </ul>
          <p className="mt-4">When retention is no longer required, data may be securely deleted, anonymized or otherwise disposed of in accordance with applicable requirements. Retention periods may vary by data category and service.</p>
        </>
      )
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      content: (
        <>
          <p>Subject to applicable law and prescribed procedures, a Data Principal may have rights including:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Access to information about personal data processed by the Data Fiduciary, including applicable information about processing and sharing.</li>
            <li>Correction, completion and updating of inaccurate or incomplete personal data.</li>
            <li>Erasure of personal data where permitted, subject to lawful retention requirements.</li>
            <li>Withdrawal of consent where processing is based on consent.</li>
            <li>Grievance redressal.</li>
            <li>Nomination rights where applicable.</li>
          </ul>
          <p className="mt-4">Requests should be made through the contact/grievance mechanism below. We may need to verify identity or authority before acting on a request.</p>
        </>
      )
    },
    {
      id: "grievance",
      title: "Grievance Redressal",
      content: (
        <>
          <p>Privacy complaints and rights requests may be submitted to the contact below. ArkaArya will process grievances within the period required by applicable law or the applicable contract/policy.</p>
          <div className="bg-white p-6 rounded-xl border border-[#E3E8E4] mt-6">
            <h4 className="font-bold text-[#00264A] mb-2">Privacy / Grievance Contact</h4>
            <p className="mb-1"><strong>Email:</strong> contact@arkaarya.com</p>
            <p className="mb-1"><strong>Attention:</strong> Privacy / Grievance Officer</p>
            <p><strong>Registered Office:</strong> Plot No: 25, Divyasree Trinity, 5 & 6, Hitech City Main Rd, near Hexagon Capability Center, Phase 2, HITEC City, Hyderabad, Telangana 500081</p>
          </div>
        </>
      )
    },
    {
      id: "childrens-data",
      title: "Children's Data",
      content: (
        <>
          <p>Our business services are generally intended for businesses, professionals and adults. We do not knowingly seek to collect children's personal data for marketing or unrelated purposes. Where processing of a child's personal data is legally applicable, ArkaArya will apply the safeguards and verifiable-consent requirements prescribed by law.</p>
        </>
      )
    },
    {
      id: "workforce-data",
      title: "Data About Employees, Candidates and Workforce Personnel",
      content: (
        <>
          <p>For recruitment, staffing and employment-related activities, ArkaArya may process professional, identity, contact, qualification, employment and onboarding information necessary for recruitment, placement, administration, legal compliance and workforce management. Where ArkaArya acts on behalf of a customer, the applicable customer contract may define the parties' respective Data Fiduciary/Data Processor roles.</p>
        </>
      )
    },
    {
      id: "e-waste-privacy",
      title: "E-Waste and IT Asset Disposal Privacy",
      content: (
        <>
          <p>E-waste and ITAD services may involve devices containing personal or confidential information. Customers remain responsible for identifying data-bearing assets, maintaining backups and specifying required data-destruction services before transfer.</p>
          <p className="mt-4">Where ArkaArya or an Authorized Partner performs data wiping, destruction or certification, the method, scope and evidence will be stated in the applicable service order. Asset serial numbers, photographs, certificates and chain-of-custody records may be processed as business/compliance records.</p>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-6">
            <p className="text-yellow-800 font-medium"><strong>Important:</strong> Customers must not provide personal data unnecessarily through pickup forms, asset descriptions or public uploads.</p>
          </div>
        </>
      )
    },
    {
      id: "third-party",
      title: "Third-Party Websites and Services",
      content: (
        <>
          <p>Our website/platform may contain links to third-party websites, payment services, social media, cloud services or partner platforms. Their privacy practices are governed by their own policies. ArkaArya is not responsible for third-party privacy practices outside its control.</p>
        </>
      )
    },
    {
      id: "user-content",
      title: "Social Media, Reviews and User Content",
      content: (
        <>
          <p>If you voluntarily submit reviews, comments, photographs or other content to a public area, that content may be visible to others. Do not post personal data, confidential business information or third-party information without authorization.</p>
          <p className="mt-4">ArkaArya may moderate or remove content that is unlawful, infringing, misleading, abusive or otherwise inconsistent with applicable platform rules.</p>
        </>
      )
    },
    {
      id: "corporate-transactions",
      title: "Corporate Transactions",
      content: (
        <>
          <p>If ArkaArya undergoes a merger, acquisition, restructuring, financing, sale of assets or similar transaction, personal data may be transferred as part of the transaction where lawful and subject to applicable confidentiality and data-protection requirements.</p>
        </>
      )
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      content: (
        <>
          <p>We may update this Privacy Policy to reflect changes in our services, technology, law or processing practices. The updated version will be posted on our website with a revised “Last Updated” date. Where legally required, we will provide additional notice or obtain consent for material changes.</p>
        </>
      )
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: (
        <>
          <div className="bg-white p-6 rounded-xl border border-[#E3E8E4]">
            <h4 className="font-bold text-[#00264A] mb-4">ArkaArya Pvt Ltd</h4>
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:contact@arkaarya.com" className="text-[#629A13] hover:underline">contact@arkaarya.com</a></p>
            <p className="mb-2"><strong>Website:</strong> <a href="https://arkaarya.com" className="text-[#629A13] hover:underline">https://arkaarya.com</a></p>
            <p><strong>Registered Office:</strong> Plot No: 25, Divyasree Trinity, 5 & 6, Hitech City Main Rd, near Hexagon Capability Center, Phase 2, HITEC City, Hyderabad, Telangana 500081</p>
          </div>
        </>
      )
    },
    {
      id: "interpretation",
      title: "Legal and Policy Interpretation",
      content: (
        <>
          <p>If a service-specific agreement, Data Processing Addendum or mandatory law imposes a stricter privacy obligation than this Policy, the stricter applicable obligation will govern to the extent of the conflict. Nothing in this Policy limits any right or remedy that cannot lawfully be limited.</p>
        </>
      )
    }
  ];

  return (
    <LegalLayout 
      title="Privacy Policy"
      description="How ArkaArya collects, uses and protects information across its digital services, including website, marketplace, and enterprise solutions."
      metadata={{
        effectiveDate: "14 August 2026",
        lastUpdated: "14 August 2026",
        version: "1.0"
      }}
      sections={sections}
    >
      <div className="mb-12">
        <p className="text-xl leading-relaxed text-[#00264A] font-medium mb-6">
          This Privacy Policy explains how ArkaArya Pvt Ltd (“ArkaArya”, “we”, “us” or “our”) collects, uses, discloses, stores, protects and otherwise processes personal data when you visit our websites, use our digital platforms, submit a pickup request, contact us, purchase or sell through our marketplace, use our services, participate in recruitment/workforce processes, or otherwise interact with us.
        </p>
        <p>
          This Policy is designed for ArkaArya's multi-vertical business and is intended to operate alongside our Terms & Conditions, Cookie Policy, service-specific terms, contracts, statements of work and data-processing agreements.
        </p>
      </div>
    </LegalLayout>
  );
}
