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
    </div>
  );
}
