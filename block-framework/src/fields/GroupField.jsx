import React from 'react'
import FieldGenerator from '../fieldsGenerator';
import { useState, useEffect } from "@wordpress/element";

// @todo call onChange on setRows - almost done.
// @todo - bug last character is deleted on save.
function GroupField( {field:parentField, value, onChange, blockProps} ) {
	const [ rows, setRows ] = useState( value );

	if ( !parentField.subfields ) {
		return null;
	}

	const getEmptyRow = () => {
		const emptyRow = {};
		parentField.subfields.forEach( ( field ) => {
			emptyRow[ field.id ] = field.default ? field.default : '';
		} );
		return emptyRow;
	}

	const addRow = () => {
		// Set rows is local state, onChange updates the gutenberg prop (props.setAttributes)
		setRows( [ ...rows, getEmptyRow() ] );
		onChange( [ ...rows, getEmptyRow() ] );
	}

	const deleteRow = ( rowIndex ) => {
		const tempRow = rows.filter( ( row, index ) => index !== rowIndex );
		
		// Set rows is local state, onChange updates the gutenberg prop (props.setAttributes)
		setRows( tempRow );
		onChange( tempRow );
	}

	useEffect( () => {
		if ( 0 === rows.length ) {
			// Set rows is local state, onChange updates the gutenberg prop (props.setAttributes)
			setRows( [ getEmptyRow() ] );
			onChange( [ getEmptyRow() ] );
		}
	}, [] );

	const props = {
		setAttributes: ( key, val, rowIndex ) => {
			if ( typeof rows[ rowIndex ] === 'undefined' ) {
				return;
			}
			
			let tempRows = [ ...rows ];
			let tempRow = tempRows[ rowIndex ] ? Object.assign({}, tempRows[ rowIndex ]) : false;
			tempRow[ key ] = val;
			tempRows[ rowIndex ] = tempRow;

			// Set rows is local state, onChange updates the gutenberg prop (props.setAttributes)
			setRows( tempRows );
			onChange( tempRows );
		},
	};

	return <div className={'wpbf-subfield ' + 'wpbf-subfield-rowcount-' + rows.length }>
		{rows.map( ( row, rowIndex ) => (
			<div className='wpbf-subfield__row' key={rowIndex}>
				{parentField.subfields.map( ( subfield ) => {
					subfield.htmlId = parentField.htmlId + '-' + subfield.id;

					return (
						<div key={subfield.htmlId} className={'wbf-subsingle-field wbf-subsingle-field--' + subfield.id + ' wbf-single-field--' + subfield.type}>
							<label htmlFor={subfield.htmlId}>{subfield.title}</label>
							{FieldGenerator.singleField( subfield, { ...props, attributes: row, rowIndex }, blockProps, parentField )}
						</div>
					);

				} )}
				{1 !== rows.length && <a className='wpbf-subfield__delete_btn' onClick={() => deleteRow( rowIndex )}>x</a>}
			</div>
		))}
		<button className='button wpbf-subfield__add_btn' onClick={addRow}>Add Row</button>
	</div>
}

export default GroupField;
