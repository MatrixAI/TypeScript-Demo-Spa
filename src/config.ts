import { CustomError } from 'ts-custom-error';

export class ErrorConfig extends CustomError {}

declare global {
  interface Window {
    config: {
      DEMO_PROT: string;
      DEMO_HOST: string;
      DEMO_PORT: string;
      DEMO_BASE: string;
    };
  }
}

const isNode =
  typeof process !== 'undefined' &&
  process.release &&
  process.release.name === 'node';

type Config = {
  basePath: string;
  demoProt: string;
  demoHost: string;
  demoPort: number;
};

const config = {};

if (isNode) {
  config['basePath'] = process.env.DEMO_BASE ?? '';
  config['demoProt'] = process.env.DEMO_PROT ?? 'http';
  config['demoHost'] = process.env.DEMO_HOST ?? '127.0.0.1';
  config['demoPort'] =
    process.env.DEMO_PORT != null ? parseInt(process.env.DEMO_PORT) : 80;
  config;
} else {
  config['basePath'] = window.config.DEMO_BASE ?? '';
  config['demoProt'] = window.config.DEMO_PROT ?? 'http';
  config['demoHost'] = window.config.DEMO_HOST ?? '127.0.0.1';
  config['demoPort'] =
    window.config.DEMO_PORT != null ? parseInt(window.config.DEMO_PORT) : 80;
}

export default config as Config;
