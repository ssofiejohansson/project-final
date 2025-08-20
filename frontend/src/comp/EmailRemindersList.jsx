 import React, { useState, useEffect } from 'react';

const EmailRemindersList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch immediately when component loads
    fetchReminders();

    // Set up polling to refresh every 30 seconds
    const interval = setInterval(() => {
      fetchReminders();
    }, 30000); // 30 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/email/reminders');

      if (response.ok) {
        const data = await response.json();
        setReminders(data.reminders || []);
      } else {
        setError('Failed to fetch email reminders');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching reminders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReminder = async (jobId) => {
    try {
      const response = await fetch(`/api/email/job/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the list after canceling
        fetchReminders();
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel reminder: ${errorData.error}`);
      }
    } catch (err) {
      alert('Error canceling reminder');
      console.error('Error canceling reminder:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'active':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getTypeIcon = (type, isRecurring) => {
    if (isRecurring) return '🔄';
    switch (type) {
      case 'immediate':
        return '⚡';
      case 'delayed':
        return '⏰';
      case 'recurring':
        return '🔄';
      default:
        return '📧';
    }
  };

  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Email Reminders</h2>
        <div className='flex items-center justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          <span className='ml-2'>Loading reminders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Email Reminders</h2>
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <p className='text-red-700'>{error}</p>
          <button
            onClick={fetchReminders}
            className='mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Email Reminders</h2>
        <div className='flex gap-2'>
          <span className='text-sm text-gray-600'>
            {reminders.length} reminder{reminders.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={fetchReminders}
            className='text-blue-600 hover:text-blue-800 text-sm'
            title='Refresh list'
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {reminders.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <p>No email reminders scheduled</p>
          <p className='text-sm mt-2'>
            Use the form above to schedule your first reminder
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
            >
              <div className='flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='text-lg'>
                      {getTypeIcon(reminder.type, reminder.isRecurring)}
                    </span>
                    <span className='font-medium text-gray-900'>
                      {reminder.email}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        reminder.status
                      )}`}
                    >
                      {reminder.status}
                    </span>
                  </div>

                  <p className='text-gray-700 mb-2'>{reminder.subject}</p>

                  <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                    <span>
                      <strong>Type:</strong>{' '}
                      {reminder.isRecurring
                        ? 'Recurring (Monthly)'
                        : reminder.type}
                    </span>
                    {reminder.nextRun && (
                      <span>
                        <strong>Next run:</strong>{' '}
                        {formatDate(reminder.nextRun)}
                      </span>
                    )}
                    <span>
                      <strong>Created:</strong> {formatDate(reminder.createdAt)}
                    </span>
                  </div>
                </div>

                <div className='ml-4 flex gap-2'>
                  {reminder.status === 'scheduled' ||
                    reminder.status === 'waiting' ? (
                    <button
                      onClick={() => handleCancelReminder(reminder.id)}
                      className='px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors'
                      title='Cancel this reminder'
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailRemindersList;
