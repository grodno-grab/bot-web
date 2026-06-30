import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/preact';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  describe('initials (no thumbnail)', () => {
    it('uses first letters of the first two words', () => {
      const { container } = render(<Avatar name="John Doe" />);
      expect(container.textContent).toBe('JD');
    });

    it('uses the first two characters of a single word', () => {
      const { container } = render(<Avatar name="alice" />);
      expect(container.textContent).toBe('AL');
    });

    it('collapses extra whitespace between words', () => {
      const { container } = render(<Avatar name="  Bob   Smith " />);
      expect(container.textContent).toBe('BS');
    });

    it('does not crash on an empty name', () => {
      const { container } = render(<Avatar name="" />);
      expect(container.textContent).toBe('');
    });
  });

  describe('color', () => {
    it('is deterministic for the same name', () => {
      const a = render(<Avatar name="Repeatable" />).container.firstElementChild as HTMLElement;
      const b = render(<Avatar name="Repeatable" />).container.firstElementChild as HTMLElement;
      expect(a.getAttribute('style')).toBe(b.getAttribute('style'));
      expect(a.style.background).toBeTruthy();
    });
  });

  describe('thumbnail', () => {
    it('renders a base64 jpeg image instead of initials', () => {
      const { container } = render(<Avatar name="Anything" thumbnail="QUJD" />);
      const img = container.querySelector('img');
      expect(img).not.toBeNull();
      expect(img!.getAttribute('src')).toBe('data:image/jpeg;base64,QUJD');
      expect(container.textContent).toBe('');
    });
  });

  describe('size', () => {
    it('applies the requested pixel size', () => {
      const el = render(<Avatar name="Z" size={72} />).container.firstElementChild as HTMLElement;
      expect(el.style.width).toBe('72px');
      expect(el.style.height).toBe('72px');
    });
  });
});
