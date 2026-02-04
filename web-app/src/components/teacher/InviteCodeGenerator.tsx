import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../shared';
import { RelationshipService } from '../../services/relationship.service';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../lib/logger';

export const InviteCodeGenerator: React.FC = () => {
  const { user } = useAuth();
  const [code, setCode] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCode = async () => {
    if (!user) return;

    setGenerating(true);
    try {
      const inviteCode = await RelationshipService.createStudentInvite(
        user.uid,
        user.displayName || 'Teacher'
      );
      setCode(inviteCode);
    } catch (error) {
      logger.error('Failed to generate invite code', error as Error);
      alert('Failed to generate invite code. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!code) return;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Student</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Generate an invite code that students can use to join your class.
        </p>

        {!code ? (
          <Button onClick={generateCode} disabled={generating} className="w-full">
            {generating ? 'Generating...' : 'Generate Invite Code'}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Invite Code</p>
              <p className="text-3xl font-bold text-primary tracking-wider">{code}</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                {copied ? '✓ Copied!' : 'Copy Code'}
              </Button>
              <Button onClick={generateCode} variant="outline" className="flex-1">
                Generate New
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Share this code with your student. It expires in 7 days.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
