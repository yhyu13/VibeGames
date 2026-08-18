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

export const octEncodeFn = wgslTagFn/* wgsl */`
	// fn
	fn ddgi_octEncode( dir: vec3f ) -> vec2f {

		let l1 = abs( dir.x ) + abs( dir.y ) + abs( dir.z );
		var uv = dir.xy / max( l1, 1e-8 );
		if ( dir.z < 0.0 ) {

			uv = ( vec2f( 1.0 ) - abs( uv.yx ) ) * select( vec2f( -1.0 ), vec2f( 1.0 ), uv.xy >= vec2f( 0.0 ) );

		}

		return uv;

	}
` as unknown as Node

export const sampleBilinearFn = wgslTagFn/* wgsl */`
	// fn
	fn ddgi_sampleBilinear( tex: texture_2d<f32>, px: f32, py: f32 ) -> vec4f {

		let b = vec2i( i32( floor( px ) ), i32( floor( py ) ) );
		let f = vec2f( px - floor( px ), py - floor( py ) );
		let s00 = textureLoad( tex, b, 0 );
		let s10 = textureLoad( tex, b + vec2i( 1, 0 ), 0 );
		let s01 = textureLoad( tex, b + vec2i( 0, 1 ), 0 );
		let s11 = textureLoad( tex, b + vec2i( 1, 1 ), 0 );
		return mix( mix( s00, s10, f.x ), mix( s01, s11, f.x ), f.y );

	}
` as unknown as Node
