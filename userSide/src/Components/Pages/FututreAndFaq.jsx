import React from "react";
import { FaLeaf, FaRocket, FaSmile } from "react-icons/fa";

const FutureAndFaq = () => {
  return (
    <section>
      {/* Future Section */}
      <section
        className="relative bg-cover bg-center py-16 text-white"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 hover:scale-105 transition-transform duration-500">
          <h2 className="text-4xl font-bold text-center mb-8">
            Our Vision for the Future
          </h2>
          <p className="text-lg text-center mb-12">
            We aim to revolutionize the way you discover and engage with
            products, offering unparalleled convenience, reliability, and
            innovation.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Vision 1 */}
            <div className="text-white text-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <FaRocket className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Innovative Products</h3>
              <p>
                Stay ahead of the curve with cutting-edge products designed to
                meet your evolving needs.
              </p>
            </div>
            {/* Vision 2 */}
            <div className="text-white text-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <FaLeaf className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Sustainability</h3>
              <p>
                We prioritize eco-friendly solutions to create a positive impact
                on the environment.
              </p>
            </div>
            {/* Vision 3 */}
            <div className="text-white text-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <FaSmile className="text-4xl text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Customer First</h3>
              <p>
                Our commitment to customer satisfaction drives us to deliver
                exceptional experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            {/* DaisyUI Collapsible FAQ */}
            <div className="space-y-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-gray-300 text-white rounded-box"
              >
                <div className="collapse-title text-lg font-medium">
                  What types of products do you offer?
                </div>
                <div className="collapse-content">
                  <p>
                    We offer a wide range of products, including electronics,
                    home essentials, and customized solutions tailored to your
                    needs.
                  </p>
                </div>
              </div>

              <div
                tabIndex={1}
                className="collapse collapse-arrow border border-gray-300 text-white rounded-box"
              >
                <div className="collapse-title text-lg font-medium">
                  How can I track my order?
                </div>
                <div className="collapse-content">
                  <p>
                    Once your order is confirmed, you'll receive a tracking
                    number via email to monitor your shipment in real-time.
                  </p>
                </div>
              </div>

              <div
                tabIndex={2}
                className="collapse collapse-arrow border border-gray-300 text-white rounded-box"
              >
                <div className="collapse-title text-lg font-medium">
                  What is your return policy?
                </div>
                <div className="collapse-content">
                  <p>
                    We offer a hassle-free 30-day return policy for most
                    products. For more details, please visit our Returns page.
                  </p>
                </div>
              </div>

              <div
                tabIndex={3}
                className="collapse collapse-arrow border border-gray-300 text-white rounded-box"
              >
                <div className="collapse-title text-lg font-medium">
                  How can I contact support?
                </div>
                <div className="collapse-content">
                  <p>
                    You can reach our support team through the Contact Us page
                    or by calling our 24/7 customer service hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FutureAndFaq;
