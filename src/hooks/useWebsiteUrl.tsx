import React from 'react';
import { sha256 } from 'crypto-hash';

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
          const tab = tabs[0];
          hashUrl(tab.url ?? 'undefined').then(hash => {
            setWebsite(hash);
          });
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
          const tab = tabs[0];
          hashUrl(tab.url ?? 'undefined').then(hash => {
            setWebsite(hash);
          });
        },
      );
  }, [hashUrl]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [website!, updateWebsite];
};
