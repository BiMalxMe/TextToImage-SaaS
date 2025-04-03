import { SignInButton, UserButton } from '@clerk/nextjs';
import { Header } from './components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='text-white'>
      <Header />
    </div>
  );
}