'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppContext } from '@/context/app-provider';
import { useTranslation } from '@/context/translation-provider';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 5;

export function RecentActivity() {
  const { activities, isLoadingActivities, clearActivities } = useAppContext();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Count failed activities

  // const failedActivities = activities.filter((activity) => !activity.success)
  // const hasFailedActivities = failedActivities.length > 0

  // Reset to first page when activities change
  useEffect(() => {
    setCurrentPage(1);
  }, [activities.length]);

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const paginatedActivities = activities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // const handleClearActivities = () => {
  //   clearActivities();
  //   setIsDialogOpen(false);
  // };

  return (
    <Card className='shadow-lg'>
      <CardHeader className='bg-primary/5'>
        <div className='flex items-center justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <Clock className='h-5 w-5' />
            {t('recentActivity')}
          </CardTitle>
          {/* Button Clear recent activity */}
          {/* <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={activities.length === 0 || isLoadingActivities}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{t("clearActivity")}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("clearActivityHistory")}</AlertDialogTitle>
                <AlertDialogDescription>{t("clearActivityConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearActivities}>{t("clearHistory")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
        <CardDescription>
          {t('recentPromoCodeRedemptionHistory')}
        </CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        {isLoadingActivities ? (
          <div className='flex justify-center py-4'>
            <div className='h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin' />
          </div>
        ) : paginatedActivities.length > 0 ? (
          <div className='space-y-4'>
            {paginatedActivities.map((activity) => (
              <div
                key={activity.id}
                className='flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0'
              >
                {activity.success ? (
                  <CheckCircle className='h-5 w-5 text-green-500 mt-0.5 shrink-0' />
                ) : (
                  <XCircle className='h-5 w-5 text-red-500 mt-0.5 shrink-0' />
                )}
                <div className='flex-1 space-y-1'>
                  <div className='flex justify-between'>
                    <p className='font-medium'>
                      {activity.code}
                      {activity.success && activity.prizeName && (
                        <span className='font-normal text-muted-foreground ml-1'>
                          → {activity.prizeName}
                        </span>
                      )}
                    </p>
                    <span className='text-xs text-muted-foreground'>
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {activity.success
                      ? `${t('redeemedCode')}`
                      : `${t('failedToRedeem')}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-6 text-muted-foreground'>
            <p>{t('noRecentActivity')}</p>
            <p className='text-sm mt-1'>{t('redeemFirstCodeToSeeHere')}</p>
          </div>
        )}
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className='flex justify-between items-center border-t p-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            {t('previous')}
          </Button>
          <span className='text-sm text-muted-foreground'>
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            {t('next')}
            <ChevronRight className='h-4 w-4 ml-1' />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
