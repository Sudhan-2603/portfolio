import './DriftbarFooter.css';

/**
 * DriftbarFooter
 * Recreated Driftbar Meadow Footer with all contents removed except the giant wordmark,
 * replaced with "Sudhan" sinking into the lavender fog and blue-hour meadow.
 * Strictly Zero Borders Rule (border: none !important)
 */
export default function DriftbarFooter({ onScrollToTop }) {
  const handleClick = (e) => {
    if (onScrollToTop) {
      e.preventDefault();
      onScrollToTop();
    }
  };

  return (
    <footer
      className="footer driftbar-footer-root"
      onClick={handleClick}
      role={onScrollToTop ? 'button' : undefined}
      tabIndex={onScrollToTop ? 0 : undefined}
      title={onScrollToTop ? 'Click to scroll back to top' : undefined}
    >
      {/* 1. Stage and Video */}
      <div className="footer__stage" aria-hidden="true">
        <video
          className="footer__video"
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261014_121838_c97d0940-f430-4304-8573-4f47ee44f447.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* 2. Giant Frosted-Glass Wordmark ("Sudhan") */}
      <p className="footer__wordmark" aria-hidden="true">
        Sudhan
      </p>

      {/* 3. Fog */}
      <div className="footer__fog" aria-hidden="true" />
    </footer>
  );
}
