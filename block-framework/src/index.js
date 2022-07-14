import { registerBlockType } from '@wordpress/blocks';

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
		registerBlockType( block_id, {
			title: data.title,
			icon: data.icon,
			category: data.category,
			edit: () => <div>Hola edit, { block_id }!</div>,
			save: () => <div>Hola dave, { block_id }!</div>,
		} );
	}
}

blockFrameworkMain.init();
