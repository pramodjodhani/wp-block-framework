import React from 'react'
import { useState, useRef, useEffect} from "@wordpress/element";

function EditorField( {value, onChange, id} ) {
	const [ text, setText ] = useState( '' );

	useEffect( () => {
		setTimeout( () => {
			wp.editor.initialize( id, {
				...wp.editor.getDefaultSettings(),

			} );
		}, 1000 );
	}, [] );

	return (
		<div>
			<textarea className={id} id={id} cols="30" rows="10"></textarea>
		</div>
  )
}

export default EditorField
