'use client';

import { useTranslation } from '@/context/translation-provider';
import { Gift } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t bg-background/80 backdrop-blur-sm'>
      <div className='container py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <Gift className='h-6 w-6' />
              <span className='font-bold'>Promo Rewards</span>
            </Link>
            <p className='text-sm text-muted-foreground'>
              {t('footerTagline')}
            </p>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium mb-3'>{t('navigation')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href='/redeem'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('redeemYourCode')}
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('aboutUs')}
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium mb-3'>{t('resources')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about#terms'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('termsAndConditions')}
                </Link>
              </li>
              <li>
                <Link
                  href='/about#privacy'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href='/about#faq'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium mb-3'>{t('contact')}</h3>
            <ul className='space-y-2 text-sm'>
              <li className='text-muted-foreground'>
                support@promorewards.com
              </li>
              <li className='text-muted-foreground'>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className='border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sm text-muted-foreground'>
            &copy; {currentYear} Promo Rewards. {t('allRightsReserved')}
          </p>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Twitter
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Facebook
            </Link>
            <Link
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
