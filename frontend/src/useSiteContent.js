import { useEffect, useState } from 'react';
import API_URL from './api';

// Loads editable copy and image URLs; components retain their original fallback values.
export default function useSiteContent() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const base = String(API_URL || '').replace(/\\/+$/, '');
    if (!base) return;
    const controller = new AbortController();

    fetch(`${base}/api/site-content/`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(response => {
        if (!response.ok) throw new Error('Site content request failed');
        return response.json();
      })
      .then(data => setContent(data && typeof data === 'object' ? data : {}))
      .catch(error => {
        if (error.name !== 'AbortError') console.error('Could not load editable site content:', error);
      });

    return () => controller.abort();
  }, []);

  return content;
}
