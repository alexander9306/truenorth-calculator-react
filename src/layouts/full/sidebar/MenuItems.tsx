import { IconTable, IconCalculator } from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Operation',
    icon: IconCalculator,
    href: '/',
  },

  {
    id: uniqueId(),
    title: 'Records',
    icon: IconTable,
    href: '/records',
  },
];

export default Menuitems;
