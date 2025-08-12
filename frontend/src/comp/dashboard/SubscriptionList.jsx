import { PlusIcon } from '@heroicons/react/24/outline';
import {
  BriefcaseIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import { DashboardNavbar } from "./DashboardNavbar";
import { SubscriptionModal } from "./SubscriptionModal";

import '../../index.css';

// Single Subscription Card
const SubscriptionCard = ({
  name,
  cost,
  freeTrial,
  trialDays,
  reminderDate,
  status,
  category,
  id,
}) => {
  const { removeSubscription } = useSubscriptionStore.getState
    ? useSubscriptionStore.getState()
    : useSubscriptionStore();

  const deleteSubscription = async (subscriptionId) => {
    console.log('Attempting to delete subscription with ID:', subscriptionId);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('No access token found');
      return;
    }

    const response = await fetch(
      `https://project-final-xhjy.onrender.com/subscriptions/${subscriptionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );

    console.log('DELETE response status:', response.status);

    if (response.ok) {
      console.log('Successfully deleted on backend, removing from store...');
      removeSubscription(subscriptionId);
    } else {
      const errorData = await response.json();
      console.error('Failed to delete subscription:', errorData);
    }
  };

  return (
    <Card shadow={false} className='rounded-lg border border-gray-300 p-4'>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='border border-gray-200 p-2.5 rounded-lg'>
            <BriefcaseIcon className='h-6 w-6 text-gray-900' />
          </div>
          <div>
            <Typography
              variant='small'
              color='blue-gray'
              className='mb-1 font-bold'
            >
              {name}
            </Typography>
            <Typography className='!text-gray-600 text-xs font-normal'>
              {category || 'No category'}
            </Typography>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <Button size='sm' variant='text' className='flex items-center gap-2'>
            <PencilIcon className='h-4 w-4 text-gray-600' />
            <Typography className='!font-semibold text-xs text-gray-600 md:block hidden'>
              Edit
            </Typography>
          </Button>
          <Button
            size='sm'
            variant='text'
            color='red'
            className='flex items-center gap-2'
            onClick={() => deleteSubscription(id)}
          >
            <TrashIcon className='h-4 w-4 text-red-500' />
            <Typography className='!font-semibold text-xs text-red-500 md:block hidden'>
              Delete
            </Typography>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 text-xs'>
        <span className='text-gray-600 font-medium'>Cost:</span>{' '}
        <span className='font-bold'>${cost}</span>
        <span className='text-gray-600 font-medium'>Free Trial:</span>{' '}
        <span className='font-bold'>{freeTrial ? 'Yes' : 'No'}</span>
        {freeTrial && (
          <>
            <span className='text-gray-600 font-medium'>Trial Days:</span>{' '}
            <span className='font-bold'>{trialDays}</span>
          </>
        )}
        <span className='text-gray-600 font-medium'>Reminder Date:</span>{' '}
        <span className='font-bold'>
          {new Date(reminderDate).toLocaleDateString()}
        </span>
        <span className='text-gray-600 font-medium'>Status:</span>{' '}
        <span className='font-bold'>{status}</span>
      </div>
    </Card>
  );
};

// Main Subscription List
export const SubscriptionList = () => {
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  // SOFIE ADD
  const fetchSubscriptions = useSubscriptionStore(
    (state) => state.fetchSubscriptions
  );

  //pop up form
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filter and sort
  const [filterCategory, setFilterCategory] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);


  // Filter subscriptions based on category
  const filteredSubs = filterCategory
    ? subscriptions.filter(sub => sub.category === filterCategory)
    : subscriptions;

  // Sort subscriptions based on sortKey
  const sortedSubs = [...filteredSubs].sort((a, b) => {
    if (!sortKey) return 0; // no sorting

    if (sortKey === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortKey === "cost") {
      return a.cost - b.cost;
    }

    if (sortKey === "reminderDate") {
      return new Date(a.reminderDate) - new Date(b.reminderDate);
    }

    return 0;
  });

  return (
    <section className='max-w-4xl mx-auto px-8 py-20 w-full'>
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className='rounded-none flex gap-2 flex-col md:flex-row items-start justify-between'
        >
          <div className='w-full mb-2'>
            <Typography className='!font-bold' color='blue-gray'>
              Subscriptions
            </Typography>
            <Typography
              className='mt-1 !font-normal !text-gray-600'
              variant='small'
            >
              View and manage your subscriptions easily.
            </Typography>
          </div>
          <div className='w-full'>
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon strokeWidth={3} className='h-4 w-4' />
              Add new subscription
            </Button>
          </div>
        </CardHeader>

        <DashboardNavbar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortKey={sortKey}
          setSortKey={setSortKey}
        />
        <CardBody className="flex flex-col gap-4 p-4">
          {sortedSubs.length === 0 ? (
            <Typography color="gray" className="text-center italic">
              You have no subscriptions listed under {filterCategory || "this category"}.
            </Typography>
          ) : (
            sortedSubs.map((sub, index) => (
              <SubscriptionCard key={index} {...sub} />
            ))
          )}
        </CardBody>
      </Card>

      {/* Modal included here so it’s part of this component tree */}
      <SubscriptionModal open={isModalOpen} setOpen={setIsModalOpen} />
    </section>
  );
};
