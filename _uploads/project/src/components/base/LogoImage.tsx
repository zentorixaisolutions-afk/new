import { useState, type CSSProperties } from 'react';

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export default function LogoImage({ src, alt, className = '', style }: LogoImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="logo-entrance">
      <div className="relative flex-shrink-0" style={style}>
        <img
          src={src}
          alt={alt}
          className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} block`}
          style={{ transition: 'opacity 500ms ease-out' }}
          onLoad={() => setLoaded(true)}
          loading="eager"
        />
      </div>
    </div>
  );
}