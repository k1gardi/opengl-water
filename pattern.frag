#version 330 compatibility

uniform float	uUndulate;		// "Time", from Animate( )
uniform float	uRadius;
uniform float	uS0;
uniform float	uT0;

// Lighting stuff
uniform float   uKa, uKd, uKs;		// coefficients of each type of lighting
uniform vec3	uColor;				// object color
uniform vec3	uSpecularColor;		// light color
uniform float   uShininess;			// specular exponent
in  vec3		vN;						// normal vector
in  vec3		vL;						// vector from point to light
in  vec3		vE;						// vector from point to eye

in vec2			vST;				// texture coords
in vec3			vColor;

void
main( )
{

	// Deformation **********************************************************

	vec3 myColor = vec3( 0., .5, 1. );
	if( pow((vST.s - .5), 2) + pow((vST.t - .5), 2) <= pow(uRadius, 2))
	{
		myColor = vec3( 0., 1., 0. );
	}


	// Lighting   **********************************************************
	vec3 Normal		= normalize(vN);
	vec3 Light		= normalize(vL);
	vec3 Eye        = normalize(vE);

	vec3 ambient = uKa * myColor;

	float d = max( dot(Normal,Light), 0. );       // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * uColor;

	float s = 0.;
	if( dot(Normal,Light) > 0. )				  // only do specular if the light can see the point
	{
		vec3 ref = normalize(  reflect( -Light, Normal )  );
		s = pow( max( dot(Eye,ref),0. ), uShininess );
	}
	vec3 specular = uKs * s * uSpecularColor;
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
}
