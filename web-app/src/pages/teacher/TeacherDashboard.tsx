import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Card, CardHeader, CardTitle, CardContent } from '../../components/shared';

export const TeacherDashboard: React.FC = () => {
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
              Manage your students and assignments
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and manage your students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assign Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create daily lesson assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor student performance
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
