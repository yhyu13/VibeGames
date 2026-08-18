import { wgslTagFn } from 'three-mesh-bvh/webgpu'
import type { Node } from 'three/webgpu'

/**
 * Shared WGSL math helpers for the DDGI kernels (octahedral mapping, luminance,
 * max-component). Defined as wgslTagFn nodes (the proven three-mesh-bvh pattern)
 * and referenced by literal name inside the wgslFn kernel bodies.
 */

export const octDecodeFn = wgslTagFn/* wgsl */`
	// fn
	fn ddgi_octDecode( uv: vec2f ) -> vec3f {

		var x = uv.x;
		var y = uv.y;
		var z = 1.0 - abs( x ) - abs( y );
		if ( z < 0.0 ) {

			let nx = ( 1.0 - abs( y ) ) * select( -1.0, 1.0, x >= 0.0 );
			let ny = ( 1.0 - abs( x ) ) * select( -1.0, 1.0, y >= 0.0 );
			x = nx;
			y = ny;

		}

		return normalize( vec3f( x, y, z ) );

	}
` as unknown as Node

export const luminanceFn = wgslTagFn/* wgsl */`
	// fn
	fn ddgi_luminance( v: vec3f ) -> f32 {

		return dot( vec3f( 0.2126, 0.7152, 0.0722 ), v );

	}
` as unknown as Node

export const maxCompFn = wgslTagFn/* wgsl */`
	// fn
	fn ddgi_maxComp( v: vec3f ) -> f32 {

		return max( max( v.x, v.y ), v.z );

	}
` as unknown as Node
