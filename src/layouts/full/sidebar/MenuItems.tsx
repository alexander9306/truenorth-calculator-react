import { IconTable, IconCalculator } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: 1,
    title: 'Operation',
    icon: IconCalculator,
    href: '/',
  },

  {
    id: 2,
    title: 'Records',
    icon: IconTable,
    href: '/records',
  },
];

export default Menuitems;
