import { useState } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetAllSubmissions, useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';
import LoginButton from '@/components/auth/LoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, ShieldAlert, Loader2, Home, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminCheckLoading, error: adminCheckError } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useGetAllSubmissions();

  const [profileName, setProfileName] = useState('');
  const saveProfileMutation = useSaveCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleSaveProfile = async () => {
    if (profileName.trim()) {
      await saveProfileMutation.mutateAsync({ name: profileName.trim() });
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>
              Please log in with Internet Identity to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile setup dialog
  if (showProfileSetup) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogDescription>
              Please enter your name to complete your profile setup.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Your Name</Label>
              <Input
                id="profile-name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={!profileName.trim() || saveProfileMutation.isPending}
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Loading admin check
  if (adminCheckLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel. Only authorized administrators can view this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button onClick={() => window.location.hash = ''} variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
              <LoginButton />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin view
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/WhatsApp Image 2026-02-07 at 9.27.57 PM.jpeg"
                alt="Vinod Electriclas logo"
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Contact Form Submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => window.location.hash = ''} variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
            <CardDescription>
              View all contact form submissions from potential clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissionsError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load submissions. Please try refreshing the page.
                </AlertDescription>
              </Alert>
            )}

            {submissionsLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading submissions...</p>
              </div>
            ) : !submissions || submissions.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No submissions yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Contact form submissions will appear here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-sm">
                          {formatDate(submission.submittedAt)}
                        </TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.phone || '—'}</TableCell>
                        <TableCell>{submission.email || '—'}</TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-3 text-sm text-muted-foreground">
                            {submission.message}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
