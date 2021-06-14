const { register } = require('./register');

console.log('子应用启动');
let root;

// 需要暴露bootstrap、mount、unmount三个生命周期函数
const app = {
  async bootstrap() {
    await Promise.resolve();
    document.title = 'Native | 微前端尝试';
    root = document.createElement('div');
    root.id = 'native';

    const link = document.createElement('a');
    link.href = '/vue';
    link.innerText = 'Vue子项目';

    document.body.appendChild(root);
    document.body.appendChild(link);
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

register('native', app);
