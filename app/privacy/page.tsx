import type {Metadata} from "next"
import {DashboardHeader} from "@/components/dashboard-header"
import {DashboardShell} from "@/components/dashboard-shell"

export const metadata: Metadata = {
    title: "Privacy Policy | JobTrackr",
    description: "Privacy policy for JobTrackr",
}

export default function PrivacyPage() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Privacy Policy" text="Last updated: March 21, 2025" className="mb-4"/>
            <div className="prose dark:prose-invert max-w-none">
                <h2>1. Introduction</h2>
                <p>
                    This Privacy Policy explains how JobTrackr collects, uses, and discloses information about you when
                    you use
                    our services. We are committed to protecting your privacy and ensuring you have a positive
                    experience on our
                    website.
                </p>

                <h2>2. Information We Collect</h2>
                <p>We collect several types of information from and about users of our service, including:</p>
                <ul>
                    <li>
                        <strong>Personal Information:</strong> Name, email address, and other contact details you
                        provide when
                        creating an account.
                    </li>
                    <li>
                        <strong>Job Application Data:</strong> Information about job applications, interviews, and
                        related
                        activities that you input into the system.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you use our service, including log data,
                        device
                        information, and cookies.
                    </li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and manage your account</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Send you technical notices, updates, and administrative messages</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
                    <li>Detect, prevent, and address technical issues</li>
                </ul>

                <h2>4. Data Storage and Security</h2>
                <p>
                    We implement appropriate security measures to protect your personal information. However, no method
                    of
                    transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
                    absolute
                    security.
                </p>

                <h2>5. Data Retention</h2>
                <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in
                    this Privacy
                    Policy, unless a longer retention period is required or permitted by law.
                </p>

                <h2>6. Your Rights</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information,
                    including:</p>
                <ul>
                    <li>The right to access and receive a copy of your personal information</li>
                    <li>The right to rectify or update your personal information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to restrict or object to our processing of your personal information</li>
                </ul>

                <h2>7. Children's Privacy</h2>
                <p>
                    Our service is not intended for children under the age of 16, and we do not knowingly collect
                    personal
                    information from children under 16.
                </p>

                <h2>8. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new
                    Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:privacy@jobtrackr.com" className="text-primary hover:underline">
                        privacy@jobtrackr.com
                    </a>
                    .
                </p>
            </div>
        </DashboardShell>
    )
}

