import type {Metadata} from "next"
import Link from "next/link"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"

export const metadata: Metadata = {
    title: "Terms of Service | JobTrackr",
    description: "Terms of service for JobTrackr",
}

export default function TermsPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Terms of Service" text="Last updated: March 21, 2025" className="mb-4"/>
            <div className="prose dark:prose-invert max-w-none">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using JobTrackr, you agree to be bound by these Terms of Service. If you do not
                    agree to these
                    terms, please do not use the service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    JobTrackr is a job application tracking system that allows users to manage their job search process,
                    including
                    tracking applications, interviews, and related activities.
                </p>

                <h2>3. User Accounts</h2>
                <p>
                    To use certain features of JobTrackr, you may be required to create an account. You are responsible
                    for
                    maintaining the confidentiality of your account information and for all activities that occur under
                    your
                    account.
                </p>

                <h2>4. User Content</h2>
                <p>
                    You retain all rights to any content you submit, post, or display on or through JobTrackr. By
                    submitting
                    content, you grant JobTrackr a worldwide, non-exclusive, royalty-free license to use, reproduce,
                    modify,
                    adapt, publish, and display such content.
                </p>

                <h2>5. Privacy</h2>
                <p>
                    Your privacy is important to us. Our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </Link>{" "}
                    explains how we collect, use, and protect your information.
                </p>

                <h2>6. Prohibited Conduct</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use JobTrackr for any illegal purpose</li>
                    <li>Violate any laws or regulations</li>
                    <li>Interfere with or disrupt the service</li>
                    <li>Attempt to gain unauthorized access to any part of the service</li>
                    <li>Use the service to transmit harmful code or malware</li>
                </ul>

                <h2>7. Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account and access to JobTrackr at our sole
                    discretion,
                    without notice, for conduct that we believe violates these Terms of Service or is harmful to other
                    users, us,
                    or third parties, or for any other reason.
                </p>

                <h2>8. Changes to Terms</h2>
                <p>
                    We may modify these Terms of Service at any time. We will provide notice of any material changes by
                    posting
                    the new terms on the site. Your continued use of JobTrackr after such modifications constitutes your
                    acceptance of the modified terms.
                </p>

                <h2>9. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at{" "}
                    <a href="mailto:support@jobtrackr.com" className="text-primary hover:underline">
                        support@jobtrackr.com
                    </a>
                    .
                </p>
            </div>
        </DashboardShell>
    )
}

