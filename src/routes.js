import paths from './paths';

import PlayingField from './components/PlayingField/PlayingField';
import ResultField from './components/ResultField/ResultField';


export const routesList = [
  {
    path: paths.home,
    isExact: true,
    component: PlayingField,
  },
  {
    path: paths.result,
    isExact: true,
    component: ResultField,
  },
];

export const routes = [...routesList];
