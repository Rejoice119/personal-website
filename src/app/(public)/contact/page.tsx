import Card from '@/components/ui/Card';
import ContactForm from '@/components/forms/ContactForm';

export const metadata = {
  title: 'Contact Me | Portfolio',
  description: 'Get in touch with me for projects or inquiries',
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-blue-100">
            Have a project in mind? Let's talk about it
          </p>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Card>
            <ContactForm />
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">hello@example.com</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">San Francisco, CA</p>
            </Card>
            <Card className="text-center">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold text-gray-900 mb-2">LinkedIn</h3>
              <p className="text-gray-600 text-sm">linkedin.com/in/yourprofile</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
