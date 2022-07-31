import { useEffect } from "@wordpress/element";
import { registerBlockType } from '@wordpress/blocks';
import FieldGenerator from './fieldsGenerator';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Todo:
 * 1. Make the template work.
 * 2. 
 */

var blockFrameworkMain = {
	init: function () {
		if ( ! window.bf_blocks ) {
			return;
		}

		for ( const [block_id, block_data] of Object.entries(window.bf_blocks) ) {
			this.register_block( block_id, block_data );
			console.log( block_id, block_data );
		}
	},

	register_block: function ( block_id, data ) {
		if ( !data.fields || ! jQuery.isArray( data.fields ) ) {
			data.fields = [];
		}

		const attributes = {};

		console.log( 'data',data );
		
		data.fields.forEach( field => {
			attributes[ field.id ] = {
				type: this.get_attribute_type_for_field( field )
			}
		} );

		registerBlockType( block_id, {
			title: data.title,
			icon: data.icon,
			category: data.category,
			attributes: attributes,
			edit: ( props ) => this.edit( props, data ),
			save: () => <div>Hola dave, { block_id }!</div>,
			// keywords: [], todo
		} );
	},

	edit: ( props, fieldData ) => {
		let ret = [];
		const blockProps = useBlockProps();
		
		fieldData.fields.forEach( ( field ) => {
			field.htmlId = blockProps.id + '-' + field.id;

			ret.push(
				<div className={'wbf-single-field wbf-single-field--' + field.id + ' wbf-single-field--'+field.type }>
					<label htmlFor={field.htmlId}>{field.title}</label>
					{FieldGenerator.singleField( field, props, blockProps )}
				</div>
			);
		} );

		return (
			<div {...blockProps}>
				{ret}
				<InspectorControls>
					{ret}
				</InspectorControls>
			</div>
		)
	},

	get_attribute_type_for_field: ( field ) => {
		if ( [ 'checkbox', 'checkboxes', 'radio', 'file' ].includes( field.type ) ) {
			return 'array';
		}

		return 'string';
	}

}

blockFrameworkMain.init();
