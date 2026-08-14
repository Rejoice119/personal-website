import { NextRequest } from 'next/server';
import { loginAdmin } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { createdResponse, badRequestResponse, toJson } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return toJson(
        badRequestResponse(
          'Invalid input',
          'Invalid email or password format'
        )
      );
    }

    // Login
    const result = await loginAdmin(validation.data.email, validation.data.password);

    return toJson(
      createdResponse(result, 'Login successful')
    );
  } catch (error) {
    return toJson(
      badRequestResponse(
        error instanceof Error ? error.message : 'Login failed'
      )
    );
  }
}
