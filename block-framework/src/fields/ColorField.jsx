import { useEffect, useRef, useState, useCallback} from "@wordpress/element";
import { randomString } from '../utils';
import { HexColorPicker } from "react-colorful";
import useClickOutside from "../hooks/useClickOutside";

const ColorField = ({ value, onChange }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);
  
	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);
  
	return (
	  <div className="wpbf-color-picker">
		<div
		  className="wpbf-color-picker__swatch"
		  style={{ backgroundColor: value }}
		  onClick={() => toggle(true)}
		/>
  
		{isOpen && (
		  <div className="wpbf-color-picker__popover" ref={popover}>
			<HexColorPicker color={value} onChange={onChange} />
		  </div>
		)}
	  </div>
	);
};
  
export default ColorField;