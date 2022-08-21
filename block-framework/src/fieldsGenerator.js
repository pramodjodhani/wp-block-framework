import ColorField from './fields/ColorField';
import EditorField from './fields/EditorField';
import FileField from './fields/FileField';
import GroupField from './fields/GroupField';

const FieldGenerator = {
	
	/**
	 * Generate the single field.
	 *
	 * @param {*} field       Field data (passed from PHP).
	 * @param {*} props       Props.
	 * @param {*} blockProps  Block Props which is passed by Gutenberg.
	 * @param {*} parentField The parent field data (passed from PHP).
	 *
	 * @returns React Component.
	 */
	singleField: function ( field, props, blockProps, parentField ) {
		const setAttribute = ( key, val ) => {
			if ( parentField ) {
				props.setAttributes( key, val, props.rowIndex );
			} else {
				props.setAttributes( { [ key ]: val } );
			}
		}

		/**
		 * Handle field edit.
		 *
		 * @param {event} e.
		 */
		const fieldEdit = ( e ) => {
			setAttribute( e.target.dataset.id, e.target.value );
		};

		/**
		 * Handle checkbox change.
		 * @param {*} e 
		 */
		const handleCheckoxChange = ( e ) => {
			// e.preventDefault();
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

			setAttribute( id, Array.from( new Set( currentValue ) ) );
		}

		const htmlId = blockProps.id + '-' + field.id;
		let value = props.attributes[ field.id ] ? props.attributes[ field.id ] : field.default;
		
		switch ( field.type ) {
			case 'text':
				return <input type="text" id={htmlId} key={field.id} onChange={fieldEdit} data-id={field.id} value={value}></input>
			case 'select':
				return <select
					key={field.id} onChange={fieldEdit} data-id={field.id} defaultValue={value} id={htmlId}>
					{field.choices && Object.entries( field.choices ).map( ( [ text, key ] ) => (
						<option key={key} value={key}>{text}</option>
					) )}
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
					value={value} />
			case 'textarea':
				const rows = field.rows ? field.rows : '5';
				const cols = field.cols ? field.cols : '50';
				return <textarea
					type='date'
					key={field.id}
					onChange={fieldEdit}
					data-id={field.id}
					id={htmlId}
					value={value}
					rows={rows}
					cols={cols}
				>
				</textarea>
			case 'radio':
			case 'checkboxes':
			case 'checkbox':
				const type = 'radio' === field.type ? 'radio' : 'checkbox';
				value = jQuery.isArray( value ) ? value : [];
				// const name = blockProps.id + '-' + field.id;

				return <>
					{field.choices && Object.entries( field.choices ).map( ( [ key, text ] ) => (
						<label className='wpbf-single-field__checkbox-label' key={key}>
							<input
								id={htmlId}
								data-id={field.id}
								type={type}
								value={key}
								data-key={key}
								data-text={text}
								name={field._name}
								onChange={handleCheckoxChange}
								checked={value.includes( key )}
							/>
							{text}
						</label>
					) )}
				</>
			case 'file':
			case 'image':
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
				return <ColorField
					value={value}
					key={field.id}
					onChange={( newVal ) => setAttribute( field.id, newVal )}
				/>
			/* case 'editor':
				return 'Editor field'; */
			case 'group':
				if ( ! value ) {
					value = [];
				}
				return <GroupField
					field={field}
					value={value}
					key={field.id}
					blockProps={blockProps} 
					onChange={( newVal ) => {
						setAttribute( field.id, newVal )
					}}
				/>
				
		};
	},	 
}

export default FieldGenerator;