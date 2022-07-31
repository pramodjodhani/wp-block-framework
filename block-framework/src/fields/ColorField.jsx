import { useEffect, useRef} from "@wordpress/element";
import { randomString } from '../utils';

function ColorField( props ) {
	let cls = useRef( 'wpbf-color-' + randomString() );

	useEffect( () => {
		setTimeout(() => {
			jQuery( `.${cls.current}` ).wpColorPicker();
		} );
	}, [] );

	const handleChange = ( e ) => {
		// @todo it's not working.
		console.log( e.target.value );
	}

	return (
		<div>
			<input
				type="text"
				className={cls.current}
				onBlur={ handleChange }
			/>
		</div>
	)
}

export default ColorField
