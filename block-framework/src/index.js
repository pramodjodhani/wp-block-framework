import { registerBlockType } from '@wordpress/blocks';
import FieldGenerator from './fieldsGenerator';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { Spinner } from '@wordpress/components';

/**
 * Main object.
 */
var blockFrameworkMain = {
	init: function () {
		if ( ! window.wpbf_blocks ) {
			return;
		}

		for ( const [block_id, block_data] of Object.entries(window.wpbf_blocks) ) {
			this.register_block( block_id, block_data );
		}
	},

	register_block: function ( block_id, data ) {
		if ( !data.fields || ! jQuery.isArray( data.fields ) ) {
			data.fields = [];
		}

		registerBlockType( block_id, {
			title: data.title,
			icon: data.icon,
			category: data.category,
			attributes: data.attributes,
			edit: ( props ) => this.edit( block_id, props, data ),
			keywords: data.keywords,
		} );
	},

	edit: ( block_id, props, fieldData ) => {
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				{/* {blockFrameworkMain.get_fields_lists( fieldData, props, blockProps, false )} */}
				<ServerSideRender
					block={block_id}
					attributes={ {
						...props.attributes
					} }
				/>
				<InspectorControls>
					<div className="wpbf-field__inspector_control">
						{blockFrameworkMain.get_fields_lists( fieldData, props, blockProps, true )}
					</div>
				</InspectorControls>
			</div>
		)
	},

	/**
	 * Get attribute type for field.
	 *
	 * @param {array} field Field Data.
	 *
	 * @returns {string}
	 */
	get_attribute_type_for_field: ( field ) => {
		if ( [ 'checkbox', 'checkboxes', 'radio', 'file', 'group' ].includes( field.type ) ) {
			return 'array';
		}

		return 'string';
	},

	/**
	 * Get JSX for all field's.
	 * 
	 * @param array fieldData Field data - passed from the PHP array.
	 * @param array props Props. 
	 * @param array blockProps Block Props - generated from useBlockProps.
	 * @param bool isInspect Is inspect?
	 *
	 * @returns array Array of JSX objects.
	 */
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
