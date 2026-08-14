import Card from '@/components/ui/Card';
import LoginForm from '@/components/forms/LoginForm';

export const metadata = {
  title: 'Admin Login | Portfolio',
  description: 'Admin login page',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
