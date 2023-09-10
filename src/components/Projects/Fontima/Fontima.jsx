export default function Deglyph() {
  return (
    <div id="fontima">
      <div className='fontima__gallery'>
        {(new Array(4)).fill(null).map((_, i) => (
          <span key={i}>
            <span>A</span>
          </span>
        ))}
      </div>
      <div className="fontima__feedback">
        <p title="Asking for only the uppercase&#13; letter &ldquo;A&rdquo; saves that weight.">
          <strong>142.7 KB (91%) saved</strong><br />for these fonts above!
        </p>
      </div>
    </div>
  );
}
