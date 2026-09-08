# CareFlow Studio

Create the first complete UI prototype for a Hospital Management System (HMS).

This is currently a UI/UX prototype only. Do not connect a backend, database, Supabase, or implement real offline synchronization yet. Use realistic mock data so we can evaluate how the complete system will look and work.

Design reference

Use the attached image as the primary color and visual-style reference.

I specifically want this color combination:

 Teal/turquoise as the main brand color

 Dark navy blue for primary actions, navigation, and important controls

 White content surfaces

 Very light neutral/gray backgrounds where appropriate

 Subtle teal/blue accents

Keep the interface clean, modern, professional, calm, and appropriate for daily hospital use.

Do not copy the exact layout from the reference image. Use its color palette and visual character, but design an original desktop HMS interface based on the requirements below.

Avoid a generic SaaS dashboard consisting mainly of KPI cards and charts. This is an operational hospital application, so prioritize patient search, queues, appointments, forms, tables, records, and quick actions.

System users

The current proposed users are:

 Admin

 Receptionist / Front Desk

 Doctor

 Billing / Cashier

The interface should be role-aware so each user sees the functionality relevant to their work.

Do NOT create a patient-facing portal at this stage.

Main HMS modules

1. Dashboard
Create a useful operational home screen rather than a basic analytics dashboard.

Include things such as:

 Global patient search

 Today's appointments

 Today's patient/visit queue

 Recent patients

 Important pending tasks

 Quick actions

 Relevant small operational summaries

2. Users & Access Control

 Users

 Roles

 Permissions

 User status

3. Patient Management

 Patient search/list

 Register patient

 Patient profile

 Edit patient

 Demographics/contact information

 Patient ID

 Patient history

4. Appointments

 Appointment list

 Calendar/schedule

 Create appointment

 Doctor/provider

 Department/service

 Date/time

 Appointment status

 Reschedule

 Cancel

5. Visits / Encounters

 Start visit

 Active visits

 Recent visits

 Visit status

 Provider

 Visit details

 Link the visit with the patient, appointment, clinical record, and billing

6. Clinical Records
Create a practical doctor's consultation workspace containing:

 Patient summary

 Complaints/symptoms

 Vitals

 Allergies

 Diagnosis

 Consultation notes

 Medications/prescriptions

 Previous clinical history

7. Orders / Investigations

 Lab orders

 Radiology orders

 Procedures

 Order status

 Results/status where applicable

8. Patient Documents

 Patient documents

 Categories

 Upload area

 PDFs/images

 Document history

9. Billing & Rates

 Service/rate catalogue

 Create patient bill

 Add charges

 Bill total

 Record payment

 Payment method

 Paid / partially paid / unpaid states

 Remaining balance

 Invoice/receipt

 Billing history

10. Reports

 Patient/visit reports

 Appointment reports

 Billing/revenue reports

 Payment reports

 Filters/date ranges

11. Administration

 User management

 Roles/permissions

 Doctors/providers

 Departments

 Locations

 Services

 Billing rates

 System configuration

Offline/PWA UX

This HMS will later support offline operation on a designated hospital workstation.

Do NOT implement the offline engine yet, but design the UI so these states already have a place:

 Online

 Offline

 Pending sync count

 Syncing

 Sync successful

 Sync failed

 Retry

 Locally saved record

Example message:
“Saved locally. This record will sync automatically when the connection is restored.”

Connectivity/sync status should be visible but unobtrusive in the application shell.

UX expectations

Design this as a desktop-first hospital workstation application, not a mobile healthcare marketplace.

Use:

 Clear sidebar/navigation

 Strong information hierarchy

 Spacious but efficient forms

 Professional tables

 Search/filter controls

 Status badges

 Modals/drawers where appropriate

 Consistent reusable components

 Accessible typography

 Clear primary/secondary actions

Make workflows interconnected. For example:

Patient → Appointment → Visit → Clinical Record → Orders/Services → Billing → Payment

Create realistic mock hospital data and make the prototype navigable between the major screens.

You have freedom to determine the best initial layout, component placement, dashboard composition, navigation structure, and interaction patterns based on these requirements. Do not ask me to specify every component before generating the first version.

The goal of this first generation is to give us a complete visual direction for the HMS that we can review and refine screen by screen afterward. , use the picture as a refrence for  theme

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4262a40e-1d26-4572-90c9-fb65c5b19c95).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
