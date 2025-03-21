import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from './AuthContext';
import AppLayout from '../layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Save } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  preferred_currency?: string;
  created_at: string;
}

const Profile = () => {
  const { user, supabase } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id || '',
    email: user?.email || '',
    full_name: '',
    preferred_currency: 'USD',
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.warn('No profile found. Creating one.');
          // If no profile exists, we'll create one when they save
        }

        if (data) {
          setProfile({
            id: data.id,
            email: user.email || '',
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            preferred_currency: data.preferred_currency || 'USD',
            created_at: data.created_at,
          });
        }
      } catch (error: any) {
        console.error('Error loading user profile:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      setError(null);
      setSuccess(null);

      if (!user) return;

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      // Prepare profile data
      const profileData = {
        id: user.id,
        full_name: profile.full_name,
        preferred_currency: profile.preferred_currency,
        updated_at: new Date().toISOString(),
      };

      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', user.id);
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert([
            {
              ...profileData,
              created_at: new Date().toISOString(),
            },
          ]);
      }

      if (result.error) throw result.error;
      
      setSuccess('Profile updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <AppLayout activePage="profile">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout activePage="profile">
      <Helmet>
        <title>Your Profile | Zakat Manager</title>
      </Helmet>

      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-emerald-800">Your Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={updateProfile}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-red-50 text-red-800 border border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="bg-green-50 text-green-800 border border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">Your email cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  value={profile.full_name || ''}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferred_currency">Preferred Currency</Label>
                <select
                  id="preferred_currency"
                  name="preferred_currency"
                  value={profile.preferred_currency}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="CAD">Canadian Dollar (C$)</option>
                  <option value="AUD">Australian Dollar (A$)</option>
                  <option value="SAR">Saudi Riyal (﷼)</option>
                  <option value="AED">UAE Dirham (د.إ)</option>
                  <option value="KWD">Kuwaiti Dinar (د.ك)</option>
                  <option value="QAR">Qatari Riyal (﷼)</option>
                  <option value="BHD">Bahraini Dinar (BD)</option>
                </select>
                <p className="text-xs text-gray-500">
                  This will be used as the default currency for all your assets and calculations
                </p>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-500">
                  Account created: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end border-t pt-4">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
