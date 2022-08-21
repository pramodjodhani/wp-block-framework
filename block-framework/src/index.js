import { useEffect } from "@wordpress/element";
import { registerBlockType } from '@wordpress/blocks';
import FieldGenerator from './fieldsGenerator';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Todo:
 * 1. Make the template work.
 * 4. Conflict between checkbox and radio field.
 */

var blockFrameworkMain = {
	init: function () {
		if ( ! window.wpbf_blocks ) {
			return;
		}

		for ( const [block_id, block_data] of Object.entries(window.wpbf_blocks) ) {
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
			keywords: data.keywords,
		} );
	},

	edit: ( props, fieldData ) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				{blockFrameworkMain.get_fields_lists( fieldData, props, blockProps, false )}
				<InspectorControls>
					<div className="wpbf-field__inspector_control">
						{blockFrameworkMain.get_fields_lists( fieldData, props, blockProps, true )}
					</div>
				</InspectorControls>
			</div>
		)
	},

	get_attribute_type_for_field: ( field ) => {
		if ( [ 'checkbox', 'checkboxes', 'radio', 'file', 'group' ].includes( field.type ) ) {
			return 'array';
		}

		return 'string';
	},

	get_fields_lists: ( fieldData, props, blockProps, isInspect ) => {
		let ret = [];

		fieldData.fields.forEach( ( field ) => {
			field.htmlId = blockProps.id + '-' + field.id;

			field._name = blockProps.id + '-' + field.id;
			if ( isInspect ) {
				field._name = field._name + '2';
			}

			ret.push(
				<div key={ field.htmlId } className={'wbf-single-field wbf-single-field--' + field.id + ' wbf-single-field--'+field.type }>
					<label htmlFor={field.htmlId}>{field.title}</label>
					<div className="wbf-single-field__field">
						{FieldGenerator.singleField( field, props, blockProps )}
					</div>
				</div>
			);
		} );

		ret = <div className="wpbf-field">
			{ret}
		</div>

		return ret;
	}

}

blockFrameworkMain.init();
