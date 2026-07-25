import { useState } from "react";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { isSoundEnabled, setSoundEnabled, playClick } from "../../sound";
import "./SoundToggle.css";

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(isSoundEnabled);

  const toggle = () => {
    const next = !enabled;
    setSoundEnabled(next);
    setEnabled(next);
    if (next) playClick();
  };

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggle}
      aria-label={enabled ? "Mute site sounds" : "Unmute site sounds"}
      title={enabled ? "Mute site sounds" : "Unmute site sounds"}
    >
      {enabled ? <MdVolumeUp /> : <MdVolumeOff />}
    </button>
  );
};

export default SoundToggle;
