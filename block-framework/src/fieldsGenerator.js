import { ColorPicker, DateTimePicker, Button } from '@wordpress/components';
import { FormFileUpload } from '@wordpress/components';
import FileField from './fields/FileField';

const FieldGenerator = {
	singleField: function ( field, props, blockProps ) {

		const fieldEdit = ( e, id ) => {
			props.setAttributes( { [e.target.dataset.id]: e.target.value } );
		};

		const setAttribute = ( key, val ) => {
			props.setAttributes( { [key]: val } );
		}

		const handleCheckoxChange = ( e ) => {
			const id = e.target.dataset.id;
			let currentValue = jQuery.isArray( props.attributes[ id ] ) ? props.attributes[ id ] : [];
			
			if ( 'radio' === e.target.type ) {
				currentValue = [];
			}

			if ( e.target.checked ) {
				currentValue.push( e.target.value );
			} else {
				currentValue = currentValue.filter( val => val !== e.target.value );
			}

			props.setAttributes( { [ id ]: Array.from( new Set( currentValue ) ) } );
			console.log( 'currentValue', id, currentValue );
		}

		const htmlId = blockProps.id + '-' + field.id;
		let value = props.attributes[ field.id ] ? props.attributes[ field.id ] : field.default;
		
		switch ( field.type ) {
			case 'text': 
				return <input type="text" id={htmlId} key={field.id} onChange={fieldEdit} data-id={field.id} value={value}></input>
			case 'select':
				return <select
							key={field.id} onChange={fieldEdit} data-id={field.id} defaultValue={value} id={htmlId}>
								{field.choices && Object.entries(field.choices).map( ( [text, key] ) => (
									<option key={key} value={key}>{ text }</option>
								) ) }
						</select>
			case 'date':
				return <input
					type='date'
					key={field.id}
					onChange={fieldEdit}
					data-id={field.id}
					id={htmlId}
					value={value} />
			case 'password':
				return <input
					type='password'
					key={field.id}
					onChange={fieldEdit}
					data-id={field.id}
					id={htmlId}
					value={value}/>
			case 'textarea':
				return <textarea
						type='date'
						key={field.id}
						onChange={fieldEdit}
						data-id={field.id}
						id={htmlId}
						value={value}
						>
						</textarea>
			case 'radio':
			case 'checkboxes':
			case 'checkbox':
				const type = 'radio' === field.type ? 'radio' : 'checkbox';
				value = jQuery.isArray( value ) ? value : [];
				const name = blockProps.id + '-' + field.id;

				return <>
					{field.choices && Object.entries(field.choices).map( ( [key, text] ) => (
						<label className='wpbf-single-field__checkbox-label' key={key}>
							<input
								id={htmlId}
								data-id={field.id}
								type={type}
								value={key}
								data-key={key}
								data-text={text}
								name={name}
								onChange={handleCheckoxChange}
								checked={ value.includes( key )  }
							/>
							{text}
						</label>
					) ) }
				</>
			case 'file':
			case 'image':
				// return <input key={field.id} id={htmlId} onChange={fieldEdit} data-id={field.id} value={value}></input>
				const multiple = field.multiple ? field.multiple : false;
				return (
					<FileField
						multiple={multiple}
						onChange={( newVal ) => setAttribute( field.id, newVal )}
						allowedTypes={field.allowed_types}
						value={value}
					/>
				)
			case 'color':
				// @Todo
				return <input
					type='text'
					key={field.id}
					value={value}
					onChange={fieldEdit}
					id={htmlId}
					/>
			case 'editor':
				// @Todo
				return <input
					type='text'
					key={field.id}
					onChange={fieldEdit}
					id={htmlId}
					data-id={field.id}
					value={value}></input>
			/* case 'editor':
				return <input key={field.id} onChange={fieldEdit} data-id={field.id} value={value}></input>			 */
			
			default: 
				return <div key={field.id}> Default -{field.type} - {value}</div>
		}

	}
}

export default FieldGenerator;