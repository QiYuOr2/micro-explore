const { register } = require('./register');

console.log('子应用启动');
let root;

// 需要暴露bootstrap、mount、unmount三个生命周期函数
const app = {
  async bootstrap() {
    await Promise.resolve();
    document.title = 'App1 | 微前端尝试';
    root = document.createElement('div');
    root.id = 'app1';
    document.body.appendChild(root);
  },
  async mount() {
    await Promise.resolve();
    root.textContent = '这是个APP';
  },
  async unmount() {
    await Promise.resolve();
    root.textContent = '';
  },
};

register('app1', app);
