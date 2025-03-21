import React from "react";
import { Helmet } from "react-helmet-async";
import AppLayout from "../layout/AppLayout";

const PrivacyPolicy = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>Privacy Policy | Zakat Manager</title>
        <meta
          name="description"
          content="Privacy Policy for Zakat Manager - Learn how we protect your data and privacy."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-emerald-800">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Data Protection</h2>
            <p className="mb-3">
              At Zakat Manager, we take your privacy and data security seriously. All your financial information and asset data are securely stored and protected using industry-standard encryption and security measures.
            </p>
            <p>
              We do not share your personal or financial information with any third parties without your explicit consent, except when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Information We Collect</h2>
            <p className="mb-3">
              We collect only the information necessary to provide you with the Zakat calculation and asset management services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Asset information (values, types, descriptions)</li>
              <li>Gold and other valuable inventory details</li>
              <li>Basic account information</li>
              <li>Zakat calculation history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Data Storage</h2>
            <p className="mb-3">
              Your data is stored securely in our database. We implement appropriate technical and organizational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Your Rights</h2>
            <p className="mb-3">
              You have the right to access, correct, or delete your personal data at any time. You can also request a copy of all data we hold about you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Cookies and Analytics</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our application and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. These are sent to your browser from a website and stored on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our contact form or at the email address provided on our Contact page.
            </p>
          </section>

          <div className="pt-6 text-sm text-gray-500">
            <p>Last updated: March 21, 2025</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrivacyPolicy;
