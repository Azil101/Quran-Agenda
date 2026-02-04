import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../shared';
import { RelationshipService } from '../../services/relationship.service';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../lib/logger';

export const JoinWithCode: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoin = async () => {
    if (!user || !code.trim()) return;

    setJoining(true);
    try {
      await RelationshipService.useStudentInvite(
        user.uid,
        user.displayName || 'Student',
        code.trim()
      );
      alert('Successfully joined your teacher! 🎉');
      setCode('');
      if (onSuccess) onSuccess();
    } catch (error) {
      logger.error('Failed to join with code', error as Error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to join. Please try again.';
      alert(errorMessage);
    } finally {
      setJoining(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Your Teacher</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter the invite code from your teacher to get started.
        </p>

        <Input
          label="Invite Code"
          placeholder="Enter 8-character code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={8}
        />

        <Button
          onClick={handleJoin}
          disabled={joining || code.length !== 8}
          className="w-full"
        >
          {joining ? 'Joining...' : 'Join Teacher'}
        </Button>
      </CardContent>
    </Card>
  );
};
