'use client';

import './footer.scss';

import Link from 'next/link';
import { useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { Container } from '@/components/layouts/container';

const Elements = [
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Terms and conditions',
    href: '/terms-and-condition',
  },
];

export const Footer = () => {
  useEffect(() => {}, []);

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <div className="footer__email">
            <FaEnvelope />
            <p>test@mail.com</p>
          </div>
          <div className="footer__links">
            <ul>
              {Elements.map((el, index) => (
                <li key={index}>
                  <Link href={el.href}>{el.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};
