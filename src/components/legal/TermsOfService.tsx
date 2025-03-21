import React from "react";
import { Helmet } from "react-helmet-async";
import AppLayout from "../layout/AppLayout";

const TermsOfService = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>Terms of Service | Zakat Manager</title>
        <meta
          name="description"
          content="Terms of Service for Zakat Manager - Understand the terms and conditions of using our application."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-emerald-800">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Acceptance of Terms</h2>
            <p>
              By accessing or using the Zakat Manager application, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Use License</h2>
            <p className="mb-3">
              Permission is granted to temporarily use the Zakat Manager application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in Zakat Manager</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Disclaimer</h2>
            <p className="mb-3">
              <strong>Important:</strong> The Zakat Manager application is provided as a tool based on research and understanding of Islamic principles related to Zakat. However, it is your responsibility to verify the accuracy of calculations and ensure compliance with Islamic law.
            </p>
            <p className="mb-3">
              This application is the result of research which may be correct or may contain errors. The developers and owners of Zakat Manager will not be held responsible for any sin or religious consequences resulting from incorrect calculations or interpretations.
            </p>
            <p>
              Users are strongly encouraged to consult with qualified Islamic scholars regarding their Zakat obligations and to use this tool only as a supplementary aid in their calculations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Limitations</h2>
            <p>
              In no event shall Zakat Manager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zakat Manager's application, even if Zakat Manager or a Zakat Manager authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Accuracy of Materials</h2>
            <p>
              The materials appearing on Zakat Manager's application could include technical, typographical, or photographic errors. Zakat Manager does not warrant that any of the materials on its application are accurate, complete, or current. Zakat Manager may make changes to the materials contained on its application at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Modifications</h2>
            <p>
              Zakat Manager may revise these terms of service for its application at any time without notice. By using this application, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-emerald-700">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
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

export default TermsOfService;
