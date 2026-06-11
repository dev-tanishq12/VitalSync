import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { authFetch } from '@/lib/fetch';

export function useBiometrics() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null); // Today's aggregated metrics
  const [records, setRecords] = useState<any[]>([]); // Historical records
  const [profile, setProfile] = useState<any>(null); // User traits (weight, height, etc)

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch in parallel
        const [dashboardRes, recordsRes, profileRes] = await Promise.all([
          authFetch('/api/dashboard'),
          authFetch('/api/records'),
          authFetch('/api/profile').catch(() => null) // We haven't created this yet, so it might 404, catch it
        ]);

        if (dashboardRes.ok) {
          const dData = await dashboardRes.json();
          setMetrics(dData.metrics);
        }

        if (recordsRes.ok) {
          const rData = await recordsRes.json();
          setRecords(rData.records || []);
        }

        if (profileRes && profileRes.ok) {
          const pData = await profileRes.json();
          setProfile(pData.profile);
        }
      } catch (err) {
        console.error('Failed to fetch biometrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { loading, metrics, records, profile };
}
