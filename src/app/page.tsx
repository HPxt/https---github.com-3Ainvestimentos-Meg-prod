import { redirect } from 'next/navigation';

export default function Home() {
  // For this application, the root page will redirect to the dashboard.
  // The dashboard will handle authentication checks.
  redirect('/dashboard');
}
