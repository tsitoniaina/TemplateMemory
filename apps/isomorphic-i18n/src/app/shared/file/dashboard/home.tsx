import { routes } from '@/config/routes';

export const pageHeader = {
  title: 'text-newsletter',
  breadcrumb: [
    {
      href: routes.home,  
      name: 'text-home',
    },
    {
      name: 'text-newsletter',
    },
  ],
};

export default function Home() {
    return (
      <div>
        <h1>Hello, World!</h1>
      </div>
    );
  }
  