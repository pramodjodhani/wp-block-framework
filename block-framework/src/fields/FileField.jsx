import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Dashicon } from '@wordpress/components';
import { useState, useEffect } from "@wordpress/element";
import { ReactComponent as FileIcon } from "../../svg/file.svg";

/**
 * Todo:
 * 2. multiple not working
 */

const FileField = ( props ) => {
	const isMultiple = props.multiple ? props.multiple : false; 
	const allowedTypes = props.allowedTypes ? props.allowedTypes : ['image'];
	const [ files, setFiles ] = useState( [] );
	let value = [];

	useEffect( () => {
		if ( props.value ) {
			setFiles( props.value );
		}
	}, [] );

	useEffect( () => {
		if ( props.onChange ) {
			props.onChange( files );
		}
	}, [ files ] );
	
	const onDelete = ( delete_id ) => {
		setFiles( files.filter( file => file.id !== delete_id ) );
	}
	
	return (
		<MediaUploadCheck
			>
			<MediaUpload
				onSelect={( media ) => {
					// @todo Odd that multiple is not working.
					if ( !isMultiple ) {
						setFiles( [] );
					}

					// @todo Saving all of the data is causing "414 Request-URI Too Large", maybe save only the essential data in props.
					setFiles( [ media ] )
				}}
				allowedTypes={allowedTypes}
				isMultiple={isMultiple}
				value={ value }
				render={( { open } ) => (
					<>
						{ (files && 0 !== files.length) && <ul className='wpbf-image-field'>
							{files && files.map( file => {
								return (
									<li key={file.id}>
										<div className="wpbc-image-field__image-wrap">
											<div className="wpbc-image-field__image-wrap-delete" onClick={() => onDelete( file.id )}>
												<Dashicon icon="no" />
											</div>
											
											{file?.sizes?.thumbnail ?
												<img className='wpbf-image-field__img' src={file.sizes.thumbnail.url} />
												:
												<FileIcon></FileIcon>
											}
											
										</div>
									</li>
								)
							} )}
						</ul>}
						<button className='button' onClick={open}>Open Media Library</button>
					</>
				) }
			/>
		</MediaUploadCheck>
  	);
}

export default FileField
