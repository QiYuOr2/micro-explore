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
    name: 'native',
    app: loadApp('http://localhost:3001', 'native'),
    activeWhen: ['native', 'both'],
  },
  {
    name: 'vue',
    app: loadApp('http://localhost:3002', 'vue'),
    activeWhen: ['vue', 'both'],
  },
];

appList.forEach((item) => registerApplication(item));

start();

if (location.pathname === '/') {
  location.pathname += 'native';
}
