import { DatabaseSetupButton } from '@/components/database-setup-button';
import PrizeDisplay from '@/components/prize-display';
import PromoCodeForm from '@/components/promo-code-form';
import { RecentActivity } from '@/components/recent-activity';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Promo Code Rewards
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Enter your promo code below to redeem exclusive rewards and prizes.
            Check your collection to see what you've earned!
          </p>
          <DatabaseSetupButton />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <PromoCodeForm />
            <div className='mt-8'>
              <RecentActivity />
            </div>
          </div>
          <div>
            <PrizeDisplay />
          </div>
        </div>
      </div>
    </main>
  );
}
