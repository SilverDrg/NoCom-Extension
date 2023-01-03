import React from 'react';
import z from 'zod';

const websiteUrl = z.string().url();

export const useWebsiteUrl = () => {
    const [website, setWebsite] = React.useState<string | undefined>();

    React.useEffect(() => {
        chrome.tabs && chrome.tabs.query({
            active: true,
            currentWindow: true
          }, tabs => {
            console.log(tabs[0].url);
            const tab = tabs[0];
            setWebsite(tab.url);
        });
    }, [])

    const results = websiteUrl.safeParse(website);
    if (results.success) return website;
}