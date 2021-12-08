#version 330 compatibility
in vec3  vReflectVector;
in vec3  vRefractVector;

uniform float  uMix;
uniform samplerCube uReflectUnit;
uniform samplerCube uRefractUnit;
const vec4 WHITE = vec4( 1.,1.,.8,1. );

in vec3 vMC;
in vec3 vNs;
in vec3 vLs;
in vec3 vEs;

uniform float uEta;

uniform float  uKa, uKd, uKs;
uniform float  uShininess;
uniform sampler3D Noise3;
uniform float uNoiseAmp;
uniform float uNoiseFreq;

vec3
RotateNormal( float angx, float angy, vec3 n )
{
	float cx = cos( angx );
	float sx = sin( angx );
	float cy = cos( angy );
	float sy = sin( angy );

	// rotate about x:
	float yp =  n.y*cx - n.z*sx; // y'
	n.z =  n.y*sx + n.z*cx; // z'
	n.y =  yp;
	// n.x =  n.x;

	// rotate about y:
	float xp =  n.x*cy + n.z*sy; // x'
	n.z = -n.x*sy + n.z*cy; // z'
	n.x =  xp;
	// n.y =  n.y;

	return normalize( n );
}

void
main( )
{
	vec4 uColor = vec4( .1, 1., .8, 1.);
	vec4 nvx = texture3D( Noise3, uNoiseFreq*vMC );
	vec4 nvy = texture3D( Noise3, uNoiseFreq*vec3(vMC.xy,vMC.z+0.5) );

	float angx = nvx.r + nvx.g + nvx.b + nvx.a; //  1. -> 3.
	angx = angx - 2.;
	// -1. -> 1.
	angx *= uNoiseAmp;

	float angy = nvy.r + nvy.g + nvy.b + nvy.a; //  1. -> 3.
	angy = angy - 2.;
	// -1. -> 1.
	angy *= uNoiseAmp;

	vec3 normal = normalize( vNs );
	vec3 light  = normalize( vLs );
	vec3 eye    = normalize( vEs );

	normal = RotateNormal( angx, angy, normal );

	vec4 ambient = uKa * uColor;

	float d = max( dot(normal,light), 0. );
	d = abs( dot(normal,light));
	vec4 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(normal,light) > 0. ) // only do specular if the light can see the point
	{
		vec3 ref = normalize( 2. * normal * dot(normal,light) - light );
		s = pow( max( dot(eye,ref),0. ), uShininess );
	}
	vec4 specular = uKs * s * WHITE;
	// gl_FragColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );


	vec4 mixColor = vec4( ambient.rgb + diffuse.rgb + specular.rgb, 1. );




	//vec4 newcolor = textureCube( uReflectUnit, vReflectVector );
	//gl_FragColor = vec4( newcolor.rgb, 1. );

	vec4 refractcolor = textureCube( uRefractUnit, vRefractVector );
	vec4 reflectcolor = textureCube( uReflectUnit,  vReflectVector );
	refractcolor = mix( refractcolor, WHITE, .40 );

	gl_FragColor = vec4( mix( mixColor, reflectcolor, 0.4 ).rgb, 1. );
}