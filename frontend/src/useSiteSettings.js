
import { useEffect, useState } from 'react';
import API_URL from './api';
import config from './config';

export default function useSiteSettings() {
  const [settings, setSettings] = useState(config);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/site-settings/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load site settings');
        }
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setSettings({
            siteName: data.site_name || config.siteName,
            logo: data.logo || config.logo,
            phone: data.phone || config.phone,
          });
        }
      })
      .catch((error) => {
        console.error('Could not load site settings:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
