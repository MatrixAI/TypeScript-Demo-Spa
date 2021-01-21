import { mount } from '@vue/test-utils'
import App from "@/App.vue";
import store from '@/store';
import router from '@/router';

describe('index', () => {
  test('Test the App', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = mount(App, {
      global: {
        plugins: [store, router]
      }
    });
    expect(wrapper.html()).toContain('TypeScript Demo SPA');
  });
});
