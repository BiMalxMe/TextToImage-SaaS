
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className='h-screen justify-center items-center flex'>
      <SignUp />
    </div>
  );
}