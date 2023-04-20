import * as alias from 'module-alias';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
  alias.addAliases({
    '@data': path.join(__dirname, '../../data'),
    '@domain': path.join(__dirname, '../../domain'),
    '@infra': path.join(__dirname, '../../infra'),
    '@main': path.join(__dirname, '../../main'),
    '@presentation': path.join(__dirname, '../../presentation'),
    '@validation': path.join(__dirname, '../../validation'),
  });
} else {
  alias.addAliases({
    '@data': path.join(__dirname, '../../data'),
    '@domain': path.join(__dirname, '../../domain'),
    '@infra': path.join(__dirname, '../../infra'),
    '@main': path.join(__dirname, '../../main'),
    '@presentation': path.join(__dirname, '../../presentation'),
    '@validation': path.join(__dirname, '../../validation'),
  });
}
