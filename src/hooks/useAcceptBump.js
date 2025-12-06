import { useState, useCallback } from 'react';
import { acceptBump, checkBumpStatus } from '../services/parseQueries';

export default function useAcceptBump(currentUserId, otherUserId) {
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleAccept = useCallback(async () => {
    if (!currentUserId || !otherUserId) {
      setError('Missing user IDs');
      return false;
    }

    try {
      setAccepting(true);
      setError(null);

      // check bump status
      const bumpStatus = await checkBumpStatus(currentUserId, otherUserId);
      
      if (!bumpStatus?.exists) {
        setError('No bump request found');
        return false;
      }

      if (bumpStatus.status === 'accepted') {
        setMessage('Bump already accepted');
        return false;
      }

      if (bumpStatus.requestedByCurrentUser) {
        setError('You cannot accept your own bump request');
        return false;
      }

      // Accept the bump
      await acceptBump(bumpStatus.bumpId);
      setMessage('Bump accepted! 🎊');
      return true;
    } catch (err) {
      console.error('useAcceptBump error', err);
      setError(err.message || 'Failed to accept bump');
      return false;
    } finally {
      setAccepting(false);
    }
  }, [currentUserId, otherUserId]);

  return {
    handleAccept,
    accepting,
    error,
    message,
  };
}