import './firebase';
import './styles/base.scss';
import './styles/normalize.css';
import './styles/vars.scss';
import './styles/code.scss';
import './styles/custom-blocks.scss';

import { Theme } from 'rvpress';

import Layout from './Layout';
import NotFound from './NotFound';

const theme: Theme = {
    Layout,
    NotFound
};

export default theme;

export type { ThemeConfig } from './ThemeConfig';
