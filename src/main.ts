import {
  LifeCycles,
  registerApplication,
  RegisterApplicationConfig,
  start,
} from 'single-spa';

function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  });
}

function loadApp(url: string, globalKey: string, source = '/bundle.js') {
  return async () => {
    await loadScript(url + source);
    return (window as unknown as Record<string, LifeCycles<{}>>)[globalKey];
  };
}

const appList: RegisterApplicationConfig[] = [
  {
    name: 'app1',
    app: loadApp('http://localhost:3001', 'app1'),
    activeWhen: '',
  },
];

appList.forEach((item) => registerApplication(item));

start();
