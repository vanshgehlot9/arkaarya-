"use client";
import React from 'react';
import { LegalLayout } from '@/components/LegalLayout';

export default function RefundAndCancellationPolicyPage() {
  const sections = [
    {
      id: "scope",
      title: "Scope",
      content: (
        <>
          <p>This Policy applies, as relevant, to services and transactions offered through ArkaArya’s business verticals, including ArkaArya Green (e-waste management, recycling and circular-economy services), ArkaArya Renew (renewable-energy and sustainability solutions), and ArkaArya Quantum (IT consulting, software, technology and digital solutions), together with workforce solutions, bio products, and other products or services introduced by the Company from time to time.</p>
        </>
      )
    },
    {
      id: "general-principles",
      title: "General Cancellation Principles",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>A cancellation request should be submitted through the communication channel specified in the applicable quotation, order, work order, service agreement, website, or invoice.</li>
            <li>A cancellation becomes effective only after ArkaArya confirms acceptance.</li>
            <li>Where a service has commenced, resources have been allocated, materials procured, travel arranged, or third-party costs incurred, the refundable amount may be reduced by committed or non-recoverable costs.</li>
            <li>For customised, project-based, subscription, manpower, technology, logistics, collection, or processing services, the applicable commercial agreement may prescribe specific cancellation terms.</li>
            <li>If a signed contract, quotation, purchase order, service agreement, or applicable law provides different terms, that specific provision will govern to the extent of any inconsistency.</li>
          </ul>
        </>
      )
    },
    {
      id: "arkaarya-green",
      title: "E-Waste Management & Recycling – ArkaArya Green",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>A pickup may be cancelled without charge before dispatch or vehicle allocation, subject to the booking terms.</li>
            <li>After vehicle, collection team, manpower, logistics partner, or processing capacity has been specifically allocated, reasonable mobilisation, transportation, labour, or third-party costs may be charged or deducted.</li>
            <li>Once material has been collected or processed, cancellation may not be possible in the ordinary sense; settlement will follow the applicable purchase order, material valuation, service agreement, and applicable waste-management requirements.</li>
            <li>For buyback or purchase transactions, final payment may depend on actual quantity, category, quality, grade, recoverable material, inspection results, and agreed market-linked rates.</li>
            <li>If material differs materially from the declared category or condition, ArkaArya may revise the valuation or decline the transaction, subject to the applicable agreement.</li>
          </ul>
        </>
      )
    },
    {
      id: "arkaarya-renew",
      title: "Renewable Energy & Sustainability – ArkaArya Renew",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cancellation before procurement, mobilisation, engineering work, or project commencement may qualify for a full or partial refund, subject to the applicable agreement.</li>
            <li>After procurement, site mobilisation, engineering, installation, third-party booking, or other project expenditure begins, refunds may be reduced by actual non-recoverable costs and applicable cancellation charges.</li>
            <li>Deposits, advances, and milestone payments for customised equipment or project work are subject to the commercial terms of the relevant agreement.</li>
          </ul>
        </>
      )
    },
    {
      id: "arkaarya-quantum",
      title: "IT Consulting & Digital Services – ArkaArya Quantum",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Consulting cancellations are subject to the notice period and billing terms in the applicable statement of work or service agreement.</li>
            <li>Fees for work already performed, allocated professional resources, completed deliverables, third-party software/services, or approved expenses are generally non-refundable.</li>
            <li>For software development, implementation, integration, configuration, subscription, support, or maintenance services, refunds are governed primarily by the applicable proposal, statement of work, subscription terms, or master services agreement.</li>
            <li>Recurring services normally continue through the paid period unless the applicable contract states otherwise.</li>
          </ul>
        </>
      )
    },
    {
      id: "workforce-solutions",
      title: "Workforce & Staffing Solutions",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cancellation or reduction of manpower requirements is subject to the notice period and commercial terms agreed with the client.</li>
            <li>Recruitment, onboarding, verification, payroll, statutory processing, and other third-party or administrative costs already incurred may be non-refundable.</li>
            <li>Any replacement, refund, or service-credit commitment will be governed by the applicable staffing or recruitment agreement.</li>
          </ul>
        </>
      )
    },
    {
      id: "products",
      title: "Bio Products & Physical Products",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Orders may be cancelled before dispatch, subject to product-specific terms.</li>
            <li>Once an order has been dispatched, cancellation may not be available except where required by law or expressly permitted by the product terms.</li>
            <li>Eligible returns generally require the product to be unused, undamaged, and returned in the condition and packaging specified by ArkaArya.</li>
            <li>Perishable, customised, opened, used, or otherwise non-returnable products may be excluded from refunds where legally permitted and where the applicable terms disclose the exclusion.</li>
          </ul>
        </>
      )
    },
    {
      id: "refund-eligibility",
      title: "Refund Eligibility",
      content: (
        <>
          <p className="mb-4">Where a refund is approved, the amount may be calculated after considering:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Services delivered or work completed;</li>
            <li>Approved milestones achieved;</li>
            <li>Non-refundable third-party charges;</li>
            <li>Transportation, mobilisation, collection, processing, procurement, or cancellation costs;</li>
            <li>Taxes, duties, payment-gateway or bank charges where applicable and legally non-recoverable;</li>
            <li>Credits, outstanding invoices, or other amounts legally due under the applicable agreement.</li>
          </ul>
        </>
      )
    },
    {
      id: "refund-processing",
      title: "Refund Processing",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>Approved refunds will normally be processed to the original payment method or another mutually agreed lawful method.</li>
            <li>ArkaArya will generally initiate an approved refund within 7–15 business days after eligibility is confirmed and required verification is completed.</li>
            <li>Actual credit timing may depend on the bank, card issuer, payment gateway, UPI provider, or other financial institution.</li>
            <li>Where appropriate, ArkaArya may issue a service credit, account adjustment, replacement service, or other agreed remedy.</li>
          </ul>
        </>
      )
    },
    {
      id: "non-refundable",
      title: "Non-Refundable Situations",
      content: (
        <>
          <p className="mb-4">To the extent permitted by law and the applicable agreement, refunds may not be available where:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The customer cancels after substantial work, processing, procurement, mobilisation, collection, dispatch, or delivery has occurred;</li>
            <li>The service or product has been fully delivered and accepted;</li>
            <li>Incorrect, incomplete, or misleading information supplied by the customer caused additional cost or prevented delivery;</li>
            <li>The transaction involves customised or specially procured goods/services that cannot reasonably be resold or reused;</li>
            <li>The request is outside the applicable contractual or disclosed cancellation period;</li>
            <li>The customer has violated applicable terms, law, safety requirements, or site rules.</li>
          </ul>
        </>
      )
    },
    {
      id: "company-cancellation",
      title: "Company-Initiated Cancellation",
      content: (
        <>
          <p>ArkaArya may cancel, suspend, postpone, or refuse a transaction or service where reasonably necessary, including for safety, legal or regulatory requirements, non-payment, material misrepresentation, resource unavailability, force majeure, operational constraints, or suspected fraud. Where ArkaArya cancels a prepaid service for reasons attributable to the Company and not to the customer, the customer may be eligible for a refund of the unused prepaid amount, subject to the applicable agreement and law.</p>
        </>
      )
    },
    {
      id: "disputes",
      title: "Chargebacks & Payment Disputes",
      content: (
        <>
          <p>Customers should first contact ArkaArya to resolve billing or refund concerns. ArkaArya reserves its rights to respond to payment disputes with transaction records, invoices, service records, communications, delivery evidence, and other relevant documentation.</p>
        </>
      )
    },
    {
      id: "force-majeure",
      title: "Force Majeure",
      content: (
        <>
          <p>ArkaArya will not be responsible for cancellation, delay, suspension, or inability to perform caused by events beyond its reasonable control, including natural disasters, severe weather, fire, flood, epidemic, government restrictions, regulatory action, strikes, transportation disruption, cyber incidents, utility failures, war, civil disturbance, or other force-majeure events. Refunds or rescheduling in such cases will be handled under the applicable contract and law.</p>
        </>
      )
    },
    {
      id: "request-cancellation",
      title: "How to Request Cancellation or Refund",
      content: (
        <>
          <p className="mb-4">A request should include, where applicable:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Customer/client name and contact details</li>
            <li>Order, invoice, booking, pickup, project, or service reference number</li>
            <li>Date of transaction</li>
            <li>Reason for cancellation/refund</li>
            <li>Amount paid and preferred resolution</li>
            <li>Supporting documents, photographs, delivery records, or other evidence where relevant</li>
          </ul>
          <div className="bg-white p-6 rounded-xl border border-[#E3E8E4]">
            <h4 className="font-bold text-[#00264A] mb-2">Contact Details</h4>
            <p className="text-sm text-[#5E6672] mb-4">Cancellation and refund requests should be submitted through the official ArkaArya communication channel stated on the relevant invoice, agreement, or website. The Company may update its contact details from time to time.</p>
          </div>
        </>
      )
    },
    {
      id: "policy-changes",
      title: "Policy Changes & Governing Terms",
      content: (
        <>
          <p className="mb-4">ArkaArya may amend this Policy from time to time to reflect changes in its services, business model, technology, contractual practices, or applicable law. The latest version published or communicated by the Company will apply to transactions entered into after its effective date, subject to contractual rights.</p>
          <p>This Policy should be read together with ArkaArya’s Terms & Conditions, Privacy Policy, applicable service-specific terms, quotations, purchase orders, statements of work, invoices, and other contractual documents. Where mandatory law provides a customer right that cannot lawfully be excluded, that right will prevail.</p>
        </>
      )
    }
  ];

  return (
    <LegalLayout 
      title="Refund & Cancellation Policy"
      description="Guidelines and procedures for cancellations, refunds, and adjustments across ArkaArya's services and platforms."
      metadata={{
        effectiveDate: "14 August 2026",
        lastUpdated: "14 August 2026",
        version: "1.0"
      }}
      sections={sections}
    >
      <div className="mb-12">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8 inline-block max-w-2xl">
          <p className="text-yellow-800 font-medium text-sm flex items-start gap-2">
            <span className="shrink-0 mt-0.5 font-bold">Please Note:</span> 
            <span>Refund eligibility and processing times may vary significantly depending on the specific business vertical, service type, and stage of delivery. Read the specific terms for your relevant service below.</span>
          </p>
        </div>
        <p className="text-xl leading-relaxed text-[#00264A] font-medium mb-6">
          This Refund & Cancellation Policy explains when customers, clients, vendors, users, or other contracting parties may cancel orders or services and when refunds, credits, reversals, or adjustments may be available from ArkaArya Private Limited (“ArkaArya”, “Company”, “we”, “us”, or “our”).
        </p>
      </div>
    </LegalLayout>
  );
}
