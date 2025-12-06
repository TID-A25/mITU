import { useState, useCallback } from 'react';
import { deleteBump, checkBumpStatus } from '../services/parseQueries';

export default function useCancelBump(currentUserId, otherUserId) {
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState(null);

  const handleCancel = useCallback(async () => {
    if (!currentUserId || !otherUserId) {
      setError('Missing user IDs');
      return false;
    }

    try {
      setCancelling(true);
      setError(null);

      // Check bump status, get bumpid
      const bumpStatus = await checkBumpStatus(currentUserId, otherUserId);
      
      if (!bumpStatus?.exists) {
        setError('No bump request found');
        return false;
      }

      if (bumpStatus.status === 'accepted') {
        setError('Cannot cancel an accepted bump');
        return false;
      }

      // Allow deletion for both sent and received bumps
      await deleteBump(bumpStatus.bumpId);
      return true;
    } catch (err) {
      console.error('useCancelBump error', err);
      setError(err.message || 'Failed to cancel bump');
      return false;
    } finally {
      setCancelling(false);
    }
  }, [currentUserId, otherUserId]);

  return {
    handleCancel,
    cancelling,
    error,
  };
}