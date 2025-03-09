import { DatabaseSetupButton } from '@/components/database-setup-button';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section with CTA Button */}
      <section className='relative bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white min-h-screen flex items-center'>
        <div className='absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]' />
        <div className='relative container mx-auto px-4 py-12'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in'>
              Unlock Exclusive Rewards with Promo Codes
            </h1>
            <p className='text-xl md:text-2xl mb-12 text-blue-100'>
              Enter your promo codes and discover amazing prizes waiting for
              you. Quick, easy, and rewarding!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/redeem'>
                <Button
                  size='lg'
                  className='text-lg px-8 py-6 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800'
                >
                  <Star className='mr-2 h-5 w-5' />
                  Redeem Your Code
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>
            <div className='mt-6'>
              <DatabaseSetupButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
