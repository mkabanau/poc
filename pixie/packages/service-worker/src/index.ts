import {log} from 'logger'

export async function registerServiceWorker(scriptURL:string, scope:string) {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
           scriptURL,
          {
            scope:scope,
          }
        );
        if (registration.installing) {
          log('Service worker installing');
        } else if (registration.waiting) {
          log('Service worker installed');
        } else if (registration.active) {
          log('Service worker active');
        }
      } catch (error) {
        log(`Error Registration failed with ${error}`);
      }
    }
  };
