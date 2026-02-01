import React from 'react';
import { Link } from 'react-router-dom';
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

          <Link to="/student/quran" className="block">
            <Card className="h-full hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Quran Reader
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Read and revise the Holy Quran
                </p>
                <Button className="mt-4 w-full" variant="outline" size="sm">
                  Open Quran →
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
