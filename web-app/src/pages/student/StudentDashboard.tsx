import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/shared';

export const StudentDashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              As-salamu Alaykum, {user?.displayName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to continue your Quran journey today?
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your daily tracker will appear here
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Memorization Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track your ayahs, surahs, and juz
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Today's lesson from your teacher
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
