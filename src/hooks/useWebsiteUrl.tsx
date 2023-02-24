import React from 'react';
import z from 'zod';
import { sha256 } from 'crypto-hash';

const websiteUrl = z.string().url();

export const useWebsiteUrl = (): [string, () => void] => {
  const [website, setWebsite] = React.useState<string | undefined>();

  const hashUrl = React.useCallback(async (url: string) => {
    return await sha256(url);
  }, []);

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        tabs => {
          console.log('websitte hash: ', hashUrl(tabs[0].url ?? 'something else with pawbies'));
          console.log(tabs[0].url);
          const tab = tabs[0];
          hashUrl(tab.url ?? 'undefined').then(hash => setWebsite(hash));
        },
      );
  }, [hashUrl]);

  const updateWebsite = React.useCallback(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        tabs => {
          console.log(tabs[0].url);
          const tab = tabs[0];
          hashUrl(tab.url ?? 'undefined').then(hash => setWebsite(hash));
        },
      );
  }, [hashUrl]);

  const results = websiteUrl.safeParse(website);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (results.success) return [website!, updateWebsite];
  else return ['undefined', updateWebsite];
};
